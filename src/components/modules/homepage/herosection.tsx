// components/sections/hero-section.tsx
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import Image from "next/image"; // ✅ Import Next.js Image

export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-5 lg:h-screen overflow-hidden dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover & Order{" "}
                <span className="bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Delicious Meals
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                Browse menus from your favorite restaurants and get meals
                delivered right to your doorstep. Fast, easy, and delicious!
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 max-w-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
              </div>
              <Button className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Find Food
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  500+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restaurants
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  10k+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Meals Delivered
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  4.8★
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-100 lg:h-125">
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-red-200 dark:bg-red-900/20 rounded-full blur-3xl opacity-50"></div>

              {/* Main food image - Using Next.js Image */}
              <div className="relative z-10 h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                  alt="Delicious food"
                  fill
                  className="rounded-2xl shadow-2xl object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating card */}
              <div className="absolute bottom-8 left-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 z-20 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-linear-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    🍕
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Pizza Delivered!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      In 25 mins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
