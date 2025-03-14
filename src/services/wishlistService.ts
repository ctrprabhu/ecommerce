import { db, Product } from "../data/database";

// Service to handle wishlist-related operations
export const wishlistService = {
  // Get user's wishlist
  getUserWishlist: async (userId: string): Promise<Product[]> => {
    try {
      return db.getUserWishlist(userId);
    } catch (error) {
      console.error("Error getting wishlist:", error);
      return [];
    }
  },

  // Add product to wishlist
  addToWishlist: async (
    userId: string,
    productId: string,
  ): Promise<boolean> => {
    try {
      return db.addToWishlist(userId, productId);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (
    userId: string,
    productId: string,
  ): Promise<boolean> => {
    try {
      return db.removeFromWishlist(userId, productId);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return false;
    }
  },

  // Check if product is in wishlist
  isInWishlist: async (userId: string, productId: string): Promise<boolean> => {
    try {
      return db.isInWishlist(userId, productId);
    } catch (error) {
      console.error("Error checking wishlist:", error);
      return false;
    }
  },
};
