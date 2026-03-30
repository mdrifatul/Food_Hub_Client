import { RegisterForm } from "@/components/modules/authentication/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | FoodHub",
  description: "Create a new FoodHub account",
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
