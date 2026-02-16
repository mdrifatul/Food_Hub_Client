import { Route } from "@/types";

export const providerRouter: Route[] = [
  {
    title: "Provider Management",
    items: [
      {
        title: "Profile",
        url: "/provider-dashboard",
      },
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
        url: "/provider-dashboard/myorders",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
