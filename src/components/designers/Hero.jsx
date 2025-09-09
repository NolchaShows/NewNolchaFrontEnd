"use client"
import React, { useState } from "react";

function Hero({ heading, paragraphs, image, source }) {

  return (
    <div className="lg:px-[40px] px-[16px] max-w-full mx-auto mt-10">
      <div className="flex flex-col mx-auto bg-[#EBE2D7] rounded-[16px] overflow-hidden">
        
        {/* Image Section */}
        <div className="w-full">
          <img
            src={image || "/api/placeholder/400/500"}
            alt="Hero image"
            className="w-full object-cover h-[700px] md:h-[800px] 2xl:h-[1100px]"
          />
        </div>

        {/* Content Section */}
        <div className="p-[20px] lg:p-[32px] flex flex-col">
          {/* Source */}
          {source && (
            <p className="text-sm lg:text-base 2xl:text-2xl text-gray-600 mb-[16px] lg:mb-[20px]">
              {source}
            </p>
          )}
          
          {/* Heading */}
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-black mb-[20px] lg:mb-[24px]">
            {heading || "Default Heading Text Goes Here"}
          </h1>
          
          {/* Paragraphs */}
          <div className="space-y-[16px] lg:space-y-[20px]">
            {paragraphs && paragraphs.length > 0 && (
              paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm lg:text-base 2xl:text-2xl text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;