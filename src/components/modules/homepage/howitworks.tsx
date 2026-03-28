// components/sections/how-it-works-section.tsx
import { ArrowRight, MapPin, Search, ShoppingBag } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: MapPin,
    title: "Set Your Location",
    description:
      "Enter your address or let us locate you to show the best restaurants serving your exact area right now.",
    color: "text-orange-500 dark:text-orange-400",
    bgIcon: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-500/20",
  },
  {
    id: 2,
    icon: Search,
    title: "Choose the Food",
    description:
      "Browse hundreds of diverse menus, pick your craving, and customize your meals exactly the way you like them.",
    color: "text-rose-500 dark:text-rose-400",
    bgIcon: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/20",
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "Swift Delivery",
    description:
      "Checkout blazing fast and track your order in real-time until it arrives piping hot at your doorstep.",
    color: "text-emerald-500 dark:text-emerald-400",
    bgIcon: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-red-400/10 dark:bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-2 border border-orange-200 dark:border-orange-500/20 shadow-sm">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Get your meals in{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
              3 simple steps
            </span>
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            No complicated signups or endless waiting. Just a few taps and your
            favorite food is on its way to you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Animated Connecting SVG Line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] z-0">
            <div className="w-full border-t-2 border-dashed border-zinc-300 dark:border-zinc-800"></div>
          </div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group"
            >
              {/* Step indicator */}
              <div className="mb-10 relative transition-transform duration-500 group-hover:-translate-y-2">
                <div
                  className={`w-28 h-28 rounded-[2rem] -rotate-6 bg-white dark:bg-zinc-950 shadow-xl flex items-center justify-center border ${step.border} group-hover:rotate-0 transition-transform duration-500 z-10 relative`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.bgIcon} flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-500`}
                  >
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-4 border-zinc-50 dark:border-zinc-950 flex items-center justify-center font-bold text-sm shadow-md z-20">
                  {step.id}
                </div>
              </div>

              {/* Card Content Text */}
              <div className="text-center bg-white dark:bg-zinc-900/40 p-6 sm:p-8 rounded-3xl shadow-xs border border-zinc-200 dark:border-zinc-800 w-full h-full relative overflow-hidden group-hover:shadow-md group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all duration-300">
                {/* Subtle top gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-orange-400/40 to-red-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>

              {/* Mobile Only Arrow */}
              {index !== 2 && (
                <ArrowRight className="w-6 h-6 text-zinc-300 dark:text-zinc-700 mt-8 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
