"use client"

import React, { useState } from "react";
import InnerCircleModal from "../Modals/InnerCircleModal";

export default function InfoCard({
  imageUrl,
  description,
  buttonText = "Apply now",
}) {
  const [isInnerCircleModalOpen, setIsInnerCircleModalOpen] = useState(false);

  return (
    <>
      <div className="mx-auto overflow-hidden">
        <img
          src={imageUrl}
          alt="card visual"
          className="w-full h-125 2xl:h-200 object-cover"
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 pt-5 md:px-10 2xl:py-8 2xl:px-12">
          <p className="w-full md:w-2/3 text-[16px] lg:text-[20px] 2xl:text-[30px] text-[#000000]">
            {description}
          </p>
          <button
            className="
            w-full md:w-auto
            mt-4 md:mt-0 md:ml-4 
            px-[6px] py-[12px]
            md:px-6 md:py-3 2xl:px-10 2xl:py-6
            border-1 border-[#000000]
            bg-[#E7F0D3] hover:bg-[#aeba94]
            cursor-pointer 
            text-[#000000] text-sm 2xl:text-2xl
            rounded-[10px] transition
          "
            onClick={() => setIsInnerCircleModalOpen(true)}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {isInnerCircleModalOpen && (
        <InnerCircleModal
          setIsInnerCircleModalOpen={setIsInnerCircleModalOpen}
        />
      )}
    </>
  );
}
