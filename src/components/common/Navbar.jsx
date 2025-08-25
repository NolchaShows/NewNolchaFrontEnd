"use client"
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

  const menuItems = [
    { label: "BTC Vegas", href: "#" },
    { label: "Upcoming", href: "#", isModal: true, modalType: "upcoming" },
    { label: "Charity Partners", href: "#", hasDropdown: true, dropdownType: "charityPartners" },
    { label: "Experiences", href: "/experiences", hasDropdown: true, dropdownType: "experiences" },
    { label: "Speakers", href: "/speakers" },
    { label: "Artist", href: "/artists" },
    { label: "Press", href: "/press" },
    { label: "Shop", href: "#" },
    { label: "Contact", href: "/contact-us" },
    { label: "Designers", href: "/designers" },
    { label: "Gallery", href: "/gallery" },
    { label: "Join the Inner Circle", href: "#", isModal: true, modalType: "innerCircle" },
  ];

  const mainMenuItems = menuItems.slice(0, 8);
  const moreMenuItems = menuItems.slice(8);

  const experiencesDropdown = [
    { label: "VV RACHING WITH JACK BUTCHER", href: "/experiences/vv_raching_with_jack_butcher" },
    { label: "BITCOIN CONFERANCE", href: "/experiences/bitcoin_conferance" },
    { label: "OPENING NIGHT CONSENSUS", href: "/experiences/opening_night_consensus" },
    { label: "CTRL ORDINALS COLLECTION LAUNCH", href: "/experiences/ctrl_ordinals_collection_launch" },
    { label: "NEW YORK FASHION WEEK", href: "/experiences/new_york_fashion_week" },
  ];

  const charityPartnersDropdown = [
    { label: "CEREBRAL PALSY FOUNDATION", href: "/charity_partners/cerebral_palsy_foundation" },
    { label: "MAKE-A-WISH", href: "/charity_partners/make_a_wish" },
    { label: "ST.JUDE", href: "/charity_partners/st_jude" },
  ];

  const getDropdownState = (dropdownType) => {
    switch (dropdownType) {
      case "experiences": return isExperiencesOpen;
      case "charityPartners": return isCharityPartnersOpen;
      default: return false;
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
      case "experiences": return experiencesDropdown;
      case "charityPartners": return charityPartnersDropdown;
      default: return [];
    }
  };

  const handleModalClick = (modalType) => (e) => {
    e.preventDefault();
    if (modalType === "upcoming") {
      setIsUpcomingModalOpen(true);
    } else if (modalType === "innerCircle") {
      setIsInnerCircleModalOpen(true);
    }
  };

  const renderMenuItem = (item, idx) => {
    if (item.isModal) {
      return (
        <span
          className="hover:underline cursor-pointer"
          onClick={handleModalClick(item.modalType)}
        >
          {item.label}
        </span>
      );
    } else if (item.hasDropdown) {
      return (
        <div
          className="relative"
          onMouseEnter={() => setDropdownState(item.dropdownType, true)}
          onMouseLeave={() => setDropdownState(item.dropdownType, false)}
        >
          <span className="hover:underline cursor-pointer">
            {item.label}
          </span>

          {/* Dropdown Menu */}
          {getDropdownState(item.dropdownType) && (
            <div className="absolute top-full left-0 pt-2 w-80 z-50">
              <div className="bg-white shadow-lg rounded-md border border-gray-200">
                <div className="py-2">
                  {getDropdownItems(item.dropdownType).map((dropdownItem, dropdownIdx) => (
                    <Link
                      key={dropdownIdx}
                      href={dropdownItem.href}
                      className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setDropdownState(item.dropdownType, false)}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link href={item.href} className="hover:underline">
          {item.label}
        </Link>
      );
    }
  };

  const buttons = [
    {
      label: "Sign in",
      href: "#",
      bg: "bg-[var(--primary-color)]",
    },
    {
      label: "Membership",
      href: "/membership",
      bg: "bg-[var(--tertiary-color)] border-[var(--secondary-text-color)] border-[1px]",
    },
  ];

  return (
    <>
      <div className="py-[20px] md:px-[40px] px-[16px] max-w-[1440px] mx-auto flex justify-between items-center text-[var(--secondary-text-color)]">
        <div className="flex gap-[12px]">
          <img src="/navbar/dropdown.svg" className="lg:hidden cursor-pointer" />
          <Link href={"/"}>
            <img src="/navbar/logo.svg" />
          </Link>
        </div>

        <div className="gap-[20px] hidden lg:flex">
          {/* First 8 menu items */}
          {mainMenuItems.map((item, idx) => (
            <div key={idx} className="relative">
              {renderMenuItem(item, idx)}
            </div>
          ))}

          {/* More dropdown for remaining items */}
          {moreMenuItems.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 hover:underline cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7 10h10l-5 6-5-6z" />
                </svg>

              </div>

              {/* More Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute top-full  pt-2 w-60 z-50">
                  <div className="bg-white shadow-lg rounded-md border border-gray-200">
                    <div className="py-2">
                      {moreMenuItems.map((item, idx) => (
                        <div key={idx} className="relative">
                          {item.isModal ? (
                            <span
                              className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                              onClick={handleModalClick(item.modalType)}
                            >
                              {item.label}
                            </span>
                          ) : item.hasDropdown ? (
                            <div className="group relative">
                              <span className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                {item.label}
                              </span>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200"
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
          )}
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

      {isUpcomingModalOpen && (
        <EventModal setIsUpcomingModalOpen={setIsUpcomingModalOpen} />
      )}

      {isInnerCircleModalOpen && (
        <InnerCircleModal setIsInnerCircleModalOpen={setIsInnerCircleModalOpen} />
      )}
    </>
  );
}

export default Navbar;