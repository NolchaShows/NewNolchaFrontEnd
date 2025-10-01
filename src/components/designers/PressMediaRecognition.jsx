import React from 'react';

const PressMediaRecognition = ({ 
  title = "Press & Media Recognition",
  logos = []
}) => {
  return (
    <div style={{ backgroundColor: '#F4F4F4' }} className="py-16 px-8">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-16">
        {title}
      </h2>
      
      {/* Logos container */}
      <div className="max-w-6xl mx-auto">
        {/* Desktop layout - horizontal */}
        <div className="hidden md:flex justify-center items-center space-x-12 lg:space-x-16">
          {logos.map((logoUrl, index) => (
            <div 
              key={index}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <img 
                src={logoUrl} 
                alt={`Logo ${index + 1}`}
                className="h-12 w-auto object-contain max-w-[120px]"
              />
            </div>
          ))}
        </div>

        {/* Mobile layout - vertical */}
        <div className="md:hidden flex flex-col items-center space-y-8">
          {logos.map((logoUrl, index) => (
            <div 
              key={index}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <img 
                src={logoUrl} 
                alt={`Logo ${index + 1}`}
                className="h-12 w-auto object-contain max-w-[120px]"
              />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PressMediaRecognition;