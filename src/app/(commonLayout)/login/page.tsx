import { LoginForm } from "@/components/modules/authentication/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | FoodHub",
  description: "Sign in to your FoodHub account",
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
