import React from 'react';

const NolchaCard = ({ image, description }) => {
  return (
    <div className="w-full max-w-none h-[500px] 2xl:h-[700px] bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-lg">
      {/* Header with logos */}
      <div className="flex justify-between items-center p-4 bg-white">
        <img 
          src="/services/nolcha.png" 
          alt="Nolcha" 
          className="h-8 w-auto"
        />
        <img 
          src="/services/dots.png" 
          alt="Menu" 
        />
      </div>

      {/* Main Image */}
      <div className="relative h-90 2xl:h-[500px] w-full">
        <img 
          src={image} 
          alt="Card content" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-gray-800 text-lg 2xl:text-2xl leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default NolchaCard;