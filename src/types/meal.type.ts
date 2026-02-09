export interface MealPost {
  id: string;
  title: string;
  price: number;
  authorId: string;
  cuisine: string;
  dietaryPreferences?: string[] | undefined;
  categoryId?: string | null;
  imageUrl: string | null;
  isAvailable: boolean;
}

export interface createMeal {
  title: string;
  price: number;
  cuisine: string;
  dietaryPreferences?: string[] | undefined;
  imageUrl?: string | undefined;
  isAvailable?: boolean | undefined;
}
