"use client";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const InnerCircleModal = ({ setIsInnerCircleModalOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    linkedinOrWebsite: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fix background scroll when modal is open
  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/join-inner-circle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        alert("✅ Your form has been submitted successfully!");
        handleClose();
      } else {
        const errorData = await res.json();
        alert(`❌ Failed to submit: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("❌ Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Restore body scroll before closing
    document.body.style.overflow = "unset";
    setIsInnerCircleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#EBE2D7] rounded-2xl max-w-none w-full max-h-[90vh] relative shadow-lg overflow-hidden flex flex-col">
        {/* Scrollable content container */}
        <div className="p-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Cross button at the top of content - scrolls with content */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-8 h-8 2xl:w-12 2xl:h-12 2xl:text-2xl flex items-center cursor-pointer justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RxCross2 />
            </button>
          </div>
          {/* Header */}
          <h2 className="text-[32px] lg:text-[44px] 2xl:text-[64px] mt-4 font-bold text-gray-800 mb-8 text-left">
            JOIN THE INNER CIRCLE
          </h2>

          {!isSubmitted ? (
            // Form State
            <div className="bg-[#F4F4F4] rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
              {/* Image Section - Hidden on mobile, shown on larger screens */}
              <div className="hidden lg:block lg:w-1/2">
                <div className="rounded-2xl overflow-hidden h-full">
                  <img
                    src="/join/conf.png"
                    alt="City skyline"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Form Section */}
              <div className="w-full lg:w-1/2 relative">
                {/* Loading Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      <p className="text-gray-600 font-medium">Submitting your application...</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm 2xl:text-2xl font-medium text-gray-700 mb-2"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 2xl:py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* LinkedIn or Website */}
                  <div>
                    <label
                      htmlFor="linkedinOrWebsite"
                      className="block text-sm 2xl:text-2xl font-medium text-gray-700 mb-2"
                    >
                      Linkedin or website
                    </label>
                    <input
                      type="url"
                      id="linkedinOrWebsite"
                      name="linkedinOrWebsite"
                      value={formData.linkedinOrWebsite}
                      onChange={handleInputChange}
                      placeholder="www.linkedin.com"
                      className="w-full px-4 py-3 2xl:py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm 2xl:text-2xl  font-medium text-gray-700 mb-2"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 2xl:py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm 2xl:text-2xl  font-medium text-gray-700 mb-2"
                    >
                      Tell us why you'd like to join
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us why you'd like to join"
                      rows={4}
                      className="w-full px-4 py-3 2xl:py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-all duration-200 resize-vertical bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer bg-[#E7F0D3] hover:bg-green-300 text-gray-800 2xl:text-2xl font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-green-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#E7F0D3] flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800 mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit application"
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Success State
            <div className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
              {/* Image Section - Hidden on mobile, shown on larger screens */}
              <div className="hidden lg:block lg:w-1/2">
                <div className="rounded-2xl overflow-hidden h-full">
                  <img
                    src="/join/conf.png"
                    alt="City skyline"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Success Message Section */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center min-h-[400px] lg:min-h-auto">
                <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-800 mb-6">
                  THANK YOU FOR
                  <br />
                  YOUR INTEREST!
                </h3>

                <p className="text-gray-600 mb-8 2xl:text-2xl max-w-md leading-relaxed">
                  We've received your application. Our team reviews each one
                  personally, and we'll be in touch soon if it's a fit.
                  <br />
                  <strong>Stay tuned!</strong>
                </p>

                {/* Image Gallery */}
                <div className="flex justify-center gap-4 flex-wrap">
                  <img
                    src="/join/1.png"
                    alt="Magazine 1"
                    className="w-16 h-20 md:w-20 md:h-24 2xl:w-30 2xl:h-34 object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="/join/2.png"
                    alt="Magazine 2"
                    className="w-16 h-20 md:w-20 md:h-24 2xl:w-30 2xl:h-34 object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="/join/3.png"
                    alt="Magazine 3"
                    className="w-16 h-20 md:w-20 md:h-24 2xl:w-30 2xl:h-34 object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="/join/4.png"
                    alt="Magazine 4"
                    className="w-16 h-20 md:w-20 md:h-24 2xl:w-30 2xl:h-34 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InnerCircleModal;