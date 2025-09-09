"use client"
import React from "react";

function ContentCard({ title, description, image }) {
  return (
    <div className="w-full max-w-none">
      <div className="hidden md:block bg-[#f0ede6] rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/2 p-8 lg:p-12">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#000000] leading-tight">
              {title}
            </h1>
          </div>
          
          <div className="w-1/2 p-8 lg:p-12 flex items-center">
            <p className="text-[#000000] text-sm lg:text-xl 2xl:text-3xl leading-relaxed">
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