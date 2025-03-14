import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface CategoryFilterProps {
  categories?: {
    id: string;
    name: string;
  }[];
  onCategoryChange?: (categoryId: string) => void;
}

const CategoryFilter = ({
  categories = [
    { id: "all", name: "All Products" },
    { id: "phones", name: "Mobile Phones" },
    { id: "laptops", name: "Laptops" },
    { id: "tablets", name: "Tablets" },
    { id: "accessories", name: "Accessories" },
  ],
  onCategoryChange = () => {},
}: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="w-full bg-background border-b py-3 px-4 sticky top-[80px] z-10">
      <div className="max-w-7xl mx-auto">
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={handleCategoryChange}
        >
          <TabsList className="w-full sm:w-auto flex overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Mobile view - alternative display for very small screens */}
        <div className="md:hidden mt-2 flex overflow-x-auto hide-scrollbar gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
