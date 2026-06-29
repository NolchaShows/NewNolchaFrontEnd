import React from 'react';

const BR_TAG_REGEX = /<br\s*\/?>/gi;

const SIZE_STYLES = {
  large:
    'text-[48px] lg:text-[82px] xl:text-[90px] 2xl:text-[110px] 3xl:text-[130px] leading-[57px] lg:leading-[96px] xl:leading-[112px] 2xl:leading-[128px] 3xl:leading-[128px] tracking-[-1.44px] lg:tracking-[-2.4px] xl:tracking-[-3.2px] 2xl:tracking-[-3.8px] 3xl:tracking-[-4.8px]',
  home:
    'text-[38px] lg:text-[66px] xl:text-[72px] 2xl:text-[88px] 3xl:text-[104px] leading-[66px] lg:leading-[110px] xl:leading-[129px] 2xl:leading-[147px] 3xl:leading-[147px] tracking-[-1.44px] lg:tracking-[-2.4px] xl:tracking-[-3.2px] 2xl:tracking-[-3.8px] 3xl:tracking-[-4.8px]',
};

const renderTextWithLineBreaks = (text) => {
  if (!text) return null;

  return text.split(BR_TAG_REGEX).map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 ? <br /> : null}
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
  size = 'large'
}) => {
  const sizeClassName = SIZE_STYLES[size] ?? SIZE_STYLES.large;

  return (
    <h1 className={`${sizeClassName} text-center font-bold ${className}`}>
      <span style={{ color: textColor }}>
        {renderTextWithLineBreaks(firstPart)}
      </span>
      {secondPart ? (
        <>
          {" "}
          <span style={{ color: fillColor }}>
            {renderTextWithLineBreaks(secondPart)}
          </span>
        </>
      ) : null}
    </h1>
  );
};

export default StyledHeading;

