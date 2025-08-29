"use client"
import React, { useState } from 'react';

export default function ContactForm({bg}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url(${bg || '/contact/bg.jpg'})`,
        backgroundColor: '#1a1a1a' // Fallback dark color
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 lg:px-16 2xl:px-24 py-12 2xl:py-16">
        {/* Top/Left Side - Title and Sponsors */}
        <div className="flex-1 max-w-lg 2xl:max-w-2xl mb-8 lg:mb-0 2xl:mb-0">
          <h1 className="text-white font-bold leading-tight mb-8 lg:mb-12 2xl:mb-16">
            <div className="flex flex-wrap">
              <span className="text-5xl 2xl:text-6xl mr-4 mt-3">TAKE</span>
              <span className="text-6xl 2xl:text-7xl">THE FIRST</span>
            </div>
            <div className="flex flex-wrap">
              <span className="text-6xl 2xl:text-7xl mr-4">STEP, LET'S</span>
            </div>
            <div>
              <span className="text-6xl 2xl:text-7xl">TALK!</span>
            </div>
          </h1>
          
          {/* Sponsors Image */}
          <div className="max-w-sm lg:max-w-md 2xl:max-w-3xl">
            <img 
              src="/contact/1.png" 
              alt="Sponsors"
              className="w-full h-auto filter brightness-0 invert opacity-80"
            />
          </div>
        </div>
        
        {/* Bottom/Right Side - Contact Form */}
        <div className="flex-1 max-w-lg 2xl:max-w-2xl lg:ml-8 2xl:ml-12">
          <div className="space-y-4 2xl:space-y-6">
            {/* First Name and Last Name Row - Stack on mobile, side by side on desktop */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 2xl:gap-6 space-y-4 sm:space-y-0">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 2xl:px-6 2xl:py-5 2xl:text-lg placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm border-none rounded-none text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 2xl:px-6 2xl:py-5 2xl:text-lg placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm border-none rounded-none text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 2xl:px-6 2xl:py-5 2xl:text-lg placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm border-none rounded-none text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            
            {/* Message Field */}
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 2xl:px-6 2xl:py-5 2xl:text-lg placeholder:2xl:text-2xl bg-white/90 backdrop-blur-sm border-none rounded-none text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none 2xl:min-h-[200px]"
                required
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 2xl:py-5 2xl:text-2xl bg-[#E7F0D3] hover:bg-[#C5B195] text-gray-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}