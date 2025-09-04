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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "BTC Vegas", href: "#" },
    { label: "Upcoming", href: "#", isModal: true, modalType: "upcoming" },
    { label: "Charity Partners", href: "#", hasDropdown: true, dropdownType: "charityPartners" },
    { label: "Experiences", href: "/experiences", hasDropdown: true, dropdownType: "experiences" },
    { label: "Speakers", href: "/speakers" },
    { label: "Artist", href: "/artists" },
    { label: "Press", href: "/press" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact-us" },
    { label: "Designers", href: "/designers" },
    { label: "Gallery", href: "/gallery" },
    { label: "Services", href: "/services" },
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
    setIsMobileMenuOpen(false); // Close mobile menu when modal opens
  };

  const renderMenuItem = (item, idx, isMobile = false) => {
    if (item.isModal) {
      return (
        <span
          className={`hover:underline cursor-pointer 2xl:text-2xl ${isMobile ? 'block py-2' : ''}`}
          onClick={handleModalClick(item.modalType)}
        >
          {item.label}
        </span>
      );
    } else if (item.hasDropdown && !isMobile) {
      return (
        <div
          className="relative"
          onMouseEnter={() => setDropdownState(item.dropdownType, true)}
          onMouseLeave={() => setDropdownState(item.dropdownType, false)}
        >
          <span className="hover:underline  2xl:text-2xl cursor-pointer">
            {item.label}
          </span>

          {/* Desktop Dropdown Menu */}
          {getDropdownState(item.dropdownType) && (
            <div className="absolute top-full left-0 pt-2 z-50"
                 style={{
                   width: 'clamp(280px, 20vw, 400px)'
                 }}>
              <div className="bg-white shadow-lg rounded-md border border-gray-200">
                <div className="py-2">
                  {getDropdownItems(item.dropdownType).map((dropdownItem, dropdownIdx) => (
                    <Link
                      key={dropdownIdx}
                      href={dropdownItem.href}
                      className="block hover:bg-gray-100 transition-colors duration-200"
                      style={{
                        padding: 'clamp(8px, 1vw, 16px) clamp(12px, 1.2vw, 20px)',
                        fontSize: 'cal(clamp(12px, 1vw, 16px))'
                      }}
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
        <Link 
          href={item.href} 
          className={`hover:underline  2xl:text-2xl ${isMobile ? 'block py-2' : ''}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    }
  };

  const buttons = [
    {
      label: "Sign in",
      href: "/sign-in",
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
      <div className="w-full max-w-none mx-auto flex justify-between items-center text-[var(--secondary-text-color)]"
           style={{
             padding: 'clamp(16px, 1.5vw, 32px) clamp(16px, 2.5vw, 40px)'
           }}>
        <div className="flex items-center"
             style={{
               gap: 'clamp(10px, 1vw, 20px)'
             }}>
          <img 
            src="/navbar/dropdown.svg" 
            className="lg:hidden cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              width: 'clamp(20px, 2vw, 28px)',
              height: 'clamp(20px, 2vw, 28px)'
            }}
          />
          <Link href={"/"}>
            <img 
              src="/navbar/logo.svg" 
              style={{
                height: 'clamp(24px, 2.5vw, 48px)'
              }}
            />
          </Link>
        </div>

        <div className="hidden lg:flex"
             style={{
               gap: 'clamp(16px, 1.5vw, 32px)',
               fontSize: 'clamp(14px, 1.1vw, 18px)'
             }}>
          {mainMenuItems.map((item, idx) => (
            <div key={idx} className="relative">
              {renderMenuItem(item, idx)}
            </div>
          ))}

          {moreMenuItems.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 hover:underline cursor-pointer">
                <svg viewBox="0 0 24 24" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                     style={{
                       width: 'clamp(20px, 1.5vw, 28px)',
                       height: 'clamp(20px, 1.5vw, 28px)'
                     }}>
                  <path d="M7 10h10l-5 6-5-6z" />
                </svg>
              </div>

              {/* More Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute top-full pt-2 z-50"
                     style={{
                       width: 'clamp(220px, 18vw, 320px)'
                     }}>
                  <div className="bg-white shadow-lg rounded-md border border-gray-200">
                    <div className="py-2">
                      {moreMenuItems.map((item, idx) => (
                        <div key={idx} className="relative">
                          {item.isModal ? (
                            <span
                              className="block hover:bg-gray-100  2xl:text-2xl  transition-colors duration-200 cursor-pointer"
                              style={{
                                padding: 'clamp(8px, 1vw, 16px) clamp(12px, 1.2vw, 20px)',
                                fontSize: 'cal(clamp(12px, 1vw, 16px))+20px'
                              }}
                              onClick={handleModalClick(item.modalType)}
                            >
                              {item.label}
                            </span>
                          ) : (
                            <Link
                              href={item.href}
                              className="block hover:bg-gray-100 2xl:text-2xl transition-colors duration-200"
                              style={{
                                padding: 'clamp(8px, 1vw, 16px) clamp(12px, 1.2vw, 20px)',
                              }}
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

        <div className="flex"
             style={{
               gap: 'clamp(8px, 0.8vw, 16px)'
             }}>
          {buttons.map((btn, idx) => (
            <Link
              key={idx}
              href={btn.href}
              className={`${btn.bg} rounded-[4px] transition-all duration-200 hover:opacity-90`}
              style={{
                padding: 'clamp(8px, 1vw, 16px) clamp(16px, 1.5vw, 32px)',
                fontSize: 'clamp(12px, 1vw, 18px)'
              }}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-opacity-50 z-50">
          <div className="bg-white w-80 h-full shadow-lg overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <img src="/navbar/logo.svg" alt="Logo" className="h-8" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              
              <nav className="flex flex-col gap-4">
                {menuItems.map((item, idx) => (
                  <div key={idx}>
                    {renderMenuItem(item, idx, true)}
                    
                    {/* Mobile Dropdown Items */}
                    {item.hasDropdown && (
                      <div className="pl-4 mt-2 space-y-2">
                        {getDropdownItems(item.dropdownType).map((dropdownItem, dropdownIdx) => (
                          <Link
                            key={dropdownIdx}
                            href={dropdownItem.href}
                            className="block text-sm text-gray-600 hover:text-gray-800 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Buttons */}
              <div className="mt-8 space-y-3">
                {buttons.map((btn, idx) => (
                  <Link
                    key={idx}
                    href={btn.href}
                    className={`${btn.bg} block text-center py-3 px-6 rounded-[4px] transition-all duration-200 hover:opacity-90`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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