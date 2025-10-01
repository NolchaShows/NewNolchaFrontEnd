"use client";

import React, { useEffect, useState } from "react";
import "./page.css";

const cards = [
  { id: 1, text: "Card One" },
  { id: 2, text: "Card Two" },
  { id: 3, text: "Card Three" },
  { id: 4, text: "Card Four" },
  { id: 5, text: "Card Five" },
];

const Page = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 1;
  const progress = scrollY / screenHeight;

  return (
    <div className="scroll-container">
      <div className="cards-wrapper">
        {cards.map((card, index) => {
          const relativeProgress = progress - index;

          let opacity = 0;
          let translateY = 50;
          let scale = 0.9;
          let blur = 0;

          if (relativeProgress >= -1 && relativeProgress <= 1) {
            opacity = 1 - Math.abs(relativeProgress);
            scale = 1 - Math.abs(relativeProgress) * 0.1;

            translateY = relativeProgress * -100;

            blur = Math.abs(relativeProgress) * 5;
          }

          return (
            <div
              key={card.id}
              className={`card ${blur > 0 ? "blur-effect" : ""}`}
              style={{
                zIndex: cards.length - index,
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                filter: `blur(${blur}px)`,
              }}
            >
              {card.text}
            </div>
          );
        })}

      </div>

      <div style={{ height: `${cards.length * 100}vh` }}></div>
    </div>
  );
};

export default Page;
