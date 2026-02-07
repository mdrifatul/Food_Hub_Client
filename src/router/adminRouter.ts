import { Route } from "@/types";

export const adminRouter: Route[] = [
  {
    title: "Admin management",
    items: [
      {
        title: "Analytics",
        url: "/analytics",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
