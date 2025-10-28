import React from "react";

const ImageTextSection = ({
  image = "",
  title = "",
  paragraphs = [],
  background = "#FEF991",
  tags = []
}) => {
  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="px-[28px] lg:px-12 2xl:px-[86px] py-[50px] lg:py-[100px] 2xl:py-[200px]">
        <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[57px] 2xl:gap-[100px]">
          {/* Left Side - Image */}
          <div>
            <div className="relative lg:w-[580px] 2xl:w-[1031px] h-[450px] lg:h-[684px] 2xl:h-[1413px]" >
              <img
                src={image}
                alt="Fashion show image"
                className="w-full h-full object-cover"
              />
              {/* Tags Overlay */}
              {tags.length > 0 && (
                <div className="absolute bottom-[20px] lg:bottom-[30px] 2xl:bottom-[60px] left-[20px] lg:left-[30px] 2xl:left-[60px]">
                  <p className="text-white text-[17px] lg:text-[30px] 2xl:text-[57px] mb-2 lg:mb-[15px] 2xl:mb-7">
                    Scope of work
                  </p>
                  <div className="flex flex-wrap gap-2 2xl:gap-2.5">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 lg:px-[22px] lg:py-[11px] 2xl:px-10 2xl:py-5 rounded-[52px] text-black text-[10px] lg:text-[19px] 2xl:text-[35px] font-medium"
                        style={{ backgroundColor: tag.color || "#6366f1" }}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Main Title */}
              <h2 className="text-[32px] lg:text-[52px] 2xl:text-[114px] font-bold text-black mb-[10px] lg:mb-[20px] 2xl:mb-[40px]">
                {title.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-black">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[16px] lg:text-[32px] 2xl:text-[60px] leading-relaxed">
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
