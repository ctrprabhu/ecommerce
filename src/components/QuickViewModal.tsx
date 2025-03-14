import React from "react";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { Product as DatabaseProduct } from "../data/database";

interface QuickViewModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: DatabaseProduct;
  onAddToCart?: (id: string) => void;
}

const QuickViewModal = ({
  open = true,
  onOpenChange = () => {},
  product = {
    id: "1",
    name: "iPhone 13 Pro",
    price: 999.99,
    rating: 4.5,
    description:
      "The latest iPhone with pro camera system, A15 Bionic chip, and Super Retina XDR display with ProMotion.",
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Processor: "A15 Bionic chip",
      Camera: "Pro 12MP camera system",
      Battery: "Up to 22 hours video playback",
      Storage: "128GB, 256GB, 512GB, 1TB",
    },
    images: [
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=600&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
      "https://images.unsplash.com/photo-1565536421961-1f165e0c981e?w=600&q=80",
    ],
    inStock: true,
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=400&q=80",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  onAddToCart = () => {},
}: QuickViewModalProps) => {
  const [activeImage, setActiveImage] = React.useState(0);

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images Section */}
          <div className="bg-gray-50 p-6 flex flex-col">
            <div className="relative h-80 mb-4 bg-white rounded-md overflow-hidden">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${activeImage === index ? "border-blue-500" : "border-transparent"}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold">
                {product.name}
              </DialogTitle>
              <div className="flex items-center mt-2">
                <div className="flex">{renderStars()}</div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating})
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </DialogHeader>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-gray-700">{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-2 border-b border-gray-100 py-2"
                      >
                        <span className="font-medium text-gray-600">{key}</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ),
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col space-y-4 mt-auto pt-6">
              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={() => onAddToCart(product.id)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
