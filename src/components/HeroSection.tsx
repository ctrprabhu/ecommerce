import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Next-Gen Electronics",
  subtitle = "Discover the latest tech innovations with unbeatable deals on phones, laptops, and accessories.",
  ctaText = "Shop Now",
  onCtaClick = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
}: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gray-900 h-[500px] w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            {title}
          </h1>
          <p className="mt-4 text-xl text-gray-300">{subtitle}</p>
          <div className="mt-10">
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md text-lg font-medium transition-all"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  );
};

export default HeroSection;
