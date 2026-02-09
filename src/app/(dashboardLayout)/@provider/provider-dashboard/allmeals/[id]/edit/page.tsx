"use client";

import { getMealById } from "@/action/meal.action";
import { MealForm } from "@/components/modules/homepage/meal-form";
import { MealPost } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditMealPage = () => {
  const params = useParams();
  const mealId = params.id as string;
  const [meal, setMeal] = useState<MealPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const result = await getMealById(mealId);

        if (result.error) {
          toast.error(result.error.message || "Failed to fetch meal");
          setLoading(false);
          return;
        }

        setMeal(result.data);
      } catch (error) {
        console.error("Error fetching meal:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (mealId) {
      fetchMeal();
    }
  }, [mealId]);

  if (!meal) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 dark:text-gray-400">Meal not found</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <MealForm meal={meal} isEdit={true} />
    </div>
  );
};

export default EditMealPage;
