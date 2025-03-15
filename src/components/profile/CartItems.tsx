import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { cartService } from "../../services/cartService";
import { productService } from "../../services/productService";
import { CartItem } from "../../data/database";

interface CartItemsProps {
  userId: string;
}

interface CartItemWithProduct extends CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
  };
}

const CartItems = ({ userId }: CartItemsProps) => {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const items = cartService.getCartItems();

        // Enhance cart items with product details
        const enhancedItems = items.map((item) => {
          const product = productService.getProductById(item.productId);
          return {
            ...item,
            product: {
              id: product?.id || "",
              name: product?.name || "Product not found",
              price: product?.price || 0,
              image: product?.image || "",
              brand: product?.brand || "",
            },
          };
        });

        setCartItems(enhancedItems);
        setCartTotal(cartService.getCartTotal());
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleRemoveFromCart = (itemId: string) => {
    cartService.removeFromCart(itemId);
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    setCartTotal(cartService.getCartTotal());
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    cartService.updateCartItem(itemId, newQuantity);
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
    setCartTotal(cartService.getCartTotal());
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert("Proceeding to checkout...");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Cart</CardTitle>
          <CardDescription>Loading your cart...</CardDescription>
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
        <CardTitle>My Cart</CardTitle>
        <CardDescription>{cartItems.length} items in your cart</CardDescription>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">
              Browse our products and add items to your cart
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden mr-4 mb-3 sm:mb-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center mt-3 sm:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-3 font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2 text-red-500"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartItems;
