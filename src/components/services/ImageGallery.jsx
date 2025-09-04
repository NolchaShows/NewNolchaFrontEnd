import React from 'react';

function ImageGallery() {
  return (
    <div className="bg-white p-16 lg:px-10 md:px-5 flex flex-col items-stretch justify-center overflow-hidden">
      {/* First row - Two landscape images */}
      <div className="w-full">
        <div className="flex w-full items-center gap-8 justify-start flex-wrap">
          <img
            src="/services/11.png"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
          <img
            src="/services/12.png"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
        </div>
      </div>

      <div className="flex mt-8 min-h-[355px] w-full items-stretch gap-8 justify-start flex-wrap">
        <img
          src="/services/13.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="/services/14.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="/services/15.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="/services/16.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
      </div>

      {/* First banner image */}
      <img
        src="/services/17.png"
        alt="Banner image"
        className="aspect-[2.23] object-cover object-center w-full rounded-[10px] mt-8"
      />

      {/* Third row - Two landscape images */}
      <div className="mt-8 w-full">
        <div className="flex w-full items-center gap-8 justify-start flex-wrap">
          <img
            src="/services/18.png"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
          <img
            src="/services/19.png"
            alt="Gallery image"
            className="aspect-[1.38] object-cover object-center w-full rounded-[10px] flex-1 min-w-[240px] my-auto"
          />
        </div>
      </div>

      {/* Fourth row - Four square images */}
      <div className="flex mt-8 min-h-[355px] w-full items-stretch gap-8 justify-start flex-wrap">
        <img
          src="/services/20.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="/services/21.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="/services/22.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
        <img
          src="/services/23.png"
          alt="Gallery image"
          className="aspect-[0.89] object-cover object-center w-[316px] rounded-lg min-w-[240px] flex-1"
        />
      </div>

      {/* Second banner image */}
      <img
        src="/services/24.png"
        alt="Banner image"
        className="aspect-[2.23] object-cover object-center w-full rounded-[10px] mt-8"
      />
    </div>
  );
}

export default ImageGallery;
