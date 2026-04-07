"use client";

import React from "react";
import Image from "next/image";

const WhiteLabelIntroSection = () => {
  return (
    <section className="relative z-10 bg-[#FFF7E6] page-container">
      <div className="mx-auto grid max-w-[1280px] items-center gap-[30px] sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[50px] 2xl:gap-[70px]">
        <div className="relative mx-auto w-full max-w-[593px] overflow-hidden rounded-[8px] sm:rounded-[10px] lg:mx-0 lg:rounded-[12px] 2xl:max-w-[760px] 2xl:rounded-[16px]">
          <Image
            src="/white-label/white-label.jpg"
            alt="White label event highlights"
            width={593}
            height={599}
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) min(593px, calc(100vw - 40px)), (max-width: 1535px) 48vw, 760px"
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="mx-auto w-full max-w-[560px] text-black lg:mx-0 lg:max-w-[530px] 2xl:max-w-[680px]">
          <h2 className="max-w-[514px] font-['Tomorrow',sans-serif] text-[28px] font-extrabold leading-[1.08] tracking-[-0.84px] sm:text-[32px] sm:tracking-[-0.96px] md:text-[40px] md:tracking-[-1.2px] lg:text-[50px] lg:tracking-[-1.5px] 2xl:max-w-[680px] 2xl:text-[64px] 2xl:tracking-[-1.92px]">
            Your Event. Your Brand. Our Infrastructure.
          </h2>
          <div className="mt-5 flex max-w-[485px] flex-col gap-4 font-['Tomorrow',sans-serif] text-[15px] leading-[1.5] tracking-[-0.45px] sm:mt-6 sm:text-[16px] sm:tracking-[-0.48px] md:gap-5 md:text-[18px] md:tracking-[-0.54px] lg:text-[20px] lg:tracking-[-0.6px] 2xl:max-w-[620px] 2xl:gap-7 2xl:text-[28px] 2xl:tracking-[-0.84px]">
            <p>
              We don&apos;t just produce events. We design strategic
              environments that elevate brand positioning and facilitate real
              business outcomes, supported by the scale, network, and
              operational discipline developed across 280+ global events.
            </p>
            <p>
              We&apos;ve built a high-impact community of over 40,000 founders,
              investors, artists, and leaders defining what&apos;s next in Web3,
              AI, culture, and tech - and every event we produce activates that
              network.
            </p>
            <p className="pt-1 sm:pt-2">Co-Founder Arthur Mandel</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelIntroSection;
