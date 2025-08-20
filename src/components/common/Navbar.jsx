"use client"
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);

  const menuItems = [
    { label: "BTC Vegas", href: "#" },
    { label: "Upcoming", href: "#" },
    { label: "Charity Partners", href: "#" },
    { label: "Experiences", href: "/experiences", hasDropdown: true },
    { label: "Speakers", href: "/speakers" },
    { label: "Artist", href: "/artists" },
    { label: "Press", href: "/press" },
    { label: "Shop", href: "#" },
  ];

  const experiencesDropdown = [
    { label: "VV RACHING WITH JACK BUTCHER", href: "/experiences/vv_raching_with_jack_butcher" },
    { label: "BITCOIN CONFERANCE", href: "/experiences/bitcoin_conferance" },
    { label: "OPENING NIGHT CONSENSUS", href: "/experiences/opening_night_consensus" },
    { label: "CTRL ORDINALS COLLECTION LAUNCH", href: "/experiences/ctrl_ordinals_collection_launch" },
    { label: "NEW YORK FASHION WEEK", href: "/experiences/new_york_fashion_week" },
  ];

  const buttons = [
    {
      label: "Sign in",
      href: "#",
      bg: "bg-[var(--primary-color)]",
    },
    {
      label: "Membership",
      href: "#",
      bg: "bg-[var(--tertiary-color)] border-[var(--secondary-text-color)] border-[1px]",
    },
  ];

  return (
    <div className="py-[20px] md:px-[40px] px-[16px] max-w-[1440px] mx-auto flex justify-between items-center text-[var(--secondary-text-color)]">
      <div className="flex gap-[12px]">
        <img src="/navbar/dropdown.svg" className="lg:hidden cursor-pointer" />
        <Link href={"/"}>
          <img src="/navbar/logo.svg" />
        </Link>
      </div>
      <div className="gap-[20px] hidden lg:flex">
        {menuItems.map((item, idx) => (
          <div key={idx} className="relative">
            {item.hasDropdown ? (
              <div
                className="relative"
                onMouseEnter={() => setIsExperiencesOpen(true)}
                onMouseLeave={() => setIsExperiencesOpen(false)}
              >
                <span className="hover:underline cursor-pointer">
                  {item.label}
                </span>
                
                {/* Dropdown Menu */}
                {isExperiencesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-80 z-50">
                    <div className="bg-white shadow-lg rounded-md border border-gray-200">
                      <div className="py-2">
                        {experiencesDropdown.map((dropdownItem, dropdownIdx) => (
                          <Link
                            key={dropdownIdx}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setIsExperiencesOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="flex md:gap-[10px] gap-[8px]">
        {buttons.map((btn, idx) => (
          <Link
            key={idx}
            href={btn.href}
            className={`${btn.bg} md:py-[12px] md:px-[24px] py-[6px] px-[14px] rounded-[4px]`}
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;