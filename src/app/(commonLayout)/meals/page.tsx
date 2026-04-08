import MealsSection from "@/components/modules/homepage/meals-section";

export interface PageProps {
  searchParams?: Promise<{
    cuisine?: string;
    dietaryPreferences?: string;
    price?: string;
  }>;
}

export default async function MealsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  return (
    <div className="bg-background">
      {/* Main Content */}
      <MealsSection searchParams={resolvedParams} />
    </div>
  );
}
