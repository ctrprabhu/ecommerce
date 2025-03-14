import { db, CartItem, Product } from "../data/database";

// Type for cart items with product details
export interface CartItemWithProduct extends CartItem {
  product: Product;
}

// Service to handle cart-related operations
export const cartService = {
  // Get all cart items with product details
  getCartItems: (): CartItemWithProduct[] => {
    const items = db.getCartItems();
    return items.map((item) => {
      const product = db.getProductById(item.productId);
      return {
        ...item,
        product: product as Product,
      };
    });
  },

  // Add a product to the cart
  addToCart: (productId: string, quantity: number = 1): CartItem | null => {
    return db.addToCart(productId, quantity);
  },

  // Update a cart item quantity
  updateCartItem: (id: string, quantity: number): CartItem | null => {
    return db.updateCartItem(id, quantity);
  },

  // Remove an item from the cart
  removeFromCart: (id: string): CartItem | null => {
    return db.removeFromCart(id);
  },

  // Clear the cart
  clearCart: (): boolean => {
    return db.clearCart();
  },

  // Get cart total
  getCartTotal: (): number => {
    return db.getCartTotal();
  },

  // Get cart item count
  getCartItemCount: (): number => {
    const items = db.getCartItems();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
};
