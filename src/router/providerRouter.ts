import { Route } from "@/types";

export const providerRouter: Route[] = [
  {
    title: "Provider Management",
    items: [
      {
        title: "Add Meals",
        url: "/provider-dashboard/addmeals",
      },
      {
        title: "Meals",
        url: "/provider-dashboard/allmeals",
      },
      {
        title: "Orders",
        url: "/provider-dashboard/orders",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
