import React from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "../data/database";

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onViewAll?: () => void;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

const FeaturedProducts = ({
  title = "Featured Products",
  subtitle = "Discover our most popular electronics handpicked for you",
  products = [],
  onViewAll = () => {},
  onQuickView = () => {},
  onAddToCart = () => {},
}: FeaturedProductsProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
          </div>
          <button
            onClick={onViewAll}
            className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                image={product.image}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
