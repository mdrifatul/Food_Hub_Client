// components/sections/hero-section.tsx
import { Bike, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function HeroSection() {
  return (
    <section className="relative min-h-150 lg:min-h-screen flex items-center py-20 lg:py-0 overflow-hidden bg-background">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 w-full h-200 opacity-40 dark:opacity-20 pointer-events-none flex justify-center">
        <div className="absolute top-[10%] -left-[10%] lg:left-[10%] w-75 h-75 bg-orange-400/30 rounded-full blur-[100px] mix-blend-multiply flex-none" />
        <div className="absolute top-[20%] -right-[10%] lg:right-[10%] w-100 h-100 bg-red-400/20 rounded-full blur-[120px] mix-blend-multiply flex-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <ScrollReveal direction="right" className="space-y-8 relative z-10 w-full max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-2 w-fit mx-auto lg:mx-0 shadow-sm">
              <Bike className="w-4 h-4" />
              <span>Lightning Fast Delivery in 20 mins!</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              The Ultimate
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500 pb-2">
                {" "}
                FoodHub{" "}
              </span>
              Experience
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium">
              Satisfy your cravings with FoodHub. Discover top-tier local
              restaurants, explore diverse menus, and get your favorite meals
              delivered blazing fast.
            </p>
          </ScrollReveal>

          {/* Right Content - Visuals */}
          <ScrollReveal direction="left" delay={0.2} className="relative mt-16 lg:mt-0 lg:h-150 flex items-center justify-center pointer-events-none">
            {/* Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-85 h-85 md:w-120 md:h-120 border-2 border-dashed border-orange-200 dark:border-orange-900/40 rounded-full animate-[spin_60s_linear_infinite]" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 h-70 md:w-100 md:h-100 bg-orange-50/80 dark:bg-orange-500/5 rounded-full" />

            {/* Main Center Image */}
            <div className="relative z-20 w-65 h-65 md:w-90 md:h-90 rounded-full p-2 bg-background shadow-2xl overflow-hidden drop-shadow-xl pointer-events-auto group">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000"
                  alt="Healthy Food Bowl"
                  fill
                  className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Floating Element 1 - Top Right */}
            <div
              className="absolute z-30 top-[5%] -right-2 md:right-4 lg:right-0 bg-background border shadow-xl rounded-2xl p-3 flex items-center gap-3 animate-bounce shadow-orange-500/10 pointer-events-auto"
              style={{ animationDuration: "4s" }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden relative shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200"
                  alt="Burger"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pr-2">
                <p className="text-sm font-bold text-foreground">
                  Gourmet Burger
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  Top Choice 🔥
                </p>
              </div>
            </div>

            {/* Floating Element 2 - Bottom Left */}
            <div
              className="absolute z-30 bottom-[10%] -left-2 md:left-4 lg:-left-4 bg-background border shadow-xl rounded-2xl py-3 px-5 flex items-center gap-3 animate-bounce shadow-orange-500/10 pointer-events-auto"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-foreground">
                  Delivery Arrived
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  Enjoy your meal!
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
