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
    <h1 className={`text-[48px] lg:text-[82px] xl:text-[90px] 2xl:text-[110px] 3xl:text-[130px] leading-[57px] lg:leading-[96px] xl:leading-[112px] 2xl:leading-[128px] 3xl:leading-[128px]' tracking-[-1.44px] lg:tracking-[-2.4px] xl:tracking-[-3.2px] 2xl:tracking-[-3.8px] 3xl:tracking-[-4.8px] text-center font-bold ${className}`}>
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

