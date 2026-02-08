import { FoodCard } from "@/components/ui/food-card";
import { MealPost } from "@/types";
import { mealService } from "../../../services/meal.service";
import { MealsSectionProps } from "./../../../app/(commonLayout)/page";
import MealsFilters from "./meals-filters";

export default async function MealsSection({
  searchParams,
}: MealsSectionProps) {
  const { data: allMeals } = await mealService.getmealPost();

  const cuisines = Array.from(
    new Set(allMeals.map((meal: MealPost) => meal.cuisine).filter(Boolean)),
  ) as string[];
  const dietaryOptions = Array.from(
    new Set(
      allMeals.flatMap((meal: MealPost) => meal.dietaryPreferences || []),
    ),
  ) as string[];

  const priceRanges: Record<string, [number, number]> = {
    "0-100": [0, 100],
    "101-500": [101, 500],
    "501-1000": [501, 1000],
    "1001+": [1001, 5000],
  };

  const selectedPriceRange = searchParams?.price
    ? priceRanges[searchParams.price]
    : null;

  const filteredMeals = allMeals.filter((meal: MealPost) => {
    const cuisineMatch =
      !searchParams?.cuisine || meal.cuisine === searchParams.cuisine;

    const dietaryMatch =
      !searchParams?.dietaryPreferences ||
      meal.dietaryPreferences?.includes(searchParams.dietaryPreferences);

    const priceMatch =
      !selectedPriceRange ||
      (meal.price >= selectedPriceRange[0] &&
        meal.price <= selectedPriceRange[1]);

    return cuisineMatch && dietaryMatch && priceMatch;
  });

  return (
    <section className="py-16 border-gray-200 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our delicious selection of meals prepared with the finest
            ingredients
          </p>
        </div>

        <MealsFilters
          cuisines={cuisines}
          dietaryOptions={dietaryOptions}
          selectedCuisine={searchParams?.cuisine}
          selectedDietary={searchParams?.dietaryPreferences}
          selectedPrice={searchParams?.price}
        />

        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMeals.map((meal: MealPost) => (
              <div key={meal.id} className="flex justify-center">
                <FoodCard meal={meal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No meals match your filter criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
