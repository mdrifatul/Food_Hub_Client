export interface orderMeal {
  deliveryAddress: string;
  paymentMethod?: "COD" | "STRIPE";
  items: {
    mealId: string;
    quantity: number;
  }[];
}
