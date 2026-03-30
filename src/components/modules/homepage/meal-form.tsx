"use client";

import { getAllCategories } from "@/action/category.action";
import { createMealAction, updateMealAction } from "@/action/meal.action";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MealPost, createMeal } from "@/types";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Save, UtensilsCrossed } from "lucide-react";
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
          result = await updateMealAction(meal.id, mealData);
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
        router.push("/provider-dashboard/allmeals");
        router.refresh();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <div
      className={cn("space-y-6 py-2 px-2 sm:px-0 max-w-4xl mx-auto", className)}
      {...props}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900/50 p-5 md:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {isEdit ? "Edit Meal" : "Create New Meal"}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {isEdit
                ? "Update your meal details, pricing, and availability."
                : "Add a new meal offering to your provider menu."}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto h-9 px-4 rounded-lg font-medium shadow-none border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Form Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <form
          id="meal-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="p-5 md:p-6">
            <FieldGroup className="max-w-3xl mx-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Meal Title */}
                <form.Field
                  name="title"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="flex gap-1 items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-tight"
                        >
                          Meal Title
                          <span className="text-red-500 dark:text-red-400">
                            *
                          </span>
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          placeholder="e.g., Chicken Biryani"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="h-10 text-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-lg shadow-none"
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
                        <FieldLabel
                          htmlFor={field.name}
                          className="flex gap-1 items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-tight"
                        >
                          Price ($)
                          <span className="text-red-500 dark:text-red-400">
                            *
                          </span>
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
                          className="h-10 text-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-lg shadow-none"
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
                        <FieldLabel
                          htmlFor={field.name}
                          className="flex gap-1 items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-tight"
                        >
                          Cuisine Category
                          <span className="text-red-500 dark:text-red-400">
                            *
                          </span>
                        </FieldLabel>
                        <select
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="h-10 border shadow-none border-zinc-200 dark:border-zinc-800 rounded-lg px-3 w-full text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:text-white transition-colors"
                          disabled={categoriesLoading}
                        >
                          <option value="" className="dark:bg-zinc-900">
                            {categoriesLoading
                              ? "Loading categories..."
                              : "Select a category"}
                          </option>
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              value={category.name}
                              className="dark:bg-zinc-900"
                            >
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
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-tight"
                        >
                          Dietary Preferences
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          placeholder="e.g., Vegetarian, Gluten-free"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="h-10 text-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-lg shadow-none"
                        />
                      </Field>
                    );
                  }}
                />
              </div>

              {/* Image URL */}
              <form.Field
                name="imageUrl"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-tight"
                      >
                        Image URL
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="https://example.com/meal-image.jpg"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="h-10 text-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-lg shadow-none"
                      />
                    </Field>
                  );
                }}
              />

              {/* Is Available Toggle */}
              <form.Field
                name="isAvailable"
                children={(field) => {
                  return (
                    <Field>
                      <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800 mt-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onChange={(e) =>
                              field.handleChange(e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-zinc-900 dark:peer-checked:bg-zinc-100"></div>
                        </label>
                        <div>
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-sm text-zinc-900 dark:text-zinc-100 font-medium cursor-pointer mb-0 tracking-tight"
                          >
                            Available for Order
                          </FieldLabel>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Turn off to temporarily hide this meal from your
                            menu
                          </p>
                        </div>
                      </div>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </div>

          <div className="px-5 md:px-6 py-4 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-3 justify-end items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto h-10 px-6 rounded-lg font-medium shadow-none border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-300 order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              form="meal-form"
              type="submit"
              className="w-full sm:w-auto bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm h-10 px-6 rounded-lg font-medium transition-all group order-1 sm:order-2 flex items-center gap-2 justify-center"
            >
              <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {isEdit ? "Save Changes" : "Create Meal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
