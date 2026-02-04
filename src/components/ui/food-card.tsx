import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FoodCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden"></div>

      <CardHeader>
        <CardTitle className="text-2xl">Delicious Pizza</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Fresh mozzarella, tomatoes, and basil on a crispy crust
        </p>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold text-primary">$12.99</div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md"
          size="lg"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
