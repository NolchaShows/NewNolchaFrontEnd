"use client";
import Link from "next/link";
import React, { useState } from "react";
import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";
import FooterSocialIcon from "@/components/common/FooterSocialIcon";
import { DEFAULT_FOOTER_CONTENT } from "@/utils/footerUtils";

function FooterLink({ href, className, children }) {
  if (!href) {
    return <span className={className}>{children}</span>;
  }
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Footer({ initialContent = null }) {
  const { stayInformed, logoUrl, description, socialLinks, quickLinks, resources, contact, copyright } =
    initialContent || DEFAULT_FOOTER_CONTENT;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const safeEmail = email.trim();

    if (!safeEmail) {
      setErrorMessage("Please enter an email address.");
      setSuccessMessage("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://new-nolcha-strapi-uiai.onrender.com"}/api/newsletter/subscribe`,
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: safeEmail }),
      }
      );

      if (response.ok) {
        setSuccessMessage("Thanks! You are now subscribed.");
        setEmail("");
      } else {
        setErrorMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black w-full flex flex-col items-start p-[20px] lg:p-[60px] 2xl:p-[80px]">
      <div className="bg-black flex flex-col gap-[60px] lg:gap-[80px] items-end pb-[20px] pt-[60px] lg:pt-[80px] px-[20px] lg:px-[60px] relative rounded-[20px] w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[30px] lg:gap-[100px] w-full">
          <div className="flex flex-col gap-[20px] items-start w-full lg:w-auto">
            <h2 className="text-[32px] lg:text-[40px] 2xl:text-[48px] font-black leading-[1.2] tracking-[-1.44px] text-white whitespace-pre-wrap">
              {stayInformed.title}
            </h2>
            <StrapiRichDescription
              value={stayInformed.description}
              className="max-w-[546px] text-[16px] font-normal leading-[1.5] tracking-[-0.6px] text-white lg:text-[18px] 2xl:text-[20px] [&_p]:m-0"
            />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-0 items-center justify-center w-full lg:w-[427px]">
            <div className="flex flex-1 flex-col gap-[6px] items-start min-w-0 w-full">
              <div className="bg-[#FAFAFA] border border-[#E9EAEB] border-solid flex gap-[8px] items-center pl-[16px] pr-[8px] py-[6px] rounded-lg w-full">
                <div className="flex flex-1 gap-0 items-center min-w-0">
                  <input
                    type="email"
                    placeholder="Enter your email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 font-normal leading-[1.5] min-w-0 overflow-ellipsis overflow-hidden text-[#171717] text-[16px] lg:text-[18px] tracking-[-0.54px] whitespace-nowrap bg-transparent border-none outline-none focus:outline-none placeholder:text-[#171717]"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="flex gap-0 items-center pl-0 pr-[12px] py-0">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-primary flex gap-0 items-center justify-center px-[16px] py-[8px] rounded-lg transition-colors ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/80"
                    }`}
                  >
                    <span className="font-medium leading-[24px] text-[16px] text-black text-center">
                      {isLoading ? "Sending..." : "Subscribe"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[40px] lg:gap-[100px] w-full">
          <div className="flex flex-col gap-[30px] items-start w-full lg:w-[361px]">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <img
                src={logoUrl}
                className="h-[47px] w-[168px] object-contain"
                alt="Nolcha Logo"
              />
              <StrapiRichDescription
                value={description}
                className="text-[14px] font-normal leading-[1.5] tracking-[-0.48px] text-[rgba(253,255,231,0.7)] lg:text-[16px] [&_p]:m-0"
              />
            </div>

            {socialLinks?.length > 0 ? (
              <div className="flex flex-wrap gap-[12px] items-center">
                {socialLinks.map((item) => (
                  <a
                    key={`${item.platform}-${item.url}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="bg-primary flex items-center p-[10px] rounded-lg transition-colors hover:bg-primary/80"
                  >
                    <FooterSocialIcon platform={item.platform} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[100px] items-start w-full lg:w-auto">
            <div className="flex flex-col gap-[24px] items-start">
              <h3 className="font-bold leading-[1.6] text-[18px] lg:text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
                {quickLinks.title}
              </h3>
              <div className="flex flex-col gap-[12px] items-start font-normal leading-[1.5] opacity-80 text-[14px] lg:text-[16px] text-[rgba(253,255,231,0.7)] tracking-[-0.48px]">
                {quickLinks.links.map((item) => (
                  <FooterLink key={item.label + item.href} href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </FooterLink>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[24px] items-start">
              <h3 className="font-bold leading-[1.6] text-[18px] lg:text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
                {resources.title}
              </h3>
              <div className="flex flex-col gap-[12px] items-start font-normal leading-[1.5] opacity-80 text-[14px] lg:text-[16px] text-[rgba(253,255,231,0.7)] tracking-[-0.48px]">
                {resources.links.map((item) => (
                  <FooterLink key={item.label + item.href} href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </FooterLink>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[24px] items-start w-full lg:w-[273px]">
              <h3 className="font-bold leading-[1.6] text-[18px] lg:text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
                {contact.title}
              </h3>
              <p className="m-0 w-full font-normal leading-[1.5] opacity-80 text-[14px] lg:text-[16px] text-[rgba(253,255,231,0.7)] tracking-[-0.48px]">
                {contact.company ? <span>{contact.company}</span> : null}
                {contact.company && contact.address ? (
                  <>
                    <br />
                    <span className="whitespace-pre-wrap">{contact.address}</span>
                  </>
                ) : contact.address ? (
                  <span className="whitespace-pre-wrap">{contact.address}</span>
                ) : null}
                {(contact.company || contact.address) && contact.email ? (
                  <>
                    <br />
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {contact.email}
                    </a>
                  </>
                ) : contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {contact.email}
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-[20px] w-full">
            <p className="font-normal leading-[1.5] text-[14px] lg:text-[16px] text-[rgba(253,255,231,0.7)] tracking-[-0.48px]">
              {copyright}
            </p>
          </div>
        </div>
      </div>
      {(successMessage || errorMessage) && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 px-4">
          <div
            role="status"
            aria-live="polite"
            className="w-full max-w-[520px] rounded-2xl border border-white/20 bg-[#0F0F0F] p-6 md:p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-black text-2xl font-bold">
              {successMessage ? "✓" : "!"}
            </div>
            <h3 className="text-white text-[24px] md:text-[30px] font-bold mb-3">
              {successMessage ? "Thank You" : "Subscription Failed"}
            </h3>
            <p className="text-[rgba(253,255,231,0.85)] text-[15px] md:text-[18px]">
              {successMessage || errorMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccessMessage("");
                setErrorMessage("");
              }}
              className="mt-7 bg-primary text-black font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
