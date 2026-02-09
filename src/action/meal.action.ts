"use server";

import { mealService } from "@/services/meal.service";
import { createMeal } from "@/types";
import { revalidatePath } from "next/cache";

export const getMealById = async (id: string) => {
  const res = await mealService.getMealById(id);
  return res;
};

export const getMealsByAuthorId = async () => {
  const res = await mealService.getMealsByAuthorId();
  return res;
};

export const getAllMeals = async (params?: any) => {
  const res = await mealService.getmealPost(params);
  return res;
};

export const createMealAction = async (data: createMeal) => {
  const res = await mealService.createMeal(data);
  revalidatePath("/provider-dashboard");
  revalidatePath("/");
  return res;
};

export const updateMealAction = async (
  id: string,
  data: Partial<createMeal>,
) => {
  const res = await mealService.updateMeal(id, data);
  revalidatePath("/provider-dashboard");
  revalidatePath("/");
  return res;
};

export const deleteMealAction = async (id: string) => {
  const res = await mealService.deleteMeal(id);
  revalidatePath("/provider-dashboard");
  revalidatePath("/");
  return res;
};
