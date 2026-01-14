import React from "react";

export default function LogoSlider({ logoSliderData, loading }) {
  // Default values in case data is not available
  const defaultTitle = "As Seen As";
  const defaultLogos = [
    { name: "AdAge", url: "/home/slider1.jpg" },
    { name: "VOGUE", url: "/home/slider2.jpg" },
    { name: "Forbes", url: "/home/slider3.jpg" },
    { name: "Consensus Miami", url: "/home/slider4.jpg" },
    { name: "Consensus Hong Kong", url: "/home/slider5.jpg" },
    { name: "NFT.NYC", url: "/home/slider6.jpg" },
    { name: "Bitcoin Vegas", url: "/home/slider7.jpg" },
    { name: "Bitcoin Nashville", url: "/home/slider8.jpg" },
  ];

  // Use data from props if available, otherwise use defaults
  const title = logoSliderData?.title || defaultTitle;
  const logos = logoSliderData?.logos?.length > 0 ? logoSliderData.logos.map(logo => {
   
    let imageUrl = logo.url || (logo.formats?.medium?.url || logo.formats?.small?.url || logo.formats?.thumbnail?.url);
    
    // Ensure we use the full Strapi URL if it's a relative path
    if (imageUrl && !imageUrl.startsWith('http')) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      imageUrl = `${strapiUrl}${imageUrl}`;
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

      <div className="w-full">
        <div className="flex h-[60px] md:h-[116px] 2xl:h-[130px] items-center">
          {/* Fixed "AS SEEN IN" section */}
          <div className="flex-shrink-0 bg-black h-full flex items-center justify-center px-8 min-w-[180px] md:min-w-[350px] 2xl:min-w-[400px]">
            <h3 className="font-neue text-[16px] lg:text-[26px] font-bold text-white tracking-wide 2xl:text-[36px]">
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
                    className="flex-shrink-0 flex bg-black items-center justify-center w-[180px] md:w-[350px] h-[60px] md:h-[116px] 2xl:min-h-[130px] border-r border-[#535353]"
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
