import React from "react";
import Link from "next/link";

const RoundedCtaButton = ({
  label,
  href,
  onClick,
  className = "",
  textClassName = "",
  iconCircleClassName = "",
  iconClassName = "",
  ariaLabel,
}) => {
  const baseClasses =
    "group inline-flex self-start items-center gap-3 md:gap-4 pl-[16px] lg:pl-[27px] 2xl:pl-[48px] pr-[8px] lg:pr-2 2xl:pr-[12px] py-[9px] lg:py-2 2xl:py-[12px] bg-primary hover:bg-[#FF9640] text-black font-medium rounded-full transition-all duration-300 text-[14px] lg:text-[20px] 2xl:text-[36px]";
  const iconCircleBase =
    "flex items-center justify-center w-[23px] h-[23px] lg:w-[44px] lg:h-[44px] 2xl:w-[80px] 2xl:h-[80px] bg-[#fff] rounded-full group-hover:bg-[#fff] transition-colors";
  const iconBase = "w-4 h-4 lg:w-6 lg:h-6 2xl:w-12 2xl:h-12";

  const content = (
    <>
      <span className={textClassName}>{label}</span>
      <span className={`${iconCircleBase} ${iconCircleClassName}`.trim()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 20 21"
          fill="none"
          className={`${iconBase} ${iconClassName}`.trim()}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z"
            fill="#000000"
          />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel || label}
        className={`${baseClasses} ${className}`.trim()}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`${baseClasses} ${className}`.trim()}
    >
      {content}
    </button>
  );
};

export default RoundedCtaButton;
