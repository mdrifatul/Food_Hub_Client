import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Roles } from "@/contants/roles";
import { adminRouter } from "@/router/adminRouter";
import { providerRouter } from "@/router/providerRouter";
import { userRouter } from "@/router/userRouter";
import { Route } from "@/types";
import { UtensilsCrossed } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: { role: string };
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  let routes: Route[] = [];
  switch (props.user.role) {
    case Roles.admin:
      routes = adminRouter;
      break;
    case Roles.provider:
      routes = providerRouter;
      break;
    case Roles.user:
      routes = userRouter;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="h-16 flex items-center shrink-0 border-b border-sidebar-border px-4 py-0 justify-center">
        <div className="flex w-full items-center gap-2 font-black tracking-widest text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20">
            <UtensilsCrossed className="size-4" />
          </div>
          <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            FOODHUB
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
