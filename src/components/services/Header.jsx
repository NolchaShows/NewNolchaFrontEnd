"use client";
import * as React from "react";

function Header() {
  return (
    <div
      className="flex flex-col lg:flex-row overflow-hidden justify-center items-center lg:items-stretch py-12 md:py-16 lg:py-24 text-black bg-[#E2E2E2] min-h-screen lg:min-h-0"
      data-name="Header"
    >
      {/* Text Section - 50% width on large screens */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-8 lg:pl-12 xl:pl-16 2xl:pl-20 lg:pr-8 xl:pr-12 2xl:pr-16 order-2 lg:order-1">
        <div className="max-w-full">
          <div
            className="text-3xl md:text-[38px] lg:text-[44px] xl:text-[52px] 2xl:text-[80px] font-medium tracking-tighter leading-tight lg:leading-[1.1] xl:leading-[1.1] 2xl:leading-[1.1] mb-6 md:mb-8"
            data-name="We partner with innovative brands, organizations,"
          >
            We Partner With Innovative Brands, Organizations,
          </div>
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl tracking-tight leading-relaxed lg:leading-7 xl:leading-8 2xl:leading-9 max-w-none">
            <div
              data-name="We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement."
            >
              We harness the latest in AR, VR, mixed reality, and interactive
              installations to turn ideas into next-level audience engagement.
              <br />
              <br />
              We harness the latest in AR, VR, mixed reality, and interactive
              installations to turn ideas into next-level audience engagement.
            </div>
          </div>
        </div>
      </div>

      {/* Image Section - 50% width on large screens */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 order-1 lg:order-2 mb-8 lg:mb-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c0f8d501798b6b19e5b66c8d1341a7812325ba20?placeholderIfAbsent=true"
          className="object-contain w-full h-auto max-w-md md:max-w-lg lg:max-w-none aspect-[1.14]"
          alt="Innovative technology visualization"
        />
      </div>
    </div>
  );
}

export default Header;