"use client";
import React, { useMemo, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const SponsorshipDetailsModal = ({ isOpen, onClose, headerImageSrc, selectedEventTitle }) => {
  const eventsList = useMemo(
    () => [
      "Consensus Hong Kong Kong",
      "Bitcoin Conference Vegas",
      "New York Fashion Week",
      "Consensus Miami",
      "Multichain Summer Series",
      "Art Basel Miami",
      "Token 2049 Singapore",
      "White Label Events",
    ],
    []
  );

  const mappedInterestEvent = useMemo(() => {
    const t = (selectedEventTitle || "").toLowerCase();
    if (!t) return null;

    if (t.includes("art basel")) return "Art Basel Miami";
    if (t.includes("consensus") && (t.includes("hk") || t.includes("hong")))
      return "Consensus Hong Kong Kong";
    if (t.includes("consensus") && t.includes("miami")) return "Consensus Miami";
    if (t.includes("vegas") || t.includes("btc") || (t.includes("bitcoin") && t.includes("vegas")))
      return "Bitcoin Conference Vegas";
    if (t.includes("fashion") || t.includes("nyfw")) return "New York Fashion Week";
    if (t.includes("summer")) return "Multichain Summer Series";
    if (t.includes("token") || t.includes("2049")) return "Token 2049 Singapore";
    if (t.includes("white label") || (t.includes("white") && t.includes("label")))
      return "White Label Events";

    // Fallback: if title already matches one of our labels (loose contains)
    const direct = eventsList.find((e) => e.toLowerCase().includes(t) || t.includes(e.toLowerCase()));
    return direct || null;
  }, [eventsList, selectedEventTitle]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    events: {
      "Consensus Hong Kong Kong": true,
      "Bitcoin Conference Vegas": false,
      "New York Fashion Week": false,
      "Consensus Miami": false,
      "Multichain Summer Series": false,
      "Art Basel Miami": false,
      "Token 2049 Singapore": false,
      "White Label Events": false,
    },
  });

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

  // Preselect relevant event(s) when opening modal
  useEffect(() => {
    if (!isOpen) return;
    if (!mappedInterestEvent) return;

    setFormData((prev) => ({
      ...prev,
      events: Object.fromEntries(
        eventsList.map((name) => [name, name === mappedInterestEvent])
      ),
    }));
  }, [eventsList, isOpen, mappedInterestEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventToggle = (eventName) => {
    setFormData((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [eventName]: !prev.events[eventName],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    // You can add API call here
    alert("Thank you for your request! We'll be in touch soon.");
    handleClose();
  };

  const handleClose = () => {
    document.body.style.overflow = "unset";
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-2xl max-w-3xl w-full max-h-[96vh] relative shadow-lg overflow-hidden flex flex-col border border-white/10">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 cursor-pointer bg-secondary rounded-full shadow-lg hover:bg-secondary/80 hover:scale-105 transition-all duration-200"
          aria-label="Close modal"
        >
          <RxCross2 className="w-5 h-5 text-white" />
        </button>

        {/* Scrollable content */}
        <div className="p-4 lg:p-6 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Logo and Title */}
          <div className="mb-6 flex flex-col items-center">
            <img
              src="/navbar/logo.svg"
              alt="NOLCHA"
              className="h-5 lg:h-8 w-auto mb-1 filter brightness-0 invert"
            />
            <h2 className="text-[18px] lg:text-[28px] font-bold text-white">
              Request Sponsorship Details
            </h2>
          </div>

          {/* Header Image */}
          <div className="mb-6 overflow-hidden">
            <img
              src={headerImageSrc || "/home/upcoming/request.jpg"}
              alt="Cityscape with boats"
              className="w-full h-[140px] lg:h-[200px] object-cover"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm lg:text-base font-medium text-white mb-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full Name"
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-secondary text-white placeholder:text-white/60"
                required
              />
            </div>

            {/* Email and Company in single row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm lg:text-base font-medium text-white mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-secondary text-white placeholder:text-white/60"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm lg:text-base font-medium text-white mb-1.5"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Search for company"
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 bg-secondary text-white placeholder:text-white/60"
                  required
                />
              </div>
            </div>

            {/* Event(s) of interest */}
            <div>
              <label className="block text-sm lg:text-base font-medium text-white mb-3">
                Event(s) of interest
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[5px]">
                {eventsList.map((eventName) => (
                  <label
                    key={eventName}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/50 rounded-lg transition-colors p-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.events[eventName]}
                      onChange={() => handleEventToggle(eventName)}
                      className="w-4 h-4 text-primary border-white/30 rounded focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
                    />
                    <span className="text-sm lg:text-base text-white">
                      {eventName}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-black font-medium py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipDetailsModal;
