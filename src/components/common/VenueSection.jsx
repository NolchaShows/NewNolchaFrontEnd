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
      className="max-w-none w-full mx-auto"
    >
       {/* Top Section: Heading and Description with Decorative Image */}
       <div className="relative" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
         {/* Mobile: Decorative Image as Background in Top Right */}
         {decorativeImage && (
           <div className="absolute top-0 right-0 w-[120px] h-auto lg:hidden">
             <img
               src={decorativeImage}
               alt="Decorative"
               className="w-full h-full object-contain"
             />
           </div>
         )}
         
         <div className="flex flex-row lg:gap-[60px]">
           <div className="flex-1">
             <div className="pl-[22px] lg:pl-12 pr-[90px] lg:pr-0">
               <h1 className="text-[35px] lg:text-[87px] font-bold text-[#000000] leading-none mt-[61px] lg:mt-[150px] mb-[8px] lg:mb-[29px]">
                 {heading}
               </h1>

               {description && (
                 <p className="text-[#000000] text-[16px] lg:text-[22px] leading-relaxed max-w-[1000px] pb-[17px] lg:pb-15">
                   {description}
                 </p>
               )}
             </div>
           </div>

           {/* Desktop: Decorative Image */}
           {decorativeImage && (
             <div className="hidden lg:flex flex-shrink-0 justify-end">
               <img
                 src={decorativeImage}
                 alt="Decorative"
                 className="w-[410px] h-[450px] object-cover"
               />
             </div>
           )}
         </div>
       </div>

      {/* Venue Images Row */}
      {venueImages.length > 0 && (
        <div className="flex w-full mt-[-1px]">
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

