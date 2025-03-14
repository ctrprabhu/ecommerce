import React, { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Star, Clock, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

export interface SortOptionsProps {
  onSortChange?: (sortOption: string) => void;
  className?: string;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  onSortChange = () => {},
  className = "",
}) => {
  const [activeSort, setActiveSort] = useState<string>("popularity");

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    onSortChange(value);
  };

  return (
    <div
      className={`flex items-center justify-end space-x-2 bg-white p-2 ${className}`}
    >
      <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>

      <Select value={activeSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="price-low">
              <div className="flex items-center">
                <ArrowDownAZ className="mr-2 h-4 w-4" />
                <span>Price: Low to High</span>
              </div>
            </SelectItem>
            <SelectItem value="price-high">
              <div className="flex items-center">
                <ArrowUpAZ className="mr-2 h-4 w-4" />
                <span>Price: High to Low</span>
              </div>
            </SelectItem>
            <SelectItem value="popularity">
              <div className="flex items-center">
                <Star className="mr-2 h-4 w-4" />
                <span>Popularity</span>
              </div>
            </SelectItem>
            <SelectItem value="newest">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Newest</span>
              </div>
            </SelectItem>
            <SelectItem value="brand">
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                <span>Brand</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="hidden sm:flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className={activeSort === "price-low" ? "bg-primary/10" : ""}
          onClick={() => handleSortChange("price-low")}
        >
          <ArrowDownAZ className="mr-2 h-4 w-4" />
          Price: Low to High
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={activeSort === "price-high" ? "bg-primary/10" : ""}
          onClick={() => handleSortChange("price-high")}
        >
          <ArrowUpAZ className="mr-2 h-4 w-4" />
          Price: High to Low
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={activeSort === "popularity" ? "bg-primary/10" : ""}
          onClick={() => handleSortChange("popularity")}
        >
          <Star className="mr-2 h-4 w-4" />
          Popularity
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={activeSort === "newest" ? "bg-primary/10" : ""}
          onClick={() => handleSortChange("newest")}
        >
          <Clock className="mr-2 h-4 w-4" />
          Newest
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={activeSort === "brand" ? "bg-primary/10" : ""}
          onClick={() => handleSortChange("brand")}
        >
          <Tag className="mr-2 h-4 w-4" />
          Brand
        </Button>
      </div>
    </div>
  );
};

export default SortOptions;
