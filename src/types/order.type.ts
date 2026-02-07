export interface orderMeal {
  deliveryAddress: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}
