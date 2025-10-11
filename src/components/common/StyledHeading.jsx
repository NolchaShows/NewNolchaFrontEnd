import React from 'react';

const StyledHeading = ({ 
  firstPart, 
  secondPart, 
  strokeColor = '#000000', 
  fillColor = '#FEF991',
  textColor = '#000000',
  className = ''
}) => {
  return (
    <h1 className={`text-[32px] md:text-[48px] lg:text-[64px] 2xl:text-[90px] lg:leading-20 font-bold ${className}`}>
      <span style={{ color: textColor }}>
        {firstPart}
      </span>{" "}
      <span 
        style={{
          WebkitTextStroke: `2px ${strokeColor}`,
          WebkitTextFillColor: fillColor,
          textShadow: 'none'
        }}
      >
        {secondPart}
      </span>
    </h1>
  );
};

export default StyledHeading;

