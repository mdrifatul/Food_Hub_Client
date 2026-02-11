"use server";

import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export const getAllUser = async () => {
  const res = await userService.getAllUser();
  return res;
};

export const updateUserStatus = async (userId: string, status: string) => {
  const res = await userService.updateUserStatus(userId, status);
  revalidatePath("/admin-dashboard/allusers");
  return res;
};

export const updateUserProfile = async (
  userId: string,
  data: { name?: string; phone?: string; address?: string; image?: string },
) => {
  console.log("Updating user profile with data:", data);
  const res = await userService.updateUserProfile(userId, data);
  console.log("Update response:", res);
  revalidatePath("/dashboard");
  return res;
};
export const getUserById = async (userId: string) => {
  const res = await userService.getUserById(userId);
  return res;
};
