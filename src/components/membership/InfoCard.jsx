import React from "react";

export default function InfoCard({ imageUrl, description, buttonText = "Apply now" }) {
  return (
    <div className="ml-8 mr-8 mx-auto rounded-xl overflow-hidden shadow border border-gray-200 bg-[#F4F4F4]">
      {/* Image */}
      <img src={imageUrl} alt="card visual" className="w-full h-125 object-cover" />

      {/* Description + Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end p-4 bg-[#F4F4F4]">
        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
          {description}
        </p>
        <button
          className="
            w-full md:w-auto 
            mt-4 md:mt-0 md:ml-4 
            px-4 py-2 
            bg-[#E7F0D3] hover:bg-green-200 
            cursor-pointer 
            text-gray-800 text-sm 
            rounded shadow-sm transition
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
