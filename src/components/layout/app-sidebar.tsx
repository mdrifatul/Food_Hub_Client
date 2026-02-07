import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";
import { Roles } from "@/contants/roles";
import { adminRouter } from "@/router/adminRouter";
import { providerRouter } from "@/router/providerRouter";
import { userRouter } from "@/router/userRouter";
import { Route } from "@/types";

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
    <Sidebar {...props}>
      <SidebarContent>
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
  )
}
