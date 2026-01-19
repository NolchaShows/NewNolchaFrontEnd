"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import InnerCircleModal from "../Modals/InnerCircleModal";
import { useRouter } from "next/navigation";

function Navbar() {
  // Testing helper: keep one mega dropdown open
  const FORCE_DESKTOP_MEGA_OPEN = false;
  const FORCED_DESKTOP_MEGA_KEY = "upcoming";

  const [isInnerCircleModalOpen, setIsInnerCircleModalOpen] = useState(false);
  const [isDesktopSecondRowOpen, setIsDesktopSecondRowOpen] = useState(
    FORCE_DESKTOP_MEGA_OPEN ? true : false
  );
  const [activeDesktopMegaMenu, setActiveDesktopMegaMenu] = useState(
    FORCE_DESKTOP_MEGA_OPEN ? FORCED_DESKTOP_MEGA_KEY : null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shareRef = useRef(null);
  const mobileShareRef = useRef(null);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const prevBodyOverflowRef = useRef("");

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
      hasDropdown: true,
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
      subtitle: "‎",
      hasDropdown: true,
      dropdownType: "creativeCircle",
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
      label: "Vv raching with Jack Butcher",
      href: "/experiences/vv_raching_with_jack_butcher",
    },
    { label: "Bitcoin conferance", href: "/experiences/bitcoin_conferance" },
    {
      label: "Opening night consensus",
      href: "/experiences/opening_night_consensus",
    },
    {
      label: "Ctrl ordinals collection launch",
      href: "/experiences/ctrl_ordinals_collection_launch",
    },
    {
      label: "New York Fashion Week",
      href: "/experiences/new_york_fashion_week",
    },
  ];

  const charityPartnersDropdown = [
    {
      label: "Cerebral palsy foundation",
      href: "/charity_partners/cerebral_palsy_foundation",
    },
    { label: "Make-a-wish", href: "/charity_partners/make_a_wish" },
    { label: "St. Jude", href: "/charity_partners/st_jude" },
  ];

  const getDropdownItems = (dropdownType) => {
    switch (dropdownType) {
      case "experiences":
        return experiencesDropdown;
      case "charityPartners":
        return charityPartnersDropdown;
      case "press":
        return [
          { label: "Press Highlights", href: "/press" },
          { label: "Media Coverage", href: "/press" },
        ];
      case "creativeCircle":
        return [
          { label: "Membership", href: "/membership" },
          { label: "Apply", href: "/membership" },
        ];
      default:
        return [];
    }
  };

  const getMegaMenuConfig = (menuKey) => {
    // First item should NOT have a dropdown
    if (!menuKey || menuKey === "btcVegas") return null;

    switch (menuKey) {
      case "upcoming":
        return {
          sectionLabel: "Upcoming",
          items: [
            { label: "Art Basel Dec 4, 2025", href: "/upcoming" },
            { label: "Consensus HK February 10-12, 2026", href: "/upcoming" },
            { label: "BTC Vegas", href: "/upcoming" },
            { label: "Consensus Miami", href: "/upcoming" },
            { label: "Summer Series 2025", href: "/upcoming" },
            { label: "Turnkey- White Label", href: "/upcoming" },
          ],
          cta: {
            title: "View All Upcoming",
            description: "See the full calendar and join us at upcoming events.",
            href: "/upcoming",
          },
          imageSrc: "/homepage/menu_dropdown/dropdown1.jpg",
        };
      case "charityPartners":
        return {
          sectionLabel: "Charity",
          items: charityPartnersDropdown,
          cta: {
            title: "View All Charity Partners",
            description: "Learn how we give back and support meaningful causes.",
            href: "/charity_partners/cerebral_palsy_foundation",
          },
          imageSrc: "/homepage/menu_dropdown/dropdown2.jpg",
        };
      case "experiences":
        return {
          sectionLabel: "Experiences",
          items: experiencesDropdown,
          cta: {
            title: "View All Experiences",
            description: "Explore immersive events and experiences.",
            href: "/experiences",
          },
          imageSrc: "/homepage/menu_dropdown/dropdown3.jpg",
        };
      case "press":
        return {
          sectionLabel: "Press",
          items: [
            { label: "Press Highlights", href: "/press" },
            { label: "Media Coverage", href: "/press" },
            { label: "Press Page", href: "/press" },
          ],
          cta: {
            title: "View All Press",
            description: "Read news, features, and coverage.",
            href: "/press",
          },
          imageSrc: "/homepage/menu_dropdown/dropdown4.jpg",
        };
      case "creativeCircle":
        return {
          sectionLabel: "Creative Circle",
          items: [
            { label: "Membership", href: "/membership" },
            { label: "Why Join", href: "/membership" },
            { label: "Apply", href: "/membership" },
          ],
          cta: {
            title: "View Creative Circle",
            description: "Join our community of creators and collaborators.",
            href: "/creative-circle",
          },
          imageSrc: "/homepage/menu_dropdown/dropdown5.jpg",
        };
      default:
        return null;
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

  useEffect(() => {
    // Prevent background scroll when the mobile drawer is open
    if (typeof document === "undefined") return;

    if (!isMobileMenuOpen) {
      document.body.style.overflow = prevBodyOverflowRef.current || "";
      return;
    }

    prevBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflowRef.current || "";
    };
  }, [isMobileMenuOpen]);

  const renderMobileMenuItem = (item, idx) => {
    const isExpanded = item.key && mobileDropdowns[item.key];

    const RightChevron = (
      <svg
        className={[
          "w-5 h-5 text-black/70 transition-transform duration-200",
          isExpanded ? "rotate-180" : "",
        ].join(" ")}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const megaItems = item.key ? getMegaMenuConfig(item.key)?.items : null;
    const mobileDropdownItems =
      megaItems && megaItems.length ? megaItems : getDropdownItems(item.dropdownType);

    const RowHeader = ({ showChevron, onChevronClick }) => (
      <div className="py-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="font-[700] text-[20px] leading-[1.1] text-black">
            {item.label}
          </div>
          <div
            className="mt-1 text-[13px] text-black/60"
            style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
          >
            {item.subtitle}
          </div>
        </div>
        {showChevron ? (
          <button
            type="button"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
            aria-expanded={Boolean(isExpanded)}
            onClick={onChevronClick}
            className="pt-1 w-10 h-10 -mr-2 inline-flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            {RightChevron}
          </button>
        ) : null}
      </div>
    );

    if (item.isModal) {
      return (
        <div className="border-b border-black/10">
          <button
            type="button"
            onClick={handleModalClick(item.modalType)}
            className="w-full text-left"
          >
            <RowHeader showChevron={false} />
          </button>
        </div>
      );
    }

    if (item.hasDropdown) {
      return (
        <div className="border-b border-black/10">
          <RowHeader
            showChevron={true}
            onChevronClick={() => toggleMobileDropdown(item.key)}
          />

          <div
            className={[
              "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            ].join(" ")}
          >
            <div className="overflow-hidden">
              <div className="pb-4">
                <div className="mt-1 bg-white rounded-[14px] border border-black/10 p-4">
                  <div className="space-y-3">
                    {mobileDropdownItems.map((dropdownItem, dropdownIdx) => (
                      <Link
                        key={dropdownIdx}
                        href={dropdownItem.href}
                        className="block text-[16px] text-black/90 hover:text-[#FF6813] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="border-b border-black/10">
        <button
          type="button"
          className="w-full text-left"
          onClick={() => {
            if (item.href && item.href !== "#") {
              router.push(item.href);
              setIsMobileMenuOpen(false);
            }
          }}
        >
          <RowHeader showChevron={false} />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Fixed Navbar (overlays hero/video) */}
      <div
        data-navbar="main"
        className="sticky top-0 left-0 right-0 w-full bg-[#FFF7E6] lg:fixed lg:bg-transparent lg:hover:bg-[#FFF7E6] transition-colors duration-300 z-40 group"
        onMouseEnter={() => {
          if (FORCE_DESKTOP_MEGA_OPEN) return;
          setIsDesktopSecondRowOpen(true);
        }}
        onMouseLeave={() => {
          if (FORCE_DESKTOP_MEGA_OPEN) return;
          setIsDesktopSecondRowOpen(false);
          setActiveDesktopMegaMenu(null);
        }}
      >
        <div className="w-full mx-auto flex justify-between items-center px-4 py-4 lg:px-10 lg:py-5 relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/navbar/logo.svg"
                className="h-10 lg:h-12 2xl:h-20 transition-[filter] duration-300 lg:filter lg:brightness-0 lg:invert lg:group-hover:invert-0 lg:group-hover:brightness-100"
                alt="NOLCHA"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu icon (right of logo) */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="#141414"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="hidden lg:flex items-center gap-[30px]">
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
              <div className="flex items-center group relative">
                {/* Lets Talk Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (!el) return;
                    const nav = document.querySelector('[data-navbar="main"]');
                    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  className={[
                    "py-[7.5px] 2xl:py-[15px]",
                    "bg-[#FF6813] text-xl 2xl:text-[35px] text-white font-medium rounded-full",
                    // Desktop: keep only arrow visible initially; reveal this button on hover (no absolute -> shape stays identical)
                    "hidden lg:inline-flex",
                    "overflow-hidden whitespace-nowrap",
                    "lg:max-w-0 lg:px-0 lg:opacity-0 lg:translate-x-2 lg:pointer-events-none",
                    "lg:transition-[max-width,opacity,transform,padding] lg:duration-300",
                    "lg:group-hover:max-w-[240px] 2xl:group-hover:max-w-[360px]",
                    "lg:group-hover:px-[18.5px] 2xl:group-hover:px-[40px]",
                    "lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:group-hover:pointer-events-auto",
                  ].join(" ")}
                >
                  Lets Talk
                </button>

                {/* Arrow Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (!el) return;
                    const nav = document.querySelector('[data-navbar="main"]');
                    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  className="hidden lg:flex w-11 h-11 2xl:w-[78px] 2xl:h-[78px] bg-[#FF6813] rounded-full items-center justify-center ml-2"
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
        </div>

        {/* Second Row - Desktop Menu (hidden on mobile) */}
        {/*
          When FORCE_DESKTOP_MEGA_OPEN is true:
          - second row stays open
          - mega dropdown stays open on FORCED_DESKTOP_MEGA_KEY
        */}
        <div
          className={[
            "hidden lg:grid mx-8 transform-gpu",
            "transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            (FORCE_DESKTOP_MEGA_OPEN ? true : isDesktopSecondRowOpen)
              ? "grid-rows-[1fr] opacity-100 translate-y-0 border-t border-[#C9C9C9] pointer-events-auto"
              : "grid-rows-[0fr] opacity-0 -translate-y-2 border-t-0 pointer-events-none",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="w-full max-w-none mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {visibleMenuItems.map((item, idx) => (
                  <div
                    key={item.key ?? idx}
                    className="relative"
                    onMouseEnter={() => {
                      if (FORCE_DESKTOP_MEGA_OPEN) return;
                      if (idx === 0) {
                        setActiveDesktopMegaMenu(null);
                        return;
                      }
                      setActiveDesktopMegaMenu(item.key);
                    }}
                  >
                    {item.href && item.href !== "#" ? (
                      <Link href={item.href} className="hover:opacity-80 transition-opacity">
                        <div className="flex items-center font-bold text-[18px] text-black mb-1 2xl:text-3xl">
                          {item.label}
                          {item.hasDropdown && (
                            <svg
                              className="ml-2 w-[24px] h-[24px] 2xl:w-[36px] 2xl:h-[36px] text-black"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 10l5 5 5-5z" />
                            </svg>
                          )}
                        </div>
                        <div
                          className="text-[14px] text-[#141414] 2xl:text-2xl"
                          style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
                        >
                          {item.subtitle}
                        </div>
                      </Link>
                    ) : (
                      <div className="cursor-pointer">
                        <div className="flex items-center font-bold text-[18px] text-black mb-1 2xl:text-3xl">
                          {item.label}
                          {item.hasDropdown && (
                            <svg
                              className="ml-2 w-[24px] h-[24px] 2xl:w-[36px] 2xl:h-[36px] text-black"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 10l5 5 5-5z" />
                            </svg>
                          )}
                        </div>
                        <div
                          className="text-[14px] text-[#141414] 2xl:text-2xl"
                          style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mega dropdown panel (desktop only) */}
        <div
          className={[
            "hidden lg:block absolute left-1/2 -translate-x-1/2",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            (FORCE_DESKTOP_MEGA_OPEN
              ? true
              : activeDesktopMegaMenu && isDesktopSecondRowOpen)
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
          style={{ top: "100%" }}
        >
          {(() => {
            const cfg = getMegaMenuConfig(
              FORCE_DESKTOP_MEGA_OPEN ? FORCED_DESKTOP_MEGA_KEY : activeDesktopMegaMenu
            );
            if (!cfg) return null;
            return (
              <div className="pt-3">
                <div className="w-[746px] h-[427px] rounded-[20px] bg-[#FFF7E6] overflow-hidden">
                  <div className="grid grid-cols-[1fr_400px] gap-6 p-6 h-full">
                    <div>
                      <div className="text-[16px] text-black/70 mb-4">
                        {cfg.sectionLabel}
                      </div>
                      <div className="space-y-[14px] max-h-[calc(427px-32px-32px-18px-32px)] overflow-auto">
                        {cfg.items.map((it, i) => (
                          <Link
                            key={`${it.href}-${i}`}
                            href={it.href}
                            className="block text-[20px] leading-[1.15] font-[500] text-black hover:text-[#FF6813] transition-opacity"
                            onClick={() => setActiveDesktopMegaMenu(null)}
                          >
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="bg-white rounded-[20px] p-6 shadow-sm h-full flex flex-col w-[400px]">
                        <div className="text-[20px] leading-[1.05] font-[700] text-black">
                          {cfg.cta.title}
                        </div>
                        <div className="mt-3 text-[16px] text-black/80">
                          {cfg.cta.description}
                        </div>
                        <div className="mt-5 flex-1 rounded-[24px] overflow-hidden bg-[#F2F2F2]">
                          <img
                            src={cfg.imageSrc}
                            alt={`${cfg.sectionLabel} preview`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-[380px] bg-[#FFF7E6] shadow-2xl overflow-y-auto">
            <div className="px-6 pt-5 pb-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <img src="/navbar/logo.svg" alt="NOLCHA" className="h-8" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 inline-flex items-center justify-center text-[28px] leading-none text-black/70 hover:text-black"
                >
                  ×
                </button>
              </div>

              {/* Menu Items */}
              <nav className="mt-6">
                {visibleMenuItems.map((item, idx) => (
                  <div key={item.key ?? idx}>{renderMobileMenuItem(item, idx)}</div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="sticky bottom-0 pt-6 pb-4 bg-[#FFF7E6] border-t border-black/10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (!el) return;
                      const nav = document.querySelector('[data-navbar="main"]');
                      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                      const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                      window.scrollTo({ top: y, behavior: "smooth" });
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 h-[52px] rounded-full bg-[#FF6813] text-white text-[18px] font-[700] hover:opacity-95 transition-opacity"
                  >
                    Lets Talk
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (!el) return;
                      const nav = document.querySelector('[data-navbar="main"]');
                      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                      const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
                      window.scrollTo({ top: y, behavior: "smooth" });
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label="Lets Talk"
                    className="w-[52px] h-[52px] rounded-full bg-[#FF6813] inline-flex items-center justify-center hover:opacity-95 transition-opacity"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
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
