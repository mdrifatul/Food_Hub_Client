import { MealsSectionProps } from "@/app/(commonLayout)/page";
import { env } from "@/env";
import { createMeal } from "@/types";

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
      return { data: null, error: "something went wrong" };
    }
  },

  createMeal: async function (mealData: createMeal) {
    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      });

      const data = await res.json();
      if(!res.ok){
        throw new Error("Failed to create meal");
      }
      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to create meal",
      };
    }
  },
};
