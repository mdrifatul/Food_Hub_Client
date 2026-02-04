// components/sections/how-it-works-section.tsx
import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Browse Meals",
    description:
      "Explore menus from hundreds of restaurants and find your favorite dishes",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: "Place Order",
    description: "Add meals to cart and checkout with your delivery address",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    icon: Truck,
    title: "Get Delivered",
    description:
      "Sit back and relax while we deliver hot food to your doorstep",
    color: "from-red-500 to-pink-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodHub
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get your favorite meals delivered in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-orange-200 to-red-200 dark:from-orange-900 dark:to-red-900 -z-10"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.id}
                </div>

                {/* Icon */}
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-r ${step.color} flex items-center justify-center shadow-lg`}
                >
                  <step.icon className="h-10 w-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
