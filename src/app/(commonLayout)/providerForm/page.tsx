import { ProviderRegistrationForm } from "@/components/layout/ProviderRegistrationForm";
import { userService } from "@/services/user.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Become a Provider | FoodHub",
  description: "Register your restaurant on FoodHub",
};

export default async function ProviderFormPage() {
  const sessionResult = await userService.getSession();

  if (sessionResult.error || !sessionResult.data) {
    redirect("/login");
  }

  const userId = sessionResult.data.user.id;

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-20 bg-zinc-50/30 dark:bg-zinc-950/20">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-0 right-0 -mr-40 -mt-20 w-125 h-125 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-20 w-125 h-125 bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 dark:opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ProviderRegistrationForm authorId={userId} />
        </div>
      </div>
    </div>
  );
}
