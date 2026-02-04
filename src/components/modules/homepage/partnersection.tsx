// components/sections/partner-section.tsx
import {
  BarChart,
  DollarSign,
  Headphones,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";

const partnerBenefits = [
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description:
      "Reach thousands of hungry customers actively looking for food",
  },
  {
    icon: Users,
    title: "Expand Customer Base",
    description: "Connect with new customers beyond your local area",
  },
  {
    icon: DollarSign,
    title: "Increase Revenue",
    description: "Boost your sales with our large and active user base",
  },
  {
    icon: BarChart,
    title: "Business Analytics",
    description:
      "Track orders, earnings, and performance with detailed insights",
  },
  {
    icon: Smartphone,
    title: "Easy Management",
    description: "Manage orders and menu from anywhere with our provider app",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get 24/7 support from our partner success team",
  },
];

const stats = [
  { value: "500+", label: "Partner Restaurants" },
  { value: "50k+", label: "Monthly Orders" },
  { value: "15k+", label: "Active Users" },
  { value: "4.8★", label: "Average Rating" },
];

export default function PartnerSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-red-50 dark:from-gray-950 dark:to-gray-950"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Partner with{" "}
            <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodHub
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join hundreds of successful restaurants and grow your business with
            Bangladeshs fastest-growing food delivery platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Image/Illustration */}
          <div className="relative">
            <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                alt="Restaurant partner"
                fill
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />

              {/* Overlay card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Monthly Earnings
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ৳2,45,000
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-2 flex-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Benefits */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Why Restaurants Love FoodHub
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {partnerBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                >
                  <div className="h-12 w-12 bg-linear-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
