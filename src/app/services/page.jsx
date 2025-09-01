import Hero from "@/components/press/Hero";
import ServicesSection from "@/components/services/Explore";
import ImageGallery from "@/components/services/ImageGallery";
import NolchaCard from "@/components/services/NolchaCard";
import React from "react";

const Page = () => {
  return (
    <div>
      <Hero heading="SERVICES" images={["/experiences/bitcoin/conf.png"]} />
      <div className="px-4 md:px-8 mb-12">
        <div className="flex flex-col md:flex-row bg-[#f6f1ea] rounded-2xl overflow-hidden">
          <div className="w-full md:w-2/3 p-6 md:p-30 order-1 md:order-2">
            <p className="text-[#0d3d2d] text-sm md:text-xl 2xl:text-3xl leading-relaxed mb-6 uppercase">
              We partner with innovative brands, organizations, and the world’s
              leading blockchain, AI, and crypto conferences — operating at the
              forefront of tech and culture to design, produce, and deliver
              high-impact experiential events.
            </p>
          </div>

          <div className="w-full md:w-1/3 order-2 md:order-1">
            <img
              src={"/services/1.png"}
              alt="Host"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Cards container */}
      <div className="relative z-10 ml-5 mr-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full max-w-none">
        <NolchaCard
          image="/services/2.png"
          description="From vision to execution, we create cultural"
        />
        <NolchaCard
          image="/services/3.png"
          description="From vision to execution, we create cultural"
        />
        <NolchaCard
          image="/services/4.png"
          description="From vision to execution, we create cultural"
        />
      </div>
      <ServicesSection/>
      <ImageGallery/>
    </div>
  );
};

export default Page;
