import { MealsSectionProps } from "@/app/(commonLayout)/page";
import { env } from "@/env";

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
      const config: RequestInit = {
        cache: "no-store",
      };

      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "something went wrong" };
    }
  },
};
