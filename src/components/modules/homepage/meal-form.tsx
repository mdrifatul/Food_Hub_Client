"use client";

import { getAllCategories } from "@/action/category.action";
import { createMealAction, updateMealAction } from "@/action/meal.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MealPost, createMeal } from "@/types";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

const mealFormSchema = z.object({
  title: z.string().min(1, "Meal title is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  cuisine: z.string().min(1, "Cuisine type is required"),
  dietaryPreferences: z.string().optional(),
  imageUrl: z.string().optional(),
  isAvailable: z.boolean().optional().default(true),
});

type MealFormData = z.infer<typeof mealFormSchema>;

interface MealFormProps extends React.ComponentProps<"div"> {
  meal?: MealPost;
  isEdit?: boolean;
}

export function MealForm({
  meal,
  isEdit = false,
  className,
  ...props
}: MealFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        if (result.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      title: meal?.title ?? "",
      price: meal?.price ?? 0,
      cuisine: meal?.cuisine ?? "",
      dietaryPreferences: meal?.dietaryPreferences?.join(", ") ?? "",
      imageUrl: meal?.imageUrl ?? "",
      isAvailable: meal?.isAvailable ?? true,
    },
    onSubmit: async ({ value }) => {
      const validationResult = mealFormSchema.safeParse(value);

      if (!validationResult.success) {
        toast.error("Please fix the errors in the form before submitting.");
        return;
      }

      const toastId = toast.loading(
        isEdit ? "Updating meal..." : "Creating meal...",
      );
      try {
        const dietaryPrefs = value.dietaryPreferences
          ? value.dietaryPreferences
              .split(",")
              .map((p) => p.trim())
              .filter((p) => p.length > 0)
          : undefined;

        const mealData: createMeal = {
          title: value.title,
          price: value.price,
          cuisine: value.cuisine,
          dietaryPreferences: dietaryPrefs,
          imageUrl: value.imageUrl || undefined,
          isAvailable: value.isAvailable ?? true,
        };
        let result;
        if (isEdit && meal?.id) {
          console.log(mealData);
          result = await updateMealAction(meal?.id, mealData);
          console.log(result);
        } else {
          result = await createMealAction(mealData);
        }

        if (result.error) {
          toast.error(result.error as string, {
            id: toastId,
          });
          return;
        }

        toast.success(
          isEdit ? "Meal updated successfully" : "Meal created successfully",
          { id: toastId },
        );
        router.push("/");
        router.refresh();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Meal" : "Create New Meal"}</CardTitle>
          <CardDescription>
            {isEdit
              ? "Update the meal details below"
              : "Add a new meal to your restaurant menu"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="meal-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Meal Title */}
              <form.Field
                name="title"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Meal Title</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="e.g., Chicken Biryani"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </Field>
                  );
                }}
              />

              {/* Price */}
              <form.Field
                name="price"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Price (in currency)
                      </FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(parseFloat(e.target.value) || 0)
                        }
                        onBlur={field.handleBlur}
                      />
                    </Field>
                  );
                }}
              />

              {/* Cuisine Type / Category */}
              <form.Field
                name="cuisine"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Category (Cuisine Type)
                      </FieldLabel>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 dark:bg-gray-900 dark:border-gray-900 dark:text-white"
                        disabled={categoriesLoading}
                      >
                        <option value="">
                          {categoriesLoading
                            ? "Loading categories..."
                            : "Select a category"}
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  );
                }}
              />

              {/* Dietary Preferences */}
              <form.Field
                name="dietaryPreferences"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Dietary Preferences (comma-separated)
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="e.g., Vegetarian, Gluten-free, Spicy"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </Field>
                  );
                }}
              />

              {/* Image URL */}
              <form.Field
                name="imageUrl"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="https://example.com/meal-image.jpg"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </Field>
                  );
                }}
              />

              {/* Is Available */}
              <form.Field
                name="isAvailable"
                children={(field) => {
                  return (
                    <Field>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onChange={(e) => field.handleChange(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <FieldLabel htmlFor={field.name}>
                          Is Available
                        </FieldLabel>
                      </div>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <div className="px-6 py-4 border-t flex gap-3">
          <Button
            form="meal-form"
            type="submit"
            className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white flex-1"
          >
            {isEdit ? "Update Meal" : "Create Meal"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
