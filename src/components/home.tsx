import React, { useState, useEffect } from "react";
import Header from "./Header";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import SortOptions from "./SortOptions";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";
import CartDrawer from "./CartDrawer";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import PromoSection from "./PromoSection";
import Footer from "./Footer";
import { productService } from "../services/productService";
import { cartService } from "../services/cartService";
import { categoryService } from "../services/categoryService";
import { Product } from "../data/database";

const Home = () => {
  // State for category, brand, and sorting
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [showAllProducts, setShowAllProducts] = useState(false);

  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // State for modals and drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Load products on component mount
  useEffect(() => {
    const allProducts = productService.getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(productService.sortProducts(allProducts, sortOption));
    setFeaturedProducts(productService.getFeaturedProducts(4));
    updateCartState();
  }, []);

  // Update filtered products when category, brand, or sort option changes
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = productService.getProductsByCategory(selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    filtered = productService.sortProducts(filtered, sortOption);
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, sortOption, products]);

  // Update cart items when cart changes
  const updateCartState = () => {
    setCartItemCount(cartService.getCartItemCount());
    setCartItems(
      cartService.getCartItems().map((item) => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      })),
    );
  };

  // Handlers for user interactions
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === "all" ? "" : categoryId);
    setShowAllProducts(true);
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    setShowAllProducts(true);
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
    updateCartState();
    setIsCartOpen(true);
  };

  const handleUpdateCartItem = (id: string, quantity: number) => {
    if (quantity <= 0) {
      cartService.removeFromCart(id);
    } else {
      cartService.updateCartItem(id, quantity);
    }
    updateCartState();
  };

  const handleRemoveFromCart = (id: string) => {
    cartService.removeFromCart(id);
    updateCartState();
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
      setShowAllProducts(true);
    }
  };

  const handleShopNow = () => {
    setShowAllProducts(true);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handleViewAllProducts = () => {
    setShowAllProducts(true);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        onCartClick={handleCartClick}
        cartItemCount={cartItemCount}
        onSearchSubmit={handleSearchSubmit}
      />

      {!showAllProducts ? (
        <>
          {/* Hero Section */}
          <HeroSection onCtaClick={handleShopNow} />

          {/* Featured Products */}
          <FeaturedProducts
            products={featuredProducts}
            onViewAll={handleViewAllProducts}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
          />

          {/* Promo Section */}
          <PromoSection onCtaClick={handleViewAllProducts} />
        </>
      ) : (
        <>
          {/* Category Filter */}
          <CategoryFilter
            categories={categoryService.getAllCategories()}
            onCategoryChange={handleCategoryChange}
          />

          {/* Brand Filter */}
          <BrandFilter
            brands={productService.getAllBrands()}
            onBrandChange={handleBrandChange}
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
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
        product={selectedProduct || undefined}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        onUpdateQuantity={handleUpdateCartItem}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
};

export default Home;
