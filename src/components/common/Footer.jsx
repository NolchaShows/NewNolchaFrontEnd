"use client";
import * as React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div
      className="overflow-hidden px-16 py-16 bg-zinc-100 max-md:px-5"
      data-name="Footer"
    >
      <div className="flex flex-wrap gap-[121px] 2xl:gap-[250px] items-start w-full">
        <div
          className="flex flex-col grow shrink justify-center p-8 bg-white rounded-lg min-w-60 w-full xl:max-w-[500px] 2xl:max-w-[900px] max-md:px-5"
          data-name="Background"
        >
          <div className="w-full">
            <div
              className="text-3xl font-bold leading-10 text-neutral-900"
              data-name="Subscribe to our newsletter"
            >
              Subscribe
              <br />
              to our newsletter
            </div>
            <div
              className="flex flex-col justify-center px-6 py-3 mt-10 w-full text-base rounded-lg bg-[#EBE2D7] max-md:px-5"
              data-name="Background"
            >
              <div className="flex gap-10 justify-between items-center w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="self-stretch my-auto font-medium text-neutral-900 bg-transparent border-none outline-none focus:outline-none flex-1"
                />
                <button
                  className="flex gap-2 justify-center items-center self-stretch px-6 py-3 my-auto leading-none text-black whitespace-nowrap bg-[#E7F0D3] rounded-xl border border-black border-solid max-md:px-5"
                  data-name="Button"
                >
                  <div
                    className="self-stretch my-auto"
                    data-name="Button label"
                  >
                    Send
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile: Two column layout, Desktop: Original layout */}
        <div className="flex flex-wrap items-start min-w-60">
          {/* Mobile: Two column grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full md:hidden">
            <Link href="/upcoming" className="flex flex-col" data-name="Item → Button">
              <div className="flex gap-2 items-center text-[18px] font-bold text-neutral-900">
                <div data-name="BTC Vegas">BTC Vegas ▾</div>
              </div>
              <div className="text-sm text-neutral-900 mt-1 " data-name="Plan + Go">
                Plan + Go
              </div>
            </Link>
            
            <Link href="/artists" className="flex flex-col" data-name="Item → Button">
              <div className="flex gap-2 items-center  text-[18px] font-bold text-neutral-900">
                <div data-name="BTC Vegas">Artist ▾</div>
              </div>
              <div className="text-sm text-neutral-900 mt-1 " data-name="Plan + Go">
                Plan + Go
              </div>
            </Link>
            
            <Link href="/upcoming" className="flex flex-col" data-name="Item → Button">
              <div className="flex gap-2 items-center text-[18px] font-bold text-neutral-900">
                <div data-name="BTC Vegas">Upcoming ▾</div>
              </div>
              <div className="text-sm text-neutral-900 mt-1 " data-name="Plan + Go">
                Plan + Go
              </div>
            </Link>
            
            <Link href="/press" className="flex flex-col" data-name="Item → Button">
              <div className="flex gap-2 items-center  text-[18px] font-bold text-neutral-900">
                <div data-name="BTC Vegas">Press ▾</div>
              </div>
              <div className="text-sm text-neutral-900 mt-1 " data-name="Plan + Go">
                Plan + Go
              </div>
            </Link>
            
            <Link href="/charity_partners" className="flex flex-col" data-name="Item → Button">
              <div className="flex gap-2 items-center text-[18px] font-bold text-neutral-900">
                <div data-name="BTC Vegas">Charity Partners ▾</div>
              </div>
              <div className="text-sm text-neutral-900 mt-1 " data-name="Plan + Go">
                Plan + Go
              </div>
            </Link>
            
            <Link href="/designers" className="flex flex-col" data-name="Item → Button">
              <div className="flex gap-2 items-center  text-[18px] font-bold text-neutral-900">
                <div data-name="BTC Vegas">Designers ▾</div>
              </div>
              <div className="text-sm text-neutral-900 mt-1 " data-name="Plan + Go">
                Plan + Go
              </div>
            </Link>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden md:flex md:flex-wrap md:items-start md:min-w-60 ">
            <div className="flex flex-col items-start leading-none min-w-60 w-[296px] 2xl:w-[500px]">
              <Link href="/upcoming" className="" data-name="Item → Button">
                <div className="flex gap-2 items-center w-full text-[18px] 2xl:text-[30px] font-bold text-neutral-900">
                  <div className="self-stretch my-auto" data-name="BTC Vegas">
                    BTC Vegas ▾
                  </div>
                </div>
                <div className="text-[14px] 2xl:text-[24px] mt-1 2xl:mt-2 text-neutral-900" data-name="Plan + Go">
                  Plan + Go
                </div>
              </Link>
              <Link
                href="/upcoming"
                className="mt-5"
                data-name="Item → Button"
              >
                <div className="flex gap-2 items-center w-full text-[18px] 2xl:text-[30px] font-bold whitespace-nowrap text-neutral-900">
                  <div className="self-stretch my-auto" data-name="BTC Vegas">
                    Upcoming ▾
                  </div>
                </div>
                <div className="text-[14px] 2xl:text-[24px] mt-1  2xl:mt-2 text-neutral-900" data-name="Plan + Go">
                  Plan + Go
                </div>
              </Link>
              <Link
                href="/charity_partners"
                className="mt-5"
                data-name="Item → Button"
              >
                <div className="flex gap-2 items-center w-full text-[18px] 2xl:text-[30px] font-bold text-neutral-900">
                  <div className="self-stretch my-auto" data-name="BTC Vegas">
                    Charity Partners ▾
                  </div>
                </div>
                <div className="text-[14px] 2xl:text-[24px] mt-1  2xl:mt-2 text-neutral-900" data-name="Plan + Go">
                  Plan + Go
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-start leading-none min-w-60 w-[296px] 2xl:w-[400px]">
              <Link href="/artists" data-name="Item → Button">
                <div className="flex gap-2 items-center w-full text-[18px] 2xl:text-[30px] font-bold whitespace-nowrap text-neutral-900">
                  <div className="self-stretch my-auto" data-name="BTC Vegas">
                    Artist ▾
                  </div>
                </div>
                <div className="text-[14px] 2xl:text-[24px] mt-1  2xl:mt-2 text-neutral-900" data-name="Plan + Go">
                  Plan + Go
                </div>
              </Link>
              <Link href="/press" className="mt-5" data-name="Item → Button">
                <div className="flex gap-2 items-center w-full text-[18px] 2xl:text-[30px] font-bold whitespace-nowrap text-neutral-900">
                  <div className="self-stretch my-auto" data-name="BTC Vegas">
                    Press ▾
                  </div>
                </div>
                <div className="text-[14px] 2xl:text-[24px] mt-1  2xl:mt-2 text-neutral-900" data-name="Plan + Go">
                  Plan + Go
                </div>
              </Link>
              <Link
                href="/designers"
                className="mt-5"
                data-name="Item → Button"
              >
                <div className="flex gap-2 items-center w-full text-[18px] 2xl:text-[30px] font-bold whitespace-nowrap text-neutral-900">
                  <div className="self-stretch my-auto" data-name="BTC Vegas">
                    Designers ▾
                  </div>
                </div>
                <div className="text-[14px] 2xl:text-[24px] mt-1  2xl:mt-2 text-neutral-900" data-name="Plan + Go">
                  Plan + Go
                </div>
              </Link>
            </div>
            <div
              className="px-4 py-2 border-l border-solid 2xl:ml-100 border-l-neutral-300 w-[86px]"
              data-name="VerticalBorder"
            >
              <a
                href="#"
                className="flex gap-2.5 items-center p-3.5 w-14 h-14 2xl:w-22 2xl:h-22 bg-white rounded-xl"
                data-name="Background"
              >
                <img
                  src="/footer/yt.svg"
                  className="object-contain flex-1 shrink self-stretch my-auto w-7 aspect-square basis-0"
                  alt="YouTube"
                />
              </a>
              <a
                href="#"
                className="flex gap-2.5 items-center p-3.5 mt-2 2xl:mt-6 w-14 h-14 2xl:w-22 2xl:h-22 bg-white rounded-xl"
                data-name="Background"
              >
                <img
                  src="/footer/linkedin.svg"
                  className="object-contain flex-1 shrink self-stretch my-auto w-7 aspect-square basis-0"
                  alt="LinkedIn"
                />
              </a>
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
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;