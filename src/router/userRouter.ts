import { Route } from "@/types";

export const userRouter: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Profile",
        url: "/dashboard",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
