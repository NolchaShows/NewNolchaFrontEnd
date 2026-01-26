import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Card({ newsPaper, image, title, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="backdrop-blur-[4px] bg-[#1a1a1a] lg:py-[30px] py-[20px] lg:px-[20px] px-[16px] flex flex-col gap-[20px] w-full rounded-[17px] shadow-[0px_0.5px_10px_rgba(0,0,0,0.1),0px_20px_26px_rgba(0,0,0,0.4)] text-white transition-transform duration-300"
    >
      <div className="flex justify-center items-center h-[50px]">
        <img
          src={newsPaper}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="overflow-hidden rounded-[4px]">
        <img
          src={image}
          className="w-full h-[220px] sm:h-[258px] object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <h1 className="font-['Tomorrow',sans-serif] text-[16px] sm:text-[18px] text-center leading-[1.5] tracking-[-0.54px]">
        {title}
      </h1>
      <button
        onClick={() =>
          window.open(
            link,
            "_blank"
          )
        }
        className="text-center cursor-pointer bg-primary py-[12px] sm:py-[16px] px-[24px] w-full rounded-full hover:opacity-90 transition-opacity text-[16px] lg:text-[18px] text-black font-medium"
      >
        View Article
      </button>
    </motion.div>
  );
}
// ilovedsa
export default Card;
