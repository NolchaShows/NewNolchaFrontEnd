"use client";
import React from "react";

const SectionTitle = ({ children, className = "", disableTitleSpacing = false }) => {
  return (
    <h2 className={`${className} text-white text-h1 ${disableTitleSpacing ? '' : 'title-spacing-[-1.8px]'}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;


