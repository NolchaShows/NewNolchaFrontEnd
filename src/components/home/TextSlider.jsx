import React from 'react';

export default function LogoSlider({ logos = [
] }) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos,...logos,...logos,...logos,...logos,...logos];

  return (
    <>
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${logos.length * 200}px);
          }
        }
        
        .animate-slide {
          animation: slideLeft 30s linear infinite;
        }
      `}</style>
      
      <div className="w-full bg-white border-t border-gray-200 overflow-hidden">
        <div className="flex h-24 2xl:h-28 items-center">
          {/* Fixed "AS SEEN IN" section */}
          <div className="flex-shrink-0 bg-gray-50 h-full flex items-center justify-center px-8 border-r border-gray-200 min-w-[200px] 2xl:min-w-[270px]">
            <h3 className="text-lg font-bold text-gray-800 tracking-wide 2xl:text-2xl">AS SEEN IN</h3>
          </div>
          
          {/* Sliding logos container */}
          <div className="flex-1 relative overflow-hidden h-full">
            <div className="absolute inset-0 flex items-center">
              <div 
                className="flex items-center animate-slide"
                style={{
                  width: `${duplicatedLogos.length * 200}px`,
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div 
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 flex border border-white bg-black items-center justify-center h-24 2xl:h-28 px-6 min-w-[200px] 2xl:min-w-[270px]"
                  >
                    {logo.url ? (
                      <img 
                        src={logo.url} 
                        alt={logo.name}
                        className="max-h-20 2xl:max-h-28 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-gray-600">
                        {logo.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}