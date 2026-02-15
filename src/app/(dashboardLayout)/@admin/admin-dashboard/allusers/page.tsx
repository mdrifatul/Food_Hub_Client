import { getAllUser } from "@/action/user.action";
import { UserTable } from "@/components/layout/UserTable";

export const dynamic = "force-dynamic";

const AllUsers = async () => {
  const { data: users } = await getAllUser();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          All Users
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Total Users: {users?.length || 0}
        </p>
      </div>

      <UserTable users={users || []} />
    </div>
  );
};

export default AllUsers;
