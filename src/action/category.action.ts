"use server";

import { categoryService } from "@/services/category.service";
import { revalidatePath } from "next/cache";

export const getAllCategories = async () => {
  const res = await categoryService.getAllCategories();
  return res;
};

export const createCategory = async (data: { name: string; description?: string }) => {
  const res = await categoryService.createCategory(data);
  revalidatePath("/admin-dashboard/categories");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await categoryService.deleteCategory(id);
  revalidatePath("/admin-dashboard/categories");
  return res;
};
