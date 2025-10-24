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
    <h1 className={`${size == 'medium' ? 'text-[40px] lg:text-[70px] 2xl:text-[124px] leading-none' : size == 'small' ? 'text-[40px] lg:text-[56px] 2xl:text-[100px] leading-none' : 'text-[39px] lg:text-[90px] 2xl:text-[160px] leading-[57px] lg:leading-[108px] 2xl:leading-[192px]' } tracking-[-1.5px] lg:tracking-[-2.7px] font-bold ${className}`}>
      <span style={{ color: textColor }}>
        {firstPart}
      </span>{" "}
      <span 
        style={{
          color: fillColor,
        }}
      >
        {secondPart}
      </span>
    </h1>
  );
};

export default StyledHeading;

