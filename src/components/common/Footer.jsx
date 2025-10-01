"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Youtube, Linkedin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

function Footer() {
  const [email, setEmail] = useState("");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const charityPartnersDropdown = [
    {
      label: "CEREBRAL PALSY FOUNDATION",
      href: "/charity_partners/cerebral_palsy_foundation",
    },
    { label: "MAKE-A-WISH", href: "/charity_partners/make_a_wish" },
    { label: "ST.JUDE", href: "/charity_partners/st_jude" },
  ];

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter an email address");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Email sent successfully! Check your inbox.");
        setEmail("");
      } else {
        setMessage("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  return (
    <div
      className="overflow-hidden px-10 py-16 bg-zinc-100 max-md:px-5"
      data-name="Footer"
    >
      <div className="w-full bg-gray-100 py-8 sm:p-0">
        {/* Large screen layout */}
        <div className="hidden lg:flex w-full max-w-none gap-[70px] xl:gap-[100px] 2xl:gap-[150px] mx-auto">
          {/* Left section - Newsletter signup (1/3 width) */}
          <div className="w-3/7 pr-8 p-8 bg-white rounded-lg">
            <div className="w-full">
              <div
                className="
    text-[32px] 2xl:text-[44px]
    font-bold
    leading-10
    text-neutral-900
  "
              >
                Subscribe
                <br />
                to our newsletter
              </div>

              <div className="flex justify-center items-center px-6 py-3 2xl:py-8 mt-10 xl:mt-20 2xl:mt-30 w-full text-base rounded-lg bg-[#EBE2D7]">
                <div className="flex gap-3 justify-between items-center w-full">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="flex-1 min-w-0 rounded-[10px] placeholder:text-[16px] 2xl:placeholder:text-[24px] font-medium text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-[#141414]"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`flex-shrink-0 px-4 2xl:px-8 py-2 2xl:py-5 2xl:text-2xl leading-none text-black whitespace-nowrap bg-[#E7F0D3] rounded-xl border border-black border-solid transition-colors ${
                      isLoading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-[#dde7c7]'
                    }`}
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
              
              {/* Message display */}
              {message && (
                <div className={`mt-4 text-sm ${
                  message.includes('successfully') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Right section - Navigation links (2/3 width) */}
          <div className="w-2/3 flex justify-between">
            {/* First column */}
            <div className="flex flex-col space-y-8">
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold leading-[120%] text-[#141414] mb-1">
                  BTC Vegas
                </h3>
                <p className="text-[14px] 2xl:text-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] leading-[120%] text-[#141414]">
                  Plan + Go
                </p>
              </div>

              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold leading-[120%] text-[#141414] mb-1">
                  Upcoming
                </h3>
                <p className="text-[14px] 2xl:text-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] leading-[120%] text-[#141414]">
                  Plan + Go
                </p>
              </div>

              {/* Charity Partners with Dropdown - Desktop */}
              <div className="relative group cursor-pointer">
                <div>
                  <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold leading-[120%] text-[#141414] mb-1">
                    Charity Partners
                    <img
                      src="/arrow.svg"
                      alt="arrow"
                      className="ml-2 w-[9.33px] h-[8px] 2xl:w-[16px] 2xl:h-[10px] opacity-100 rotate-0 transition-transform duration-200"
                    />
                  </h3>
                  <p className="text-[14px] 2xl:text-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] leading-[120%] text-[#141414]">
                    Plan + Go
                  </p>
                </div>

                {/* Dropdown Menu - Desktop */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    {charityPartnersDropdown.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-[14px] 2xl:text-[18px] text-[#141414] hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col space-y-8">
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold leading-[120%] text-[#141414] mb-1">
                  Artist
                </h3>
                <p className="text-[14px] 2xl:text-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] leading-[120%] text-[#141414]">
                  Plan + Go
                </p>
              </div>

              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold leading-[120%] text-[#141414] mb-1">
                  Press
                </h3>
                <p className="text-[14px] 2xl:text-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] leading-[120%] text-[#141414]">
                  Plan + Go
                </p>
              </div>

              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold leading-[120%] text-[#141414] mb-1">
                  Designers
                </h3>
                <p className="text-[14px] 2xl:text-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] leading-[120%] text-[#141414]">
                  Plan + Go
                </p>
              </div>
            </div>

            {/* Social icons column */}
            <div className=" 2xl:px-10">
              <div className="flex px-4 space-y-4  flex-col border-l border-[#D5D5D5]">
                <img
                  src="/footer/yt.svg"
                  alt="YouTube"
                  className="w-12 2xl:w-20 h-12 2xl:h-20 cursor-pointer"
                  onClick={()=>window.open("https://x.com/nolchashows", "_blank")}
                  />
                <img
                  src="/footer/linkedin.svg"
                  alt="LinkedIn"
                  className="w-12 2xl:w-20 h-12 2xl:h-20 cursor-pointer"
                  onClick={()=>window.open("https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.nolcha.com%2Fcontent-for-swiper-with-popup%2Fart-basel-2025-xw6ct", "_blank")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/smaller screen layout */}
        <div className="lg:hidden w-full mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <div className="w-full">
              <div className="text-[32px] font-bold leading-10 text-[#141414] text-left">
                Subscribe
                <br />
                To Our Newsletter
              </div>
              <div className="flex justify-center items-center px-6 py-3 mt-10 w-full text-base rounded-lg bg-[#F4F4F4]">
                <div className="flex gap-3 justify-between items-center w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="flex-1 min-w-0 font-medium text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-neutral-600"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] flex-shrink-0 px-4 py-2 leading-none text-black whitespace-nowrap bg-[#E7F0D3] rounded-xl border border-[#B5BF9E] border-solid transition-colors ${
                      isLoading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-[#dde7c7]'
                    }`}
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
              
              {/* Message display for mobile */}
              {message && (
                <div className={`mt-4 text-sm ${
                  message.includes('successfully') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Mobile navigation grid */}
          <div className="p-6">
            <div className="flex gap-[30px]">
              <div className="space-y-6 flex-1">
                {/* BTC Vegas */}
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[18px] text-[#141414]">
                      BTC Vegas
                    </span>
                  </div>
                  <div className="text-sm text-[#666] mt-1">Plan + Go</div>
                </div>

                {/* Upcoming */}
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[18px] text-[#141414]">
                      Upcoming
                    </span>
                  </div>
                  <div className="text-sm text-[#666] mt-1">Plan + Go</div>
                </div>

                {/* Charity Partners with Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleMobileDropdown}
                    className="flex items-center w-full text-left"
                  >
                    <span className="font-bold text-[18px] text-[#141414]">
                      Charity Partners
                    </span>
                    <img
                      src="/arrow.svg"
                      alt="arrow"
                      className="ml-2 w-[9.33px] h-[8px] 2xl:w-[16px] 2xl:h-[10px] opacity-100 rotate-0 transition-transform duration-200"
                    />
                  </button>
                  <div className="text-sm text-[#666] mt-1">Plan + Go</div>

                  {/* Mobile Dropdown Menu */}
                  {isMobileDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {charityPartnersDropdown.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block text-sm text-[#666] hover:text-[#141414] transition-colors"
                          onClick={() => setIsMobileDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 flex-1">
                {/* Artist */}
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[18px] text-[#141414]">
                      Artist
                    </span>
                  </div>
                  <div className="text-sm text-[#666] mt-1">Plan + Go</div>
                </div>

                {/* Press */}
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[18px] text-[#141414]">
                      Press
                    </span>
                  </div>
                  <div className="text-sm text-[#666] mt-1">Plan + Go</div>
                </div>

                {/* Designers */}
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[18px] text-[#141414]">
                      Designers
                    </span>
                  </div>
                  <div className="text-sm text-[#666] mt-1">Plan + Go</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full text-xl leading-none text-neutral-900">
        <div className="pt-8 w-full">
          <div className="flex flex-wrap gap-10 justify-between items-start w-full">
            <div className="text-center md:text-left">
              <img
                src="/footer/logo.png"
                className="object-contain max-w-full aspect-[3.57] w-[168px] 2xl:w-[200px] mx-auto md:mx-0"
                alt="Logo"
              />
              <div className="mt-5 w-full">
                <div
                  className="text-[20px] 2xl:text-[30px] font-[400] text-[#141414]"
                  data-name="1345 Ave of the Americas, 2nd floor, New York, NY 10105"
                >
                  1345 Ave of the Americas, 2nd floor, New York, NY 10105
                </div>
                <div
                  className="mt-2.5 text-[20px] 2xl:text-[30px] font-[400] text-[#141414]"
                  data-name="Pr@nolcha.com"
                >
                  Pr@nolcha.com
                </div>
                <div
                  className="mt-2.5 text-[20px] 2xl:text-[30px] font-[400] text-[#141414]"
                  data-name="© Copyright Rudy 2024"
                >
                  © Copyright Rudy 2024
                </div>
              </div>
            </div>
            <div className="flex gap-10 items-center min-w-60">
              <Link
                href="/terms-of-use"
                className="self-stretch my-auto text-[20px] font-[400] text-[#141414]"
                data-name="Terms of Use"
              >
                Terms of Use
              </Link>
              <Link
                href="/privacy-policy"
                className="self-stretch my-auto text-[20px] font-[400] text-[#141414]"
                data-name="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="self-stretch my-auto text-[20px] font-[400] text-[#141414]"
                data-name="cookies"
              >
                cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;