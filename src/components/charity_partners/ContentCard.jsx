"use client"
import React from "react";


function ContentCard({ title, description, image }) {
  return (
    <div className="w-full max-w-none">
      <div className="hidden md:block bg-[#f0ede6] rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 p-8 lg:pl-12 lg:pr-0 2xl:p-12">
            <h1 className="text-[26px] lg:text-[52px] 2xl:text-[60px] font-bold text-[#000000] leading-tight">
              {title}
            </h1>
          </div>
          
          <div className="w-1/2 p-8 lg:p-12 flex items-center">
            <p className="text-[#000000]  font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] lg:text-[20px] 2xl:text-[32px] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        <div className="px-8 lg:px-12 pb-8 lg:pb-12">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "/api/placeholder/800/400";
            }}
          />
        </div>
      </div>

      <div className="md:hidden bg-[#f0ede6] rounded-lg overflow-hidden p-6">
        <h1 className="text-xl font-bold text-[#000000] leading-tight mb-4">
          {title}
        </h1>
        
        <p className="text-[#000000] text-base lg:text-lg 2xl:text-3xl leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentCard;