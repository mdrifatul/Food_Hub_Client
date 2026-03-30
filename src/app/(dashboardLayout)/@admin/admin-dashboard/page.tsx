import Profile from "@/components/layout/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | FoodHub",
  description: "Manage FoodHub platform",
};

export const dynamic = "force-dynamic";

const adminDashboard = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default adminDashboard;
