import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  rating?: number;
  image?: string;
  brand?: string;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "iPhone 13 Pro",
  price = 999.99,
  rating = 4.5,
  image = "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=400&q=80",
  brand = "Apple",
  onQuickView = () => {},
  onAddToCart = () => {},
}: ProductCardProps) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        // This is a simplified half star (just using a different color)
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => onQuickView(id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium line-clamp-1">
            {name}
          </CardTitle>
          <Badge variant="outline" className="text-xs bg-gray-50">
            {brand}
          </Badge>
        </div>
        <div className="flex items-center mt-1">
          <div className="flex">{renderStars()}</div>
          <span className="text-sm text-gray-500 ml-1">({rating})</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="font-bold text-lg">${price.toFixed(2)}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => {
            onAddToCart(id);
            setIsAddedToCart(true);
            setTimeout(() => setIsAddedToCart(false), 2000);
          }}
        >
          {isAddedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
