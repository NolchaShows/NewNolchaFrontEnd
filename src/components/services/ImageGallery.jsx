import React from 'react';

function ImageGallery() {
  return (
    <div className="bg-white p-16 lg:px-10 md:px-5 flex flex-col items-stretch justify-center overflow-hidden">
      {/* First row - Two landscape images */}
      <div className="w-full">
        <div className="flex w-full items-center gap-8 justify-start flex-wrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ac830c05b558b0e2c9b292c551f70aaf88d3bfc1?placeholderIfAbsent=true"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/dec3370603e812635792d22591247973747674f3?placeholderIfAbsent=true"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
        </div>
      </div>

      {/* Second row - Four square images */}
      <div className="flex mt-8 min-h-[355px] w-full items-stretch gap-8 justify-start flex-wrap">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/e397ba3cc17674bda124362b467484442cfa2ba9?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/bb4265e56018c03a3f0ed436c0a1e5ee5595cd18?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f02586fe53c589f0871debb0cc02c55e58f56bb6?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/1129879cd17431a1b6a92c05a1059b88cd11b8c5?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
      </div>

      {/* First banner image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/01abce03e0e1ca9440cea61468d1c37159e68f8f?placeholderIfAbsent=true"
        alt="Banner image"
        className="aspect-[2.23] object-cover object-center w-full rounded-[10px] mt-8"
      />

      {/* Third row - Two landscape images */}
      <div className="mt-8 w-full">
        <div className="flex w-full items-center gap-8 justify-start flex-wrap">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1c8e32b1be58dd1ec2b5d21439e689afac3de2ef?placeholderIfAbsent=true"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d8e7924891b9f2a59eb9438cc73a21676ae23979?placeholderIfAbsent=true"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
        </div>
      </div>

      {/* Fourth row - Four square images */}
      <div className="flex mt-8 min-h-[355px] w-full items-stretch gap-8 justify-start flex-wrap">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d6db4b3ce0864aad365d190293af4e6236ccf47f?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d9556fe1e8500c59e32406329b92afe1a5cfcbb4?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/7f0539e997b9cf3e248247ef409aa5d75f3a7535?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/3435c265dd086d30303918ba5343e2725b3405cb?placeholderIfAbsent=true"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
      </div>

      {/* Second banner image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/46e8dd5bdb2df827678f61eedac3108ef46e3a98?placeholderIfAbsent=true"
        alt="Banner image"
        className="aspect-[2.23] object-cover object-center w-full rounded-[10px] mt-8"
      />
    </div>
  );
}

export default ImageGallery;
