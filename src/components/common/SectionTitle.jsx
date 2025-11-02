"use client";
import React from "react";

const SectionTitle = ({ children, className = "", disableTitleSpacing = false }) => {
  return (
    <h2 className={`${className} text-black text-h1 ${disableTitleSpacing ? '' : 'title-spacing'}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;


