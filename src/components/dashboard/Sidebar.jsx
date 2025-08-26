"use client"
import React, { useState } from 'react';
import { AiOutlineLogout } from "react-icons/ai";

export const Sidebar = ({ activeItem, setActiveItem }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: "/dashboard/opt_1.png", active: true },
    { name: 'Event details', icon: "/dashboard/opt_2.png" },
    { name: 'Sponsorship decks', icon: "/dashboard/opt_3.png" },
    { name: 'Marketing assets', icon: "/dashboard/opt_4.png" },
    { name: 'VIP concierge', icon: "/dashboard/opt_5.png" }
  ];

  const bottomIcons = [
    { icon: "/dashboard/msg.png", name: 'Message' },
    { icon: "/dashboard/settings.png", name: 'Settings' },
    { icon: "/dashboard/hear.png", name: 'Help' }
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-around">
          <span className={`block h-0.5 w-6 bg-[#909090] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`block h-0.5 w-4 bg-[#909090] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-[#909090] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </div>
      </button>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0 bg-white h-full' : '-translate-x-full lg:translate-x-0 bg-[#F4F4F4] md:mt-6 lg:ml-4 h-[calc(100vh-3rem)] rounded-lg'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 bg-[#EBE2D7] rounded-full flex items-center justify-center">
                <img height={'65px'} width={'65px'} src='/dashboard/profile.png' className="text-gray-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-800">Stacks</p>
                <p className="text-sm text-gray-500 flex items-center justify-center cursor-pointer hover:text-gray-700">
                  Log out
                  <span className="ml-1"><AiOutlineLogout className='text-black' /></span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4">
            <nav className="px-3">
              {menuItems.map((item) => {
                const isActive = activeItem === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveItem(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-3 rounded-lg cursor-pointer text-left transition-all duration-200 mb-3
                      ${isActive
                        ? 'bg-gray-800 text-white'
                        : 'bg-[#E2E2E2] text-gray-700 hover:bg-gray-400'
                      }
                    `}
                  >
                    <img src={item.icon} width={"24px"} height={"24px"}/>
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom icons */}
          <div className="p-6 mb-5">
            <div className="flex justify-center space-x-4">
              {bottomIcons.map((item) => {
                return (
                  <button
                    key={item.name}
                    className="p-2 text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all duration-200 bg-[#E7F0D3]"
                    title={item.name}
                  >
                    <img src={item.icon} height={'20px'} width={'20px'} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};