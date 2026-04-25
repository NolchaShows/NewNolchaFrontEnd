"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useFooterContent } from "@/utils/footerUtils";

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

function Footer() {
  const { content } = useFooterContent();
  const { stayInformed, logoUrl, description, social, quickLinks, resources, contact, copyright } =
    content;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter an email address");
      return;
    }
    if (!email.includes("@")) {
      setMessage("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage("Email sent successfully! Check your inbox.");
        setEmail("");
      } else {
        setMessage("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
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
            <p className="text-[16px] lg:text-[18px] 2xl:text-[20px] font-normal leading-[1.5] tracking-[-0.6px] text-white max-w-[546px]">
              {stayInformed.description}
            </p>
          </div>
          <div className="flex gap-0 items-center justify-center w-full lg:w-[427px]">
            <div className="flex flex-1 flex-col gap-[6px] items-start min-w-0 w-full">
              <div className="bg-[#FAFAFA] border border-[#E9EAEB] border-solid flex gap-[8px] items-center pl-[16px] pr-[8px] py-[6px] rounded-lg w-full">
                <div className="flex flex-1 gap-0 items-center min-w-0">
                  <input
                    type="email"
                    placeholder="Enter your email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className="flex-1 font-normal leading-[1.5] min-w-0 overflow-ellipsis overflow-hidden text-[#171717] text-[16px] lg:text-[18px] tracking-[-0.54px] whitespace-nowrap bg-transparent border-none outline-none focus:outline-none placeholder:text-[#171717]"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex gap-0 items-center pl-0 pr-[12px] py-0">
                  <button
                    type="button"
                    onClick={handleSubmit}
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
          </div>
        </div>
        {message ? (
          <div
            className={`w-full text-sm ${
              message.includes("successfully") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        ) : null}

        <div className="flex flex-col lg:flex-row items-start justify-between gap-[40px] lg:gap-[100px] w-full">
          <div className="flex flex-col gap-[30px] items-start w-full lg:w-[361px]">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <img
                src={logoUrl}
                className="h-[47px] w-[168px] object-contain"
                alt="Nolcha Logo"
              />
              <p className="font-normal leading-[1.5] text-[14px] lg:text-[16px] text-[rgba(253,255,231,0.7)] tracking-[-0.48px] whitespace-pre-wrap">
                {description}
              </p>
            </div>

            <div className="flex gap-[12px] items-center">
              <div
                className="bg-primary flex items-center p-[10px] rounded-lg cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => social.linkedin && window.open(social.linkedin, "_blank", "noopener,noreferrer")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && social.linkedin && window.open(social.linkedin, "_blank", "noopener,noreferrer")}
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6.9375 5.001C6.93724 5.53143 6.72627 6.04004 6.35101 6.41492C5.97575 6.78981 5.46693 7.00027 4.9365 7C4.40607 6.99974 3.89746 6.78877 3.52258 6.41351C3.14769 6.03825 2.93724 5.52943 2.9375 4.999C2.93777 4.46857 3.14873 3.95996 3.52399 3.58508C3.89925 3.21019 4.40807 2.99974 4.9385 3C5.46893 3.00027 5.97754 3.21123 6.35242 3.58649C6.72731 3.96175 6.93777 4.47057 6.9375 5.001ZM6.9975 8.481H2.9975V21.001H6.9975V8.481ZM13.3175 8.481H9.3375V21.001H13.2775V14.431C13.2775 10.771 18.0475 10.431 18.0475 14.431V21.001H21.9975V13.071C21.9975 6.901 14.9375 7.131 13.2775 10.161L13.3175 8.481Z" fill="#000000" />
                </svg>
              </div>
              <div
                className="bg-primary flex items-center p-[10px] rounded-lg cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => social.instagram && window.open(social.instagram, "_blank", "noopener,noreferrer")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && social.instagram && window.open(social.instagram, "_blank", "noopener,noreferrer")}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8.75C11.138 8.75 10.3114 9.09241 9.7019 9.7019C9.09241 10.3114 8.75 11.138 8.75 12C8.75 12.862 9.09241 13.6886 9.7019 14.2981C10.3114 14.9076 11.138 15.25 12 15.25C12.862 15.25 13.6886 14.9076 14.2981 14.2981C14.9076 13.6886 15.25 12.862 15.25 12C15.25 11.138 14.9076 10.3114 14.2981 9.7019C13.6886 9.09241 12.862 8.75 12 8.75Z" fill="#000000" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.77451 3.08177C10.2505 2.6967 13.7585 2.6967 17.2345 3.08177C19.1335 3.29377 20.6645 4.78877 20.8875 6.69477C21.2995 10.2194 21.2995 13.7801 20.8875 17.3048C20.6645 19.2108 19.1335 20.7058 17.2355 20.9188C13.7591 21.3039 10.2509 21.3039 6.77451 20.9188C4.87551 20.7058 3.34451 19.2108 3.12151 17.3058C2.7095 13.7808 2.7095 10.2198 3.12151 6.69477C3.34451 4.78877 4.87551 3.29377 6.77451 3.08177ZM17.0045 5.99977C16.7393 5.99977 16.4849 6.10513 16.2974 6.29267C16.1099 6.4802 16.0045 6.73456 16.0045 6.99977C16.0045 7.26499 16.1099 7.51934 16.2974 7.70688C16.4849 7.89441 16.7393 7.99977 17.0045 7.99977C17.2697 7.99977 17.5241 7.89441 17.7116 7.70688C17.8992 7.51934 18.0045 7.26499 18.0045 6.99977C18.0045 6.73456 17.8992 6.4802 17.7116 6.29267C17.5241 6.10513 17.2697 5.99977 17.0045 5.99977ZM7.25451 11.9998C7.25451 10.74 7.75496 9.53181 8.64576 8.64102C9.53655 7.75022 10.7447 7.24977 12.0045 7.24977C13.2643 7.24977 14.4725 7.75022 15.3633 8.64102C16.2541 9.53181 16.7545 10.74 16.7545 11.9998C16.7545 13.2596 16.2541 14.4677 15.3633 15.3585C14.4725 16.2493 13.2643 16.7498 12.0045 16.7498C10.7447 16.7498 9.53655 16.2493 8.64576 15.3585C7.75496 14.4677 7.25451 13.2596 7.25451 11.9998Z" fill="#000000" />
                </svg>
              </div>
              <div
                className="bg-primary flex items-center p-[10px] rounded-lg cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => social.x && window.open(social.x, "_blank", "noopener,noreferrer")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && social.x && window.open(social.x, "_blank", "noopener,noreferrer")}
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.488 14.651L15.25 21H22.25L14.392 10.522L20.93 3H18.28L13.163 8.886L8.75 3H1.75L9.26 13.015L2.32 21H4.97L10.488 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z" fill="#000000" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[100px] items-start w-full lg:w-auto">
            <div className="flex flex-col gap-[24px] items-start">
              <h3 className="font-bold leading-[1.6] text-[18px] lg:text-[20px] text-[#FDFFE7] tracking-[-0.6px] whitespace-nowrap">
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
              <h3 className="font-bold leading-[1.6] text-[18px] lg:text-[20px] text-[#FDFFE7] tracking-[-0.6px] whitespace-nowrap">
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
              <h3 className="font-bold leading-[1.6] text-[18px] lg:text-[20px] text-[#FDFFE7] tracking-[-0.6px] whitespace-nowrap">
                {contact.title}
              </h3>
              <div className="flex flex-col gap-[12px] items-start font-normal leading-[1.5] opacity-80 text-[14px] lg:text-[16px] text-[rgba(253,255,231,0.7)] tracking-[-0.48px] w-full">
                {contact.company ? <p>{contact.company}</p> : null}
                {contact.address ? (
                  <p className="whitespace-pre-wrap">{contact.address}</p>
                ) : null}
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                    {contact.email}
                  </a>
                ) : null}
              </div>
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
    </div>
  );
}

export default Footer;
