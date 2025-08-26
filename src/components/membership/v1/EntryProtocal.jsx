"use client";
import * as React from "react";

function EntryProtocolSection() {
  const steps = [
    {
      number: "01",
      title: "Application",
      description: "Applications are reviewed by the membership committee."
    },
    {
      number: "02", 
      title: "Committee Review",
      description: "Applications are reviewed by the membership committee."
    },
    {
      number: "03",
      title: "Tiered Approval", 
      description: "Applications are reviewed by the membership committee."
    },
    {
      number: "04",
      title: "Referral boost",
      description: "Applications are reviewed by the membership committee."
    }
  ];

  return (
    <div className="w-full py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-10 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-10">
          {/* Header Section */}
          <div className="flex flex-col items-start gap-4 md:gap-5 lg:flex-1 lg:min-w-0">
            <div className="flex flex-col items-start gap-3">
              <h2 
                className="text-[#003233] uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal m-0" 
                style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
              >
                Entry Protocol
              </h2>
            </div>
            <p 
              className="text-[#003233] text-lg sm:text-xl md:text-2xl font-normal m-0 leading-[1.4] max-w-lg" 
              style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
            >
              We're not exclusive for the sake of status. We're exclusive
              because clarity requires curation.
            </p>
          </div>

          {/* Steps Section */}
          <div className="w-full lg:w-auto lg:max-w-2xl flex flex-col items-start gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex justify-center items-center w-full rounded-xl bg-[#EBE2D7]"
              >
                <div className="flex w-full flex-col items-start">
                  <div className="flex py-5 md:py-6 lg:py-[26px] px-5 md:px-6 lg:px-7 flex-col items-start gap-[10px] w-full">
                    <div className="flex items-center gap-4 md:gap-5 w-full">
                      <div 
                        className="flex py-2 px-2.5 justify-center items-center rounded-md min-w-10 bg-[#003233] text-white text-center text-base md:text-lg font-normal" 
                        style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
                      >
                        {step.number}
                      </div>
                      <h3 
                        className="text-black text-lg md:text-xl lg:text-[23px] leading-[1.25] font-bold m-0 flex-1" 
                        style={{ fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex pt-0 px-5 md:px-6 lg:px-7 pb-5 md:pb-6 flex-col items-start gap-[10px] w-full">
                    <div className="flex p-2.5 justify-center items-center gap-[10px] rounded-lg w-full">
                      <p 
                        className="flex-1 text-black text-base md:text-lg font-normal m-0" 
                        style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryProtocolSection;