"use server";

import { orderService } from "@/services/order.service";
import { orderMeal } from "@/types";

export const postOrder = async (data: orderMeal) => {
  const res = await orderService.postOrder(data);
  return res;
};

export const getOrder = async () => {
  const res = await orderService.getAllOrder();
  return res;
};
