import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/contants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  provider,
  user,
}: {
  admin: React.ReactNode;
  provider: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data.user;

  const renderContent = () => {
    switch (userInfo.role) {
      case Roles.admin:
        return admin;
      case Roles.provider:
        return provider;
      case Roles.user:
        return user;
    }
  };
  return (
    <SidebarProvider>
      <div className="">
        <AppSidebar user={userInfo} />
      </div>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  );
}
