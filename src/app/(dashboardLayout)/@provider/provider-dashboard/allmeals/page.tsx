"use client";

import { deleteMealAction, getMealsByAuthorId } from "@/action/meal.action";
import { Button } from "@/components/ui/button";
import { MealPost } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AllMeals = () => {
  const [meals, setMeals] = useState<MealPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const result = await getMealsByAuthorId();

        if (result.error) {
          toast.error(result.error.message || "Failed to fetch meals");
          setLoading(false);
          return;
        }

        setMeals(result.data || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleDeleteMeal = async (mealId: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) {
      return;
    }

    setDeleting(mealId);
    try {
      const result = await deleteMealAction(mealId);

      if (result.error) {
        toast.error(result.error.message || "Failed to delete meal");
        setDeleting(null);
        return;
      }

      setMeals(meals.filter((meal) => meal.id !== mealId));
      toast.success("Meal deleted successfully");
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Something went wrong");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 w-11/12 mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Meals
        </h1>
        <Link href="/provider-dashboard/addmeals">
          <Button className="bg-linear-to-r from-orange-500 to-red-500">
            Create New Meal
          </Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Meal Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Cuisine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {meals.map((meal) => (
                <tr
                  key={meal.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {meal.imageUrl && (
                        <img
                          src={meal.imageUrl}
                          alt={meal.title}
                          className="h-10 w-10 rounded object-cover mr-3"
                        />
                      )}
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {meal.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {meal.cuisine}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                    ${meal.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        meal.isAvailable
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      {meal.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link href={`/provider-dashboard/allmeals/${meal.id}/edit`}>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleDeleteMeal(meal.id)}
                      disabled={deleting === meal.id}
                    >
                      {deleting === meal.id ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
