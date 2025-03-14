import React, { useState, useEffect } from "react";
import Header from "./Header";
import CategoryFilter from "./CategoryFilter";
import SortOptions from "./SortOptions";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";
import CartDrawer from "./CartDrawer";
import { productService } from "../services/productService";
import { cartService } from "../services/cartService";
import { categoryService } from "../services/categoryService";
import { Product } from "../data/database";

const Home = () => {
  // State for category and sorting
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("popularity");

  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // State for modals and drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load products on component mount
  useEffect(() => {
    const allProducts = productService.getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(productService.sortProducts(allProducts, sortOption));
    setCartItemCount(cartService.getCartItemCount());
  }, []);

  // Update filtered products when category or sort option changes
  useEffect(() => {
    let filtered = selectedCategory
      ? productService.getProductsByCategory(selectedCategory)
      : products;

    filtered = productService.sortProducts(filtered, sortOption);
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption, products]);

  // Handlers for user interactions
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === "all" ? "" : categoryId);
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  const handleQuickView = (productId: string) => {
    const product = productService.getProductById(productId);
    if (product) {
      setSelectedProduct(product);
      setIsQuickViewOpen(true);
    }
  };

  const handleAddToCart = (productId: string) => {
    cartService.addToCart(productId, 1);
    setCartItemCount(cartService.getCartItemCount());
    setIsCartOpen(true);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // In a real app, this would navigate to the checkout page
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const searchResults = productService.searchProducts(query);
      setFilteredProducts(searchResults);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        onCartClick={handleCartClick}
        cartItemCount={cartItemCount}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={categoryService.getAllCategories()}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Sort Options */}
        <div className="mb-6">
          <SortOptions onSortChange={handleSortChange} />
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          sortOption={sortOption}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
        product={selectedProduct || undefined}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        items={cartService.getCartItems().map((item) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
        }))}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Home;
