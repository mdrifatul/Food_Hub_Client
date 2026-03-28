// components/sections/partner-section.tsx
import {
  BarChart,
  DollarSign,
  Headphones,
  Smartphone,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const partnerBenefits = [
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Reach thousands of hungry customers actively looking for food.",
  },
  {
    icon: Users,
    title: "Expand Customer Base",
    description: "Connect with new customers beyond your local neighborhood area.",
  },
  {
    icon: DollarSign,
    title: "Increase Revenue",
    description: "Boost your sales with our massive and highly active user base.",
  },
  {
    icon: BarChart,
    title: "Business Analytics",
    description: "Track orders, earnings, and performance with detailed insights.",
  },
  {
    icon: Smartphone,
    title: "Easy Management",
    description: "Manage orders and your menu from anywhere with our provider app.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get 24/7 priority support from our partner success team.",
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
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block py-1.5 px-5 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-widest uppercase border border-orange-200 dark:border-orange-500/20 shadow-xs">
            For Restaurants
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Partner with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
              FoodHub
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto pt-2 font-medium">
            Join hundreds of successful restaurants and multiply your daily revenue with Bangladesh's fastest-growing food delivery network.
          </p>
        </div>

        {/* Core Partnership Hero Block - Massive split container */}
        <div className="relative w-full rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl mb-20 overflow-hidden flex flex-col lg:flex-row group">
           
           {/* Left Dark Content */}
           <div className="relative z-10 w-full lg:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.15),transparent_60%)] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Get your food in front of <span className="text-orange-500">thousands</span> of hungry locals.
              </h3>
              <p className="text-zinc-400 text-base md:text-lg mb-10 leading-relaxed font-medium">
                Take your restaurant to the next level. We handle the logistics, customer support, and technology—you just keep cooking amazing food.
              </p>
              
              <div className="flex items-center gap-4">
                 <button className="flex items-center justify-center gap-2 bg-linear-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-300">
                   Become a Partner <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
           </div>

           {/* Right Image Content */}
           <div className="relative w-full lg:w-1/2 min-h-100 lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                alt="Restaurant partner cooking"
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/20 to-transparent lg:block hidden"></div>
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent lg:hidden block"></div>
              
              {/* Floating Sales Dashboard Widget */}
              <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl w-64 md:w-72 hidden sm:block">
                 <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Today's Sales</p>
                      <p className="text-2xl font-black text-white tracking-tight">৳ 18,450</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                       <TrendingUp className="text-emerald-400 w-6 h-6" />
                    </div>
                 </div>
                 <div className="space-y-2">
                     <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Daily Target</span>
                        <span className="text-emerald-400">+24%</span>
                     </div>
                     <div className="h-2 w-full bg-zinc-950/50 rounded-full overflow-hidden">
                       <div className="h-full bg-linear-to-r from-emerald-400 to-emerald-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                     </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Benefits Section Label */}
        <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Why Restaurants Transition to Us</h3>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
           {partnerBenefits.map((benefit, index) => (
             <div key={index} className="group bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-100 dark:border-orange-500/20 mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                   <benefit.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">{benefit.description}</p>
             </div>
           ))}
        </div>

        {/* Minimal High-Impact Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-zinc-200 dark:divide-zinc-800/60">
           {stats.map((stat, index) => (
             <div key={index} className="text-center md:px-4 group cursor-default">
               <p className="text-4xl md:text-5xl lg:text-6xl font-black bg-linear-to-b from-orange-400 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                 {stat.value}
               </p>
               <p className="text-xs md:text-sm font-bold tracking-widest text-muted-foreground uppercase">
                 {stat.label}
               </p>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
