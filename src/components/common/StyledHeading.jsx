import React from 'react';

const SIZE_CLASSES = {
  large:
    'text-[48px] lg:text-[82px] xl:text-[90px] 2xl:text-[110px] 3xl:text-[130px] leading-[57px] lg:leading-[96px] xl:leading-[112px] 2xl:leading-[128px] 3xl:leading-[128px] tracking-[-1.44px] lg:tracking-[-2.4px] xl:tracking-[-3.2px] 2xl:tracking-[-3.8px] 3xl:tracking-[-4.8px]',
  medium:
    'text-[40px] lg:text-[68px] xl:text-[76px] 2xl:text-[94px] 3xl:text-[110px] leading-[48px] lg:leading-[80px] xl:leading-[90px] 2xl:leading-[108px] 3xl:leading-[108px] tracking-[-1.2px] lg:tracking-[-2px] xl:tracking-[-2.6px] 2xl:tracking-[-3.2px] 3xl:tracking-[-4px]',
};

const BR_REGEX = /<br\s*\/?>/gi;

const renderTextWithResponsiveBreaks = (text) => {
  if (!text || typeof text !== 'string') return text;

  const parts = text.split(BR_REGEX);
  if (parts.length === 1) return text;
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 && (
        <>
          <span className="lg:hidden"> </span>
          <br className="hidden lg:block" />
        </>
      )}
      {part}
    </React.Fragment>
  ));
};

const StyledHeading = ({
  firstPart,
  secondPart,
  strokeColor = '#000000',
  fillColor = '#FEF991',
  textColor = '#000000',
  className = '',
  size = 'large',
}) => {
  const sizeClasses = SIZE_CLASSES[size] ?? SIZE_CLASSES.large;

  return (
    <h1
      className={`${sizeClasses} text-center font-bold ${className}`}
    >
      <span style={{ color: textColor }}>
        {renderTextWithResponsiveBreaks(firstPart)}
      </span>{' '}
      <span style={{ color: fillColor }}>
        {renderTextWithResponsiveBreaks(secondPart)}
      </span>
    </h1>
  );
};

export default StyledHeading;
