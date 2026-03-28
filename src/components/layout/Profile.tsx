import { getUserById } from "@/action/user.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="container mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8 leading-normal">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              {user.name}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary-foreground/10 capitalize">
                {user.role}
              </span>
              <span className="text-xs text-muted-foreground">
                Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <ProfileEditForm user={user} />
        </div>
      </div>

      <Separator className="my-8" />

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="border shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm">
                  {user.phone || "No phone added"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm">Not provided</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border shadow-none">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg font-medium">
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">User ID</p>
                  <p className="text-muted-foreground font-mono text-xs">
                    {user.id}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Role Access</p>
                  <p className="text-muted-foreground capitalize">
                    {user.role} Privileges
                  </p>
                </div>
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Last Profile Update</p>
                  <p className="text-muted-foreground">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
