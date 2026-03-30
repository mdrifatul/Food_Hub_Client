import { MealForm } from "@/components/modules/homepage/meal-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const dynamic = "force-dynamic";

const addMeals = () => {
  return (
    <div className="w-11/12 mx-auto py-12">
      <ScrollReveal direction="up">
        <MealForm />
      </ScrollReveal>
    </div>
  );
};

export default addMeals;
