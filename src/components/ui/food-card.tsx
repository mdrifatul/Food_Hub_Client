"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { MealPost } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function FoodCard({ meal }: { meal: MealPost }) {
  const { title, price, imageUrl } = meal;
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!meal.id) {
      toast.error("Has no meal");
      return;
    }
    addItem(meal);
    toast.success(`${title} added to cart!`);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 ">
      <div className="relative h-48 w-full overflow-hidden">
        {imageUrl && (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-4">
        <div className="text-3xl font-bold text-primary">$ {price}</div>
        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-600/95"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 text-orange-500 dark:text-orange-700" />
        </Button>
      </CardFooter>
    </Card>
  );
}
