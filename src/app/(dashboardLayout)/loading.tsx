import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 dark:bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Complex Animated Rings Container */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer glowing spin ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-t-orange-500 border-r-orange-500 border-b-transparent border-l-transparent animate-spin opacity-80"></div>

          {/* Inner secondary glowing spin ring */}
          <div className="absolute inset-2 rounded-full border-[3px] border-b-red-500 border-l-red-500 border-t-transparent border-r-transparent animate-pulse opacity-80"></div>

          {/* Expansion ping ring */}
          <div className="absolute inset-6 rounded-full bg-orange-500/20 animate-ping"></div>

          {/* Central Logo Box */}
          <div className="relative w-16 h-16 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <UtensilsCrossed className="w-8 h-8 text-orange-500 relative z-10 animate-bounce" />
          </div>
        </div>

        {/* Elegant Typography */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <h3 className="text-2xl font-black tracking-[0.25em] flex items-center gap-1 ml-2">
            <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              FOODHUB
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-red-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
