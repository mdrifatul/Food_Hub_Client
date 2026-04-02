"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { MealPost } from "@/types";
import { Leaf, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function FoodCard({ meal }: { meal: MealPost }) {
  const { title, price, imageUrl, cuisine, dietaryPreferences, isAvailable } =
    meal;
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!meal.id) {
      toast.error("Meal configuration error.");
      return;
    }
    if (isAvailable === false) {
      toast.error("Sorry, this meal is currently unavailable.");
      return;
    }
    addItem(meal);
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="group relative w-full max-w-[320px] rounded-[2rem] bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full mx-auto">
      {/* Image Container with hover zoom */}
      <div className="relative h-55 w-full rounded-[1.5rem] overflow-hidden mb-5 border border-zinc-100 dark:border-zinc-800/80">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || "Meal Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-400 text-sm font-medium">
              No Image Available
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Availability badge */}
        {isAvailable === false && (
          <div className="absolute top-3 right-3 bg-red-500/95 backdrop-blur-xl px-3 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase text-white shadow-lg border border-red-400/20">
            Unavailable
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-2 flex flex-col grow">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-1 tracking-tight group-hover:text-orange-500 transition-colors duration-300">
          {title}
        </h3>

        {/* Dietary Tags */}
        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {dietaryPreferences &&
            dietaryPreferences.map((diet, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-500/10 px-2 shrink-0 py-1 rounded-md"
              >
                <Leaf className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-20">{diet}</span>
              </span>
            ))}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-4 mt-2">
          <div className="flex flex-col shrink-0 max-w-[60%]">
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">
              Price
            </span>
            <span className="text-2xl font-black text-foreground truncate">
              ${price.toLocaleString()}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isAvailable === false}
            className="shrink-0 w-12 h-12 rounded-3xl bg-zinc-950 dark:bg-white dark:text-black hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden relative transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <ShoppingCart className="w-5 h-5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
