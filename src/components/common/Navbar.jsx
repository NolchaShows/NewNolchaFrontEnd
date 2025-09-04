"use client";
import React, { useState } from "react";
import Link from "next/link";
import EventModal from "../Modals/EventModal";
import InnerCircleModal from "../Modals/InnerCircleModal";

function Navbar() {
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isCharityPartnersOpen, setIsCharityPartnersOpen] = useState(false);
  const [isUpcomingModalOpen, setIsUpcomingModalOpen] = useState(false);
  const [isInnerCircleModalOpen, setIsInnerCircleModalOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile dropdown states
  const [mobileDropdowns, setMobileDropdowns] = useState({
    btcVegas: false,
    upcoming: false,
    charityPartners: false,
    experiences: false,
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
      href: "#",
      isModal: true,
      modalType: "upcoming",
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
      label: "Designers",
      href: "/designers",
      subtitle: "Plan + Go",
    },
  ];

  const moreMenuItems = [
    {
      label: "Experiences",
      href: "/experiences",
      hasDropdown: true,
      dropdownType: "experiences",
      subtitle: "Look + Do",
      key: "experiences",
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
    if (modalType === "upcoming") {
      setIsUpcomingModalOpen(true);
    } else if (modalType === "innerCircle") {
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
          className="text-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleModalClick(item.modalType)}
        >
          <div className="font-bold text-black mb-1">{item.label} ▾</div>
          <div className="text-xs text-gray-500">{item.subtitle}</div>
        </div>
      );
    } else if (item.hasDropdown) {
      return (
        <div
          className="relative text-center cursor-pointer hover:opacity-80 transition-opacity"
          onMouseEnter={() => setDropdownState(item.dropdownType, true)}
          onMouseLeave={() => setDropdownState(item.dropdownType, false)}
        >
          <div className="font-bold text-black mb-1">{item.label} ▾</div>
          <div className="text-xs text-gray-500">{item.subtitle}</div>

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
        <Link
          href={item.href}
          className="text-center hover:opacity-80 transition-opacity"
        >
          <div className="font-bold text-black mb-1">{item.label} ▾</div>
          <div className="text-xs text-gray-500">{item.subtitle}</div>
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
              <div className="font-medium text-black text-lg mb-1">
                {item.label}
              </div>
              <div className="text-sm text-gray-500">{item.subtitle}</div>
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
              <div className="font-medium text-black text-lg mb-1">
                {item.label}
              </div>
              <div className="text-sm text-gray-500">{item.subtitle}</div>
            </div>
            <span
              className={`text-2xl text-gray-400 transition-transform ${
                isExpanded ? "rotate-45" : ""
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
          <div>
            <div className="font-medium text-black text-lg mb-1">
              {item.label}
            </div>
            <div className="text-sm text-gray-500">{item.subtitle}</div>
          </div>
          <span className="text-2xl text-gray-400">+</span>
        </Link>
      );
    }
  };

  return (
    <>
      {/* Sticky Navbar */}
      <div className="sticky top-0 bg-white font-neue` z-40 shadow-sm">
        {/* First Row - Logo and Buttons */}
        <div className="w-full max-w-none mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img src="/navbar/logo.svg" className="h-12" alt="NOLCHA" />
            </Link>
          </div>

          {/* Desktop: Search and Buttons, Mobile: Only Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop buttons - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3">
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

              <Link
                href="/lets-talk"
                className="px-6 py-2 border border-black rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Lets Talk
              </Link>

              <Link
                href="/membership"
                className="px-6 py-2 bg-[#E7F0D3] border border-[#B5BF9E] rounded-xl text-sm hover:bg-[#a4af8d] transition-colors"
              >
                Membership
              </Link>
            </div>

            {/* Mobile hamburger menu - only visible on mobile */}
            <img
              src="/navbar/menu.png"
              className="lg:hidden cursor-pointer w-10 h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
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
                className="relative text-center cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <div className="font-bold text-black mb-1">More</div>
                <div className="text-xs text-gray-500">Options</div>

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

              {/* Mobile Menu Items */}
              <nav className="mb-8">
                {allMenuItems.map((item, idx) => (
                  <div key={idx}>{renderMobileMenuItem(item, idx)}</div>
                ))}
              </nav>

              {/* Social Icons */}
              <div className="flex gap-4 mb-8">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3">
                <Link
                  href="/lets-talk"
                  className="block text-center py-3 px-6 border border-black rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Let's Talk
                </Link>
                <Link
                  href="/membership"
                  className="block text-center py-3 px-6 bg-[#E7F0D3] rounded-xl hover:bg-[#a4af8d] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {isUpcomingModalOpen && (
        <EventModal setIsUpcomingModalOpen={setIsUpcomingModalOpen} />
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
