import { Loader2, UtensilsCrossed } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-6">
        {/* Logo or Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50 animate-pulse" />
          <UtensilsCrossed className="h-16 w-16 text-orange-500 relative animate-bounce" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
