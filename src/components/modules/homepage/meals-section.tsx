import { getAllMeals } from "@/action/meal.action";
import { FoodCard } from "@/components/ui/food-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MealPost } from "@/types";
import Link from "next/link";
import { MealsSectionProps } from "./../../../app/(commonLayout)/page";
import MealsFilters from "./meals-filters";

export default async function MealsSection({
  searchParams,
  limit,
}: MealsSectionProps) {
  const { data: allMeals } = await getAllMeals();

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

  const displayedMeals = limit ? filteredMeals.slice(0, limit) : filteredMeals;

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40 border-y border-border/50">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="down" className="text-center mb-16 space-y-4">
          <span className="inline-block py-1.5 px-5 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-widest uppercase border border-orange-200 dark:border-orange-500/20 shadow-xs">
            Signature Menu
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
              Kitchen
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto pt-2 font-medium">
            Hand-picked selections crafted by top local chefs, guaranteed to
            satisfy your deepest cravings in minutes.
          </p>
        </ScrollReveal>

        {/* Filter Container */}
        <ScrollReveal direction="up" delay={0.1} className="mb-20">
          <MealsFilters
            cuisines={cuisines}
            dietaryOptions={dietaryOptions}
            selectedCuisine={searchParams?.cuisine}
            selectedDietary={searchParams?.dietaryPreferences}
            selectedPrice={searchParams?.price}
          />
        </ScrollReveal>

        {displayedMeals.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {displayedMeals.map((meal: MealPost, index: number) => (
                <ScrollReveal
                  delay={index * 0.1}
                  key={meal.id}
                  className="flex justify-center h-full"
                >
                  <FoodCard meal={meal} />
                </ScrollReveal>
              ))}
            </div>
            {limit && filteredMeals.length > limit && (
              <ScrollReveal
                direction="up"
                delay={0.2}
                className="mt-16 flex justify-center"
              >
                <Link
                  href="/meals"
                  className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 bg-linear-to-r from-orange-500 to-orange-600 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                  <span className="relative flex items-center gap-2">
                    View Full Menu
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            )}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto bg-orange-50 dark:bg-orange-500/10 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-orange-100 dark:border-orange-500/20">
              <span className="text-4xl">🍲</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
              No meals found
            </h3>
            <p className="text-muted-foreground text-base max-w-sm mx-auto font-medium leading-relaxed">
              We couldn't find any meals that match your current filter
              criteria. Try clearing them to see all amazing options.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
