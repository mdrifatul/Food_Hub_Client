import HeroSection from "@/components/modules/homepage/herosection";
import HowItWorksSection from "@/components/modules/homepage/howitworks";
import MealsSection from "@/components/modules/homepage/meals-section";
import PartnerSection from "@/components/modules/homepage/partnersection";
import WhyChooseSection from "@/components/modules/homepage/whychooseus";

export interface MealsSectionProps {
  searchParams?: {
    cuisine?: string;
    dietaryPreferences?: string;
    price?: string;
  };
}
export default async function Home({ searchParams }: MealsSectionProps) {
  const resolvedParams = await searchParams;

  return (
    <div>
      <HeroSection />
      <MealsSection searchParams={resolvedParams} />
      <HowItWorksSection />
      <WhyChooseSection />
      <PartnerSection />
    </div>
  );
}
