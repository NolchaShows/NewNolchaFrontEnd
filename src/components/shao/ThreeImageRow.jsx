import React from "react";

const ThreeImageRow = ({
  images = [],
  line1 = "",
  line2 = "",
  background = "#FEF991",
}) => {
  const [left, center, right] = images;

  return (
    <section className="w-full" style={{ backgroundColor: background }}>
      <div className="py-[5px]">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[5px]">
            <div className="relative h-[375px] lg:h-[525px] 2xl:h-[933px] bg-white">
              {left && (
                <img src={left} alt="Left visual" className="w-full h-full object-cover" />
              )}
            </div>

            <div className="relative h-[375px] lg:h-[525px] 2xl:h-[933px] bg-white">
              {center && (
                <img src={center} alt="Center visual" className="w-full h-full object-cover" />
              )}
              {(line1 || line2) && (
                <div className="absolute inset-0 flex items-end justify-center pb-[18px] lg:pb-[48px] 2xl:pb-[86px]">
                  <div className="text-white text-center">
                    {line1 && (
                      <div className="text-[18px] lg:text-[36px] 2xl:text-[65px] font-medium leading-tight">
                        {line1}
                      </div>
                    )}
                    {line2 && (
                      <div className="text-[18px] lg:text-[36px] 2xl:text-[65px] font-medium leading-tight">
                        {line2}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative h-[375px] lg:h-[525px] 2xl:h-[933px] bg-white">
              {right && (
                <img src={right} alt="Right visual" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeImageRow;


