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
    } catch (err) {
      return { data: null, error: "something went wrong" };
    }
  },
};
