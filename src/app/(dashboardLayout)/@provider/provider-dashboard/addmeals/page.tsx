import { MealForm } from "@/components/modules/homepage/meal-form";

export const dynamic = "force-dynamic";

const addMeals = () => {
  return (
    <div className="w-11/12 mx-auto py-12">
      <MealForm />
    </div>
  );
};

export default addMeals;
