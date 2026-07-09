"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigateToContactLikeLetsTalk } from "@/lib/letsTalkNavigation";
import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";

const MOBILE_LOGOS_INITIAL = 4;

const defaultClientLogos = [
  "/home/logo-slider/forbes.webp",
  "/landing/forbes.svg",
  "/home/logo-slider/vogue.webp",
  "/home/logo-slider/wwd.webp",
  "/home/logo-slider/adage.webp",
  "/home/logo-slider/one37.webp",
  "/home/logo-slider/coindesk.webp",
  "/home/logo-slider/cointale.webp",
  "/home/logo-slider/nftnow.webp",
];

const isExternalHref = (href) =>
  typeof href === "string" &&
  (href.startsWith("http://") || href.startsWith("https://"));

export default function OurClientsSection({
  label = "[ OUR CLIENTS ]",
  title = "CATEGORY AGNOSTIC PARTNER PORTFOLIO",
  description = "At MATTE, our diverse client portfolio spans various industries, enabling us to approach each project uniquely. Working across diverse industries provides us with cross-industry insights, allowing us to create impactful work that influences culture and identify unique partnership opportunities.",
  ctaText = "CONTACT US",
  ctaHref = "/contact-us",
  clientLogos = defaultClientLogos,
  hideTopRightContent = false,
}) {
  const [showAllMobileLogos, setShowAllMobileLogos] = useState(false);
  const href = ctaHref || "/contact-us";
  const ctaClassName =
    "mt-8 inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[#1D1D1D] transition-opacity hover:opacity-70 lg:text-[16px] cursor-pointer";

  const ctaInner = (
    <>
      <span>{ctaText}</span>
      <span aria-hidden>↗</span>
    </>
  );

  const strapiBase =
    process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ??
    "https://new-nolcha-strapi-uiai.onrender.com";

  const resolvedLogos = useMemo(() => {
    return (clientLogos || [])
      .map((logo) => {
        const logoPath =
          typeof logo === "string" ? logo : logo?.url || logo?.image?.url || "";
        if (!logoPath) return null;
        const fullUrl = logoPath.startsWith("http")
          ? logoPath
          : `${strapiBase}${logoPath.startsWith("/") ? "" : "/"}${logoPath}`;
        return { key: fullUrl, src: fullUrl };
      })
      .filter(Boolean);
  }, [clientLogos, strapiBase]);

  useEffect(() => {
    setShowAllMobileLogos(false);
  }, [resolvedLogos.length]);

  const initialMobileLogos = resolvedLogos.slice(0, MOBILE_LOGOS_INITIAL);
  const remainingMobileLogos = resolvedLogos.slice(MOBILE_LOGOS_INITIAL);
  const hasMoreMobileLogos = remainingMobileLogos.length > 0;

  const mobileLogoGridClassName = "grid grid-cols-2 gap-x-8 gap-y-8";
  const desktopLogoGridClassName =
    "hidden grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid lg:grid-cols-6 lg:gap-x-14 lg:gap-y-10";

  const renderLogoCell = (logo, { staggerIndex = null } = {}) => (
    <motion.div
      key={logo.key}
      layout
      initial={
        staggerIndex !== null
          ? { opacity: 0, y: 16, scale: 0.96 }
          : false
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={
        staggerIndex !== null
          ? {
              duration: 0.4,
              delay: staggerIndex * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }
          : { layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
      }
      className="flex w-full items-center justify-center"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <img
          loading="lazy"
          src={logo.src}
          alt="Client logo"
          className="max-h-full w-auto max-w-full object-contain transition-all duration-300 hover:opacity-100"
        />
      </div>
    </motion.div>
  );

  return (
    <section className="relative z-20 w-full bg-[#F4F4F4] px-5 py-16 lg:px-11 lg:py-24">
      <div className="mx-auto w-full max-w-[1800px]">
        <div
          className={
            hideTopRightContent
              ? "max-w-[900px]"
              : "grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12"
          }
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:text-[14px]">
              {label}
            </p>
            <h2 className="mt-3 max-w-[680px] text-[36px] uppercase leading-[0.95] tracking-[-0.02em] text-[#1D1D1D] lg:text-[50px]">
              {title}
            </h2>
          </div>

          {!hideTopRightContent ? (
            <div className="lg:max-w-[700px]">
              <StrapiRichDescription
                value={description}
                className="text-[14px] leading-[1.35] text-[#1D1D1D] lg:text-[16px] [&_p]:m-0"
              />
              {isExternalHref(href) ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClassName}
                >
                  {ctaInner}
                </a>
              ) : (
                <button
                  type="button"
                  className={`${ctaClassName} border-0 bg-transparent p-0 text-left`}
                  onClick={() => navigateToContactLikeLetsTalk()}
                >
                  {ctaInner}
                </button>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-14 lg:mt-20">
          <motion.div
            layout
            className={`${mobileLogoGridClassName} lg:hidden`}
          >
            {initialMobileLogos.map((logo) => renderLogoCell(logo))}

            <AnimatePresence initial={false}>
              {showAllMobileLogos
                ? remainingMobileLogos.map((logo, index) =>
                    renderLogoCell(logo, { staggerIndex: index })
                  )
                : null}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence initial={false}>
            {hasMoreMobileLogos && !showAllMobileLogos ? (
              <motion.div
                key="see-more"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-8 flex justify-center lg:hidden"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-[14px] uppercase tracking-[0.08em] text-[#1D1D1D] transition-opacity hover:opacity-70"
                  onClick={() => setShowAllMobileLogos(true)}
                >
                  <span>See more</span>
                  <span aria-hidden>+</span>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className={desktopLogoGridClassName}>
            {resolvedLogos.map(renderLogoCell)}
          </div>
        </div>
      </div>
    </section>
  );
}
