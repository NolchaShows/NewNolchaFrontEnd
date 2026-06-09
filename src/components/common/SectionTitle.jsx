import React from "react";

const SectionTitle = ({ children, className = "", disableTitleSpacing = false }) => {
  return (
    <h2 className={`${className} text-white text-h1`}>
      {children}
    </h2>
  );
};

export default SectionTitle;


