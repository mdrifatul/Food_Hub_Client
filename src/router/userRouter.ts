import { Route } from "@/types";

export const userRouter: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Orders",
        url: "/orders",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
