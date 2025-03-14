import { db, Product } from "../data/database";

// Service to handle product-related operations
export const productService = {
  // Get all products
  getAllProducts: (): Product[] => {
    return db.getProducts();
  },

  // Get a product by ID
  getProductById: (id: string): Product | undefined => {
    return db.getProductById(id);
  },

  // Get products by category
  getProductsByCategory: (categoryId: string): Product[] => {
    return db.getProductsByCategory(categoryId);
  },

  // Search products
  searchProducts: (query: string): Product[] => {
    return db.searchProducts(query);
  },

  // Sort products
  sortProducts: (products: Product[], sortOption: string): Product[] => {
    return db.sortProducts(products, sortOption);
  },

  // Get featured products (example of a custom query)
  getFeaturedProducts: (limit: number = 4): Product[] => {
    // Get products with highest ratings
    return db
      .getProducts()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },

  // Get new arrivals (example of a custom query)
  getNewArrivals: (limit: number = 4): Product[] => {
    // Get most recently added products
    return db
      .getProducts()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit);
  },

  // Get related products (example of a custom query)
  getRelatedProducts: (productId: string, limit: number = 4): Product[] => {
    const product = db.getProductById(productId);
    if (!product) return [];

    // Get products in the same category, excluding the current product
    return db
      .getProducts()
      .filter((p) => p.category === product.category && p.id !== productId)
      .sort(() => Math.random() - 0.5) // Randomize the order
      .slice(0, limit);
  },
};
