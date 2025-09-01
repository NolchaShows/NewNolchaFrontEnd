import React from "react";

export default function InfoCard({ imageUrl, description, buttonText = "Apply now" }) {
  return (
    <div className="ml-8 mr-8 mx-auto rounded-xl overflow-hidden shadow border border-gray-200 bg-[#F4F4F4]">
      <img 
        src={imageUrl} 
        alt="card visual" 
        className="w-full h-125 2xl:h-200 object-cover" 
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end p-4 bg-[#F4F4F4]">
        <p className="w-full md:w-2/3 text-base xl:text-xl 2xl:text-3xl text-gray-700 leading-relaxed">
          {description}
        </p>
        <button
          className="
            w-full md:w-1/10
            mt-4 md:mt-0 md:ml-4 
            px-4 py-2 2xl:px-10 2xl:py-6
            bg-[#E7F0D3] hover:bg-green-200 
            cursor-pointer 
            text-gray-800 text-sm 2xl:text-xl
            rounded shadow-sm transition
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}