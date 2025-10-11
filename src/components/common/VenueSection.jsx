import React from 'react';

const VenueSection = ({
  heading = "The Venue",
  description,
  decorativeImage,
  venueImages = [],
  backgroundImage = "/inscribing_miami/venue_background.png"
}) => {
  return (
    <div
      className="pt-[40px] md:pt-[60px] lg:pt-[80px] px-[16px] md:px-[40px] max-w-none w-full mx-auto"
    >
      {/* Top Section: Heading and Description with Decorative Image */}
      <div className="flex flex-col lg:flex-row gap-[30px] md:gap-[40px] lg:gap-[60px]" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex-1">
          <div className="pl-12">
            <h1 className="text-[#0000] text-[40px] md:text-[56px] lg:text-[72px] 2xl:text-[80px] font-bold mt-[120px]">
              {heading}
            </h1>

            {description && (
              <p className="text-[#000000] text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] leading-relaxed max-w-[800px]">
                {description}
              </p>
            )}
          </div>
        </div>

        {decorativeImage && (
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <img
              src={decorativeImage}
              alt="Decorative"
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[340px] lg:h-auto 2xl:w-[350px] 2xl:h-[350px] object-contain"
            />
          </div>
        )}
      </div>

      {/* Venue Images Row */}
      {venueImages.length > 0 && (
        <div className="flex w-full">
          {venueImages.map((image, index) => (
            <div 
              key={index} 
              className={index === 0 ? "w-[33.33%]" : "w-[66.67%]"}
            >
              <img 
                src={image} 
                alt={`Venue ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueSection;

