"use client";

import { deleteMealAction, getMealsByAuthorId } from "@/action/meal.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MealPost } from "@/types";
import { Edit, Plus, Trash } from "lucide-react";
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
    <div className="space-y-8 w-11/12 mx-auto py-8 lg:py-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            My Meals
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
            Manage your offerings, update prices, and control availability.
          </p>
        </div>
        <Link href="/provider-dashboard/addmeals">
          <Button className="w-full sm:w-auto bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm h-11 px-6 rounded-full font-medium transition-all group">
            <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Create New Meal
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4 px-6">
                  Meal Details
                </TableHead>
                <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                  Cuisine
                </TableHead>
                <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                  Price
                </TableHead>
                <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-zinc-600 dark:text-zinc-300 py-4 px-6 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 space-y-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
                      <p>Loading your meals...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : meals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 space-y-2">
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-2">
                        <Plus className="w-8 h-8 text-zinc-400" />
                      </div>
                      <p className="font-bold text-zinc-700 dark:text-zinc-300 text-lg">
                        No meals found
                      </p>
                      <p className="text-sm">
                        Get started by creating your first meal offering.
                      </p>
                      <Link
                        href="/provider-dashboard/addmeals"
                        className="mt-4"
                      >
                        <Button variant="outline" className="rounded-full h-9">
                          Create Meal
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                meals.map((meal) => (
                  <TableRow
                    key={meal.id}
                    className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/60 transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {meal.imageUrl ? (
                          <div className="h-14 w-14 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-all shrink-0">
                            <img
                              src={meal.imageUrl}
                              alt={meal.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="h-14 w-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent shrink-0 flex items-center justify-center text-zinc-400">
                            <span className="text-xs font-medium">No IMG</span>
                          </div>
                        )}
                        <div>
                          <div className="text-zinc-900 dark:text-zinc-100 font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
                            {meal.title}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-50 sm:max-w-75 truncate">
                            ID:{" "}
                            <span className="font-mono">
                              {meal.id.slice(-8)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-zinc-600 dark:text-zinc-300 font-medium">
                      {meal.cuisine}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-zinc-900 dark:text-zinc-100 font-bold text-base">
                        ${meal.price}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant={meal.isAvailable ? "default" : "secondary"}
                        className={`font-semibold px-2.5 py-1 ${
                          meal.isAvailable
                            ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 border-0"
                            : "bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:bg-red-500/10 dark:text-red-400 border-0"
                        }`}
                      >
                        {meal.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2.5 opacity-100 sm:opacity-70 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/provider-dashboard/allmeals/${meal.id}/edit`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-lg shadow-none border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all"
                            title="Edit meal"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 w-9 p-0 rounded-lg shadow-none border-red-200 hover:border-red-300 bg-red-50/50 hover:bg-red-100 text-red-600 dark:border-red-900/30 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 transition-all"
                          onClick={() => handleDeleteMeal(meal.id)}
                          disabled={deleting === meal.id}
                          title="Delete meal"
                        >
                          {deleting === meal.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 dark:border-red-400"></div>
                          ) : (
                            <Trash className="w-4 h-4" />
                          )}
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
