import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

const CardSlider = ({ cards = [], loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = cards.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading cards...
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        No cards to display
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Slider */}
      <div className="block md:hidden">
        <div className="relative overflow-hidden py-5">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div key={card.id || index} className="w-full flex-shrink-0 px-2">
                <Card
                  newsPaper={card.newsPaper}
                  image={card.image}
                  title={card.title}
                  link={card.link}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Centered at bottom */}
        <div className="flex justify-center items-center gap-4 pb-6">
          <button onClick={prevSlide} disabled={currentSlide === 0}>
            <img
              src="/left_dark.png"
              className="w-12 h-12 text-gray-600 cursor-pointer"
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            <img
              src="/right_dark.png"
              className="w-12 h-12 text-gray-600 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Desktop Grid - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[40px] xl:gap-[60px] 2xl:gap-[80px] max-w-none mx-auto">
          {cards.map((card, index) => (
            <Card
              key={card.id || index}
              newsPaper={card.newsPaper}
              image={card.image}
              title={card.title}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
