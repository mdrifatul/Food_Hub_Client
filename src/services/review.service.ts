import { env } from "@/env";
import { reviewType } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const reviewService = {
  createReview: async function (review: reviewType) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(review),
      });
      if(!res.ok){
        throw new Error("Failed to create review");
      }
      const data = res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "something went wrong" };
    }
  },
};
