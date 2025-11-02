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
    <h1 className={`${size == 'medium' ? 'text-[40px] lg:text-[70px] 2xl:text-[124px] leading-none' : size == 'small' ? 'text-[40px] lg:text-[56px] 2xl:text-[100px] leading-none' : 'text-[48px] lg:text-[82px] 2xl:text-[150px] leading-[57px] lg:leading-[96px] 2xl:leading-[180px]' } tracking-[-1.44px] lg:tracking-[-2.4px] 2xl:tracking-[-4.5px] text-left lg:text-center font-bold ${className}`}>
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

