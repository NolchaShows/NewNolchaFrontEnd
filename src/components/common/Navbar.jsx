"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import InnerCircleModal from "../Modals/InnerCircleModal";
import { usePathname, useRouter } from "next/navigation";
import {
  getUpcomingEventHref,
  slugifyUpcomingEventTitle,
  upcomingListEvents,
} from "@/data/upcomingEvents";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const getMediaUrl = (media) => {
  if (!media) return null;

  const rawUrl =
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.formats?.thumbnail?.url ||
    media?.url ||
    null;

  if (!rawUrl) return null;
  return rawUrl.startsWith("http") ? rawUrl : `${STRAPI_BASE_URL}${rawUrl}`;
};

const buildMenuKey = (item, index) =>
  item?.key ||
  item?.label
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") ||
  `menu-item-${index}`;

const isAbsoluteHref = (href = "") =>
  href.startsWith("/") || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#");

const normalizePathPart = (value = "") => value.replace(/^\/+|\/+$/g, "");

const resolveChildHref = (parentHref = "", child = {}) => {
  const childHref = child?.href || "";
  const childSlug = child?.slug || "";
  const isModal = Boolean(child?.modal);

  if (childHref && isAbsoluteHref(childHref)) {
    return childHref;
  }

  const relativeValue = childSlug || childHref;
  if (!relativeValue) {
    return "#";
  }

  if (isModal) {
    return `/?upcoming=${encodeURIComponent(normalizePathPart(relativeValue))}`;
  }

  const cleanParent = normalizePathPart(parentHref);
  const cleanChild = normalizePathPart(relativeValue);

  if (!cleanParent) {
    return `/${cleanChild}`;
  }

  return `/${cleanParent}/${cleanChild}`;
};

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
  const desktopNavbarRef = useRef(null);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const prevBodyOverflowRef = useRef("");
  const [isDesktopHidden, setIsDesktopHidden] = useState(false);
  const [megaDropdownLeft, setMegaDropdownLeft] = useState(null);
  const [hoveredMegaItemImage, setHoveredMegaItemImage] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const defaultExperiencesDropdown = [
    {
      label: "VV Racing with Jack Butcher",
      href: "/experiences/vv_raching_with_jack_butcher",
    },
    {
      label: "Bitcoin Conference",
      href: "/experiences/bitcoin_conferance",
    },
    {
      label: "Opening Night Consensus",
      href: "/experiences/opening_night_consensus",
    },
    {
      label: "CTRL Ordinals Collection Launch",
      href: "/experiences/ctrl_ordinals_collection_launch",
    },
    {
      label: "New York Fashion Week",
      href: "/experiences/new_york_fashion_week",
    },
  ];
  const [experiencesDropdown, setExperiencesDropdown] = useState(
    defaultExperiencesDropdown
  );
  const [charityDropdown, setCharityDropdown] = useState([]);
  const [navigationItems, setNavigationItems] = useState([]);
  // Mobile dropdown states
  const [mobileDropdowns, setMobileDropdowns] = useState({});

  // Share functions
  const handleTwitterShare = () => {
    window.open('https://x.com/nolchashows', '_blank');
  };

  const fallbackVisibleMenuItems = [
    {
      label: "White Label",
      href: "/about",
      subtitle: "Your Brand + Infrastructure",
      key: "whiteLabel",
      hasDropdown: false,
    },
    {
      label: "Upcoming",
      href: "/upcoming",
      subtitle: "Join Us + Explore",
      key: "upcoming",
      hasDropdown: true,
      children: upcomingListEvents.map((event) => ({
        label: event.title,
        href: getUpcomingEventHref(event.title),
        upcomingSlug: slugifyUpcomingEventTitle(event.title),
        imageSrc: event.image,
      })),
      imageSrc: "/homepage/menu_dropdown/dropdown1.jpg",
    },
    {
      label: "Charity",
      href: "#",
      subtitle: "Giving Back + Purpose",
      key: "charity",
      hasDropdown: true,
      children: charityDropdown,
      imageSrc: "/homepage/menu_dropdown/dropdown2.jpg",
    },
    {
      label: "Experiences",
      href: "/experiences",
      subtitle: "Immersive + Connect",
      key: "experiences",
      hasDropdown: true,
      children: experiencesDropdown,
      imageSrc: "/homepage/menu_dropdown/dropdown3.jpg",
    },
    {
      label: "Press",
      href: "/press",
      subtitle: "‎",
      key: "press",
      hasDropdown: false,
    },
    {
      label: "Alumni",
      href: "/speakers",
      subtitle: "Speakers + Artists",
      key: "creativeCircle",
      hasDropdown: true,
      children: [
        {
          label: "Speakers",
          href: "/speakers",
          imageSrc: "/homepage/menu_dropdown/Speakers.jpg",
        },
        {
          label: "Featured Artists",
          href: "/featured-artists",
          imageSrc: "/homepage/menu_dropdown/Artists.jpg",
        },
        {
          label: "Designers",
          href: "/designers",
          imageSrc: "/homepage/menu_dropdown/Designers.jpg",
        },
      ],
      imageSrc: "/homepage/menu_dropdown/Speakers.jpg",
    },
  ];

  const visibleMenuItems = navigationItems.length
    ? navigationItems
    : fallbackVisibleMenuItems;

  const getMegaMenuConfig = (menuKey) => {
    if (!menuKey) return null;

    const item = visibleMenuItems.find((menuItem) => menuItem.key === menuKey);
    if (!item?.hasDropdown || !item.children?.length) return null;

    return {
      sectionLabel: item.label,
      items: item.children,
      cta: {
        title: `View ${item.label}`,
        description: "",
        href: item.href || item.children[0]?.href || "#",
      },
      imageSrc: item.imageSrc || item.children[0]?.imageSrc || null,
    };
  };

  const handleModalClick = (modalType) => (e) => {
    e.preventDefault();
    if (modalType === "innerCircle") {
      setIsInnerCircleModalOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const notifyUpcomingSelection = (slug) => {
    if (typeof window === "undefined" || !slug) return;

    try {
      window.sessionStorage.setItem("nolcha:open-upcoming", slug);
    } catch (error) {
      console.error("Failed to persist upcoming event slug:", error);
    }

    window.dispatchEvent(
      new CustomEvent("nolcha:open-upcoming", {
        detail: { slug },
      })
    );
  };

  const handleDropdownLinkClick = (dropdownItem) => {
    if (dropdownItem?.upcomingSlug) {
      notifyUpcomingSelection(dropdownItem.upcomingSlug);
    }

    setActiveDesktopMegaMenu(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const scrollToContactSection = () => {
    const el = document.getElementById("contact");
    if (!el) return false;

    const nav = document.querySelector('[data-navbar="main"]');
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  };

  const handleLetsTalk = () => {
    if (scrollToContactSection()) return;
    router.push("/#contact");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#contact") return;

    let attempts = 0;
    const maxAttempts = 8;

    const tryScroll = () => {
      if (scrollToContactSection()) return;
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tryScroll, 120);
      }
    };

    tryScroll();
  }, [pathname]);

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

  useEffect(() => {
    // Desktop: hide navbar while scrolling (show only at very top)
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (!mq.matches) {
        setIsDesktopHidden(false);
        setIsDesktopSecondRowOpen(false);
        return;
      }
      
      const isAtTop = window.scrollY <= 10;
      const hasScrolledDown = window.scrollY > 100;
      
      // Show/hide the main navbar bar
      setIsDesktopHidden(!isAtTop && !hasScrolledDown);
      
      // Auto-open the second row (links) when scrolled down
      if (hasScrolledDown) {
        setIsDesktopSecondRowOpen(true);
        // Force the background to black when scrolled down and open
        desktopNavbarRef.current?.classList.add('lg:!bg-black');
      } else if (isAtTop) {
        setIsDesktopSecondRowOpen(false);
        desktopNavbarRef.current?.classList.remove('lg:!bg-black');
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    // Safari compatibility: guard addEventListener on MediaQueryList
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", update);
    else if (typeof mq.addListener === "function") mq.addListener(update);

    return () => {
      window.removeEventListener("scroll", update);
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", update);
      else if (typeof mq.removeListener === "function") mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    setHoveredMegaItemImage(null);
  }, [activeDesktopMegaMenu, isDesktopSecondRowOpen]);

  useEffect(() => {
    let isMounted = true;

    const fetchNavigationPages = async () => {
      try {
        const {
          getExperiencePages,
          getCharityPages,
          getNavigationMenu,
        } = await import("@/lib/strapi");
        const [experiencePages, charityPages, navigationMenu] = await Promise.all([
          getExperiencePages(),
          getCharityPages(),
          getNavigationMenu(),
        ]);

        if (!isMounted) return;

        if (Array.isArray(experiencePages) && experiencePages.length > 0) {
          setExperiencesDropdown(
            experiencePages.map((page) => ({
              label: page.title,
              href: `/experiences/${page.slug}`,
            }))
          );
        }

        if (Array.isArray(charityPages) && charityPages.length > 0) {
          setCharityDropdown(
            charityPages.map((page) => ({
              label: page.title,
              href: `/charity/${page.slug}`,
            }))
          );
        }

        const navigationItemsFromStrapi =
          navigationMenu?.data?.attributes?.items || navigationMenu?.data?.items || [];

        if (Array.isArray(navigationItemsFromStrapi) && navigationItemsFromStrapi.length > 0) {
          setNavigationItems(
            navigationItemsFromStrapi.map((item, index) => ({
              label: item?.label || "",
              href: item?.href || "#",
              subtitle: item?.subtitle || "‎",
              key: buildMenuKey(item, index),
              hasDropdown: Array.isArray(item?.children) && item.children.length > 0,
              imageSrc: getMediaUrl(item?.image),
              children: (item?.children || []).map((child) => ({
                label: child?.label || "",
                href: resolveChildHref(item?.href || "", child),
                slug: child?.slug || "",
                modal: Boolean(child?.modal),
                upcomingSlug: child?.modal ? normalizePathPart(child?.slug || child?.href || "") : undefined,
                imageSrc: getMediaUrl(child?.image),
              })),
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch navbar pages from Strapi:", error);
      }
    };

    fetchNavigationPages();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderMobileMenuItem = (item, idx) => {
    const isExpanded = item.key && mobileDropdowns[item.key];

    const RightChevron = (
      <svg
        className={[
          "w-5 h-5 text-white/80 transition-transform duration-200",
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
    const mobileDropdownItems = megaItems && megaItems.length ? megaItems : item.children || [];

    const RowHeader = ({ showChevron, onChevronClick }) => (
      <div className="py-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="font-[700] text-[20px] leading-[1.1] text-white">
            {item.label}
          </div>
          <div
            className="mt-1 text-[13px] text-white/60"
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
            className="pt-1 w-10 h-10 -mr-2 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            {RightChevron}
          </button>
        ) : null}
      </div>
    );

    if (item.isModal) {
      return (
        <div className="border-b border-white/10">
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
        <div className="border-b border-white/10">
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
                <div className="mt-1 bg-[#0E0E0E] rounded-[14px] border border-white/10 p-4">
                  <div className="space-y-3">
                    {mobileDropdownItems.map((dropdownItem, dropdownIdx) => (
                      <Link
                        key={dropdownIdx}
                        href={dropdownItem.href}
                        className="block text-[16px] text-white/90 hover:text-primary transition-colors"
                        onClick={() => handleDropdownLinkClick(dropdownItem)}
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
      <div className="border-b border-white/10">
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
        ref={desktopNavbarRef}
        className={[
          "sticky top-0 left-0 right-0 w-full bg-black",
          "lg:fixed lg:bg-transparent lg:hover:bg-black",
          "transition-colors duration-300 z-40 group",
          "lg:transition-transform lg:duration-300 lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
          isDesktopHidden ? "lg:-translate-y-full" : "lg:translate-y-0",
        ].join(" ")}
        onMouseEnter={() => {
          if (FORCE_DESKTOP_MEGA_OPEN) return;
          setIsDesktopSecondRowOpen(true);
        }}
        onMouseLeave={() => {
          if (FORCE_DESKTOP_MEGA_OPEN) return;
          // Only close on mouse leave if we're NOT scrolled down
          if (window.scrollY <= 100) {
            setIsDesktopSecondRowOpen(false);
            desktopNavbarRef.current?.classList.remove('lg:!bg-black');
          }
          setActiveDesktopMegaMenu(null);
          setMegaDropdownLeft(null);
        }}
      >
        <div className="w-full mx-auto flex justify-between items-center px-4 py-4 lg:px-10 lg:py-5 2xl:px-12 2xl:py-6 xxl:px-16 xxl:py-8 3xl:px-24 3xl:py-12 relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/navbar/logo.svg"
                className="h-10 lg:h-12 2xl:h-14 xxl:h-16 3xl:h-32 transition-[filter] duration-300 filter brightness-0 invert"
                alt="NOLCHA"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu icon (right of logo) */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="hidden lg:flex items-center gap-[30px] 2xl:gap-[34px] xxl:gap-[40px] 3xl:gap-[60px]">
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
                <div className="flex items-center text-white hover:opacity-80 transition-opacity gap-2">
                  <span className="text-lg font-normal">More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M5.61531 8.5L0.945312 0.5H10.2753L5.60531 8.5H5.61531Z" fill="white" />
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
            <div className="flex items-center gap-[30px] 2xl:gap-[34px] xxl:gap-[40px] 3xl:gap-[60px]">
              <div className="flex items-center group relative">
                {/* Lets Talk Button */}
                <button
                  onClick={handleLetsTalk}
                  className={[
                    "py-[7.5px] 2xl:py-[12px] 3xl:py-[25px]",
                    "bg-primary text-xl 2xl:text-[28px] xxl:text-2xl 3xl:text-[50px] text-black font-medium rounded-lg",
                    // Desktop: keep only arrow visible initially; reveal this button on hover (no absolute -> shape stays identical)
                    "hidden lg:inline-flex",
                    "overflow-hidden whitespace-nowrap",
                    "lg:max-w-0 lg:px-0 lg:opacity-0 lg:translate-x-2 lg:pointer-events-none",
                    "lg:transition-[max-width,opacity,transform,padding] lg:duration-300",
                    "lg:group-hover:max-w-[240px] 2xl:group-hover:max-w-[300px] xxl:group-hover:max-w-[320px] 3xl:group-hover:max-w-[500px]",
                    "lg:group-hover:px-[18.5px] 2xl:group-hover:px-[28px] xxl:group-hover:px-[30px] 3xl:group-hover:px-[60px]",
                    "lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:group-hover:pointer-events-auto",
                  ].join(" ")}
                >
                  Lets Talk
                </button>

                {/* Arrow Button */}
                <button
                  onClick={handleLetsTalk}
                  className="hidden lg:flex w-11 h-11 2xl:w-[64px] 2xl:h-[64px] xxl:w-14 xxl:h-14 3xl:w-[120px] 3xl:h-[120px] bg-primary rounded-lg items-center justify-center ml-2"
                >
                  <div className="2xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M4.99662 5.55025L4.99662 7.29504L11.9077 7.30123L4.3779 14.831L5.61534 16.0685L13.1451 8.53866L13.1513 15.4497L14.8961 15.4497V5.55025H4.99662Z" fill="#000" />
                    </svg>
                  </div>
                  <div className="hidden 2xl:block xxl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M7.075 7.332V9.744L16.631 9.753L6.22 20.164L7.931 21.875L18.342 11.464L18.351 21.02V21.02H20.763V7.332H7.075Z" fill="#000" />
                    </svg>
                  </div>
                  <div className="hidden xxl:block 3xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M9.09643 9.42701V12.5289L21.3828 12.5399L7.99648 25.9262L10.1964 28.1261L23.5827 14.7397L23.5937 27.0261L26.6955 27.0261V9.42701H9.09643Z" fill="#000" />
                    </svg>
                  </div>
                  <div className="hidden 3xl:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <path d="M14.15 14.664V19.488L33.262 19.506L12.439 40.329L15.861 43.751L36.684 22.928L36.702 42.04V42.04H41.526V14.664H14.15Z" fill="#000" />
                    </svg>
                  </div>
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
            "hidden lg:grid mx-8 xxl:mx-16 3xl:mx-24 transform-gpu",
            "transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            (FORCE_DESKTOP_MEGA_OPEN ? true : isDesktopSecondRowOpen)
              ? "grid-rows-[1fr] opacity-100 translate-y-0 border-t border-[#C9C9C9] pointer-events-auto"
              : "grid-rows-[0fr] opacity-0 -translate-y-2 border-t-0 pointer-events-none",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="w-full max-w-none mx-auto px-6 xxl:px-10 3xl:px-16 py-4 xxl:py-6 3xl:py-10">
              <div className="flex items-center justify-between">
                {visibleMenuItems.map((item, idx) => (
                  <div
                    key={item.key ?? idx}
                    className="relative"
                    onMouseEnter={(e) => {
                      if (FORCE_DESKTOP_MEGA_OPEN) return;
                      if (!item.hasDropdown) {
                        setActiveDesktopMegaMenu(null);
                        return;
                      }
                      const targetRect = e.currentTarget.getBoundingClientRect();
                      const navRect = desktopNavbarRef.current?.getBoundingClientRect();
                      const panelWidth =
                        window.innerWidth >= 3840
                          ? 1800
                          : window.innerWidth >= 2560
                            ? 1400
                            : window.innerWidth >= 1920
                              ? 900
                              : window.innerWidth >= 1536
                                ? 1000
                                : 746;
                      const edgePadding = 20;

                      if (!navRect) {
                        setMegaDropdownLeft(
                          e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2
                        );
                      } else {
                        const desiredLeft =
                          targetRect.left - navRect.left + targetRect.width / 2;
                        const minLeft = panelWidth / 2 + edgePadding;
                        const maxLeft = navRect.width - panelWidth / 2 - edgePadding;
                        const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
                        setMegaDropdownLeft(clampedLeft);
                      }
                      setActiveDesktopMegaMenu(item.key);
                    }}
                  >
                    {!item.hasDropdown && item.href && item.href !== "#" ? (
                      <Link href={item.href} className="hover:opacity-80 transition-opacity">
                        <div className="flex items-center font-bold text-[18px] text-white mb-1 2xl:text-[22px] xxl:text-[24px] 3xl:text-[48px]">
                          {item.label}
                          {item.hasDropdown && (
                            <svg
                              className="ml-2 w-[24px] h-[24px] 2xl:w-[28px] 2xl:h-[28px] xxl:w-[30px] xxl:h-[30px] 3xl:w-[54px] 3xl:h-[54px] text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 10l5 5 5-5z" />
                            </svg>
                          )}
                        </div>
                        <div
                          className="text-[14px] text-white/70 2xl:text-[16px] xxl:text-[18px] 3xl:text-[36px]"
                        >
                          {item.subtitle}
                        </div>
                      </Link>
                    ) : (
                      <div
                        className={item.hasDropdown ? "cursor-default" : "cursor-pointer"}
                      >
                        <div className="flex items-center font-bold text-[18px] text-white mb-1 2xl:text-[22px] xxl:text-[24px] 3xl:text-[48px]">
                          {item.label}
                          {item.hasDropdown && (
                            <svg
                              className="ml-2 w-[24px] h-[24px] 2xl:w-[28px] 2xl:h-[28px] xxl:w-[30px] xxl:h-[30px] 3xl:w-[54px] 3xl:h-[54px] text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 10l5 5 5-5z" />
                            </svg>
                          )}
                        </div>
                        <div
                          className="text-[14px] text-white/70 2xl:text-[16px] xxl:text-[18px] 3xl:text-[36px]"
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
            "hidden lg:block absolute -translate-x-1/2",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            (FORCE_DESKTOP_MEGA_OPEN
              ? true
              : activeDesktopMegaMenu && isDesktopSecondRowOpen)
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
          style={{
            top: "100%",
            left: megaDropdownLeft != null ? `${megaDropdownLeft}px` : "50%",
          }}
        >
          {(() => {
            const cfg = getMegaMenuConfig(
              FORCE_DESKTOP_MEGA_OPEN ? FORCED_DESKTOP_MEGA_KEY : activeDesktopMegaMenu
            );
            if (!cfg) return null;
            const previewImageSrc =
              hoveredMegaItemImage || cfg.items?.[0]?.imageSrc || cfg.imageSrc;
            return (
              <div className="pt-3">
                <div className="w-[746px] xxl:w-[900px] 3xl:w-[1200px] h-[427px] xxl:h-[550px] 3xl:h-[750px] rounded-[20px] 3xl:rounded-[40px] bg-black overflow-hidden">
                  <div className="grid grid-cols-[1fr_400px] xxl:grid-cols-[1fr_500px] 3xl:grid-cols-[1fr_700px] gap-6 3xl:gap-12 p-6 xxl:p-10 3xl:p-16 h-full">
                    <div>
                      <div className="text-[16px] xxl:text-[20px] 3xl:text-[32px] text-white/70 mb-4 3xl:mb-8">
                        {cfg.sectionLabel}
                      </div>
                      <div className="space-y-[14px] xxl:space-y-[20px] 3xl:space-y-[30px] max-h-[calc(100%-40px)] overflow-auto">
                        {cfg.items.map((it, i) => (
                          <Link
                            key={`${it.href}-${i}`}
                            href={it.href}
                            className="block text-[20px] xxl:text-[26px] 3xl:text-[42px] leading-[1.15] font-[500] text-white hover:text-primary transition-opacity"
                            onMouseEnter={() => setHoveredMegaItemImage(it.imageSrc || null)}
                            onClick={() => handleDropdownLinkClick(it)}
                          >
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="bg-[#0E0E0E] border border-white/10 rounded-[20px] 3xl:rounded-[40px] p-6 xxl:p-10 3xl:p-16 shadow-sm h-full flex flex-col w-[400px] xxl:w-[500px] 3xl:w-[700px]">
                        <div className="flex-1 rounded-[24px] 3xl:rounded-[48px] overflow-hidden bg-[#1A1A1A]">
                          <img
                            src={previewImageSrc}
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

          <div className="absolute right-0 top-0 h-full w-full max-w-[380px] bg-black shadow-2xl overflow-y-auto">
            <div className="px-6 pt-5 pb-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <img
                  src="/navbar/logo.svg"
                  alt="NOLCHA"
                  className="h-8 filter brightness-0 invert"
                />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 inline-flex items-center justify-center text-[28px] leading-none text-white/80 hover:text-white"
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
              <div className="sticky bottom-0 pt-6 pb-4 bg-black border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleLetsTalk();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 h-[52px] rounded-lg bg-primary text-black text-[18px] font-[700] hover:opacity-95 transition-opacity"
                  >
                    Lets Talk
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleLetsTalk();
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label="Lets Talk"
                    className="w-[52px] h-[52px] rounded-lg bg-primary inline-flex items-center justify-center hover:opacity-95 transition-opacity"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="black"
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
