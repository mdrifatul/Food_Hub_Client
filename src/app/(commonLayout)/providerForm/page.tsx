import { ProviderRegistrationForm } from "@/components/layout/ProviderRegistrationForm";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

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
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <ProviderRegistrationForm authorId={userId} />
      </div>
    </div>
  );
}
