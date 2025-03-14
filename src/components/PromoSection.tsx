import React from "react";
import { Button } from "./ui/button";

interface PromoSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  image?: string;
  backgroundColor?: string;
}

const PromoSection = ({
  title = "Special Offer",
  description = "Get 20% off on all accessories when you buy any smartphone or laptop.",
  ctaText = "Shop Deals",
  onCtaClick = () => {},
  image = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
  backgroundColor = "bg-blue-50",
}: PromoSectionProps) => {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
          <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h2>
            <p className="mt-4 text-lg text-blue-100">{description}</p>
            <Button
              onClick={onCtaClick}
              className="mt-8 bg-white text-blue-700 hover:bg-blue-50"
              size="lg"
            >
              {ctaText}
            </Button>
          </div>
          <div className="md:w-1/2">
            <img
              src={image}
              alt="Promotional offer"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
