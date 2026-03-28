"use client";

import { updateUserProfile } from "@/action/user.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import {
  Image as ImageIcon,
  Loader2,
  PenLine,
  Phone,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileEditFormProps {
  user: User;
  onUpdateSuccess?: (updatedUser: User) => void;
}

export default function ProfileEditForm({
  user,
  onUpdateSuccess,
}: ProfileEditFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    image: user.image || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        image: user.image || "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData: any = {};

      if (formData.name.trim()) {
        updateData.name = formData.name.trim();
      }
      if (formData.phone.trim()) {
        updateData.phone = formData.phone.trim();
      }
      if (formData.image.trim()) {
        updateData.image = formData.image.trim();
      }

      const result = await updateUserProfile(user.id, updateData);

      if (result.error) {
        toast.error(result.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setOpen(false);
        if (onUpdateSuccess && result.data) {
          onUpdateSuccess(result.data.user || result.data);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shadow-sm group border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-orange-500 hover:text-orange-600 transition-colors rounded-xl"
        >
          <PenLine className="h-4 w-4 group-hover:scale-110 transition-transform text-orange-500 group-hover:text-orange-600" />
          <span className="font-semibold text-foreground">Edit Profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-0 overflow-hidden shadow-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-zinc-950/80">
        {/* Custom header block */}
        <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-6 pb-5 border-b border-zinc-100 dark:border-zinc-800/80 relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-orange-500 to-red-600 opacity-80"></div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <UserCircle className="w-6 h-6 text-orange-500" />
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">
              Update your personal information. Changes will reflect immediately
              across your entire account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6">
          <div className="space-y-5">
            <div className="space-y-2 group/input">
              <Label
                htmlFor="name"
                className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors"
              >
                <UserCircle className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 group/input">
              <Label
                htmlFor="phone"
                className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors"
              >
                <Phone className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +1 (555) 000-0000"
                type="tel"
                className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 group/input">
              <Label
                htmlFor="image"
                className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-focus-within/input:text-orange-500 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-muted-foreground group-focus-within/input:text-orange-500 transition-colors" />
                Profile Image URL
              </Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 transition-shadow shadow-xs focus-visible:shadow-orange-500/20"
                disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/60 sm:space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="rounded-xl h-11 px-6 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800 mt-2 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl h-11 px-6 font-semibold bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-md shadow-orange-500/20 hover:shadow-lg dark:shadow-orange-500/10 hover:shadow-orange-500/30 transition-all w-full sm:w-auto hover:-translate-y-0.5"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              ) : null}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
