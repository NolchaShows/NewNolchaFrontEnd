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
    <h1 className={`text-[42px] lg:text-[72px] xl:text-[80px] 2xl:text-[96px] 3xl:text-[112px] leading-[50px] lg:leading-[84px] xl:leading-[98px] 2xl:leading-[112px] 3xl:leading-[112px] tracking-[-1.2px] lg:tracking-[-2.1px] xl:tracking-[-2.8px] 2xl:tracking-[-3.3px] 3xl:tracking-[-4.1px] text-center uppercase ${className}`}>
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

