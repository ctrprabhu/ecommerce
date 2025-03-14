import { db, Product } from "../data/database";

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string; // "processing", "shipped", "delivered", "cancelled"
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

// Service to handle order-related operations
export const orderService = {
  // Get all orders for a user
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      return db.getUserOrders(userId);
    } catch (error) {
      console.error("Error getting user orders:", error);
      return [];
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      return db.getOrderById(orderId);
    } catch (error) {
      console.error("Error getting order:", error);
      return null;
    }
  },

  // Create a new order
  createOrder: async (
    userId: string,
    items: { productId: string; quantity: number }[],
    shippingAddress: string,
    paymentMethod: string,
  ): Promise<Order | null> => {
    try {
      return db.createOrder(userId, items, shippingAddress, paymentMethod);
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: string): Promise<boolean> => {
    try {
      return db.updateOrderStatus(orderId, "cancelled");
    } catch (error) {
      console.error("Error cancelling order:", error);
      return false;
    }
  },
};
