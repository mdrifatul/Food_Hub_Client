import { Route } from "@/types";

export const userRouter: Route[] = [
  {
    title: "User Management",
    items: [
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
