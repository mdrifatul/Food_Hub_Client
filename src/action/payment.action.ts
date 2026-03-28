"use server";

import { paymentService } from "@/services/payment.service";

export const createCheckoutSession = async (orderId: string) => {
  const res = await paymentService.createCheckoutSession(orderId);
  return res;
};

export const getPaymentByOrderId = async (orderId: string) => {
  const res = await paymentService.getPaymentByOrderId(orderId);
  return res;
};
