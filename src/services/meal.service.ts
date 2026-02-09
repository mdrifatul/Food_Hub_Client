import { MealsSectionProps } from "@/app/(commonLayout)/page";
import { env } from "@/env";
import { createMeal } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface serviceOption {
  cache?: RequestCache;
  revalidate?: number;
}

export const mealService = {
  getmealPost: async function (
    params?: MealsSectionProps,
    options?: serviceOption,
  ) {
    try {
      const url = new URL(`${API_URL}/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit & {
        next?: { revalidate?: 10 };
      } = {};

      // if (options?.cache) {
      //   config.cache = options.cache;
      // }
      // if (options?.revalidate) {
      //   config.next = { revalidate: options.revalidate };
      // }

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch meal" } };
    }
  },

  getMealById: async function (id: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/meals/${id}`, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch meal" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  getMealsByAuthorId: async function () {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/meals/provider/my-posts`, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch meals" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  createMeal: async function (mealData: createMeal) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(mealData),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to create meal");
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to create meal",
      };
    }
  },

  updateMeal: async function (id: string, mealData: Partial<createMeal>) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/meals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(mealData),
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to update meal" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to update meal",
      };
    }
  },

  deleteMeal: async function (id: string) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/meals/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to delete meal" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
