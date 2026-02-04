import HeroSection from "@/components/modules/homepage/herosection";
import HowItWorksSection from "@/components/modules/homepage/howitworks";
import MealsSection from "@/components/modules/homepage/meals-section";
import PartnerSection from "@/components/modules/homepage/partnersection";
import WhyChooseSection from "@/components/modules/homepage/whychooseus";
import { FoodCard } from "@/components/ui/food-card";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MealsSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <PartnerSection />
      <FoodCard />
    </div>
  );
}
