"use client";

import { updateUserStatus } from "@/action/user.action";
import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: string;
}

export const UserTable = ({ users }: { users: User[] }) => {
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleStatusChange = async (userId: string, status: string) => {
    const newStatus = status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setLoadingUserId(userId);
    try {
      const result = await updateUserStatus(userId, newStatus);
      if (result.error) {
        toast.error("Failed to update user status");
      } else {
        toast.success(`User status updated successfully`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4 px-6">
                #
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Name
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Email
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Role
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                Status
              </TableHead>
              <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4 px-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User, index: number) => {
              const isActive = user.status === "ACTIVE" || !user.status;
              const isAdmin = user.role === "ADMIN";
              const isLoading = loadingUserId === user.id;

              return (
                <TableRow
                  key={user.id}
                  className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/60 transition-colors"
                >
                  <TableCell className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <Badge
                      variant="secondary"
                      className={`font-semibold px-2.5 py-1 text-xs border-0 ${
                        user.role === "ADMIN"
                          ? "bg-purple-500/10 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                          : user.role === "PROVIDER"
                          ? "bg-blue-500/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                          : "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      }`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    <Badge
                      variant={isActive ? "default" : "secondary"}
                      className={`font-semibold px-2.5 py-1 text-xs border-0 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {isActive ? "ACTIVE" : user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                    {!isAdmin ? (
                      <Button
                        size="sm"
                        variant={isActive ? "outline" : "default"}
                        onClick={() =>
                          handleStatusChange(user.id, user.status || "ACTIVE")
                        }
                        disabled={isLoading}
                        className={`h-8 px-3 rounded-lg text-xs font-semibold shadow-none transition-all ${
                          isActive
                            ? "border-red-200 hover:border-red-300 bg-red-50/50 hover:bg-red-100 text-red-600 dark:border-red-900/30 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-950/50 dark:border-emerald-900/50"
                        }`}
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-current mr-1.5"></div>
                        ) : isActive ? (
                          <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                        )}
                        {isLoading
                          ? "Updating..."
                          : isActive
                          ? "Suspend"
                          : "Activate"}
                      </Button>
                    ) : (
                      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-transparent">
                        Admin (Protected)
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

