import React from "react";

const ImageTextSection = ({
  image = "",
  title = "",
  paragraphs = [],
  background = "#FEF991"
}) => {
  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="px-[28px] lg:px-12 2xl:px-[86px] py-[50px] lg:py-[100px] 2xl:py-[200px]">
        <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[57px] 2xl:gap-[100px]">
          {/* Left Side - Image */}
          <div>
            <div className="relative h-[450px] lg:h-[996px] 2xl:h-[1413px]" >
              <img
                src={image}
                alt="Fashion show image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Main Title */}
              <h2 className="text-[40px] lg:text-[64px] 2xl:text-[114px] font-bold text-black leading-tight">
                {title.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-black">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[16px] lg:text-[40px] 2xl:text-[60px] leading-relaxed">
                    {paragraph.split('**').map((part, partIndex) => {
                      if (partIndex % 2 === 1) {
                        return <strong key={partIndex}>{part}</strong>;
                      }
                      return part;
                    })}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
