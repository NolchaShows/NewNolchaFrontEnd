"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SectionTitle from "./SectionTitle";

const ContactForm = ({ bg, heading, desc, isButton, contactData, videoSrc }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState(new Set());

  const router = useRouter();

  const services = [
    "Events",
    "Collaboration",
    "Partnership",
    "Event Planning",
    "Merch",
    "Customer Support"
  ];

  const handleServiceClick = (service) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(service)) {
        newSet.delete(service);
      } else {
        newSet.add(service);
      }
      return newSet;
    });
  };

  const buildMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://new-nolcha-strapi-uiai.onrender.com"}${url}`;
  };

  // Dynamic data from Strapi or props fallback
  const dynamicHeading = contactData?.heading || heading || "Lets Talk";
  const dynamicDescription = contactData?.description || desc;
  const dynamicBackgroundImage = contactData?.background_image?.url
    ? buildMediaUrl(contactData.background_image.url)
    : bg || "/landing/background2.jpg";
  const dynamicVideoSrc = buildMediaUrl(contactData?.video?.url) || videoSrc;
  const dynamicSponsorsImage =
    buildMediaUrl(
      contactData?.sponsors_image?.url ||
        contactData?.sponsorsImage?.url ||
        contactData?.sponsors_logo?.url ||
        contactData?.sponsorsLogo?.url
    ) || "/contact/1.webp";

  const firstNamePlaceholder =
    contactData?.first_name_placeholder || "First Name";
  const lastNamePlaceholder =
    contactData?.second_name_placeholder || "Last Name";
  const emailPlaceholder = contactData?.email_placeholder || "Email";
  const messagePlaceholder = contactData?.message_placeholder || "Message";
  const submitButtonText = contactData?.submit_button_text || "Let's Talk";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsSuccess(false);
    setSubmitError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://new-nolcha-strapi-uiai.onrender.com"}/api/contact/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setIsSuccess(true);
      setSubmitError("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setIsSuccess(false);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="bg-cover bg-center bg-no-repeat relative flex justify-center page-container scroll-mt-[88px] lg:scroll-mt-[156px]"
      style={{
        backgroundImage: dynamicVideoSrc ? undefined : `url("${dynamicBackgroundImage}")`,
        backgroundColor: "#1a1a1a", // fallback dark color
      }}
    >
      {dynamicVideoSrc && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={dynamicVideoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center gap-[26px] lg:gap-[68px] 2xl:gap-[120px]">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center md:text-left">
          <SectionTitle className="text-white mb-[20px] lg:mb-[30px] 2xl:mb-[40px] xxl:mb-[50px] 3xl:mb-[80px]" >{dynamicHeading}</SectionTitle>

          {/* Service Buttons Grid */}
          {/* <div className="flex flex-wrap gap-[7px] lg:gap-[10px] 2xl:gap-[18px] title-spacing">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleServiceClick(service)}
                className={`rounded-full py-2 px-4 lg:px-6 lg:py-3 2xl:py-5 2xl:px-10 border transition-all text-[11px] lg:text-[16px] 2xl:text-[28px] font-medium whitespace-nowrap ${selectedServices.has(service)
                    ? 'bg-[#CAD533] text-black border-[#CAD533]'
                    : 'bg-white text-black border-[#CAD533] hover:opacity-90'
                  }`}
              >
                {service}
              </button>
            ))}
          </div> */}

          {dynamicDescription && (
            <div className="text-white font-medium leading-tight pr-[20px] mb-6 md:mb-8 lg:mb-12 2xl:mb-16">
              <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[20px] md:text-[20px] 2xl:text-[30px]">
                {dynamicDescription}
              </span>
            </div>
          )}
          
          <p className="text-white text-[16px] lg:text-[24px] 2xl:text-[30px] font-bold mb-6 lg:mb-10 2xl:mb-[70px]">You're in great company.</p>

          <div className="flex justify-center lg:justify-start">
            {!isButton ? (
              <img
                src={dynamicSponsorsImage}
                alt="Sponsors"
                className="w-full h-auto filter brightness-0 invert"
              />
            ) : (
              <button
                onClick={() => router.push("/contact-us")}
                className="bg-[#E7F0D3] cursor-pointer border-1 border-[#B5BF9E] rounded-[10px] w-fit hover:opacity-90 transition-opacity text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[24px] py-3 px-6 2xl:py-6 2xl:px-12"
              >
                Learn More
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="w-full max-w-none space-y-4 md:space-y-5 2xl:space-y-6">
            {/* First/Last Name */}
            <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-5 2xl:gap-6 space-y-4 sm:space-y-0">
              <div className="w-full h-[56px] 2xl:h-[80px] sm:w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder={firstNamePlaceholder}
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-full rounded-lg w-full p-[10px] md:pl-[30px] text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <div className="w-full h-[56px] 2xl:h-[80px] sm:w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder={lastNamePlaceholder}
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-full rounded-lg w-full p-[10px] md:pl-[30px] text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full h-[56px] 2xl:h-[80px]">
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg h-full w-full p-[10px] md:pl-[30px] 2xl:px-6 2xl:py-5 text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            {/* Message */}
            <div className="w-full">
              <textarea
                name="message"
                placeholder={messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="rounded-lg h-[100px] lg:h-[133px] 2xl:h-[166px] w-full p-[10px] md:pl-[30px] md:pt-[16px] 2xl:px-6 2xl:py-5 text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                required
              />
            </div>

            {/* Submit */}
            <div className="w-full">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`
                border-[1px] border-primary
                rounded-lg
                w-full
                py-3 px-6 2xl:py-6 2xl:px-12
                min-h-[56px] 2xl:min-h-[80px]
                text-[16px]
                2xl:text-[24px]
                font-medium
                bg-primary
                hover:bg-primary/80
                text-black
                transition-colors duration-200
                flex justify-center items-center
              `}
              >
                {isLoading ? (
                  <div className="linear-loader"></div>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {(isSuccess || submitError) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-[560px] rounded-2xl border border-white/20 bg-[#0F0F0F] p-6 md:p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-black text-2xl font-bold">
              {isSuccess ? "✓" : "!"}
            </div>
            <h3 className="text-white text-[24px] md:text-[30px] font-bold mb-3">
              {isSuccess ? "Thank You" : "Submission Failed"}
            </h3>
            <p className="text-[rgba(253,255,231,0.85)] text-[15px] md:text-[18px]">
              {isSuccess
                ? "Your message has been sent successfully. We will get back to you soon."
                : submitError}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setSubmitError("");
              }}
              className="mt-7 bg-primary text-black font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
  .linear-loader {
    position: relative;
    width: 30px;  /* <-- Width */
    height: 5px;  /* <-- Height */
    background: black;
    border-radius: 3px;
    overflow: hidden;
  }

  .linear-loader::after {
    content: "";
    position: absolute;
    left: -100%;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    animation: linearAnim 1s infinite;
  }

  @keyframes linearAnim {
    0% {
      left: -100%;
    }
    50% {
      left: 0%;
    }
    100% {
      left: 100%;
    }
  }
`}</style>
    </div>
  );
};

export default ContactForm;
