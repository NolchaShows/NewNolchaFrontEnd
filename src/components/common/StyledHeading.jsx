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
    <h1 className={`text-[50px] lg:text-[90px] leading-[57px] lg:leading-[108px] tracking-[-1.5px] lg:tracking-[-2.7px] font-bold ${className}`}>
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

