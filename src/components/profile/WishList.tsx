import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { wishlistService } from "../../services/wishlistService";
import { cartService } from "../../services/cartService";
import { Product } from "../../data/database";

interface WishListProps {
  userId: string;
}

const WishList = ({ userId }: WishListProps) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const items = await wishlistService.getUserWishlist(userId);
        setWishlistItems(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await wishlistService.removeFromWishlist(userId, productId);
      setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = (productId: string) => {
    cartService.addToCart(productId, 1);
    // Optionally show a success message
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>Loading your wishlist...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>
          {wishlistItems.length} items in your wishlist
        </CardDescription>
      </CardHeader>
      <CardContent>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-4">
              Browse our products and add items to your wishlist
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium line-clamp-1">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WishList;
