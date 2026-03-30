import Profile from "@/components/layout/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Dashboard | FoodHub",
  description: "Manage your restaurant on FoodHub",
};

export const dynamic = "force-dynamic";

const providerDashboard = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default providerDashboard;
