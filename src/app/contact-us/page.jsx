"use client";
import React, { useState } from "react";

export default function ContactForm({ bg, heading, desc, isButton }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex justify-center"
      style={{
        backgroundImage: `url("/landing/background2.jpg")`,
        backgroundColor: "#1a1a1a", // Fallback dark color
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 min-h-screen w-full flex flex-col lg:flex-row lg:items-center px-6 md:px-12 lg:px-0 py-12 md:py-16 2xl:py-16">
        {/* Left Side - Title and Sponsors - 50% width on large screens */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-0 lg:px-16 2xl:px-24 mb-8 md:mb-12 lg:mb-0 text-center lg:text-left">
          <h1 className="text-white font-bold leading-tight mb-6 md:mb-8 lg:mb-12 2xl:mb-16">
            <div>
              <span className="text-[32px] md:text-[64px] 2xl:text-[80px]">
                {heading || "Lets Talk"}
              </span>
            </div>
          </h1>

          {desc && (
            <div className="text-white font-medium leading-tight mb-6 md:mb-8 lg:mb-12 2xl:mb-16">
              <span className="text-lg md:text-xl 2xl:text-3xl">{desc}</span>
            </div>
          )}

          {/* Sponsors Image or Button */}
          <div className="flex justify-center lg:justify-start max-w-sm md:max-w-md lg:max-w-xl 2xl:max-w-4xl mx-auto lg:mx-0">
            {!isButton ? (
              <img
                src="/contact/1.png"
                alt="Sponsors"
                className="w-full h-auto filter brightness-0 invert opacity-80"
              />
            ) : (
              <button
                href={"#"}
                className="bg-[#E7F0D3] border-1 border-[#B5BF9E] rounded-[10px] w-fit hover:opacity-90 transition-opacity text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[24px] py-[8px] px-[16px] sm:py-[10px] sm:px-[20px] md:py-[10px] md:px-[20px] lg:py-[12px] lg:px-[25px] xl:py-[15px] xl:px-[30px] 2xl:py-[24px] 2xl:px-[48px]"
              >
                Learn More
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Contact Form - 50% width on large screens */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-0 lg:px-8 xl:px-12 2xl:px-16">
          <div className="w-full max-w-none space-y-4 md:space-y-5 2xl:space-y-6">
            {/* First Name and Last Name Row - Each takes 50% of the form width */}
            <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-5 2xl:gap-6 space-y-4 sm:space-y-0">
              <div className="w-full h-[56px] 2xl:h-[80px] sm:w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-[#D5D5D5] h-full rounded-[12px] w-full p-[10px] md:pl-[30px] text-base md:text-[16px] 2xl:text-xl placeholder:text-base placeholder:md:text-[16px] placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm border-none text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <div className="w-full h-[56px] 2xl:h-[80px] sm:w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-[#D5D5D5] h-full rounded-[12px] w-full p-[10px] md:pl-[30px] text-base md:text-[16px] 2xl:text-xl placeholder:text-base placeholder:md:text-[16px] placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm border-none text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
            </div>

            {/* Email Field - Full width of the form */}
            <div className="w-full h-[56px] 2xl:h-[80px]">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#D5D5D5] rounded-[12px] h-full w-full p-[10px] md:pl-[30px] 2xl:px-6 2xl:py-5 text-base md:text-[16px] 2xl:text-xl placeholder:text-base placeholder:md:text-[16px] placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm  text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            {/* Message Field - Full width of the form */}
            <div className="w-full h-[193px] 2xl:h-[250px]">
              <textarea
                name="message"
                placeholder="Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="border border-[#D5D5D5] h-full rounded-[12px] w-full p-[10px] md:pl-[30px] 2xl:px-6 2xl:py-5 text-base md:text-[16px] 2xl:text-xl placeholder:text-base placeholder:md:text-[16px] placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-[#141414] focus:outline-none focus:ring-2 focus:ring-white/50 resize-none min-h-[120px] md:min-h-[140px] 2xl:min-h-[200px]"
                required
              ></textarea>
            </div>

            {/* Submit Button - Full width of the form */}
            <div className="w-full">
              <button
                type="button"
                onClick={handleSubmit}
                className="border-[1px] border-[#000000] rounded-[10px] w-full py-3 px-6 2xl:py-6 2xl:px-12 text-base md:text-lg 2xl:text-2xl bg-[#E7F0D3] hover:bg-[#C5B195] text-[#000000] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
