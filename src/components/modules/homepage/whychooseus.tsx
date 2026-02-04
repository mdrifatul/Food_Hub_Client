// components/sections/why-choose-section.tsx
import { Award, Clock, Heart, Shield, Utensils, Zap } from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Get your meals delivered in 30 minutes or less with our express delivery service",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    icon: Shield,
    title: "Safe & Hygienic",
    description:
      "All our partner restaurants follow strict hygiene standards and safety protocols",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    icon: Utensils,
    title: "Wide Variety",
    description:
      "Choose from 500+ restaurants and thousands of delicious meals across all cuisines",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    icon: Heart,
    title: "Quality Guaranteed",
    description:
      "We ensure every meal meets our quality standards before it reaches you",
    color: "from-red-500 to-pink-500",
  },
  {
    id: 5,
    icon: Zap,
    title: "Easy Ordering",
    description:
      "Simple, intuitive interface makes ordering food quick and hassle-free",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 6,
    icon: Award,
    title: "Best Prices",
    description:
      "Enjoy great deals, discounts, and cashback offers on every order",
    color: "from-green-500 to-emerald-500",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodHub
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Were committed to providing the best food delivery experience with
            quality, speed, and convenience at the heart of everything we do
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:scale-105"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 from-orange-500 to-red-500"></div>

              {/* Icon */}
              <div
                className={`relative w-14 h-14 mb-6 rounded-xl bg-linear-to-r ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <benefit.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
