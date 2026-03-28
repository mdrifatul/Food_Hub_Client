"use client";

import { createProvider } from "@/action/provider.action";
import { Button } from "@/components/ui/button";
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
import { Building2, MapPin, Phone, FileText, ArrowRight, Store } from "lucide-react";

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
    <div className="bg-white dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800/80 rounded-[2.5rem] shadow-2xl shadow-orange-500/5 overflow-hidden">
      
      {/* Gradient Top Banner */}
      <div className="bg-linear-to-r from-orange-500/10 via-red-500/10 to-orange-500/5 p-8 border-b border-zinc-100 dark:border-zinc-800/60 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-orange-500 to-red-600"></div>
         {/* Decorative Background Icon */}
         <div className="absolute -right-6 -top-6 text-orange-500/5 dark:text-orange-500/10 pointer-events-none">
            <Store className="w-56 h-56 -rotate-12" />
         </div>

         <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 bg-white dark:bg-zinc-900 shadow-xl shadow-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-100 dark:border-zinc-800 shrink-0">
               <Store className="w-8 h-8 text-orange-500" />
            </div>
            <div>
               <h2 className="text-3xl tracking-tight font-black text-foreground mb-2">Partner With Us</h2>
               <p className="text-muted-foreground font-medium text-base max-w-lg">
                 Transform your kitchen into a highly profitable digital restaurant. Register your business today.
               </p>
            </div>
         </div>
      </div>

      <div className="p-8">
        <form
          id="provider-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="grid gap-6 md:grid-cols-2">
            
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
                  <Field data-invalid={isInvalid} className="md:col-span-2 group/input">
                    <FieldLabel htmlFor={field.name} className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors">
                      <Building2 className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                      Business Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. The Golden Platter"
                      className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20 text-base"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-red-500 text-sm mt-1" />
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
                  <Field data-invalid={isInvalid} className="group/input">
                    <FieldLabel htmlFor={field.name} className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors">
                      <Phone className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                      Business Phone <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="tel"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. +1 (555) 123-4567"
                      className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20 text-base"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-red-500 text-sm mt-1" />
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
                  <Field data-invalid={isInvalid} className="group/input">
                    <FieldLabel htmlFor={field.name} className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors">
                      <MapPin className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                      Physical Address <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. 123 Culinary Ave"
                      className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20 text-base"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-red-500 text-sm mt-1" />
                    )}
                  </Field>
                );
              }}
            />

            {/* Description Field */}
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
                  <Field data-invalid={isInvalid} className="md:col-span-2 group/input">
                    <FieldLabel htmlFor={field.name} className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors">
                      <FileText className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                      About Your Kitchen (Optional)
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tell customers what makes your food special, your specialty cuisines, or your culinary background..."
                      rows={5}
                      className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20 text-base resize-none p-4 w-full"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} className="text-red-500 text-sm mt-1" />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </div>
      
      {/* Footer Area */}
      <div className="p-8 pt-6 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-medium order-2 md:order-1 text-center md:text-left">
          By submitting this application, you agree to FoodHub's <span className="text-orange-500 underline underline-offset-2 hover:text-orange-600 cursor-pointer">Partner Terms</span>.
        </p>
        <Button
          form="provider-form"
          type="submit"
          className="order-1 w-full md:w-auto h-12 md:h-14 px-8 rounded-xl font-bold bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl shadow-orange-500/25 transition-all hover:-translate-y-1 group flex items-center justify-center gap-2 text-base shrink-0 border-0"
        >
          {form.state.isSubmitting ? (
             <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
             <>
                Submit Application 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
             </>
          )}
        </Button>
      </div>
    </div>
  );
}
