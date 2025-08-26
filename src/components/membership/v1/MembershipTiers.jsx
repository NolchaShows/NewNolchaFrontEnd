"use client";
import * as React from "react";

function MembershipTiers() {
  const membershipData = [
    {
      title: "FOUNDING CIRCLE",
      description: [
        "Lifetime membership with highest privileges.",
        "Guaranteed access to both annual events",
        "Featured visibility across Nolcha platforms",
        "Personal introductions and inner board invitations",
        "$25,000 initiation, $5,000 annual dues"
      ],
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c25180335e40e73b70bdcee2b58c6eec0e204710?width=1224"
    },
    {
      title: "EXECUTIVE MEMBER",
      description: [
        "Built for business leaders, investors, and creatives.",
        "Discounted access to all Nolcha events",
        "Priority access to curated content library",
        "Annual mentorship roundtable seatings",
        "$10,000 initiation, $2,500 annual dues"
      ],
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e3bad48d9e959ac117e8eb40d15375a2ed9dd035?width=1224"
    },
    {
      title: "RISING STAR",
      description: [
        "For emerging entrepreneurs and influential voices.",
        "Limited access to select experiences and content",
        "Entry via invitation or vetted application",
        "$2,500 initiation, $1,000 annual dues"
      ],
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3e5b1cfc3462cb1ecb04eb5d656f7016983556c7?width=1224"
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-[#003233] uppercase text-center font-medium text-2xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12 lg:mb-16">
          MEMBERSHIP TIERS
        </h1>
        
        {/* Membership Cards */}
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          {membershipData.map((tier, index) => (
            <div 
              key={index} 
              className="w-full rounded-2xl md:rounded-3xl bg-[#E2E2E2] p-4 sm:p-5 md:p-6 lg:p-[18px] border border-white/10"
            >
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-0">
                {/* Image Section */}
                <div className="w-full lg:w-auto lg:flex-shrink-0">
                  <div className="w-full lg:w-[612px] h-48 sm:h-56 md:h-64 lg:h-[304px] rounded-xl lg:rounded-2xl overflow-hidden">
                    <img
                      src={tier.image}
                      alt={`${tier.title} membership tier`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 lg:pl-8 xl:pl-12 2xl:pl-16 flex flex-col justify-between">
                  <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                    <h2 className="text-[#003233] uppercase font-medium text-xl sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                      {tier.title}
                    </h2>
                    
                    <div className="text-[#141414] text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                      {tier.description.map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          {lineIndex < tier.description.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="flex justify-center lg:justify-end mt-6 md:mt-8">
                    <button className="w-full sm:w-auto inline-flex py-2 px-6 md:py-2 md:px-6 justify-center items-center rounded-lg bg-[#E7F0D3] hover:bg-[#d9e4c1] transition-colors duration-200 border-none cursor-pointer text-[#141414] text-base md:text-lg font-medium">
                      Apply now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembershipTiers;