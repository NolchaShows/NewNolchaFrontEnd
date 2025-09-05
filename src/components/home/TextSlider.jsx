import React from 'react';

export default function LogoSlider({ logos = [] }) {
  // Default logos if none provided
  const defaultLogos = [
    { name: 'AdAge', url: 'https://via.placeholder.com/200x100/333/fff?text=AdAge' },
    { name: 'Vogue', url: 'https://via.placeholder.com/200x100/333/fff?text=VOGUE' },
    { name: 'Forbes', url: 'https://via.placeholder.com/200x100/333/fff?text=Forbes' },
    { name: 'TechCrunch', url: 'https://via.placeholder.com/200x100/333/fff?text=TechCrunch' },
    { name: 'Wired', url: 'https://via.placeholder.com/200x100/333/fff?text=WIRED' },
    { name: 'Mashable', url: 'https://via.placeholder.com/200x100/333/fff?text=Mashable' }
  ];

  const logoList = logos.length > 0 ? logos : defaultLogos;
  
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logoList, ...logoList, ...logoList];

  return (
    <div className="w-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex h-24 items-center">
        {/* Fixed "AS SEEN IN" section */}
        <div className="flex-shrink-0 bg-gray-50 h-full flex items-center justify-center px-8 border-r border-gray-200 min-w-[200px]">
          <h3 className="text-lg font-bold text-gray-800 tracking-wide">AS SEEN IN</h3>
        </div>
        
        {/* Sliding logos container */}
        <div className="flex-1 relative overflow-hidden h-full">
          <div className="absolute inset-0 flex items-center">
            <div 
              className="flex items-center animate-slide"
              style={{
                width: `${duplicatedLogos.length * 220}px`,
                animation: 'slideLeft 30s linear infinite'
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div 
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 flex border border-white bg-black items-center justify-center h-24 px-6"
                  style={{ minWidth: '200px' }}
                >
                  {logo.url ? (
                    <img 
                      src={logo.url} 
                      alt={logo.name}
                      className="max-h-20 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-gray-600">
                      {logo.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${logoList.length * 192}px);
          }
        }
      `}</style>
    </div>
  );
}
