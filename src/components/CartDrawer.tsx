import React from "react";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Badge } from "./ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  items?: CartItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onCheckout?: () => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const CartDrawer = ({
  items = [
    {
      id: "1",
      name: "iPhone 13 Pro",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&q=75",
      quantity: 1,
    },
    {
      id: "2",
      name: "MacBook Air M2",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=75",
      quantity: 1,
    },
    {
      id: "3",
      name: "AirPods Pro",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=75",
      quantity: 2,
    },
  ],
  isOpen = false,
  onClose = () => {},
  onCheckout = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
}: CartDrawerProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    onUpdateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    onUpdateQuantity(id, currentQuantity - 1);
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="relative p-2 bg-white">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Your Cart ({totalItems} items)</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto max-h-[60vh]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <Button className="mt-4" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          handleDecreaseQuantity(item.id, item.quantity)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          handleIncreaseQuantity(item.id, item.quantity)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 h-7 w-7"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="px-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">
                  ${(subtotal * 0.08).toFixed(2)}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  ${(subtotal + subtotal * 0.08).toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

        <DrawerFooter>
          <Button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Checkout
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
