"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import EventModal from "../Modals/EventModal";
import InnerCircleModal from "../Modals/InnerCircleModal";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isCharityPartnersOpen, setIsCharityPartnersOpen] = useState(false);
  const [isInnerCircleModalOpen, setIsInnerCircleModalOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shareRef = useRef(null);
  const mobileShareRef = useRef(null);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);

  const router = useRouter();
  // Mobile dropdown states
  const [mobileDropdowns, setMobileDropdowns] = useState({
    btcVegas: false,
    upcoming: false,
    charityPartners: false,
    experiences: false,
  });

    // Share functions
    const handleTwitterShare = () => {
      window.open('https://x.com/nolchashows', '_blank');
    };

  const visibleMenuItems = [
    {
      label: "Bitcoin Vegas",
      href: "#",
      subtitle: "Flagship Event",
      key: "btcVegas",
    },
    {
      label: "Upcoming",
      href: "/upcoming",
      subtitle: "Join Us + Explore",
      key: "upcoming",
    },
    {
      label: "Charity",
      href: "#",
      hasDropdown: true,
      dropdownType: "charityPartners",
      subtitle: "Giving Back + Purpose",
      key: "charityPartners",
    },
    {
      label: "Experiences",
      href: "/experiences",
      hasDropdown: true,
      dropdownType: "experiences",
      subtitle: "Immersive + Connect",
      key: "experiences",
    },
    {
      label: "Press",
      href: "/press",
      subtitle: "News + Coverage",
      hasDropdown: true,
      dropdownType: "press",
      key: "press",
    },
    {
      label: "Creative Circle",
      href: "/creative-circle",
      hasDropdown: true,
      key: "creativeCircle",
    },
  ];

  const moreMenuItems = [
    {
      label: "Designers",
      href: "/designers",
      subtitle: "Plan + Go",
    },
    {
      label: "Speakers",
      href: "/speakers",
      subtitle: "Look + Do",
    },
    {
      label: "Shop",
      href: "/shop",
      subtitle: "Look + Do",
    },
    {
      label: "Contact",
      href: "/contact-us",
      subtitle: "Look + Do",
    },
    {
      label: "Gallery",
      href: "/gallery",
      subtitle: "Look + Do",
    },
    {
      label: "Services",
      href: "/services",
      subtitle: "Look + Do",
    },
    {
      label: "Join the Inner Circle",
      href: "#",
      isModal: true,
      modalType: "innerCircle",
      subtitle: "Look + Do",
    },
  ];

  const allMenuItems = [...visibleMenuItems, ...moreMenuItems];

  const experiencesDropdown = [
    {
      label: "VV RACHING WITH JACK BUTCHER",
      href: "/experiences/vv_raching_with_jack_butcher",
    },
    { label: "BITCOIN CONFERANCE", href: "/experiences/bitcoin_conferance" },
    {
      label: "OPENING NIGHT CONSENSUS",
      href: "/experiences/opening_night_consensus",
    },
    {
      label: "CTRL ORDINALS COLLECTION LAUNCH",
      href: "/experiences/ctrl_ordinals_collection_launch",
    },
    {
      label: "NEW YORK FASHION WEEK",
      href: "/experiences/new_york_fashion_week",
    },
  ];

  const charityPartnersDropdown = [
    {
      label: "CEREBRAL PALSY FOUNDATION",
      href: "/charity_partners/cerebral_palsy_foundation",
    },
    { label: "MAKE-A-WISH", href: "/charity_partners/make_a_wish" },
    { label: "ST.JUDE", href: "/charity_partners/st_jude" },
  ];

  const getDropdownState = (dropdownType) => {
    switch (dropdownType) {
      case "experiences":
        return isExperiencesOpen;
      case "charityPartners":
        return isCharityPartnersOpen;
      default:
        return false;
    }
  };

  const setDropdownState = (dropdownType, value) => {
    switch (dropdownType) {
      case "experiences":
        setIsExperiencesOpen(value);
        break;
      case "charityPartners":
        setIsCharityPartnersOpen(value);
        break;
    }
  };

  const getDropdownItems = (dropdownType) => {
    switch (dropdownType) {
      case "experiences":
        return experiencesDropdown;
      case "charityPartners":
        return charityPartnersDropdown;
      default:
        return [];
    }
  };

  const handleModalClick = (modalType) => (e) => {
    e.preventDefault();
    if (modalType === "innerCircle") {
      setIsInnerCircleModalOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const renderDesktopMenuItem = (item, idx) => {
    if (item.isModal) {
      return (
        <div
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleModalClick(item.modalType)}
        >
          <div className="text-center font-bold text-[18px] text-black mb-1 2xl:text-3xl">
            {item.label}
          </div>
          <div
            className="text-[14px] text-[#141414] 2xl:text-xl "
            style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
          >
            {item.subtitle}
          </div>
        </div>
      );
    } else if (item.hasDropdown) {
      return (
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setDropdownState(item.dropdownType, true)}
          onMouseLeave={() => setDropdownState(item.dropdownType, false)}
        >
          <div className="flex flex-1 items-center font-bold text-[18px] text-black mb-1 2xl:text-3xl">
            {item.label}
            <img
              src="/arrow.svg"
              alt="arrow"
              className="ml-2 w-[9.33px] h-[8px] 2xl:w-[16px] 2xl:h-[10px]  opacity-100 rotate-0 transition-transform duration-200"
            />
          </div>

          <div
            className="text-[14px] text-[#141414] 2xl:text-2xl "
            style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
          >
            {item.subtitle}
          </div>

          {getDropdownState(item.dropdownType) && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50 w-64 2xl:w-80">
              <div className="bg-white shadow-lg rounded-md border border-gray-200">
                <div className="py-2">
                  {getDropdownItems(item.dropdownType).map(
                    (dropdownItem, dropdownIdx) => (
                      <Link
                        key={dropdownIdx}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm 2xl:text-xl hover:bg-gray-100 transition-colors duration-200"
                        onClick={() =>
                          setDropdownState(item.dropdownType, false)
                        }
                      >
                        {dropdownItem.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link href={item.href} className="hover:opacity-80 transition-opacity">
          <div
            className="text-left font-bold text-[18px] text-black mb-1 2xl:text-3xl "
          >
            {item.label}
          </div>
          <div
            className="text-[14px] text-[#141414] 2xl:text-2xl "
            style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
          >
            {item.subtitle}
          </div>
        </Link>
      );
    }
  };

  const renderMobileMenuItem = (item, idx) => {
    const isExpanded = item.key && mobileDropdowns[item.key];

    if (item.isModal) {
      return (
        <div className="border-b border-gray-100">
          <div
            className="flex items-center justify-between py-4 cursor-pointer"
            onClick={handleModalClick(item.modalType)}
          >
            <div>
              <div
                className="font-medium text-black text-lg mb-1 "
              >
                {item.label}
              </div>
              <div
                className="text-sm text-gray-500 "
                style={{
                  fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif",
                }}
              >
                {item.subtitle}
              </div>
            </div>
            <span className="text-2xl text-gray-400">+</span>
          </div>
        </div>
      );
    } else if (item.hasDropdown) {
      return (
        <div className="border-b border-gray-100">
          <div
            className="flex items-center justify-between py-4 cursor-pointer"
            onClick={() => toggleMobileDropdown(item.key)}
          >
            <div>
              <div
                className="font-medium text-black text-lg mb-1 "
              >
                {item.label}
              </div>
              <div
                className="text-sm text-gray-500 "
                style={{
                  fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif",
                }}
              >
                {item.subtitle}
              </div>
            </div>
            <span
              className={`text-2xl text-gray-400 transition-transform ${isExpanded ? "rotate-45" : ""
                }`}
            >
              +
            </span>
          </div>

          {/* Expanded dropdown content */}
          {isExpanded && (
            <div className="pb-4 pl-4">
              {getDropdownItems(item.dropdownType).map(
                (dropdownItem, dropdownIdx) => (
                  <Link
                    key={dropdownIdx}
                    href={dropdownItem.href}
                    className="block py-2 text-sm text-gray-600 hover:text-gray-800 "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {dropdownItem.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          href={item.href}
          className="flex items-center justify-between py-4 border-b border-gray-100"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div>
            <div
              className="font-medium text-black text-lg mb-1 "
            >
              {item.label}
            </div>
            <div
              className="text-sm text-gray-500 "
              style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
            >
              {item.subtitle}
            </div>
          </div>
          <span className="text-2xl text-gray-400">+</span>
        </Link>
      );
    }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <div
        className="sticky top-0 bg-[#FFF7E6]  z-40 shadow-sm"
      >
        <div className="w-full mx-auto flex justify-between items-center px-10 py-5">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/navbar/logo.svg"
                className="h-12 2xl:h-20"
                alt="NOLCHA"
              />
            </Link>
          </div>

          <div className="flex items-center gap-[30px]">
            {/* Navigation Links */}
            {/* <div className="flex items-center gap-8">
              {visibleMenuItems.map((item, idx) => (
                <div key={idx} className="relative">
                  {renderDesktopMenuItem(item, idx)}
                </div>
              ))} */}

            {/* More Dropdown */}
            {/* <div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <div className="flex items-center text-black hover:opacity-80 transition-opacity gap-2">
                  <span className="text-lg font-normal">More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M5.61531 8.5L0.945312 0.5H10.2753L5.60531 8.5H5.61531Z" fill="black" />
                  </svg>
                </div>

                {isMoreDropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-[70%] pt-2 z-50 w-64">
                    <div className="bg-white shadow-lg rounded-md border border-gray-200">
                      <div className="py-2">
                        {moreMenuItems.map((item, idx) => (
                          <div key={idx} className="relative">
                            {item.isModal ? (
                              <span
                                className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                                onClick={handleModalClick(item.modalType)}
                              >
                                {item.label}
                              </span>
                            ) : (
                              <Link
                                href={item.href}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => setIsMoreDropdownOpen(false)}
                              >
                                {item.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
            {/* </div> */}

            {/* Right Side - Buttons and Social Icons */}
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center">
                {/* Lets Talk Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (!el) return;
                    const nav = document.querySelector('.sticky.top-0');
                    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  className="px-[18.5px] 2xl:px-[40px] py-[7.5px] 2xl:py-[15px] bg-[#FF6813] text-xl 2xl:text-[35px] text-white font-medium rounded-full hover:bg-[#FF9640] transition-colors"
                >
                  Lets Talk
                </button>

                {/* Arrow Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (!el) return;
                    const nav = document.querySelector('.sticky.top-0');
                    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  className="w-11 h-11 2xl:w-[78px] 2xl:h-[78px] bg-[#FF6813] rounded-full flex items-center justify-center hover:bg-[#FF9640] transition-colors"
                >
                  {/* Default SVG for smaller screens */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className="block 2xl:hidden">
                    <path d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z" fill="#fff" />
                  </svg>
                  {/* Larger SVG for 2xl screens */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="hidden 2xl:block">
                    <path d="M9.09643 9.42701V12.5289L21.3828 12.5399L7.99648 25.9262L10.1964 28.1261L23.5827 14.7397L23.5937 27.0261L26.6955 27.0261V9.42701H9.09643Z" fill="#fff" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Desktop Menu (hidden on mobile) */}
        <div className="hidden lg:block border-t border-[#C9C9C9] mx-8">
          <div className="w-full max-w-none mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {visibleMenuItems.map((item, idx) => (
                <div key={idx} className="relative">
                  {renderDesktopMenuItem(item, idx)}
                </div>
              ))}

              {/* More Dropdown */}
              <div
                className="relative text-center cursor-pointer"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <div
                  className="font-bold text-left text-black mb-1 2xl:text-3xl "

                >
                  More
                </div>
                <div
                  className="text-[14px] text-[#141414] 2xl:text-2xl "
                  style={{
                    fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif",
                  }}
                >
                  Options
                </div>

                {isMoreDropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-[70%] pt-2 z-50 w-64">
                    <div className="bg-white shadow-lg rounded-md border border-gray-200">
                      <div className="py-2">
                        {moreMenuItems.map((item, idx) => (
                          <div key={idx} className="relative">
                            {item.isModal ? (
                              <span
                                className="block px-4 py-2 text-sm 2xl:text-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer "
                                onClick={handleModalClick(item.modalType)}
                              >
                                {item.label}
                              </span>
                            ) : (
                              <Link
                                href={item.href}
                                className="block px-4 py-2 text-sm 2xl:text-xl hover:bg-gray-100 transition-colors duration-200 "
                                onClick={() => setIsMoreDropdownOpen(false)}
                              >
                                {item.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md h-full shadow-lg overflow-y-auto">
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex justify-between items-center mb-8">
                <img src="/navbar/logo.svg" alt="NOLCHA" className="h-8" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-light cursor-pointer text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="mb-6">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center w-full h-[44px] rounded-[10px] border border-black px-3 mb-4"
                >
                  <div className="flex items-center gap-1 mr-2">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button type="submit" className="ml-2">
                    <svg
                      className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Mobile Menu Items */}
              <nav className="mb-8">
                {allMenuItems.map((item, idx) => (
                  <div key={idx}>{renderMobileMenuItem(item, idx)}</div>
                ))}
              </nav>

              {/* Social Icons */}
              <div className="flex gap-3 mb-8">
                <img src="/x.png" alt="X" className="cursor-pointer w-[21px] h-[21px]" onClick={()=>window.open("https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.nolcha.com%2Fcontent-for-swiper-with-popup%2Fart-basel-2025-xw6ct", "_blank")}/>
                <img src="/insta.png" alt="Instagram" className="cursor-pointer w-[20px] h-[21px]" onClick={()=>window.open("https://instagram.com", "_blank")}/>
                <img src="/linkedIn.png" alt="LinkedIn" className="cursor-pointer w-[21px] h-[21px]" onClick={()=>window.open("https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.nolcha.com%2Fcontent-for-swiper-with-popup%2Fart-basel-2025-xw6ct", "_blank")}/>
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3">
                <Link
                  href="/lets-talk"
                  className="block text-center py-3 px-6 border border-black rounded-xl hover:bg-gray-50 transition-colors "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Let's Talk
                </Link>
                <Link
                  href="/membership"
                  className="block text-center py-3 px-6 bg-[#E7F0D3] rounded-xl hover:bg-[#a4af8d] transition-colors "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {isInnerCircleModalOpen && (
        <InnerCircleModal
          setIsInnerCircleModalOpen={setIsInnerCircleModalOpen}
        />
      )}
    </>
  );
}

export default Navbar;
