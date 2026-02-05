"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";

interface MealsFiltersProps {
  cuisines: string[];
  dietaryOptions: string[];
  selectedCuisine?: string;
  selectedDietary?: string;
  selectedPrice?: string;
}

export default function MealsFilters({
  cuisines,
  dietaryOptions,
  selectedCuisine,
  selectedDietary,
  selectedPrice,
}: MealsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div>
        <label className="block text-sm font-medium mb-3">Cuisine</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {selectedCuisine || "All Cuisines"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={selectedCuisine || ""}
              onValueChange={(value) => updateFilter("cuisine", value)}
            >
              <DropdownMenuRadioItem value="">
                All Cuisines
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              {cuisines.map((cuisine) => (
                <DropdownMenuRadioItem key={cuisine} value={cuisine}>
                  {cuisine}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          Dietary Preferences
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {selectedDietary || "All Options"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={selectedDietary || ""}
              onValueChange={(value) =>
                updateFilter("dietaryPreferences", value)
              }
            >
              <DropdownMenuRadioItem value="">
                All Options
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              {dietaryOptions.map((dietary) => (
                <DropdownMenuRadioItem key={dietary} value={dietary}>
                  <span className="capitalize">{dietary}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Price Range</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {selectedPrice ? `$${selectedPrice}` : "All Prices"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={selectedPrice || ""}
              onValueChange={(value) => updateFilter("price", value)}
            >
              <DropdownMenuRadioItem value="">All Prices</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="0-100">
                $0 - $100
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="101-500">
                $101 - $500
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="501-1000">
                $501 - $1000
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="1001+">
                $1001+
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
