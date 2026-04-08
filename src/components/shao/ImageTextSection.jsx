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
      <div className="px-[28px] lg:px-12 2xl:px-[60px] xxl:px-[86px] 3xl:px-[120px] py-[50px] lg:py-[100px] 2xl:py-[140px] xxl:py-[200px] 3xl:py-[300px]">
        <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[57px] 2xl:gap-[80px] xxl:gap-[100px] 3xl:gap-[150px]">
          {/* Left Side - Image */}
          <div>
            <div className="relative lg:w-[580px] 2xl:w-[800px] xxl:w-[1031px] 3xl:w-[1500px] h-[450px] lg:h-[684px] 2xl:h-[1000px] xxl:h-[1413px] 3xl:h-[2000px]" >
              <img
                src={image}
                alt="Fashion show image"
                className="w-full h-full object-cover rounded-[12px] 3xl:rounded-[24px]"
              />
              {/* Tags Overlay */}
              {tags.length > 0 && (
                <div className="absolute bottom-[20px] lg:bottom-[30px] 2xl:bottom-[45px] xxl:bottom-[60px] 3xl:bottom-[90px] left-[20px] lg:left-[30px] 2xl:left-[45px] xxl:left-[60px] 3xl:left-[90px]">
                  <p className="text-white text-[17px] lg:text-[30px] 2xl:text-[40px] xxl:text-[57px] 3xl:text-[80px] mb-2 lg:mb-[15px] 2xl:mb-5 xxl:mb-7 3xl:mb-10">
                    Scope of work
                  </p>
                  <div className="flex flex-wrap gap-2 2xl:gap-2.5 3xl:gap-4">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 lg:px-[22px] lg:py-[11px] 2xl:px-8 2xl:py-4 xxl:px-10 xxl:py-5 3xl:px-16 3xl:py-8 rounded-[52px] text-black text-[10px] lg:text-[19px] 2xl:text-[28px] xxl:text-[35px] 3xl:text-[50px] font-medium"
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
            <div className="space-y-6 3xl:space-y-12">
              {/* Main Title */}
              <h2 className="text-[28px] lg:text-[48px] 2xl:text-[72px] xxl:text-[96px] 3xl:text-[144px] font-bold leading-[120%] text-black mb-[10px] lg:mb-[20px] 2xl:mb-[30px] xxl:mb-[40px] 3xl:mb-[60px]">
                {title.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 3xl:space-y-8 text-black">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[14px] lg:text-[28px] 2xl:text-[40px] xxl:text-[56px] 3xl:text-[84px] leading-relaxed">
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
