"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import InnerCircleModal from "../Modals/InnerCircleModal";
import { useRouter, usePathname } from "next/navigation";

function Navbar() {
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isCharityPartnersOpen, setIsCharityPartnersOpen] = useState(false);
  const [isInnerCircleModalOpen, setIsInnerCircleModalOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const shareRef = useRef(null);
  const mobileShareRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  // Mobile dropdown states
  const [mobileDropdowns, setMobileDropdowns] = useState({
    btcVegas: false,
    upcoming: false,
    charityPartners: false,
    experiences: false,
    more: false,
  });

  // Share functions
  const handleTwitterShare = () => {
    const href = typeof window !== 'undefined' ? window.location.href : '';
    if (!href) return;
    const encoded = encodeURIComponent(href);
    const shareUrl = `https://twitter.com/intent/tweet?url=${encoded}`;
    window.open(shareUrl, '_blank');
  };

  const handleTelegramShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = 'Check out this page!';
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleCopyLink = () => {
    try {
      const href = typeof window !== 'undefined' ? window.location.href : '';
      if (!href) return;
      navigator.clipboard.writeText(href);
      setIsShareDropdownOpen(false); // Close dropdown after copying
      // Show temporary toast
      const toast = document.createElement('div');
      toast.textContent = 'link copied to clipboard';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = 'rgba(0,0,0,0.85)';
      toast.style.color = '#fff';
      toast.style.padding = '8px 12px';
      toast.style.borderRadius = '8px';
      toast.style.fontSize = '14px';
      toast.style.zIndex = '9999';
      document.body.appendChild(toast);
      setTimeout(() => {
        if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
      }, 1400);
    } catch (e) { }
  };

  useEffect(() => {
    const onClickAway = (e) => {
      if (shareRef.current && shareRef.current.contains(e.target)) return;
      if (mobileShareRef.current && mobileShareRef.current.contains(e.target)) return;
      setIsShareDropdownOpen(false);
    };
    document.addEventListener('click', onClickAway);
    return () => document.removeEventListener('click', onClickAway);
  }, []);

  const handleShare = (platform) => {
    const href = typeof window !== 'undefined' ? window.location.href : '';
    if (!href) return;
    const encoded = encodeURIComponent(href);
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encoded}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encoded}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
        break;
      case 'instagram':
        // Instagram has no web share URL; fallback to copying the link and opening Instagram
        try { navigator.clipboard.writeText(href); } catch (e) { }
        shareUrl = 'https://instagram.com';
        break;
      case 'discord':
        // Discord has no public web share; open site and copy link
        try { navigator.clipboard.writeText(href); } catch (e) { }
        shareUrl = 'https://discord.com';
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      setIsShareDropdownOpen(false); // Close dropdown after sharing
    }
  };

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
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (!el) return;
                    const nav = document.querySelector('.sticky.top-0');
                    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  className="px-[18.5px] py-[7.5px] bg-[#97FC6A] text-xl text-black font-medium rounded-full hover:bg-[#9ED706] transition-colors"
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
                  className="w-11 h-11 bg-[#97FC6A] rounded-full flex items-center justify-center hover:bg-[#9ED706] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z" fill="#343434" />
                  </svg>
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5 relative" ref={shareRef}>
                {/* X (Twitter) Icon */}
                <button
                  onClick={handleTwitterShare}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label="Share on X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none">
                    <path d="M18.9906 12.4141L28.9662 0.860271H24.4102L16.8764 9.58516L10.3551 0.860271H0.945312L12.2013 15.7789L1.54087 28.1367H6.09687L14.3453 18.6078L21.5218 28.1367H30.7231L18.9906 12.4141ZM8.98531 3.48072L25.3333 25.3674H22.8022L6.27553 3.48072H8.98531Z" fill="black" />
                  </svg>
                </button>

                {/* Telegram Icon (toggles share dropdown) */}
                <button
                  onClick={() => setIsShareDropdownOpen((v) => !v)}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label="Share on Telegram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="2.2" />
                    <circle cx="6" cy="12" r="2.2" />
                    <circle cx="18" cy="19" r="2.2" />
                    <path d="M8.6 12.9L15.4 17.1" />
                    <path d="M8.6 11.1L15.4 6.9" />
                  </svg>
                </button>

                {isShareDropdownOpen && (
                  <div className="absolute top-full right-[-4px] mt-4 min-w-[40px]">
                    <div className="flex flex-col items-center">
                      <button onClick={() => handleShare('twitter')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444] mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 31 29" fill="currentColor">
                          <path d="M18.9906 12.4141L28.9662 0.860271H24.4102L16.8764 9.58516L10.3551 0.860271H0.945312L12.2013 15.7789L1.54087 28.1367H6.09687L14.3453 18.6078L21.5218 28.1367H30.7231L18.9906 12.4141ZM8.98531 3.48072L25.3333 25.3674H22.8022L6.27553 3.48072H8.98531Z" />
                        </svg>
                      </button>
                      <button onClick={() => handleShare('instagram')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444] mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      </button>
                      <button onClick={() => handleShare('telegram')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444] mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                      </button>
                      <button onClick={() => handleShare('discord')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444] mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                      </button>
                      <button onClick={() => handleShare('facebook')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444] mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" /></svg>
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444] mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" /></svg>
                      </button>
                      <button onClick={handleCopyLink} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0605 8.11073L14.4747 9.52494C16.0155 11.0657 16.0155 13.5783 14.4747 15.1191L10.8895 18.7043C9.34873 20.2451 6.83614 20.2451 5.29534 18.7043C3.75455 17.1635 3.75455 14.6509 5.29534 13.1101L6.70956 11.6959L5.29534 10.2817L3.88113 11.6959C1.55192 14.0251 1.55192 17.7893 3.88113 20.1185C6.21034 22.4477 9.97453 22.4477 12.3037 20.1185L15.8889 16.5333C18.2181 14.2041 18.2181 10.4399 15.8889 8.11073L14.4747 6.69651L13.0605 8.11073ZM10.9395 15.8891L9.52525 14.4749C7.98446 12.9341 7.98446 10.4215 9.52525 8.88073L13.1105 5.29553C14.6512 3.75474 17.1638 3.75474 18.7046 5.29553C20.2454 6.83633 20.2454 9.34892 18.7046 10.8897L17.2904 12.3039L18.7046 13.7181L20.1188 12.3039C22.448 9.97468 22.448 6.21049 20.1188 3.88128C17.7896 1.55207 14.0254 1.55207 11.6962 3.88128L8.11099 7.46648C5.78178 9.79569 5.78178 13.5599 8.11099 15.8891L9.52521 17.3033L10.9395 15.8891Z" /></svg>
                      </button>
                    </div>
                  </div>
                )}
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

              {/* Mobile Buttons */}
              <div className="space-y-3 mb-8">
                <button
                  className="block w-full text-center py-3 px-6 bg-[#9ED706] text-black font-medium rounded-full hover:bg-[#9ED706] transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (!el) return;
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 12;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  Lets Talk
                </button>
                {/* <Link
                  href="/membership"
                  className="block text-center flex items-center justify-center py-3 px-6 bg-[#9ED706] text-black font-medium rounded-full hover:bg-[#9ED706] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z" fill="#343434" />
                  </svg>
                </Link> */}
              </div>

              {/* Social Icons */}
              <div className="flex flex-row items-center gap-5">
                <button
                  onClick={() => handleShare('twitter')}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label="Share on X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 29" fill="none" className="cursor-pointer hover:opacity-70 transition-opacity">
                    <path d="M18.9906 12.4141L28.9662 0.860271H24.4102L16.8764 9.58516L10.3551 0.860271H0.945312L12.2013 15.7789L1.54087 28.1367H6.09687L14.3453 18.6078L21.5218 28.1367H30.7231L18.9906 12.4141ZM8.98531 3.48072L25.3333 25.3674H22.8022L6.27553 3.48072H8.98531Z" fill="black" />
                  </svg>
                </button>

                <div className="relative" ref={mobileShareRef}>
                  <button
                    onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
                    className="cursor-pointer hover:opacity-70 transition-opacity mt-2"
                    aria-label="Share"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="18" cy="5" r="2.2" />
                      <circle cx="6" cy="12" r="2.2" />
                      <circle cx="18" cy="19" r="2.2" />
                      <path d="M8.6 12.9L15.4 17.1" />
                      <path d="M8.6 11.1L15.4 6.9" />
                    </svg>
                  </button>

                  {/* Mobile Share Dropdown */}
                  {isShareDropdownOpen && (
                    <div className="absolute top-full left-[-4px] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleShare('twitter')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 31 29" fill="currentColor">
                            <path d="M18.9906 12.4141L28.9662 0.860271H24.4102L16.8764 9.58516L10.3551 0.860271H0.945312L12.2013 15.7789L1.54087 28.1367H6.09687L14.3453 18.6078L21.5218 28.1367H30.7231L18.9906 12.4141ZM8.98531 3.48072L25.3333 25.3674H22.8022L6.27553 3.48072H8.98531Z" />
                          </svg>
                        </button>
                        <button onClick={() => handleShare('instagram')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </button>
                        <button onClick={() => handleShare('telegram')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                        </button>
                        <button onClick={() => handleShare('discord')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                        </button>
                        <button onClick={() => handleShare('facebook')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" /></svg>
                        </button>
                        <button onClick={() => handleShare('linkedin')} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" /></svg>
                        </button>
                        <button onClick={handleCopyLink} className="w-[31px] h-[31px] rounded-full bg-[#333] text-white flex items-center justify-center shadow hover:bg-[#444]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0605 8.11073L14.4747 9.52494C16.0155 11.0657 16.0155 13.5783 14.4747 15.1191L10.8895 18.7043C9.34873 20.2451 6.83614 20.2451 5.29534 18.7043C3.75455 17.1635 3.75455 14.6509 5.29534 13.1101L6.70956 11.6959L5.29534 10.2817L3.88113 11.6959C1.55192 14.0251 1.55192 17.7893 3.88113 20.1185C6.21034 22.4477 9.97453 22.4477 12.3037 20.1185L15.8889 16.5333C18.2181 14.2041 18.2181 10.4399 15.8889 8.11073L14.4747 6.69651L13.0605 8.11073ZM10.9395 15.8891L9.52525 14.4749C7.98446 12.9341 7.98446 10.4215 9.52525 8.88073L13.1105 5.29553C14.6512 3.75474 17.1638 3.75474 18.7046 5.29553C20.2454 6.83633 20.2454 9.34892 18.7046 10.8897L17.2904 12.3039L18.7046 13.7181L20.1188 12.3039C22.448 9.97468 22.448 6.21049 20.1188 3.88128C17.7896 1.55207 14.0254 1.55207 11.6962 3.88128L8.11099 7.46648C5.78178 9.79569 5.78178 13.5599 8.11099 15.8891L9.52521 17.3033L10.9395 15.8891Z" /></svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div >
      )
      }

      {
        isInnerCircleModalOpen && (
          <InnerCircleModal
            setIsInnerCircleModalOpen={setIsInnerCircleModalOpen}
          />
        )
      }
    </>
  );
}

export default Navbar;
