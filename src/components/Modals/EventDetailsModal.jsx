"use client";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaXTwitter, FaInstagram, FaDiscord, FaFacebookF, FaLinkedin, FaLink } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";

const EventDetailsModal = ({ isOpen, onClose, eventData }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close share dropdown when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsShareOpen(false);
    }
  }, [isOpen]);

  if (!isOpen || !eventData) return null;

  // Extract event data with fallbacks
  const eventTitle = eventData?.title || "Event";
  const eventDate = eventData?.date || "TBD";
  const venue = eventData?.venue || eventData?.location || "TBD";
  const whatToExpect = eventData?.whatToExpect || eventData?.description || "Join us for an unforgettable experience.";
  const rsvpLink = eventData?.rsvpLink || eventData?.rsvp_url || "#";
  const logoUrl = eventData?.logo || eventData?.logoUrl || "";
  const mainImage = eventData?.mainImage || eventData?.image || "/landing/recent_event.png";
  const galleryImages = eventData?.galleryImages || eventData?.gallery || [];
  
  // Default gallery images if none provided
  const displayGalleryImages = galleryImages.length > 0 
    ? galleryImages 
    : [
        "https://images.squarespace-cdn.com/content/6543e07afbb3360bba3e0b3b/246b8cf7-a337-4341-9952-803df9dc0834/2_215_Photagonist.ca.webp?content-type=image%2Fwebp",
        "https://images.squarespace-cdn.com/content/6543e07afbb3360bba3e0b3b/e7f918d2-61b3-40ce-a0bd-560e37ddf0af/024_Photagonist.ca.webp?content-type=image%2Fwebp"
      ];

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const toggleShareDropdown = () => {
    setIsShareOpen(!isShareOpen);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(currentUrl);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case "instagram":
        shareUrl = `https://instagram.com`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}`;
        break;
      case "discord":
        shareUrl = `https://discord.com`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
    setIsShareOpen(false);
  };

  const copyLink = (e) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false);
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  const handleClose = () => {
    document.body.style.overflow = "unset";
    setIsShareOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Outer Black Box Wrapper - for close button positioning */}
      <div className="relative max-w-[1240px] w-full max-h-[100vh]">
        {/* Close Button - on corner of black box */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-30 p-2 cursor-pointer bg-black rounded-full shadow-lg hover:bg-[#333] hover:scale-105 transition-all duration-200 border border-white/30"
          aria-label="Close modal"
        >
          <RxCross2 className="w-5 h-5 text-white" />
        </button>

        {/* Outer Black Box */}
        <div className="bg-black rounded-[20px] p-10 w-full max-h-[88vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">

        {/* Inner Modal Content */}
        <div className="bg-[#1A1A1A] rounded-[15px] w-full relative flex flex-col border-2 border-white/10"
          style={{
            boxShadow: `
              0px 0.8px 32px 0px rgba(227, 222, 255, 0.05) inset,
              0px 3.19px 14.37px 0px rgba(154, 146, 210, 0.05) inset,
              0px 78.26px 78.26px -38.33px rgba(202, 172, 255, 0.05) inset,
              0px -65.48px 54.3px -51.11px rgba(96, 68, 144, 0.05) inset,
              0px 5.59px 8.78px -3.25px rgba(255, 255, 255, 0.07) inset,
              0px 32px 40px -2px rgba(255, 255, 255, 0.02) inset,
              0px 0.5px 10px -6px rgba(0, 0, 0, 0.10),
              0px 20px 26px -5px rgba(0, 0, 0, 0.40)
            `,
            backdropFilter: 'blur(4px)'
          }}
        >

        {/* Share Container */}
        <div className="absolute top-5 right-5 z-10">
          <button
            onClick={toggleShareDropdown}
            className={`bg-[#333] border-none w-10 h-10 rounded-full cursor-pointer shadow-md flex items-center justify-center text-white transition-all duration-300 hover:bg-[#444] ${isShareOpen ? "text-[#9ef01a]" : ""}`}
            aria-label="Share"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
            </svg>
          </button>
          
          {/* Share Dropdown */}
          <div className={`absolute top-12 right-0 bg-transparent min-w-[40px] transition-all duration-300 ${isShareOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Share on Twitter"
            >
              <FaXTwitter className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("instagram")}
              className="flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Share on Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("telegram")}
              className="flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Share on Telegram"
            >
              <RiTelegram2Line className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("discord")}
              className="flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Share on Discord"
            >
              <FaDiscord className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Share on Facebook"
            >
              <FaFacebookF className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Share on LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </button>
            <button
              onClick={copyLink}
              className="relative flex items-center justify-center w-10 h-10 text-white bg-[#333] rounded-full mb-2.5 shadow-md hover:text-[#9ef01a] hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
              title="Copy Link"
            >
              {linkCopied ? (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              ) : (
                <FaLink className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 relative">
          {/* Logo - Positioned absolutely */}
          {logoUrl && (
            <div className="absolute top-[-36px] left-8 z-10">
              <img
                src={logoUrl}
                alt={`${eventTitle} Logo`}
                className="max-w-[280px] h-auto"
              />
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-rows-auto gap-0">
            {/* Top Row: Text Content + Main Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-end">
              {/* Text Content */}
              <div className={`pr-5 self-start ${logoUrl ? "mt-9" : "mt-0"}`}>
                <div className="mb-8">
                  <p className="text-white text-base mb-8">
                    <span className="text-[#9ef01a] font-bold">DATES: </span>
                    {eventDate}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-white">
                    <span className="text-[#9ef01a] font-bold">VENUE: </span>
                    {venue}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-white">
                    <span className="text-[#9ef01a] font-bold">WHAT TO EXPECT: </span>
                    {whatToExpect}
                  </p>
                </div>

                <div className="mb-16">
                  <p className="text-white">
                    RSVP <a href={rsvpLink} target="_blank" rel="noopener noreferrer" className="text-[#9ef01a] underline">Link Here</a>.
                  </p>
                </div>

                <div className="mb-8">
                  <a
                    href="mailto:partnerships@nolcha.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#9ef01a] text-black font-bold text-base px-6 py-3 rounded-lg no-underline text-center transition-colors hover:bg-[#80c918] cursor-pointer"
                  >
                    REQUEST PROSPECTUS
                  </a>
                </div>
              </div>

              {/* Main Image */}
              <div className="h-[400px] md:h-[500px] relative overflow-hidden rounded-none">
                <img
                  src={mainImage}
                  alt={eventTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Row: Gallery Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0">
              {displayGalleryImages.map((img, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-none">
                  <img
                    src={img}
                    alt={`${eventTitle} Gallery ${idx + 1}`}
                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* Click outside to close */}
      {isShareOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsShareOpen(false)}
        />
      )}
    </div>
  );
};

export default EventDetailsModal;
