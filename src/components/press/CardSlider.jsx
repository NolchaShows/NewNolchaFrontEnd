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
    <section className="w-full bg-[#EEEEEE] px-5 py-8 lg:px-11 lg:py-20">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-x-0 gap-y-6 md:grid-cols-2 md:gap-y-8 xl:grid-cols-4 xl:gap-y-20">
          {cards.map((card, index) => (
            <div
              key={card.id || index}
              className="border-r-0 px-0 md:border-r md:border-[#1D1D1D] md:px-3 md:[&:nth-child(2n):not(:last-child)]:border-r-0 xl:[&:nth-child(2n):not(:last-child)]:border-r xl:[&:nth-child(4n):not(:last-child)]:border-r-0 last:!border-r-0 hover:[&_.press-card-blur-target]:blur-[16px] focus-within:[&_.press-card-blur-target]:blur-[16px]"
            >
              <div className="group">
                <Card
                  newsPaper={card.newsPaper}
                  image={card.image}
                  title={card.title}
                  link={card.link}
                  dateLabel={card.date || card.dateLabel || ""}
                  variant="modern"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSlider;
