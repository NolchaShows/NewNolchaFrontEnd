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
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-x-0 md:gap-y-8 md:overflow-visible md:pb-0 md:snap-none xl:grid-cols-4 xl:gap-y-20">
          {cards.map((card, index) => (
            <div
              key={card.id || index}
              className="w-[min(88vw,340px)] shrink-0 snap-start border-r border-[#1D1D1D] pr-4 last:border-r-0 last:pr-0 md:w-auto md:shrink md:border-r md:pr-0 md:[&:nth-child(2n):not(:last-child)]:border-r-0 xl:[&:nth-child(2n):not(:last-child)]:border-r xl:[&:nth-child(4n):not(:last-child)]:border-r-0 last:!border-r-0 hover:[&_.press-card-blur-target]:blur-[16px] focus-within:[&_.press-card-blur-target]:blur-[16px]"
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
