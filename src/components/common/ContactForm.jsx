"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ContactForm = ({ bg, heading, desc, isButton, contactData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  // Dynamic data from Strapi or props fallback
  const dynamicHeading = contactData?.heading || heading || "Lets Talk";
  const dynamicDescription = contactData?.description || desc;
  const dynamicBackgroundImage = contactData?.background_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    }${contactData.background_image.url}`
    : bg || "/landing/background2.jpg";

  const firstNamePlaceholder =
    contactData?.first_name_placeholder || "First Name";
  const lastNamePlaceholder =
    contactData?.second_name_placeholder || "Last Name";
  const emailPlaceholder = contactData?.email_placeholder || "Email";
  const messagePlaceholder = contactData?.message_placeholder || "Message";
  const submitButtonText = contactData?.submit_button_text || "Submit";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setIsLoading(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 5000); // 5s delay
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex justify-center px-0 md:px-[60px] xl:px-[96px] 2xl:px-[150px]"
      style={{
        backgroundImage: `url("${dynamicBackgroundImage}")`,
        backgroundColor: "#1a1a1a", // fallback dark color
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 min-h-screen w-full flex flex-col lg:flex-row lg:items-center mx-10 md:mx-0 py-12 md:py-16 2xl:py-16 gap-[20px]">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mb-8 md:mb-12 lg:mb-0 text-center md:text-left">
          <h1 className="text-white font-bold leading-tight mb-6 md:mb-8 lg:mb-12 2xl:mb-16">
            <span className="text-[40px] md:text-[64px] 2xl:text-[80px] uppercase">
              {dynamicHeading}
            </span>
          </h1>

          {dynamicDescription && (
            <div className="text-white font-medium leading-tight pr-[20px] mb-6 md:mb-8 lg:mb-12 2xl:mb-16">
              <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[20px] md:text-[20px] 2xl:text-[30px]">
                {dynamicDescription}
              </span>
            </div>
          )}

          <div className="flex justify-center lg:justify-start w-[80%] mx-auto lg:mx-0">
            {!isButton ? (
              <img
                src="/contact/1.png"
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
                  className="h-full rounded-[12px] w-full p-[10px] md:pl-[30px] text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
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
                  className="h-full rounded-[12px] w-full p-[10px] md:pl-[30px] text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
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
                className="rounded-[12px] h-full w-full p-[10px] md:pl-[30px] 2xl:px-6 2xl:py-5 text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            {/* Message */}
            <div className="w-full h-[193px] 2xl:h-[250px]">
              <textarea
                name="message"
                placeholder={messagePlaceholder}
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="h-full rounded-[12px] w-full p-[10px] md:pl-[30px] 2xl:px-6 2xl:py-5 text-base md:text-[16px] 2xl:text-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50 resize-none min-h-[120px] md:min-h-[140px] 2xl:min-h-[200px]"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="w-full">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`
    border-[1px] border-[#000000]
    rounded-[10px]
    w-full
    py-3 px-6 2xl:py-6 2xl:px-12
    text-[16px]
    2xl:text-[24px]
    font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]
    font-medium
    bg-[#E7F0D3]
    hover:bg-[#C5B195]
    text-[#000000]
    transition-colors duration-200
    flex justify-center items-center
  `}
              >
                {isLoading ? (
                  <div className="linear-loader"></div>
                ) : isSuccess ? (
                  <span className="text-white text-2xl">✔</span>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

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
