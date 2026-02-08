"use server";

import { reviewService } from "@/services/review.service";
import { reviewType } from "@/types";

export const createReview = async (data: reviewType) => {
  const res = await reviewService.createReview(data);
  return res;
};
