"use client";
import * as React from "react";
import { useState } from "react";

function MembershipTiers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "Capital",
      description:
        "Direct connections to active investors, funds, and strategic partners.",
      image: "/membership/5.png",
      alt: "Capital membership visual",
    },
    {
      title: "Business Development",
      description:
        "Curated deal-flow, high-value collaborations, and market expansion opportunities.",
      image: "/membership/5.png",
      alt: "Business Development membership visual",
    },
    {
      title: "Community",
      description:
        "A trusted global network of founders, builders, and investors defining the future.",
      image: "/membership/5.png",
      alt: "Community membership visual",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const Card = ({ card }) => (
    <div
      className="flex flex-col p-4 sm:p-6 lg:p-8 rounded-2xl bg-zinc-100 min-w-0 w-full 
    shadow-sm hover:shadow-xl transform transition-all duration-500 hover:-translate-y-4 
    animate-fadeIn"
    >
      <div className="flex flex-col justify-center w-full">
        <div className="w-full">
          <div className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-bold tracking-tighter leading-tight text-center sm:text-left">
            {card.title}
          </div>
          <div className="mt-2 sm:mt-4 text-sm sm:text-base 2xl:text-2xl text-center sm:text-left">
            {card.description}
          </div>
        </div>
        <div className="flex justify-center sm:justify-start mt-4">
          <div
            className="flex gap-2 justify-center items-center px-4 sm:px-6 py-2 sm:py-3 2xl:px-8 2xl:py-6
          text-xs sm:text-sm 2xl:text-xl font-medium leading-none bg-lime-100 
          rounded-xl border border-stone-400 cursor-pointer 
          hover:bg-lime-200 hover:scale-105 active:scale-95 
          transition-all duration-300"
          >
            <div className="my-auto whitespace-nowrap">Learn More</div>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-8 w-full overflow-hidden rounded-2xl">
        <img
          src={card.image}
          className="object-cover w-full aspect-[1.39] max-h-64 sm:max-h-72 lg:max-h-80 2xl:max-h-120 
        transition-transform duration-700 hover:scale-110"
          alt={card.alt}
        />
      </div>
    </div>
  );

  return (
    <div className="flex overflow-hidden flex-col justify-center items-center py-24 pr-9 pl-10 text-black bg-white max-md:px-5">
      <div className="flex flex-col w-full max-w-none max-md:max-w-full">
        <div
          className="self-center text-5xl font-bold tracking-tighter leading-tight max-md:max-w-full max-md:text-4xl"
          data-name="Membership Tiers"
        >
          Membership Tiers
        </div>

        {/* Large screens - 3 cards in a row */}
        <div
          className="hidden lg:grid lg:grid-cols-3 gap-6 items-start mt-12 w-full max-md:mt-10"
          data-name="cards"
        >
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        {/* Medium screens - 2 cards in a row */}
        <div
          className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 items-start mt-12 w-full max-md:mt-10"
          data-name="cards"
        >
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        {/* Small screens - Slider */}
        <div className="md:hidden mt-12 max-md:mt-10">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex justify-center px-4"
                >
                  <Card card={card} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6 gap-1">
            <button
              onClick={prevSlide}
              className="cursor-pointer z-10 hover:opacity-80 transition-opacity p-2"
              aria-label="Previous card"
            >
              <img src="/left_dark.png" alt="" className="w-16 h-16" />
            </button>
            <button
              onClick={nextSlide}
              className="cursor-pointer z-10 hover:opacity-80 transition-opacity p-2"
              aria-label="Next card"
            >
              <img src="/right_dark.png" alt="" className="w-16 h-16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipTiers;
