import React from 'react';

const MagazineCard = ({ 
  image, 
  title, 
  description 
}) => {
  return (
    <div className="mx-auto bg-white text-black overflow-hidden shadow-2xl ml-8 mr-8 mt-5">
      {/* Main image section */}
      <div className="relative h-150 overflow-hidden">
        <img 
          src={image} 
          alt="Featured content" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content section */}
      <div className="p-6">
        <h2 className="text-[#003233] text-2xl 2xl:text-3xl font-semibold leading-tight mb-4 tracking-tight">
          {title}
        </h2>
        
        <div className="text-base text-black 2xl:text-2xl leading-relaxed space-y-3">
          {description.split('\n\n').map((paragraph, index) => (
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