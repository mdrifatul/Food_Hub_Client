import Profile from "@/components/layout/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard | FoodHub",
  description: "View your orders and account details",
};

export const dynamic = "force-dynamic";

const UserDashboard = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default UserDashboard;
