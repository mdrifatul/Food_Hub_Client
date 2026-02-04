import { FoodCard } from "@/components/ui/food-card";

export default function MealsSection() {
  const meals = [
    {
      id: 1,
      title: "Delicious Pizza",
      description: "Fresh mozzarella, tomatoes, and basil on a crispy crust",
      price: 12.99,
    },
    {
      id: 2,
      title: "Classic Burger",
      description: "Juicy beef patty with fresh lettuce and tomato",
      price: 9.99,
    },
    {
      id: 3,
      title: "Grilled Chicken",
      description: "Tender grilled chicken breast with seasonal vegetables",
      price: 14.99,
    },
    {
      id: 4,
      title: "Pasta Carbonara",
      description: "Creamy sauce with bacon and parmesan cheese",
      price: 11.99,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our delicious selection of meals prepared with the finest
            ingredients
          </p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="flex justify-center">
              <FoodCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
