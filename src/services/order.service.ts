import { env } from "@/env";
import { orderMeal } from "@/types";

import { cookies } from "next/headers";
const API_URL = env.API_URL;

export const orderService = {
  postOrder: async function (orderData: orderMeal) {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "something went wrong" };
    }
  },

  getAllOrder: async function () {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
      });

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: "something went wrong" };
    }
  },
};
