import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Smartphone, Laptop, Tablet, Package, Grid } from "lucide-react";

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

  // Get icon based on category ID
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "phones":
        return <Smartphone className="h-4 w-4 mr-2" />;
      case "laptops":
        return <Laptop className="h-4 w-4 mr-2" />;
      case "tablets":
        return <Tablet className="h-4 w-4 mr-2" />;
      case "accessories":
        return <Package className="h-4 w-4 mr-2" />;
      case "all":
      default:
        return <Grid className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-b py-4 px-4 sticky top-[80px] z-10 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={handleCategoryChange}
          className="w-full"
        >
          <TabsList className="w-full sm:w-auto flex overflow-x-auto hide-scrollbar bg-white/80 backdrop-blur-sm p-1 rounded-xl">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 whitespace-nowrap rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <div className="flex items-center">
                  {getCategoryIcon(category.id)}
                  {category.name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Mobile view - alternative display for very small screens */}
        <div className="md:hidden mt-3 flex overflow-x-auto hide-scrollbar gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              className={`whitespace-nowrap rounded-full flex items-center ${activeCategory === category.id ? "bg-primary shadow-md" : "bg-white/80 backdrop-blur-sm"}`}
            >
              {getCategoryIcon(category.id)}
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
