import { getUserById } from "@/action/user.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Separator } from "@/components/ui/separator";
import { userService } from "@/services/user.service";
import { User } from "@/types";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import ProfileEditForm from "./ProfileEditForm";

const UserDashboard = async () => {
  const { data: sessionData } = await userService.getSession();

  if (!sessionData?.user) {
    redirect("/login");
  }

  const sessionUser: User = sessionData.user;
  const { data: dbUserData } = await getUserById(sessionUser.id);
  const user: User = dbUserData;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/20 relative pb-20 overflow-hidden">
      {/* Subtle Premium Glow */}
      <div className="absolute top-0 right-0 w-full h-125 bg-linear-to-b from-zinc-200/50 to-transparent dark:from-zinc-800/30 pointer-events-none blur-3xl"></div>

      <div className="container mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Profile Section */}
        <ScrollReveal delay={0} direction="up">
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl rounded-3xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between leading-normal transition-all hover:shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-zinc-100 dark:bg-zinc-800 ring-4 ring-white dark:ring-zinc-950 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-12 w-12 text-zinc-400 dark:text-zinc-500" />
                )}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {user.name}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="inline-flex items-center rounded-full bg-linear-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 ring-1 ring-inset ring-orange-500/20 capitalize shadow-xs">
                    {user.role}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800">
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <ProfileEditForm user={user} />
            </div>
          </div>
        </ScrollReveal>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal
            delay={0.15}
            direction="left"
            className="md:col-span-1 space-y-6"
          >
            <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-1.5 w-full bg-linear-to-r from-orange-500 to-red-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> About You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-orange-200 dark:hover:border-orange-900/30">
                  <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-xs shrink-0">
                    <Mail className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold truncate text-zinc-700 dark:text-zinc-300">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-orange-200 dark:hover:border-orange-900/30">
                  <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-xs shrink-0">
                    <Phone className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {user.phone || "No phone added"}
                  </span>
                </div>
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-orange-200 dark:hover:border-orange-900/30">
                  <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-xs shrink-0">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-400">
                    Not provided
                  </span>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal
            delay={0.3}
            direction="right"
            className="md:col-span-2 space-y-6"
          >
            <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-1.5 w-full bg-linear-to-r from-zinc-400 to-zinc-500 dark:from-zinc-600 dark:to-zinc-700 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="pb-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20">
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <ShieldCheck className="h-5 w-5 text-orange-500" /> Account
                  Security
                </CardTitle>
                <CardDescription className="text-zinc-500 font-medium">
                  Manage your account security and authentication details.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6 text-sm">
                <div className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors">
                  <div className="space-y-1.5">
                    <p className="font-bold text-zinc-700 dark:text-zinc-300">
                      User Identification
                    </p>
                    <p className="text-zinc-500 font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md inline-block border border-zinc-200 dark:border-zinc-700">
                      {user.id}
                    </p>
                  </div>
                </div>
                <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors">
                  <div className="space-y-1.5">
                    <p className="font-bold text-zinc-700 dark:text-zinc-300">
                      Role Access
                    </p>
                    <p className="text-zinc-500 capitalize font-medium">
                      {user.role} Privileges Active
                    </p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-500/20 p-2.5 rounded-xl">
                    <ShieldCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors">
                  <div className="space-y-1.5">
                    <p className="font-bold text-zinc-700 dark:text-zinc-300">
                      Last Profile Update
                    </p>
                    <p className="text-zinc-500 font-medium">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <CalendarDays className="h-5 w-5 text-zinc-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
