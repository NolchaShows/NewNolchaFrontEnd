import React from "react";

function UpcomingEvents() {
  return (
    <div className="max-w-[144opx] mx-auto flex flex-col  py-[20px] px-[16px] lg:py-[80px] lg:px-[40px] lg:gap-[40px] gap-[20px]">
      <h1 className="lg:text-[48px] text-[24px] text-center font-medium text-[var(--primary-text-color)] uppercase">
        Upcoming events
      </h1>
      <div className="w-full flex xl:justify-between xl:flex-row flex-col">
        <div className="flex flex-col gap-[10px] mb-[20px] xl:mb-[0px]">
          <img
            src="/landing/1.png"
            className="xl:w-[310px] xl:h-[310px]  object-cover rounded-[8px]"
          />
          <div>
            <h3 className="text-[var(--secondary-text-color)] text-[18px] font-medium">
              Consensus 2025
            </h3>
            <div className="text-[var(--tertiary-text-color)]">
              <p>Official VIP</p>
              <p>reception+party</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mb-[20px] xl:mb-[0px]">
          <img
            src="/landing/2.png"
            className="xl:w-[525px] xl:h-[525px]  object-cover rounded-[12px]"
          />
          <div>
            <h3 className="text-[var(--secondary-text-color)] lg:text-[18px] text-[20px] font-medium">
              Consensus 2025
            </h3>
            <div className="text-[var(--tertiary-text-color)] text-[18px]">
              <p>Official VIP</p>
              <p>reception+party</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mb-[20px] xl:mb-[0px]">
          <img
            src="/landing/3.png"
            className="xl:w-[417px] xl:h-[417px]   object-cover rounded-[8px]"
          />
          <div>
            <h3 className="text-[var(--secondary-text-color)] text-[18px] font-medium">
              Consensus 2025
            </h3>
            <div className="text-[var(--tertiary-text-color)]">
              <p>Official VIP</p>
              <p>reception+party</p>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}

export default UpcomingEvents;
