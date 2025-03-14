import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Laptop, Tag } from "lucide-react";

interface BrandFilterProps {
  brands?: {
    id: string;
    name: string;
  }[];
  onBrandChange?: (brandId: string) => void;
}

const BrandFilter = ({
  brands = [
    { id: "all", name: "All Brands" },
    { id: "apple", name: "Apple" },
    { id: "samsung", name: "Samsung" },
    { id: "dell", name: "Dell" },
    { id: "hp", name: "HP" },
  ],
  onBrandChange = () => {},
}: BrandFilterProps) => {
  const [activeBrand, setActiveBrand] = useState("all");

  const handleBrandChange = (brandId: string) => {
    setActiveBrand(brandId);
    onBrandChange(brandId === "all" ? "" : brandId);
  };

  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50 border-b py-4 px-4 sticky top-[140px] z-10 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <Tabs
          defaultValue="all"
          value={activeBrand}
          onValueChange={handleBrandChange}
          className="w-full"
        >
          <TabsList className="w-full sm:w-auto flex overflow-x-auto hide-scrollbar bg-white/80 backdrop-blur-sm p-1 rounded-xl">
            {brands.map((brand) => (
              <TabsTrigger
                key={brand.id}
                value={brand.id}
                className="px-4 py-2 whitespace-nowrap rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  {brand.name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Mobile view - alternative display for very small screens */}
        <div className="md:hidden mt-3 flex overflow-x-auto hide-scrollbar gap-2">
          {brands.map((brand) => (
            <Button
              key={brand.id}
              variant={activeBrand === brand.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleBrandChange(brand.id)}
              className={`whitespace-nowrap rounded-full flex items-center ${activeBrand === brand.id ? "bg-primary shadow-md" : "bg-white/80 backdrop-blur-sm"}`}
            >
              <Tag className="h-4 w-4 mr-2" />
              {brand.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
