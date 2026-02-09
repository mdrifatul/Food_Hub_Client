"use client";

import { createProvider } from "@/action/provider.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessAddress: z
    .string()
    .min(5, "Business address must be at least 5 characters"),
  businessPhone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  description: z.string().optional(),
  authorId: z.string().min(1, "User ID is required"),
});

export function ProviderRegistrationForm({ authorId }: { authorId: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessPhone: "",
      description: "",
      authorId: authorId,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting provider application...");
      try {
        const result = await createProvider({
          businessName: value?.businessName,
          businessAddress: value?.businessAddress,
          businessPhone: value?.businessPhone,
          description: value?.description,
          authorId: authorId,
        });

        if (result.error) {
          toast.error(result.error.message, { id: toastId });
          return;
        }

        if (!result.data) {
          toast.error("No data returned from server", { id: toastId });
          return;
        }

        toast.success("Provider application submitted successfully!", {
          id: toastId,
        });

        form.reset();
        router.push("/provider-dashboard");
      } catch (err) {
        console.error("Form submission error:", err);
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Become a Food Provider</CardTitle>
        <CardDescription>
          Register your business to start providing delicious meals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="provider-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Business Name Field */}
            <form.Field
              name="businessName"
              validators={{
                onChange: ({ value }) => {
                  try {
                    formSchema.shape.businessName.parse(value);
                    return undefined;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Business Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your business name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Business Address Field */}
            <form.Field
              name="businessAddress"
              validators={{
                onChange: ({ value }) => {
                  try {
                    formSchema.shape.businessAddress.parse(value);
                    return undefined;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Business Address <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your business address"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Business Phone Field */}
            <form.Field
              name="businessPhone"
              validators={{
                onChange: ({ value }) => {
                  try {
                    formSchema.shape.businessPhone.parse(value);
                    return undefined;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Business Phone <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) => {
                  try {
                    formSchema.shape.description.parse(value);
                    return undefined;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Description (Optional)
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tell us about your business..."
                      rows={4}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="provider-form"
          type="submit"
          className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          Submit Application
        </Button>
      </CardFooter>
    </Card>
  );
}
