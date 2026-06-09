import React from "react";

const SectionTitle = ({
  children,
  className = "",
  disableTitleSpacing = false,
  tone = "dark",
}) => {
  const toneClass =
    tone === "light" ? "text-[var(--home-text)]" : "text-white";

  return (
    <h2 className={`${className} ${toneClass} text-h1 uppercase`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
