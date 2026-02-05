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
