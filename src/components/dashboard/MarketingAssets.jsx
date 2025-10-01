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
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{
           width: 'clamp(16px, 1.2vw, 28px)',
           height: 'clamp(16px, 1.2vw, 28px)'
         }}>
      <path d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99998C10.8334 9.53974 10.4603 9.16665 10 9.16665C9.53978 9.16665 9.16669 9.53974 9.16669 9.99998C9.16669 10.4602 9.53978 10.8333 10 10.8333Z" stroke="#909090" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 4.99998C10.4603 4.99998 10.8334 4.62688 10.8334 4.16665C10.8334 3.70641 10.4603 3.33331 10 3.33331C9.53978 3.33331 9.16669 3.70641 9.16669 4.16665C9.16669 4.62688 9.53978 4.99998 10 4.99998Z" stroke="#909090" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 16.6666C10.4603 16.6666 10.8334 16.2935 10.8334 15.8333C10.8334 15.3731 10.4603 15 10 15C9.53978 15 9.16669 15.3731 9.16669 15.8333C9.16669 16.2935 9.53978 16.6666 10 16.6666Z" stroke="#909090" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="flex flex-col items-start shrink-0 self-stretch rounded-[32px] bg-[#F4F4F4] relative w-full max-w-none"
         style={{
           padding: 'clamp(16px, 2vw, 48px)',
           gap: 'clamp(8px, 0.8vw, 20px)'
         }}>
      <div className="flex flex-col items-start self-stretch relative"
           style={{
             gap: 'clamp(16px, 1.8vw, 36px)'
           }}>
        <h1 className="self-stretch text-[#141414] font-medium uppercase m-0" 
            style={{ 
              fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif',
              fontSize: 'clamp(24px, 2.2vw, 48px)'
            }}>
          Marketing assets
        </h1>
        
        <div className="flex items-center rounded-[20px] border border-[#D5D5D5] bg-white relative w-full overflow-x-auto scrollbar-hide"
             style={{
               height: 'clamp(36px, 3vw, 64px)',
               padding: 'clamp(4px, 0.4vw, 10px)',
               gap: 'clamp(2px, 0.2vw, 6px)'
             }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex justify-center items-center gap-2 rounded-[20px] border-none cursor-pointer font-medium relative transition-all duration-200 whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-[#141414] text-white shadow-[0_1px_3px_0_rgba(16,24,40,0.10),0_1px_2px_0_rgba(16,24,40,0.06)]' 
                  : 'bg-transparent text-[#909090] hover:bg-[rgba(20,20,20,0.05)]'
              }`}
              style={{ 
                fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: 'clamp(12px, 1vw, 18px)',
                padding: 'clamp(4px, 0.5vw, 12px) clamp(8px, 1vw, 20px)'
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-start self-stretch relative"
             style={{
               gap: 'clamp(20px, 2vw, 40px)'
             }}>
          {assetData.map((section, sectionIndex) => (
            <div key={section.date} className="flex flex-col items-start self-stretch relative"
                 style={{
                   gap: 'clamp(16px, 1.5vw, 32px)'
                 }}>
              <div className="flex flex-col items-start self-stretch relative"
                   style={{
                     gap: 'clamp(8px, 0.8vw, 16px)'
                   }}>
                <h2 className="self-stretch text-[#141414] font-medium m-0" 
                    style={{ 
                      fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif',
                      fontSize: 'clamp(14px, 1.2vw, 24px)'
                    }}>
                  {section.date}
                </h2>
              </div>
              
              <div className="flex items-start content-start self-stretch flex-wrap relative"
                   style={{
                     gap: 'clamp(8px, 1vw, 24px)',
                     justifyContent: 'flex-start'
                   }}>
                {section.assets.map((asset) => (
                  <div key={asset.id} 
                       className="flex flex-col items-start rounded-2xl border border-[#D5D5D5] bg-white relative overflow-hidden"
                       style={{
                         width: 'clamp(120px, 12vw, 220px)'
                       }}>
                    <div className="rounded-t-2xl relative overflow-hidden"
                         style={{
                           width: 'clamp(120px, 12vw, 220px)',
                           height: 'clamp(108px, 11vw, 200px)',
                           backgroundColor: asset.isDesign ? asset.backgroundColor : undefined
                         }}>
                        <img 
                          src={asset.image} 
                          alt={asset.alt}
                          className="w-full h-full object-cover rounded-t-2xl"
                        />
                    </div>
                    
                    <div className="flex flex-col items-center self-stretch border-t border-[#D5D5D5] relative">
                      <div className="flex justify-between items-center self-stretch relative"
                           style={{
                             padding: 'clamp(8px, 1vw, 20px)',
                             gap: 'clamp(8px, 1vw, 20px)'
                           }}>
                        <span className="flex-1 text-[#141414] font-medium truncate" 
                              style={{ 
                                fontFamily: 'Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif',
                                fontSize: 'clamp(12px, 1vw, 18px)'
                              }}>
                          {asset.filename}
                        </span>
                        <button className="flex flex-col items-start bg-none border-none cursor-pointer p-0 transition-opacity duration-200 hover:opacity-70" 
                                aria-label="More options">
                          <DotsIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {sectionIndex < assetData.length - 1 && 
                <div className="self-stretch bg-[#E4E7EC] relative" 
                     style={{
                       height: 'clamp(1px, 0.1vw, 2px)'
                     }} />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingAssets;