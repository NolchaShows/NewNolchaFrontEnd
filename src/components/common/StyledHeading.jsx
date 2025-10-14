import React from 'react';

const StyledHeading = ({ 
  firstPart, 
  secondPart, 
  strokeColor = '#000000', 
  fillColor = '#FEF991',
  textColor = '#000000',
  className = '',
  size = 'large'
}) => {
  return (
    <h1 className={`${size == 'medium' ? 'text-[40px] lg:text-[70px] leading-none' : size == 'small' ? 'text-[40px] lg:text-[56px] leading-none' : 'text-[50px] lg:text-[90px] leading-[57px] lg:leading-[108px]' } tracking-[-1.5px] lg:tracking-[-2.7px] font-bold ${className}`}>
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

