import React from "react";

function ProductCard({ images, name, price, isNewItem, onClick }) {
  return (
    <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-15px)] xl:w-[calc(50%-25px)] 2xl:w-[calc(50%-30px)]">
      <div className="relative bg-[#F4F4F4] rounded-[8px] xl:rounded-[10px] 2xl:rounded-[12px] overflow-hidden aspect-square">
        {isNewItem && (
          <div className="absolute top-0 right-0 z-10">
            <img
              src="/products/new.png"
              height={60}
              width={60}
              alt="New Product"
            />
          </div>
        )}

        <div className="w-full h-[90%] flex items-center justify-center">
          <img
            src={images && images[0]}
            alt={name}
            onClick={onClick}
            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform cursor-pointer duration-300"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 backdrop-blur-sm p-[12px] xl:p-[16px] 2xl:p-[20px] flex items-center justify-between">
          <h3 className="font-medium text-[14px] xl:text-[16px] 2xl:text-[18px] text-black leading-[1.3] flex-1 mr-[8px]">
            {name}
          </h3>

          <div className="absolute left-1/2 -translate-x-1/2 flex gap-[6px] xl:gap-[8px] 2xl:gap-[10px]">
            <div className="w-[12px] xl:w-[14px] 2xl:w-[16px] h-[12px] xl:h-[14px] 2xl:h-[16px] bg-black"></div>
            <div className="w-[12px] xl:w-[14px] 2xl:w-[16px] h-[12px] xl:h-[14px] 2xl:h-[16px] bg-green-700"></div>
            <div className="w-[12px] xl:w-[14px] 2xl:w-[16px] h-[12px] xl:h-[14px] 2xl:h-[16px] bg-amber-700"></div>
          </div>

          <p className="font-semibold text-[16px] xl:text-[18px] 2xl:text-[20px] text-black ml-[8px]">
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
