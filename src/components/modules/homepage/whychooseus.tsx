// components/sections/why-choose-section.tsx
import { Award, Clock, Heart, Shield, Utensils, Zap } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40 border-y border-border/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Grid Background for entire section */}
        <div className="absolute inset-x-0 -top-24 h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-16 space-y-3 relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-widest uppercase mb-1 border border-orange-200 dark:border-orange-500/20 shadow-xs">
            The FoodHub Advantage
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Why We Are The{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
              Clear Choice
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto pt-2 font-medium">
            We are committed to providing the ultimate food delivery experience
            with quality, speed, and premium convenience baked into every single
            order.
          </p>
        </div>

        {/* BENTO Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {/* Bento Block 1: Fast Delivery (Large Horizontal) */}
          <div className="md:col-span-2 group relative bg-white dark:bg-zinc-900/60 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-end min-h-60">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 translate-x-8 -translate-y-8">
              <Clock className="w-48 h-48 text-orange-500 pointer-events-none" />
            </div>

            {/* Glow Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-all duration-700 pointer-events-none"></div>

            <div className="relative z-10 w-full md:w-3/4 pt-8 md:pt-0">
              <div className="w-12 h-12 mb-5 rounded-xl bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground tracking-tight">
                Blazing Fast Delivery
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                Get your meals delivered piping hot in 30 minutes or less. Our
                advanced smart logistics network automatically maps the absolute
                fastest route to your doorstep, every single time.
              </p>
            </div>
          </div>

          {/* Bento Block 2: Safe & Hygienic (Vertical/Square) */}
          <div className="md:col-span-1 group relative bg-white dark:bg-zinc-900/60 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between min-h-60">
            <div className="absolute -right-6 -bottom-6 opacity-[0.08] dark:opacity-10 group-hover:opacity-[0.15] transition-all duration-500 group-hover:scale-110 pointer-events-none">
              <Shield className="w-32 h-32 text-cyan-500" />
            </div>
            <div className="w-12 h-12 mb-5 rounded-xl bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 text-white relative z-10">
              <Shield className="h-6 w-6" />
            </div>
            <div className="relative z-10 mt-auto pt-6">
              <h3 className="text-xl font-bold mb-2 text-foreground">
                100% Secure
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                All partner restaurants strictly follow top-tier hygiene
                protocols to guarantee perfectly safe packaging.
              </p>
            </div>
          </div>

          {/* Bento Block 3: Wide Variety (Square) */}
          <div className="md:col-span-1 group relative bg-white dark:bg-zinc-900/60 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-60 flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 mb-5 rounded-xl bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform duration-500 text-white">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Endless Variety
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                Choose from over 500+ top local restaurants and thousands of
                incredibly delicious meals.
              </p>
            </div>
          </div>

          {/* Bento Block 4: Quality Assured (Square Centered) */}
          <div className="md:col-span-1 group relative bg-white dark:bg-zinc-900/60 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 overflow-hidden text-center flex flex-col items-center justify-center min-h-60">
            <div className="absolute inset-0 bg-linear-to-b from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-linear-to-br from-rose-400 to-red-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-125 transition-transform duration-500 text-white">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Quality Assured
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium px-2">
                Rigorous culinary quality standards mean a perfect plate of food
                reaches you every time.
              </p>
            </div>
          </div>

          {/* Bento Block 5: Easy Ordering (Square Offset) */}
          <div className="md:col-span-1 group relative bg-white dark:bg-zinc-900/60 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-60">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="w-12 h-12 mb-5 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform duration-500 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Frictionless App
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                Our modern, sleek interface makes discovering and ordering food
                feel like absolute magic.
              </p>
            </div>
          </div>

          {/* Bento Block 6: Best Prices (Full Width Bottom Hero Banner) */}
          <div className="md:col-span-3 group relative bg-zinc-950 rounded-3xl p-6 md:p-10 hover:shadow-xl transition-all duration-700 border border-zinc-800 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-1 lg:mt-0">
            {/* Dynamic background effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(16,185,129,0.15),transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 md:w-2/3 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="inline-flex w-14 h-14 mb-5 rounded-xl bg-linear-to-br from-green-400 to-emerald-500 items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:rotate-360 transition-transform duration-1000 text-white mx-auto md:mx-0">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-white tracking-tight">
                Unbeatable Deals & Rewards
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl font-medium">
                Enjoy great deals, massive weekly discounts, zero hidden fees,
                and exclusive cashback offers on every single order. High tier
                food doesn't have to break your bank.
              </p>
            </div>

            {/* Spinning Widget */}
            <div className="relative z-10 shrink-0 select-none pointer-events-none mt-6 md:mt-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-zinc-900 flex items-center justify-center bg-zinc-950 shadow-xl relative">
                {/* Spinning Border Element */}
                <div className="absolute -inset-1.5 border-[6px] border-emerald-500/90 rounded-full border-t-transparent animate-[spin_4s_linear_infinite]"></div>
                <div className="text-center">
                  <span className="block text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-b from-emerald-300 to-emerald-600 drop-shadow-sm">
                    20%
                  </span>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-emerald-500 uppercase">
                    Cashback
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
