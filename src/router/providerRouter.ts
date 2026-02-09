import { Route } from "@/types";

export const providerRouter: Route[] = [
  {
    title: "Provider Management",
    items: [
      {
        title: "Meals",
        url: "/provider-dashboard/allmeals",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
