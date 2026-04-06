import React from "react";

const MagazineCard = ({ image, title, description }) => {
  return (
    <div className="bg-[#F4F4F4] p-[24px] 2xl:p-[30px] text-black overflow-hidden border border-[#F4F4F4] rounded-[17px]">
      {/* Main image section */}
      <div className="relative h-150 overflow-hidden mb-4">
        <img
          src={image}
          alt="Featured content"
          className="w-full h-full object-cover rounded-[4px]"
        />
      </div>

      {/* Title */}
      {title && (
        <h2 className="text-[#000000] text-h3 font-bold leading-tight mb-4 tracking-tight">
          {title}
        </h2>
      )}

      {/* Content section */}
      <div className="pb-4">
        <div className="para-s text-black leading-relaxed space-y-3">
          {description.split("\n\n").map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagazineCard;
