import { Route } from "@/types";

export const adminRouter: Route[] = [
  {
    title: "Admin management",
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard",
      },
      {
        title: "All Users",
        url: "/admin-dashboard/allusers",
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/allorders",  
      },
      {
        title: "All Categories",
        url: "/admin-dashboard/categories",  
      },
      {
        title: "Home Page",
        url: "/",  
      },
    ],
  },
];
