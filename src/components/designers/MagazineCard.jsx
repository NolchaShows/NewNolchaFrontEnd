import React from "react";

const MagazineCard = ({ image, title, description }) => {
  return (
    <div className="bg-[#F4F4F4] text-black overflow-hidden border border-[#F4F4F4] rounded-[17px]">
      {title && (
        <h2 className="text-[#003233] text-2xl 2xl:text-3xl text-center font-bold px-4 pt-4 leading-tight mb-4 tracking-tight">
          {title}
        </h2>
      )}
      {/* Main image section */}
      <div className="relative h-150 overflow-hidden p-4">
        <img
          src={image}
          alt="Featured content"
          className="w-full h-full object-cover rounded-[4px]"
        />
      </div>

      {/* Content section */}
      <div className="px-6 pb-4">
        <div className="text-base text-black 2xl:text-2xl leading-relaxed space-y-3">
          {description.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagazineCard;
