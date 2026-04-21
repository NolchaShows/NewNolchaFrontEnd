"use client";

import React from "react";
import { motion } from "framer-motion";

const ArrowNavButtons = ({
  onLeft,
  onRight,
  className = "hidden lg:flex gap-4 xl:gap-6 2xl:gap-8 xxl:gap-10",
  buttonClassName = "bg-primary flex items-center justify-center rounded-[5px] lg:rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] xxl:rounded-[15px] 3xl:rounded-[20px] w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[60px] 2xl:h-[60px] xxl:w-[70px] xxl:h-[70px] 3xl:w-[100px] 3xl:h-[100px] hover:bg-primary/80 transition-colors",
  iconClassName = "w-[32px] h-[32px] lg:w-[38px] lg:h-[38px] xl:w-[46px] xl:h-[46px] 2xl:w-[56px] 2xl:h-[56px] xxl:w-[68px] xxl:h-[68px] 3xl:w-[92px] 3xl:h-[92px]",
  centerButtons = false,
}) => {
  return (
    <div className={`${className} ${centerButtons ? "justify-center" : ""}`}>
      <button onClick={onLeft} aria-label="Scroll left" className={buttonClassName}>
        <motion.img
          src="/icons/left-arrow.svg"
          className={iconClassName}
          whileTap={{ scale: 0.9 }}
        />
      </button>
      <button onClick={onRight} aria-label="Scroll right" className={buttonClassName}>
        <motion.img
          src="/icons/right-arrow.svg"
          className={iconClassName}
          whileTap={{ scale: 0.9 }}
        />
      </button>
    </div>
  );
};

export default ArrowNavButtons;
