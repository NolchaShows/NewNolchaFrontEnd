import React from "react";
import Card from "./Card";

const CardSlider = ({ cards = [], loading, variant = "legacy" }) => {
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

  if (variant === "modern") {
    return (
      <section className="w-full bg-[#EEEEEE] px-5 py-8 lg:px-11 lg:py-20">
        <div className="block overflow-x-auto lg:hidden">
          <div className="flex min-w-max gap-5 pb-2">
            {cards.map((card, index) => (
              <div
                key={card.id || index}
                className="group relative w-[78vw] min-w-[280px] max-w-[360px] border-r border-[#B5B5B5] pr-5 last:border-r-0 last:pr-0 hover:[&_.press-card-blur-target]:blur-[16px] focus-within:[&_.press-card-blur-target]:blur-[16px]"
              >
                <Card
                  newsPaper={card.newsPaper}
                  image={card.image}
                  title={card.title}
                  link={card.link}
                  dateLabel={card.date || card.dateLabel || ""}
                  variant="modern"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto hidden w-full lg:block">
          <div className="grid grid-cols-2 gap-x-0 gap-y-8 xl:grid-cols-4 xl:gap-y-20">
            {cards.map((card, index) => (
              <div
                key={card.id || index}
                className="border-r border-[#1D1D1D] px-3 lg:[&:nth-child(2n):not(:last-child)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4n):not(:last-child)]:border-r-0 last:!border-r-0 hover:[&_.press-card-blur-target]:blur-[16px] focus-within:[&_.press-card-blur-target]:blur-[16px]"
              >
                <div
                  className="group relative press-card-blur-target absolute inset-0 transition-[filter] duration-300 ease-out will-change-[filter]"
                >
                  <div className="">
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
              </div>
            ))}
          </div>
        </div>
      </section>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[30px] xxl:gap-[50px] 3xl:gap-[80px] max-w-none mx-auto">
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
