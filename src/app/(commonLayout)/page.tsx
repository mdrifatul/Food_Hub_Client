import CTASection from "@/components/modules/homepage/cta-section";
import HeroSection from "@/components/modules/homepage/herosection";
import HowItWorksSection from "@/components/modules/homepage/howitworks";
import MealsSection from "@/components/modules/homepage/meals-section";
import PartnerSection from "@/components/modules/homepage/partnersection";
import WhyChooseSection from "@/components/modules/homepage/whychooseus";

import FAQSection from "@/components/modules/homepage/faq-section";

export interface MealsSectionProps {
  searchParams?: {
    cuisine?: string;
    dietaryPreferences?: string;
    price?: string;
  };
  limit?: number;
}
export default async function Home({ searchParams }: MealsSectionProps) {
  const resolvedParams = await searchParams;

  return (
    <div>
      <HeroSection />
      <MealsSection searchParams={resolvedParams} limit={8} />
      <HowItWorksSection />
      <WhyChooseSection />
      <FAQSection />
      <PartnerSection />
      <CTASection />
    </div>
  );
}
