import React from "react";

const Hero = ({
  id,
  title,
  headline,
  description,
  image1,
  image2,
  capabilities,
}) => {
  return (
    <div className="bg-gray-50 p-6 lg:p-8 2xl:p-12 rounded-2xl  max-w-7xl 2xl:max-w-none mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 2xl:mb-12">
        {title && (
          <div className="bg-[#E7F0D3] px-6 py-3 2xl:px-8 2xl:py-4">
            <h1 className="text-lg lg:text-xl 2xl:text-3xl font-bold text-black tracking-wide uppercase">
              {title}
            </h1>
          </div>
        )}
        <img
          src="/services/share.png"
          alt="Share"
          className="w-8 h-8 2xl:w-14 2xl:h-14 cursor-pointer hover:opacity-70 transition-opacity"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16">
        {/* Left Column - Text Content */}
        <div className="space-y-8 2xl:space-y-12">
          {/* Headline */}
          {headline && (
            <h2 className="uppercase text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light text-[#909090] leading-tight">
              {headline}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className="text-base lg:text-lg 2xl:text-2xl text-gray-700 leading-relaxed">
              {description}
            </p>
          )}

          {/* Capabilities Section */}
          {capabilities && Object.keys(capabilities).length > 0 && (
            <div className="lg:mt-25 space-y-6 2xl:space-y-8">
              {id != 3 ? (
                <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-light text-[#909090] tracking-wide">
                  CAPABILITIES:
                </h3>
              ) : (
                <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-light text-[#909090] tracking-wide">
                  CORE SERVICES:
                </h3>
              )}

              <div className="space-y-4 2xl:space-y-6">
                {Object.entries(capabilities).map(
                  ([capability, description], index) => {
                    const hasDescription =
                      description && description.trim() !== "";

                    return (
                      <div
                        key={index}
                        className={`grid gap-3 lg:gap-4 2xl:gap-6  2xl:p-2 rounded-lg ${
                          hasDescription
                            ? "grid-cols-1 md:grid-cols-3"
                            : "grid-cols-1"
                        }`}
                      >
                        <div
                          className={`bg-[#EBE2D7] px-4 py-3 2xl:px-6 2xl:py-4 rounded-lg ${
                            hasDescription ? "" : "w-2/3"
                          }`}
                        >
                          <span className="text-sm lg:text-base 2xl:text-xl font-medium text-gray-800">
                            {capability}
                          </span>
                        </div>

                        {hasDescription && (
                          <div className="bg-[#F1EFEF] md:col-span-2 p-4 2xl:flex 2xl:items-center">
                            <span className="text-sm lg:text-base 2xl:text-xl text-gray-700">
                              {description}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Images */}
        {(image1 || image2) && (
          <div className="space-y-6 2xl:space-y-8">
            {/* First Image */}
            {image1 && (
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={image1}
                  alt="Event production showcase"
                  className="w-full h-64 lg:h-100 2xl:h-120 object-cover"
                />
              </div>
            )}

            {/* Second Image */}
            {image2 && (
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={image2}
                  alt="Cultural moment creation"
                  className="w-full h-64 lg:h-100 2xl:h-120 object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
