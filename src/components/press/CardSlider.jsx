import React from "react";
import Card from "./Card";

const CardSlider = ({ cards = [], loading }) => {

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
    <div className="w-full bg-black text-white page-container">
      {/* Mobile Slider */}
      <div className="block md:hidden">
        <div className="relative overflow-hidden py-5">
          <div
            className="flex transition-transform duration-300 ease-in-out"
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
      </div>

      {/* Desktop Grid - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-none mx-auto">
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
