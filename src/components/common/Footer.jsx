"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Youtube, Linkedin } from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };
  return (
    <div
      className="overflow-hidden px-10 py-16 bg-zinc-100 max-md:px-5"
      data-name="Footer"
    >
      <div className="w-full bg-gray-100 p-8 sm:p-0">
        {/* Large screen layout */}
        <div className="hidden lg:flex w-full max-w-none gap-[70px] xl:gap-[100px] 2xl:gap-[150px] mx-auto">
          {/* Left section - Newsletter signup (1/3 width) */}
          <div className="w-3/7 pr-8 p-8 bg-white rounded-lg">
            <div className="w-full">
              <div className="text-[32px] 2xl:text-[44px] font-bold leading-10 text-neutral-900">
                Subscribe
                <br />
                to our newsletter
              </div>
              <div className="flex justify-center items-center px-6 py-3 mt-10 xl:mt-20 2xl:mt-30 w-full text-base rounded-lg bg-[#EBE2D7]">
                <div className="flex gap-3 justify-between items-center w-full">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-0 rounded-[10px] placeholder:text-[16px] 2xl:placeholder:text-[24px] font-medium text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-[#141414]"
                  />
                  <button
                    onClick={handleSubmit}
                    className="flex-shrink-0 px-4 py-2 leading-none text-black whitespace-nowrap bg-[#E7F0D3] rounded-xl border border-black border-solid hover:bg-[#dde7c7] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Navigation links (2/3 width) */}
          <div className="w-2/3 flex justify-between">
            <div className="flex flex-col space-y-8">
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold text-[#141414] mb-2">
                  BTC Vegas
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className="ml-2 w-[9.33px] h-[8px] opacity-100 rotate-0"
                  />
                </h3>
                <p className="text-[14px] 2xl:text-[24px] text-[[#141414]]">
                  Plan + Go
                </p>
              </div>
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold text-[#141414] mb-2">
                  Upcoming
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className="ml-2 w-[9.33px] h-[8px] opacity-100 rotate-0"
                  />
                </h3>

                <p className="text-[14px] 2xl:text-[24px] text-[#141414]">
                  Plan + Go
                </p>
              </div>
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold text-[#141414] mb-2">
                  Charity Partners
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className="ml-2 w-[9.33px] h-[8px] opacity-100 rotate-0"
                  />
                </h3>

                <p className="text-[14px] 2xl:text-[24px] text-[#141414]">
                  Plan + Go
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-8">
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold text-[#141414] mb-2">
                  Artist
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className="ml-2 w-[9.33px] h-[8px] opacity-100 rotate-0"
                  />
                </h3>

                <p className="text-[14px] 2xl:text-[24px] text-[#141414]">
                  Plan + Go
                </p>
              </div>
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold text-[#141414] mb-2">
                  Press
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className="ml-2 w-[9.33px] h-[8px] opacity-100 rotate-0"
                  />
                </h3>

                <p className="text-[14px] 2xl:text-[24px] text-[#141414]">
                  Plan + Go
                </p>
              </div>
              <div>
                <h3 className="flex items-center text-[18px] 2xl:text-[30px] font-bold text-[#141414] mb-2">
                  Designers
                  <img
                    src="/arrow.svg"
                    alt="arrow"
                    className="ml-2 w-[9.33px] h-[8px] opacity-100 rotate-0"
                  />
                </h3>

                <p className="text-[14px] 2xl:text-[24px] text-[#141414]">
                  Plan + Go
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 border-l-1 px-4 2xl:px-10 border-[#D5D5D5]">
              <img
                src="/footer/yt.svg"
                className="w-12 2xl:w-20 h-12 2xl:h-20 text-[#141414]"
              />
              <img
                src="/footer/linkedin.svg"
                className="w-12 2xl:w-20 h-12 2xl:h-20 text-[#141414]"
              />
            </div>
          </div>
        </div>

        {/* Mobile/smaller screen layout */}
        <div className="lg:hidden w-full mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <div className="w-full">
              <div className="text-3xl font-bold leading-10 text-neutral-900 text-center">
                SUBSCRIBE
                <br />
                TO OUR NEWSLETTER
              </div>
              <div className="flex justify-center items-center px-6 py-3 mt-10 w-full text-base rounded-lg bg-[#EBE2D7]">
                <div className="flex gap-3 justify-between items-center w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-0 font-medium text-neutral-900 bg-transparent border-none outline-none focus:outline-none placeholder:text-neutral-600"
                  />
                  <button
                    onClick={handleSubmit}
                    className="flex-shrink-0 px-4 py-2 leading-none text-black whitespace-nowrap bg-[#E7F0D3] rounded-xl border border-black border-solid hover:bg-[#dde7c7] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation grid */}
          <div className="p-6 ">
            <div className="grid grid-cols-3 gap-20">
              <div className="space-y-4">
                <div className="font-medium text-[#141414]">NolchaBTC</div>
                <div className="font-medium text-[#141414]">
                  Charity Partners
                </div>
                <div className="font-medium text-[#141414]">Experiences</div>
                <div className="font-medium text-[#141414]">Artists</div>
              </div>
              <div className="space-y-4">
                <div className="font-medium text-[#141414]">Press</div>
                <div className="font-medium text-[#141414]">Gallery</div>
                <div className="font-medium text-[#141414]">Contact us</div>
                <div className="font-medium text-[#141414]">Shop</div>
              </div>
              <div className="flex flex-col space-y-4 border-l-1 px-4 border-[#D5D5D5]">
                <img src="/footer/yt.svg" className="w-6 h-6 text-[#141414]" />
                <img
                  src="/footer/linkedin.svg"
                  className="w-6 h-6 text-[#141414]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full text-xl leading-none text-neutral-900">
        <div className="pt-8 w-full">
          <div className="flex flex-wrap gap-10 justify-between items-start w-full">
            <div className="">
              <img
                src="/footer/logo.png"
                className="object-contain max-w-full aspect-[3.57] w-[168px] 2xl:w-[200px]"
                alt="Logo"
              />
              <div className="mt-5 w-full ">
                <div
                  className="text-neutral-900 text-[20px] 2xl:text-[30px]"
                  data-name="1345 Ave of the Americas, 2nd floor, New York, NY 10105"
                >
                  1345 Ave of the Americas, 2nd floor, New York, NY 10105
                </div>
                <div
                  className="mt-2.5 text-neutral-900 text-[20px] 2xl:text-[30px]"
                  data-name="Pr@nolcha.com"
                >
                  Pr@nolcha.com
                </div>
                <div
                  className="mt-2.5 text-neutral-900 text-[20px] 2xl:text-[30px]"
                  data-name="© Copyright Rudy 2024"
                >
                  © Copyright Rudy 2024
                </div>
              </div>
            </div>
            <div className="flex gap-10 items-center min-w-60">
              <Link
                href="#"
                className="self-stretch my-auto text-neutral-900  text-[20px] 2xl:text-[30px]"
                data-name="Terms of Use"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="self-stretch my-auto text-neutral-900  text-[20px] 2xl:text-[30px]"
                data-name="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="self-stretch my-auto text-neutral-900  text-[20px] 2xl:text-[30px]"
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
