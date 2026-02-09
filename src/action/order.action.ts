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

export const getOrderById = async (orderId: string) => {
  const res = await orderService.getOrderById(orderId);
  return res;
};

export const updateOrderStatus = async (
  orderId: string,
  status: "pending" | "processing" | "ready" | "delivered" | "cancelled",
) => {
  const res = await orderService.updateOrderStatus(orderId, status);
  return res;
};
