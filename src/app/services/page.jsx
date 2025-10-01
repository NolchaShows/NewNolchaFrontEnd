"use client";
import Services from "@/components/home/Services";
import LogoSlider from "@/components/home/TextSlider";
import Hero from "@/components/press/Hero";
import ServicesSection from "@/components/services/Explore";
import ImageGallery from "@/components/services/ImageGallery";
import NolchaCard from "@/components/services/NolchaCard";
import VideoSlider from "@/components/services/VideoSlider";
import Header from "@/components/services/Header";
import React, { useEffect, useState } from "react";
import { getServicesPageData } from "@/lib/strapi";
import { 
  processVideosFromStrapi, 
  processLogoSliderFromStrapi,
  processHeaderSectionFromStrapi,
  processServiceSectionFromStrapi,
  processGalleryFromStrapi,
  servicesPageDefaults 
} from "@/utils/servicesPageUtils";

const Page = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setLoading(true);
        const data = await getServicesPageData();
        setServicesData(data);
      } catch (error) {
        console.error('Error fetching services data:', error);
        setServicesData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  // Process data using utility functions
  const videos = processVideosFromStrapi(
    servicesData?.data?.attributes?.videos, 
    servicesPageDefaults.videos
  );
  
  const logoSliderInfo = processLogoSliderFromStrapi(
    servicesData?.data?.attributes?.logo_slider,
    servicesPageDefaults.logoSlider
  );

  const headerSectionData = processHeaderSectionFromStrapi(
    servicesData?.data?.attributes?.header_section,
    servicesPageDefaults.headerSection
  );

  const serviceSectionData = processServiceSectionFromStrapi(
    servicesData?.data?.attributes?.service_section,
    servicesPageDefaults.serviceSection
  );

  // Ensure we always have valid service data
  const safeServiceSectionData = {
    title: serviceSectionData?.title || servicesPageDefaults.serviceSection.title,
    services: (serviceSectionData?.services?.length > 0 && serviceSectionData.services.every(s => s && s.id)) 
      ? serviceSectionData.services 
      : servicesPageDefaults.serviceSection.services
  };

  const galleryData = processGalleryFromStrapi(
    servicesData?.data?.attributes?.gallery
  ) || null; // Will be null if no Strapi data, component will use defaults

  // Debug: Log the processed data
  if (typeof window !== 'undefined') {
    console.log('Debug - servicesData from Strapi:', servicesData);
    console.log('Debug - serviceSectionData processed:', serviceSectionData);
    console.log('Debug - safeServiceSectionData:', safeServiceSectionData);
    console.log('Debug - galleryData from Strapi processing:', galleryData);
    console.log('Debug - galleryData is null (using defaults):', galleryData === null);
    console.log('Debug - galleryData is array with length:', galleryData?.length);
    console.log('Debug - Using services count:', safeServiceSectionData?.services?.length);
    if (safeServiceSectionData?.services?.length > 0) {
      console.log('Debug - First service being used:', safeServiceSectionData.services[0]);
    }
  }

  return (
    <div>
      <VideoSlider videos={videos}/>
      <LogoSlider 
        logoSliderData={logoSliderInfo.logoSliderData} 
        loading={loading}
      />
      <Header 
        headerData={headerSectionData} 
        loading={loading}
      />
      <div className="bg-[#F4F4F4]">
        <Services 
          serviceData={safeServiceSectionData} 
          loading={loading}
        />
      </div>
      <ImageGallery 
        galleryData={galleryData} 
        loading={loading}
      />
      {/* <Hero heading="SERVICES" images={["/experiences/bitcoin/conf.png"]} />
      <div className="px-4 md:px-8 mb-12">
        <div className="relative flex flex-col md:flex-row bg-[#f6f1ea] rounded-2xl overflow-visible">
          <div className="w-full md:w-2/3 p-6 md:p-20 lg:p-30 order-1 md:order-2">
            <p className="text-[#003233] md:text-xl lg:text-2xl 2xl:text-3xl leading-relaxed mb-6 uppercase">
              We partner with innovative brands, organizations, and the world's
              leading blockchain, AI, and crypto conferences — operating at the
              forefront of tech and culture to design, produce, and deliver
              high-impact experiential events.
            </p>
          </div>

          {/* Placeholder div to maintain layout space */}
      {/* <div className="w-full md:w-1/3 order-2 md:order-1 md:opacity-0"></div> */}

      {/* Floating image positioned absolutely */}
      {/* <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 order-2 md:order-1 md:absolute md:left-0 md:top-6 lg:top-8 xl:top-10 md:ml-8 lg:ml-12 xl:ml-15">
            <img
              src={"/services/1.png"}
              alt="Host"
              className="w-full h-full object-cover md:rounded-xl md:shadow-lg"
            />
          </div>
        </div> */}
      {/* </div> */}
      {/* Cards container */}
      {/* <div className="relative z-10 ml-5 mt-10 md:mt-[calc(2.5rem+2.5rem)] lg:mt-[calc(3rem+3.5rem)] xl:mt-[calc(5.5rem+5.5rem)] 2xl:mt-120 mr-5"> */}
      {/* Background layer */}
      {/* <div className="absolute inset-0 bg-[#EBE2D7] h-auto sm:h-[1450px] md:h-[400px] 2xl:h-[550px] mt-20 2xl:mt-28 rounded-2xl -z-10"></div> */}
      {/* Cards grid */}
      {/* <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full max-w-none">
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
        </div> */}
      {/* </div> */}
      {/* <ServicesSection /> */}
    </div>
  );
};

export default Page;
