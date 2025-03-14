import { db, Category } from "../data/database";

// Service to handle category-related operations
export const categoryService = {
  // Get all categories
  getAllCategories: (): Category[] => {
    return db.getCategories();
  },

  // Get a category by ID
  getCategoryById: (id: string): Category | undefined => {
    return db.getCategoryById(id);
  },
};
