import React, { useState } from 'react';

const MarketingAssets = () => {
  const [activeTab, setActiveTab] = useState('All assets');

  const tabs = [
    'All assets',
    'Social Media banners',
    'Flyers & posters',
    'Reels & Promo Videos',
    'IG Stories & Posts',
    'Press Kits',
    'Email Banners'
  ];

  const assetData = [
    {
      date: '25 Dec, 2025',
      assets: [
        {
          id: 1,
          filename: 'Brunch.jpg',
          image: '/dashboard/marketing/1.png',
          alt: 'Graphic restaurant announcement Instagram portrait post'
        },
        {
          id: 2,
          filename: 'New tour.png',
          image: '/dashboard/marketing/2.png',
          alt: 'Futuristic concert announcement Instagram portrait post'
        },
        {
          id: 3,
          filename: 'Alexander.pdf',
          image: '/dashboard/marketing/3.png',
          alt: 'Organic shape birthday Instagram portrait post'
        },
        {
          id: 4,
          filename: 'New tour.png',
          image: '/dashboard/marketing/4.png',
        },
        {
          id: 5,
          filename: 'Brunch.jpg',
          image: '/dashboard/marketing/5.png',
        }
      ]
    },
    {
      date: '21 Dec, 2025',
      assets: [
        {
          id: 6,
          filename: 'Brunch.jpg',
          image: '/dashboard/marketing/6.png',
        },
        {
          id: 7,
          filename: 'Alexander.pdf',
          image: '/dashboard/marketing/7.png',
        }
      ]
    },
    {
      date: '22 Dec, 2025',
      assets: [
        {
          id: 8,
          filename: 'Alexander.pdf',
          image: '/dashboard/marketing/8.png',
        },
        {
          id: 9,
          filename: 'Brunch.jpg',
          image: '/dashboard/marketing/9.png',
        },
        {
          id: 10,
          filename: 'New tour.png',
          image: '/dashboard/marketing/10.png',
        }
      ]
    }
  ];

  const DotsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99998C10.8334 9.53974 10.4603 9.16665 10 9.16665C9.53978 9.16665 9.16669 9.53974 9.16669 9.99998C9.16669 10.4602 9.53978 10.8333 10 10.8333Z" stroke="#909090" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 4.99998C10.4603 4.99998 10.8334 4.62688 10.8334 4.16665C10.8334 3.70641 10.4603 3.33331 10 3.33331C9.53978 3.33331 9.16669 3.70641 9.16669 4.16665C9.16669 4.62688 9.53978 4.99998 10 4.99998Z" stroke="#909090" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 16.6666C10.4603 16.6666 10.8334 16.2935 10.8334 15.8333C10.8334 15.3731 10.4603 15 10 15C9.53978 15 9.16669 15.3731 9.16669 15.8333C9.16669 16.2935 9.53978 16.6666 10 16.6666Z" stroke="#909090" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="flex w-[1028px] p-6 flex-col items-start gap-[10px] shrink-0 self-stretch rounded-[32px] bg-[#F4F4F4] relative max-lg:w-full max-lg:max-w-[1028px]">
      <div className="flex flex-col items-start gap-6 self-stretch relative">
        <h1 className="self-stretch text-[#141414] text-[32px] font-medium uppercase m-0 max-md:text-2xl" style={{ fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif' }}>
          Marketing assets
        </h1>
        
        <div className="flex w-[980px] h-[42px] p-[6px] items-center gap-1 rounded-[20px] border border-[#D5D5D5] bg-white relative max-lg:w-full max-lg:overflow-x-auto max-lg:scrollbar-hide max-sm:p-1 max-sm:gap-[2px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex px-3 py-[6px] justify-center items-center gap-2 rounded-[20px] border-none cursor-pointer text-sm font-medium relative transition-all duration-200 max-sm:px-2 max-sm:py-1 max-sm:text-xs ${
                activeTab === tab 
                  ? 'bg-[#141414] text-white shadow-[0_1px_3px_0_rgba(16,24,40,0.10),0_1px_2px_0_rgba(16,24,40,0.06)]' 
                  : 'bg-transparent text-[#909090] hover:bg-[rgba(20,20,20,0.05)]'
              }`}
              style={{ fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif' }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-start gap-6 self-stretch relative">
          {assetData.map((section, sectionIndex) => (
            <div key={section.date} className="flex flex-col items-start gap-5 self-stretch relative">
              <div className="flex flex-col items-start gap-3 self-stretch relative">
                <h2 className="self-stretch text-[#141414] text-base font-medium m-0" style={{ fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  {section.date}
                </h2>
              </div>
              
              <div className="flex items-start content-start gap-3 self-stretch flex-wrap relative max-md:justify-center">
                {section.assets.map((asset) => (
                  <div key={asset.id} className="flex w-40 flex-col items-start rounded-2xl border border-[#D5D5D5] bg-white relative overflow-hidden max-md:w-[140px] max-sm:w-[120px]">
                    <div 
                      className="w-40 h-[148px] rounded-t-2xl relative overflow-hidden max-md:w-[140px] max-md:h-32 max-sm:w-[120px] max-sm:h-[108px]"
                      style={asset.isDesign ? { backgroundColor: asset.backgroundColor } : {}}
                    >
                        <img 
                          src={asset.image} 
                          alt={asset.alt}
                          className="w-full h-full object-cover rounded-t-2xl"
                        />
                    </div>
                    
                    <div className="flex flex-col items-center self-stretch border-t border-[#D5D5D5] relative">
                      <div className="flex p-3 justify-between items-center gap-4 self-stretch relative">
                        <span className="flex-1 text-[#141414] text-sm font-medium truncate" style={{ fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif' }}>
                          {asset.filename}
                        </span>
                        <button className="flex flex-col items-start bg-none border-none cursor-pointer p-0 transition-opacity duration-200 hover:opacity-70" aria-label="More options">
                          <DotsIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {sectionIndex < assetData.length - 1 && <div className="h-px self-stretch bg-[#E4E7EC] relative" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingAssets;
