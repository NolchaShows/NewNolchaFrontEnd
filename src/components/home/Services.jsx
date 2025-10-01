"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Services = ({ serviceData, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default values in case data is not available
  const defaultTitle = "Explore our services";
  const defaultServices = [
    {
      id: "01",
      title: "Strategy & Event Production",
      description:
        "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
      images: ["/home/services/1.png"],
      layout: "single",
    },
    {
      id: "02",
      title: "Creative & Immersive",
      description:
        "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement.",
      images: ["/home/services/2.png", "/home/services/3.png"],
      layout: "double",
    },
    {
      id: "03",
      title: "Sponsorship Sales and Partner",
      description:
        "We connect innovative brands with the world's most influential events - from blockchain summits",
      images: ["/home/services/4.png", "/home/services/5.png"],
      layout: "stacked",
    },
    {
      id: "04",
      title: "Experience Technology",
      description:
        "From large-scale projection mapping to fully immersive real-world environments, we bring ideas to life with",
      images: ["/home/services/6.png", "/home/services/7.png"],
      layout: "stacked",
    },
    {
      id: "05",
      title: "Sponsorship Sales and Partner",
      description:
        "We connect innovative brands with the world's most influential events — from blockchain summits and tech conferences",
      images: ["/home/services/8.png", "/home/services/9.png"],
      layout: "stacked",
    },
  ];

  // Use data from props if available, otherwise use defaults
  const title = serviceData?.title || defaultTitle;
  const services = (serviceData?.services?.length > 0 ? serviceData.services : defaultServices)
    .filter(service => service && service.id); // Filter out undefined or invalid services

  console.log('Services component - title:', title);
  console.log('Services component - services count:', services.length);
  console.log('Services component - first service:', services[0]);

  // Don't render until we have data or confirmed no data
  if (loading) {
    return (
      <section className="bg-white py-16 lg:py-24 px-4 lg:px-10">
        <div className="max-w-none mx-auto flex items-center justify-center h-[400px]">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const ServiceCard = ({ service }) => {
    // Add validation to prevent errors
    if (!service) {
      console.warn('ServiceCard received undefined service');
      return null;
    }

    const isFirstCard = service.id === "01";
    const isSecondCard = service.id === "02";

    return (
      <div
        className={`bg-[#F4F4F4] hover:bg-[#E5ECD6] transition-colors duration-300 rounded-2xl p-6 lg:p-8 flex flex-col ${
          isFirstCard || isSecondCard ? "min-h-full" : ""
        }`}
      >
        {service.id === "03" || service.id === "04" || service.id === "05" ? (
          <>
            {/* Number Badge + Title in same row */}
            <div className="flex items-start gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-full w-[43px] h-[43px] flex items-center justify-center relative flex-shrink-0">
                <span className="text-lg font-medium text-black -tracking-[0.54px]">
                  {service.id}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="uppercase text-2xl lg:text-[26px] font-bold leading-[31px] -tracking-[0.78px] text-black">
                  {service.title.includes("Technology") ? (
                    <>
                      Experience
                      <br />
                      Technology
                    </>
                  ) : service.title.includes("Partner") ? (
                    <>
                      Sponsorship Sales
                      <br />
                      and Partner
                    </>
                  ) : (
                    service.title
                  )}
                </h3>
              </div>
            </div>
            {/* Description aligned with title */}
            <div className="ml-[67px] mb-8">
              <p className="text-base 2xl:text-2xl font-normal text-black font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
                {service.description}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Number Badge */}
            <div className="relative flex items-start mb-6">
              <div className="bg-white border border-gray-200 rounded-full w-[43px] h-[43px] flex items-center justify-center relative">
                <span className="text-lg font-medium text-black -tracking-[0.54px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
                  {service.id}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row gap-5 mb-2 lg:mb-8 flex-grow">
              <div className="lg:w-[245px] flex-shrink-0">
                <h3 className="uppercase text-2xl lg:text-[26px] font-bold leading-[31px] -tracking-[0.78px] text-black mb-4 lg:mb-6">
                  {service.title.includes("&") ? (
                    <>
                      {service.title.split("&")[0].trim()} &<br />
                      {service.title.split("&")[1].trim()}
                    </>
                  ) : (
                    service.title
                  )}
                </h3>
              </div>
              <div className="flex-1">
                <p className="text-base 2xl:text-2xl text-black font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
                  {service.description}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Images */}
        {service.layout === "single" && (
          <>
            {/* Large screens */}
            <div className="hidden lg:block w-full">
              <img
                src={service.images[0]}
                alt={service.title}
                className="w-full aspect-[1.81] object-cover rounded-2xl"
              />
            </div>
            {/* Small/Medium screens */}
            <div className="block lg:hidden w-full">
              <img
                src={service.images[0]}
                alt={service.title}
                className="w-full aspect-[1.2] object-cover rounded-2xl"
              />
            </div>
          </>
        )}

        {service.layout === "double" && (
          <>
            {/* Large screens - side by side */}
            <div className="hidden lg:flex gap-2.5 w-full">
              {service.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${service.title} ${index + 1}`}
                  className="flex-1 aspect-[0.89] object-cover rounded-2xl min-w-0"
                />
              ))}
            </div>
            {/* Small/Medium screens - stacked */}
            <div className="lg:hidden space-y-2.5 w-full">
              {service.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${service.title} ${index + 1}`}
                  className="w-full aspect-[2.2] object-cover rounded-2xl"
                />
              ))}
            </div>
          </>
        )}

        {service.layout === "stacked" && (
          <div className="space-y-2.5 w-full">
            {service.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${service.title} ${index + 1}`}
                className="w-full aspect-[2.2] object-cover rounded-2xl"
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white py-16 lg:py-24 px-4 lg:px-10">
      <div className="max-w-none mx-auto">
        {/* Title */}
        <h2 className="text-center uppercase text-4xl lg:text-[52px] font-bold leading-tight -tracking-[1.56px] text-black mb-12 lg:mb-[50px]">
          {title}
        </h2>

        {/* Large Screens - Grid Layout */}
        <div className="hidden lg:block">
          {/* First Row - Two Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <ServiceCard service={services[0]} />
            <ServiceCard service={services[1]} />
          </div>

          {/* Second Row - Three Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {services.slice(2).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Small and Medium Screens - Slider */}
        <div className="lg:hidden flex flex-col gap-[30px]">
          {/* Slider Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service) => (
                <div key={service.id} className="w-full flex-shrink-0 px-2">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-[12px]">
            <button onClick={prevSlide} aria-label="Previous slide">
              <motion.img
                src="/left_dark.png"
                className="cursor-pointer w-[36px] h-[36px] 2xl:h-[70px] 2xl:w-[70px]"
                whileTap={{ scale: 0.9 }}
              />
            </button>

            <button onClick={nextSlide} aria-label="Next slide">
              <motion.img
                src="/right_dark.png"
                className="cursor-pointer w-[36px] h-[36px] 2xl:h-[70px] 2xl:w-[70px]"
                whileTap={{ scale: 0.9 }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;