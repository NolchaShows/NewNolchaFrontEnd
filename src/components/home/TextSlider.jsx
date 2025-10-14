import React from "react";

export default function LogoSlider({ logoSliderData, loading }) {
  // Default values in case data is not available
  const defaultTitle = "AS SEEN IN";
  const defaultLogos = [
    { name: "AdAge", url: "/home/slider1.png" },
    { name: "VOGUE", url: "/home/slider2.png" },
    { name: "Forbes", url: "/home/slider3.png" },
  ];

  // Use data from props if available, otherwise use defaults
  const title = logoSliderData?.title || defaultTitle;
  const logos = logoSliderData?.logos?.length > 0 ? logoSliderData.logos.map(logo => {
   
    let imageUrl = logo.url || (logo.formats?.medium?.url || logo.formats?.small?.url || logo.formats?.thumbnail?.url);
    
    // Only prepend Strapi URL if the image URL doesn't start with / (meaning it's not from public folder)
    // and it's a relative Strapi path (starts with /uploads/)
    if (imageUrl && imageUrl.startsWith('/uploads/')) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';
      imageUrl = strapiUrl ? `${strapiUrl}${imageUrl}` : imageUrl;
    }
    
    
    
    return {
      name: logo.name || logo.alternativeText || logo.caption || 'Logo',
      url: imageUrl
    };
  }) : defaultLogos;

  // Don't render until we have data or confirmed no data
  if (loading) {
    return (
      <div className="w-full bg-white border-t border-gray-200 h-[60px] md:h-[116px] 2xl:h-[130px] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  const duplicatedLogos = [
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
    ...logos,
  ];

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
        <div className="flex h-[60px] md:h-[116px] 2xl:h-[130px] items-center">
          {/* Fixed "AS SEEN IN" section */}
          <div className="flex-shrink-0 bg-gray-50 h-full flex items-center justify-center px-8 border-r border-gray-200 min-w-[180px] md:min-w-[350px] 2xl:min-w-[400px]">
            <h3 className="font-neue text-[16px] lg:text-[26px] font-bold text-gray-800 tracking-wide 2xl:text-[36px]">
              {title}
            </h3>
          </div>

          {/* Sliding logos container */}
          <div className="flex-1 relative overflow-hidden h-full">
            <div className="absolute inset-0 flex items-center">
              <div
                className="flex items-center animate-slide"
                style={{
                  width: `${duplicatedLogos.length * 350}px`, // adjust total width
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 flex border border-white bg-black items-center justify-center w-[180px] md:w-[350px] h-[60px] md:h-[116px] 2xl:min-h-[130px] rounded-md"
                  >
                    {logo.url ? (
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="h-full w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
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
