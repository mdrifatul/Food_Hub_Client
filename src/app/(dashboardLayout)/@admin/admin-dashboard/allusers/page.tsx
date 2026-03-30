import { getAllUser } from "@/action/user.action";
import { UserTable } from "@/components/layout/UserTable";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const dynamic = "force-dynamic";

const AllUsers = async () => {
  const { data: users } = await getAllUser();

  return (
    <div className="space-y-8 w-11/12 mx-auto py-8 lg:py-10">
      {/* Header Section */}
      <ScrollReveal direction="down">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              All Users
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
              Manage system access. Total Users: {users?.length || 0}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <UserTable users={users || []} />
      </ScrollReveal>
    </div>
  );
};

export default AllUsers;
