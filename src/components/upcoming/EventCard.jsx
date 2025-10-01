import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { FaXTwitter, FaInstagram, FaDiscord, FaFacebookF, FaLinkedin, FaLink } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";

const EventCard = ({ eventCardData }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  // Use dynamic data from Strapi or fallbacks
  const name = eventCardData?.name || "Concensus 2025";
  const date = eventCardData?.date ? new Date(eventCardData.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : "June 24th, 2025";
  const venue = eventCardData?.venue || "square feet featuring one of the largest curved LED walls in the world. Movies filmed here include The Mandalorian and Top Gun.";
  const whatToExpected = eventCardData?.what_to_expect || "artists, and leaders for a compelling conference, vibrant networking, and an unforgettable after party.";
  
  // Handle images with Strapi URL construction
  const images = eventCardData?.images?.length > 0
    ? eventCardData.images.map(img => 
        img.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${img.url}` : img
      )
    : ["/upcoming/1.png", "/upcoming/2.png", "/upcoming/3.png"];

  // Handle social links
  const getSocialIcon = (socialName) => {
    const iconMap = {
      'twitter': FaXTwitter, 'x': FaXTwitter,
      'instagram': FaInstagram,
      'telegram': RiTelegram2Line,
      'discord': FaDiscord,
      'facebook': FaFacebookF,
      'linkedin': FaLinkedin,
      'link': FaLink, 'website': FaLink
    };
    return iconMap[socialName?.toLowerCase()] || FaLink;
  };

  const socialLinks = eventCardData?.social_links?.length > 0 
    ? eventCardData.social_links.map(link => ({
        icon: getSocialIcon(link.name),
        url: link.url,
        name: link.name
      }))
    : [
        { icon: FaXTwitter, url: "https://twitter.com", name: "X (Twitter)" },
        { icon: FaInstagram, url: "https://instagram.com", name: "Instagram" },
        { icon: RiTelegram2Line, url: "https://telegram.org", name: "Telegram" },
        { icon: FaDiscord, url: "https://discord.com", name: "Discord" },
        { icon: FaFacebookF, url: "https://facebook.com", name: "Facebook" },
        { icon: FaLinkedin, url: "https://linkedin.com", name: "LinkedIn" },
        { icon: FaLink, url: "#", name: "Copy Link" },
      ];

  const handleShareClick = () => {
    setIsShareOpen(!isShareOpen);
  };

  const handleSocialClick = (url, name) => {
    if (name === "Copy Link") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } else {
      window.open(url, "_blank");
    }
  };

  const handleGetTickets = () => {
    if (eventCardData?.get_tickets_url) {
      window.open(eventCardData.get_tickets_url, '_blank');
    }
  };

  const handleLearnMore = () => {
    if (eventCardData?.learn_more_url) {
      window.open(eventCardData.learn_more_url, '_blank');
    }
  };

  return (
    <div className="font-sans relative w-full max-w-none mx-auto bg-white border border-gray-200 px-[24px] py-[42px] md:px-[50px] md:pt-[40px] md:pb-[50px] rounded-lg shadow-sm">
      {/* Header with Name and Share Button */}
      <div className="flex items-center justify-between border-gray-100 gap-[10px] sm:gap-[0px] relative">
        <div className="bg-black text-white py-[4px] px-[4px] sm:py-[7px] sm:px-[12px] md:px-[18px] md:py-[14px]">
          <h1 className="text-[14px] sm:text-[24px] md:text-[32px] text-center font-bold">
            {name}
          </h1>
        </div>

        {/* Share Button Container */}
        <div className="relative">
          <button
            onClick={handleShareClick}
            className="bg-[#E7F0D3] p-1.5 hover:bg-[#d9e8c4] transition-colors"
          >
            <Share2 className="w-5 h-5 2xl:w-10 2xl:h-10 cursor-pointer text-[#000000] font-bold" />
          </button>

          {isShareOpen && (
            <div className="absolute right-0 top-full bg-gradient-to-br z-50 py-4 transition-all duration-300 ease-out transform opacity-100 translate-y-0 scale-100">
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social.url, social.name)}
                    className="w-12 h-12 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 group transform opacity-100 translate-x-0"
                    title={social.name}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {isShareOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsShareOpen(false)}
        />
      )}

      <div>
        {/* Desktop Layout - First Row */}
        <div className="hidden md:flex mt-6">
          {/* Text Section - Exactly 1/2 width */}
          <div className="w-1/2 flex flex-col pr-6">
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-[26px] 2xl:text-[34px] font-bold text-[#000000] mb-1 break-words">
                  Date: {date}
                </h3>
              </div>

              <div>
                <h3 className="text-[26px] 2xl:text-[34px] font-bold text-[#000000] mb-1 break-words">
                  VENUE: Movie Studio Spanning 40,000
                </h3>
                <p className="text-gray-900 text-[16px] 2xl:text-[24px] leading-relaxed break-words">
                  {venue}
                </p>
              </div>

              <div>
                <h3 className="text-[26px] 2xl:text-[34px] font-bold text-[#000000] mb-1 break-words">
                  What To Expect: Uniting BTC pioneers
                </h3>
                <p className="text-gray-900 text-[16px] 2xl:text-[24px] leading-relaxed break-words">
                  {whatToExpected}
                </p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-7 lg:space-y-10 2xl:space-y-15">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 2xl:h-2.5 2xl:w-2.5 bg-gray-900 rounded-full flex-shrink-0"></div>
                <span 
                  onClick={handleGetTickets}
                  className={`text-[20px] font-bold 2xl:text-[30px] text-[#000000] break-words ${eventCardData?.get_tickets_url ? 'cursor-pointer hover:underline' : ''}`}
                >
                  Get Tickets
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 2xl:h-2.5 2xl:w-2.5 bg-gray-900 rounded-full flex-shrink-0"></div>
                <span className="text-[20px] font-bold 2xl:text-[30px] text-[#000000] break-words">
                  Interested in Co-hosting Learn More Here
                </span>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <button 
                  onClick={handleLearnMore}
                  className={`bg-[#E7F0D3] 2xl:text-lg border border-[#B5BF9E] text-[#000000] px-6 py-3 text-sm font-medium rounded-md w-full md:w-fit transition-colors ${eventCardData?.learn_more_url ? 'cursor-pointer hover:bg-[#d9e8c4]' : 'cursor-default'}`}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Image Section - Exactly 1/2 width */}
          <div className="w-1/2 pl-6">
            <div className="h-[480px] 2xl:h-[600px] relative rounded-lg overflow-hidden">
              <img
                src={images[0] || "/placeholder.svg"}
                alt="Main event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mt-5">
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-[20px] font-bold text-[#000000] mb-1 break-words">
                Date: {date}
              </h3>
            </div>

            <div>
              <h3 className="text-[20px] font-bold text-[#000000] mb-1 break-words">
                VENUE: Movie Studio Spanning
              </h3>
              <p className="text-gray-900 text-[16px] leading-relaxed break-words">
                40,000 {venue}
              </p>
            </div>

            <div>
              <h3 className="text-[20px] font-bold text-[#000000] mb-1 break-words">
                What To Expect: Uniting
              </h3>
              <p className="text-gray-900 text-[16px] leading-relaxed break-words">
                BTC pioneers {whatToExpected}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              <span 
                onClick={handleGetTickets}
                className={`text-[14px] font-bold text-[#000000] ${eventCardData?.get_tickets_url ? 'cursor-pointer hover:underline' : ''}`}
              >
                Get Tickets
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              <span className="text-[14px] font-bold text-[#000000]">
                Interested in Co-hosting learn more here
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button 
                onClick={handleLearnMore}
                className={`bg-[#E7F0D3] text-[#000000] px-6 py-2 text-sm font-medium rounded-md w-full transition-colors ${eventCardData?.learn_more_url ? 'cursor-pointer hover:bg-[#d9e8c4]' : 'cursor-default'}`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Mobile Image Stack */}
          <div className="flex flex-col gap-4">
            <div className="h-48 relative rounded-lg overflow-hidden">
              <img
                src={images[0] || "/placeholder.svg"}
                alt="Main event"
                className="w-full h-full object-cover"
              />
            </div>
            {images[1] && (
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img
                  src={images[1]}
                  alt="Event scene 1"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {images[2] && (
              <div className="h-48 relative rounded-lg overflow-hidden">
                <img
                  src={images[2]}
                  alt="Event scene 2"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Second Row - Separated from first row */}
      <div className="hidden md:flex gap-4 h-80 2xl:h-150 mt-5">
        {images[1] && (
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <img
              src={images[1]}
              alt="Event scene 1"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {images[2] && (
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <img
              src={images[2]}
              alt="Event scene 2"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
