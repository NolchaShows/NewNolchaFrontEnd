import React from "react";

export default function InfoCard({
  imageUrl,
  description,
  buttonText = "Apply now",
}) {
  return (
    <div className="mx-auto overflow-hidden">
      <img
        src={imageUrl}
        alt="card visual"
        className="w-full h-125 2xl:h-200 object-cover"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:px-10">
        <p className="w-full md:w-2/3 text-base xl:text-[20px] 2xl:text-3xl text-gray-700">
          {description}
        </p>
        <button
          className="
            w-full md:w-auto
            mt-4 md:mt-0 md:ml-4 
            px-6 py-2 2xl:px-10 2xl:py-6
            border-1 border-[#000000]
            bg-[#E7F0D3] hover:bg-[#aeba94]
            cursor-pointer 
            text-gray-800 text-sm 2xl:text-xl
            rounded-[10px] shadow-sm transition
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
