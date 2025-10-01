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
      className="lg:py-[40px] py-[20px] lg:px-[26px] px-[16px] flex flex-col md:gap-[24px] gap-[20px] w-full lg:rounded-[8px] rounded-[17.04px] bg-[var(--surface-color2)] border border-[var(--surface-color)] shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-center overflow-hidden rounded-md">
        <img
          src={newsPaper}
          className="max-w-[224px] xl:max-w-[240px] 2xl:max-w-[350px] object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="overflow-hidden rounded-[10px]">
        <img
          src={image}
          className="w-full max-h-[346px] xl:max-h-[420px] 2xl:max-h-[500px] object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <h1 className="font-medium text-[var(--secondary-text-color)] text-[18px] md:text-[14px] xl:text-[16px] 2xl:text-[28px] text-center leading-[1.2]">
        {title}
      </h1>
      <button
        onClick={() =>
          window.open(
            link,
            "_blank"
          )
        }
        className="text-center cursor-pointer bg-[var(--primary-color)] py-[12px] xl:py-[14px] 2xl:py-[16px] px-[24px] xl:px-[28px] 2xl:px-[36px] xl:text-lg 2xl:text-xl w-full border border-[#B5BF9E] rounded-[16px] hover:opacity-90 hover:scale-105 transition-all duration-300"
      >
        View Article
      </button>
    </motion.div>
  );
}
// ilovedsa
export default Card;
