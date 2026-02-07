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
import { Calendar, Mail, MapPin, Phone, Shield, User as UserIcon } from "lucide-react";

const UserDashboard = async () => {
  const { data } = await userService.getSession();
  const user: User = data?.user;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here&apos;s your profile information.
        </p>
      </div>

      <Separator />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="h-10 w-10 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Shield className="h-4 w-4" />
                <span className="capitalize">{user.role}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <p className="text-sm font-semibold">{user.email}</p>
              </div>
            </div>

           
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p className="text-sm font-semibold">{user.phone || "Not provided"}</p>
              </div>
            </div>

          
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-sm font-semibold">{user.address || "Not provided"}</p>
              </div>
            </div>

           
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-primary/10 p-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p className="text-sm font-semibold">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Your account information and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">User ID</span>
              <span className="text-sm text-muted-foreground font-mono">{user.id}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Account Type</span>
              <span className="text-sm text-muted-foreground capitalize">{user.role}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
