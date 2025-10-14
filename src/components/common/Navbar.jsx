"use client";
import React, { useState } from "react";
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

  const router = useRouter();
  // Mobile dropdown states
  const [mobileDropdowns, setMobileDropdowns] = useState({
    btcVegas: false,
    upcoming: false,
    charityPartners: false,
    experiences: false,
    more: false,
  });

  const visibleMenuItems = [
    {
      label: "BTC Vegas",
      href: "#",
      subtitle: "Plan + Go",
      key: "btcVegas",
    },
    {
      label: "Upcoming",
      href: "/upcoming",
      subtitle: "Plan + Go",
      key: "upcoming",
    },
    {
      label: "Charity Partners",
      href: "#",
      hasDropdown: true,
      dropdownType: "charityPartners",
      subtitle: "Plan + Go",
      key: "charityPartners",
    },
    {
      label: "Artist",
      href: "/artists",
      subtitle: "Plan + Go",
    },
    {
      label: "Press",
      href: "/press",
      subtitle: "Plan + Go",
    },
    {
      label: "Experiences",
      href: "/experiences",
      hasDropdown: true,
      dropdownType: "experiences",
      subtitle: "Look + Do",
      key: "experiences",
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

  const renderDesktopMenuItem = (item, idx) => {
    if (item.isModal) {
      return (
        <div
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleModalClick(item.modalType)}
        >
          <div className="flex items-center text-black">
            <span className="text-lg font-normal">{item.label}</span>
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
          <div className="flex items-center text-black hover:opacity-80 transition-opacity gap-2">
            <span className="text-lg font-normal">{item.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="M5.61531 8.5L0.945312 0.5H10.2753L5.60531 8.5H5.61531Z" fill="black" />
            </svg>
          </div>

          {getDropdownState(item.dropdownType) && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50 w-64">
              <div className="bg-white shadow-lg rounded-md border border-gray-200">
                <div className="py-2">
                  {getDropdownItems(item.dropdownType).map(
                    (dropdownItem, dropdownIdx) => (
                      <Link
                        key={dropdownIdx}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
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
          <div className="flex items-center text-black">
            <span className="text-lg font-normal">{item.label}</span>
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
            <div className="flex items-center gap-2">
              <span className="text-lg font-normal text-black">{item.label}</span>
            </div>
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
            <div className="flex items-center gap-2">
              <span className="text-lg font-normal text-black">{item.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path d="M5.61531 8.5L0.945312 0.5H10.2753L5.60531 8.5H5.61531Z" fill="black" />
              </svg>
            </div>
          </div>

          {/* Expanded dropdown content */}
          {isExpanded && (
            <div className="pb-4 pl-4">
              {getDropdownItems(item.dropdownType).map(
                (dropdownItem, dropdownIdx) => (
                  <Link
                    key={dropdownIdx}
                    href={dropdownItem.href}
                    className="block py-2 text-sm text-gray-600 hover:text-gray-800"
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
          <div className="flex items-center gap-2">
            <span className="text-lg font-normal text-black">{item.label}</span>
          </div>
        </Link>
      );
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:block sticky top-0 bg-white z-40 shadow-sm">
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
                <Link
                  href="/contact-us"
                  className="px-[18.5px] py-[7.5px] bg-[#97FC6A] text-xl text-black font-medium rounded-full hover:bg-[#9ED706] transition-colors"
                >
                  Lets Talk
                </Link>

                {/* Arrow Button */}
                <Link
                  href="/membership"
                  className="w-11 h-11 bg-[#97FC6A] rounded-full flex items-center justify-center hover:bg-[#9ED706] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z" fill="#343434" />
                  </svg>
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5">
                {/* X (Twitter) Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none">
                  <path d="M18.9906 12.4141L28.9662 0.860271H24.4102L16.8764 9.58516L10.3551 0.860271H0.945312L12.2013 15.7789L1.54087 28.1367H6.09687L14.3453 18.6078L21.5218 28.1367H30.7231L18.9906 12.4141ZM8.98531 3.48072L25.3333 25.3674H22.8022L6.27553 3.48072H8.98531Z" fill="black" />
                </svg>

                {/* Paper Airplane Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                  <path d="M20.499 22.3181L22.9408 10.8239C23.04 10.3276 22.9805 9.97029 22.7621 9.75191C22.5437 9.53354 22.2559 9.50377 21.8986 9.66258L7.54567 15.1715C7.22804 15.2906 7.00967 15.4295 6.89056 15.5884C6.77145 15.7472 6.7516 15.8961 6.83101 16.035C6.91041 16.174 7.08908 16.2832 7.36701 16.3626L11.0595 17.4941L19.5759 12.1341C19.8141 11.9753 19.9928 11.9455 20.1119 12.0448C20.1913 12.1044 20.1615 12.1838 20.0226 12.283L13.1439 18.5364L12.8759 22.3181C13.134 22.3181 13.3821 22.1891 13.6203 21.931L15.407 20.2039L19.1292 22.9732C19.8439 23.3703 20.3005 23.1519 20.499 22.3181ZM30.5043 15.499C30.5043 17.5239 30.1073 19.4495 29.3132 21.2759C28.5192 23.1023 27.467 24.6904 26.1568 26.0404C24.8466 27.3903 23.2584 28.4424 21.3923 29.1968C19.5263 29.9512 17.6006 30.3482 15.6155 30.3879C13.6303 30.4276 11.7046 30.0306 9.83856 29.1968C7.97249 28.363 6.38434 27.3109 5.07412 26.0404C3.7639 24.7698 2.71175 23.1817 1.91767 21.2759C1.1236 19.3701 0.726562 17.4445 0.726562 15.499C0.726562 13.5535 1.1236 11.6279 1.91767 9.72214C2.71175 7.81636 3.7639 6.22821 5.07412 4.95769C6.38434 3.68717 7.97249 2.63503 9.83856 1.80125C11.7046 0.96747 13.6303 0.570433 15.6155 0.610136C17.6006 0.649841 19.5263 1.04688 21.3923 1.80125C23.2584 2.55562 24.8466 3.60777 26.1568 4.95769C27.467 6.30762 28.5192 7.89577 29.3132 9.72214C30.1073 11.5485 30.5043 13.4741 30.5043 15.499Z" fill="black" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden sticky top-0 bg-white z-40">
        <div className="w-full mx-auto flex justify-between items-center px-5 py-5">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/navbar/logo.svg"
                className="h-10"
                alt="NOLCHA"
              />
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <button
            className="w-10 h-10 bg-[#9ED706] rounded-lg border border-[#B5BF9E] flex items-center justify-center cursor-pointer hover:bg-[#9ED706] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
              <rect x="0.9375" y="5.65234" width="16.7147" height="1.04467" fill="black" stroke="black" stroke-width="1.30887" stroke-linejoin="round" />
              <rect x="9.28906" y="10.8789" width="8.35736" height="1.04467" fill="black" stroke="black" stroke-width="1.30887" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md h-full shadow-lg overflow-y-auto">
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <img
                    src="/navbar/logo.svg"
                    className="h-8"
                    alt="NOLCHA"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-light cursor-pointer text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>

              {/* Mobile Menu Items */}
              {/* <nav className="mb-8">
                {visibleMenuItems.map((item, idx) => (
                  <div key={idx}>{renderMobileMenuItem(item, idx)}</div>
                ))} */}

                {/* More Dropdown in Mobile */}
                {/* <div className="border-b border-gray-100">
                  <div
                    className="flex items-center justify-between py-4 cursor-pointer"
                    onClick={() => toggleMobileDropdown('more')}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-normal text-black">More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M5.61531 8.5L0.945312 0.5H10.2753L5.60531 8.5H5.61531Z" fill="black" />
                      </svg>
                    </div>
                  </div> */}

                  {/* Expanded more dropdown content */}
                  {/* {mobileDropdowns.more && (
                    <div className="pb-4 pl-4">
                      {moreMenuItems.map((item, idx) => (
                        <div key={idx}>
                          {item.isModal ? (
                            <div
                              className="block py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                              onClick={handleModalClick(item.modalType)}
                            >
                              {item.label}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="block py-2 text-sm text-gray-600 hover:text-gray-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </nav> */}

              {/* Social Icons */}
              <div className="flex gap-5 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none" className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => window.open("https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.nolcha.com", "_blank")}>
                  <path d="M18.9906 12.4141L28.9662 0.860271H24.4102L16.8764 9.58516L10.3551 0.860271H0.945312L12.2013 15.7789L1.54087 28.1367H6.09687L14.3453 18.6078L21.5218 28.1367H30.7231L18.9906 12.4141ZM8.98531 3.48072L25.3333 25.3674H22.8022L6.27553 3.48072H8.98531Z" fill="black" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => window.open("https://instagram.com", "_blank")}>
                  <path d="M20.499 22.3181L22.9408 10.8239C23.04 10.3276 22.9805 9.97029 22.7621 9.75191C22.5437 9.53354 22.2559 9.50377 21.8986 9.66258L7.54567 15.1715C7.22804 15.2906 7.00967 15.4295 6.89056 15.5884C6.77145 15.7472 6.7516 15.8961 6.83101 16.035C6.91041 16.174 7.08908 16.2832 7.36701 16.3626L11.0595 17.4941L19.5759 12.1341C19.8141 11.9753 19.9928 11.9455 20.1119 12.0448C20.1913 12.1044 20.1615 12.1838 20.0226 12.283L13.1439 18.5364L12.8759 22.3181C13.134 22.3181 13.3821 22.1891 13.6203 21.931L15.407 20.2039L19.1292 22.9732C19.8439 23.3703 20.3005 23.1519 20.499 22.3181ZM30.5043 15.499C30.5043 17.5239 30.1073 19.4495 29.3132 21.2759C28.5192 23.1023 27.467 24.6904 26.1568 26.0404C24.8466 27.3903 23.2584 28.4424 21.3923 29.1968C19.5263 29.9512 17.6006 30.3482 15.6155 30.3879C13.6303 30.4276 11.7046 30.0306 9.83856 29.1968C7.97249 28.363 6.38434 27.3109 5.07412 26.0404C3.7639 24.7698 2.71175 23.1817 1.91767 21.2759C1.1236 19.3701 0.726562 17.4445 0.726562 15.499C0.726562 13.5535 1.1236 11.6279 1.91767 9.72214C2.71175 7.81636 3.7639 6.22821 5.07412 4.95769C6.38434 3.68717 7.97249 2.63503 9.83856 1.80125C11.7046 0.96747 13.6303 0.570433 15.6155 0.610136C17.6006 0.649841 19.5263 1.04688 21.3923 1.80125C23.2584 2.55562 24.8466 3.60777 26.1568 4.95769C27.467 6.30762 28.5192 7.89577 29.3132 9.72214C30.1073 11.5485 30.5043 13.4741 30.5043 15.499Z" fill="black" />
                </svg>
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3">
                <Link
                  href="/contact-us"
                  className="block text-center py-3 px-6 bg-[#9ED706] text-black font-medium rounded-full hover:bg-[#9ED706] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lets Talk
                </Link>
                <Link
                  href="/membership"
                  className="block text-center flex items-center justify-center py-3 px-6 bg-[#9ED706] text-black font-medium rounded-full hover:bg-[#9ED706] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z" fill="#343434" />
                  </svg>
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
