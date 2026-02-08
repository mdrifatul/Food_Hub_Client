import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryService = {
  getAllCategories: async function () {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch categories" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  createCategory: async function (categoryData: { name: string; description?: string }) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(categoryData),
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to create category" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  deleteCategory: async function (id: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to delete category" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
