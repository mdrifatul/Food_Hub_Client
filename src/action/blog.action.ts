"use server";

import { orderService } from "@/services/order.service";
import { OrderMeal } from "@/types/order.type";

export const postOrder = async (data: OrderMeal) => {
  const res = await orderService.postOrder(data);
  return res;
};
