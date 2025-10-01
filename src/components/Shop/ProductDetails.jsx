import React, { useState } from "react";
import Hero from "../press/Hero";


function ProductDetails({ 
  productName = "LOW PROFILE DAD HAT",
  price = "$34.99 USD",
  description = '"The Seeker" encapsulates the journey of uncertainty, fueled by a conviction that transcends logic. It depicts a succession of rooms, each marked by hues and paces, mirroring stages of life.',
  sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  images = [],
  colors = [
    { name: "Grey1", colorClass: "bg-gray-600" },
    { name: "Grey2", colorClass: "bg-gray-500" },
    { name: "Brown1", colorClass: "bg-amber-700" }
  ]
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
 
  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:flex max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1900px] mx-auto gap-[60px] xl:gap-[80px] 2xl:gap-[100px] px-[40px] xl:px-[60px] 2xl:px-[80px] py-[60px] xl:py-[80px] 2xl:py-[100px]">
        
        {/* Left Side - Image Carousel */}
        <div className="flex-1 max-w-[600px] xl:max-w-[700px] 2xl:max-w-none">
          <Hero images={images} />
        </div>

        {/* Right Side - Product Info */}
        <div className="flex-1 max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] flex flex-col gap-[24px] xl:gap-[28px] 2xl:gap-[32px]">
          
          {/* Product Name */}
          <h1 className="text-[32px] xl:text-[36px] 2xl:text-[40px] font-bold text-[var(--primary-text-color)] uppercase tracking-wide">
            {productName}
          </h1>

          {/* Price */}
          <p className="text-[28px] xl:text-[32px] 2xl:text-[36px] font-semibold text-[var(--secondary-text-color)]">
            {price} USD
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-[12px] xl:gap-[14px] 2xl:gap-[16px]">
            <h3 className="text-[18px] xl:text-[20px] 2xl:text-[25px] font-medium text-[var(--secondary-text-color)]">
              1. Choose Size
            </h3>
            <div className="flex flex-wrap gap-[8px] xl:gap-[10px] 2xl:gap-[12px]">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-[16px] xl:px-[18px] 2xl:px-[24px] py-[8px] xl:py-[10px] 2xl:py-[12px] border border-gray-300 cursor-pointer rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] text-[14px] xl:text-[16px] 2xl:text-[18px] font-medium transition-colors ${
                    selectedSize === size 
                      ? 'bg-[var(--primary-color)]' 
                      : 'bg-white text-[var(--secondary-text-color)] hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-[12px] xl:gap-[14px] 2xl:gap-[16px]">
            <h3 className="text-[18px] xl:text-[20px] 2xl:text-[25px] font-medium text-[var(--secondary-text-color)]">
              2. Choose color
            </h3>
            <div className="flex gap-[12px] xl:gap-[14px] 2xl:gap-[16px]">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`px-[16px] xl:px-[18px] 2xl:px-[20px] py-[8px] xl:py-[10px] 2xl:py-[12px] border border-gray-300 cursor-pointer rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] text-[14px] xl:text-[16px] 2xl:text-[18px] font-medium transition-colors flex items-center gap-[8px] ${
                    selectedColor === color.name 
                      ? 'bg-[var(--primary-color)] border-gray-400' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-[12px] xl:w-[14px] 2xl:w-[20px] h-[12px] xl:h-[14px] 2xl:h-[20px] ${color.colorClass} border border-gray-400`}></div>
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-[16px] xl:text-[18px] 2xl:text-[25px] text-[var(--secondary-text-color)] leading-[1.6] xl:leading-[1.7] 2xl:leading-[1.8]">
            {description}
          </p>

          {/* Quantity */}
          <div className="flex flex-col gap-[12px] xl:gap-[14px] 2xl:gap-[16px]">
            <h3 className="text-[18px] xl:text-[20px] 2xl:text-[25px] font-medium text-[var(--secondary-text-color)]">
              3. Quantity
            </h3>
            <div className="flex items-center gap-[16px] xl:gap-[18px] 2xl:gap-[20px]">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-[40px] xl:w-[45px] 2xl:w-[60px] h-[40px] xl:h-[45px] 2xl:h-[60px] cursor-pointer border border-gray-300 rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] flex items-center justify-center text-[18px] xl:text-[20px] 2xl:text-[25px] hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span className="text-[18px] xl:text-[20px] 2xl:text-[25px] font-medium min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-[40px] xl:w-[45px] 2xl:w-[60px] h-[40px] xl:h-[45px] 2xl:h-[60px] cursor-pointer border border-gray-300 rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] flex items-center justify-center text-[18px] xl:text-[20px] 2xl:text-[25px] hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-[12px] lg:max-w-[300px] 2xl:max-w-[400px] xl:gap-[14px] 2xl:gap-[16px] mt-[8px] xl:mt-[12px] 2xl:mt-[16px]">
            {/* <button className="w-full bg-[#E7F0D3] hover:bg-[#c5d9a8] cursor-pointer text-[var(--secondary-text-color)] font-medium py-[14px] xl:py-[16px] 2xl:py-[18px] rounded-[6px] xl:rounded-[7px] 2xl:rounded-[8px] text-[16px] xl:text-[18px] 2xl:text-[25px] transition-colors">
              Add to cart
            </button>
             */}
            <button className="w-full bg-[#5432EB] hover:bg-[#5441c7] cursor-pointer text-white font-medium py-[14px] xl:py-[16px] 2xl:py-[18px] rounded-[6px] xl:rounded-[7px] 2xl:rounded-[8px] text-[16px] xl:text-[18px] 2xl:text-[25px] transition-colors flex items-center justify-center gap-[8px]">
              Buy with <span className="font-bold">Shop</span><span className="text-[12px] xl:text-[14px] 2xl:text-[20px] bg-white text-[#5D4ED4] px-[6px] xl:px-[7px] 2xl:px-[8px] py-[2px] xl:py-[3px] 2xl:py-[4px] rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px]">Pay</span>
            </button>
            
            <button className="w-full cursor-pointer text-[var(--secondary-text-color)] font-medium py-[8px] xl:py-[10px] 2xl:py-[12px] text-[14px] xl:text-[16px] 2xl:text-[25px] underline hover:no-underline transition-all">
              More payment options
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden flex flex-col px-[16px] py-[20px] gap-[24px]">
        
        {/* Image Carousel */}
        <div className="w-full">
          <Hero images={images}/>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-[20px]">
          
          {/* Product Name */}
          <h1 className="text-[24px] md:text-[28px] font-bold text-[var(--primary-text-color)] uppercase tracking-wide">
            {productName}
          </h1>

          {/* Price */}
          <p className="text-[22px] md:text-[24px] font-semibold text-[var(--secondary-text-color)]">
            {price} USD
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-[12px]">
            <h3 className="text-[16px] md:text-[18px] font-medium text-[var(--secondary-text-color)]">
              1. Choose Size
            </h3>
            <div className="flex flex-wrap gap-[8px]">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-[14px] md:px-[16px] py-[8px] md:py-[10px] cursor-pointer border border-gray-300 rounded-[4px] text-[14px] md:text-[16px] font-medium transition-colors ${
                    selectedSize === size 
                      ? 'bg-[var(--primary-color)]' 
                      : 'bg-white text-[var(--secondary-text-color)] hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-[12px]">
            <h3 className="text-[16px] md:text-[18px] font-medium text-[var(--secondary-text-color)]">
              2. Choose color
            </h3>
            <div className="flex flex-col gap-[8px]">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`px-[16px] py-[10px] cursor-pointer border border-gray-300 rounded-[4px] text-[14px] md:text-[16px] font-medium transition-colors flex items-center gap-[8px] ${
                    selectedColor === color.name 
                      ? 'bg-[var(--primary-color)] border-gray-400' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-[12px] md:w-[14px] h-[12px] md:h-[14px] ${color.colorClass} rounded-full border border-gray-400`}></div>
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-[14px] md:text-[16px] text-[var(--secondary-text-color)] leading-[1.6]">
            {description}
          </p>

          {/* Quantity */}
          <div className="flex flex-col gap-[12px]">
            <h3 className="text-[16px] md:text-[18px] font-medium text-[var(--secondary-text-color)]">
              3. Quantity
            </h3>
            <div className="flex items-center gap-[16px]">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-[40px] h-[40px] cursor-pointer border border-gray-300 rounded-[4px] flex items-center justify-center text-[18px] hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span className="text-[16px] md:text-[18px] font-medium min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-[40px] h-[40px] cursor-pointer border border-gray-300 rounded-[4px] flex items-center justify-center text-[18px] hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-[12px] mt-[8px]">
            <button className="w-full cursor-pointer bg-[#D4E6B7] hover:bg-[#c5d9a8] text-[var(--secondary-text-color)] font-medium py-[14px] rounded-[6px] text-[16px] transition-colors">
              Add to cart
            </button>
            
            <button className="w-full cursor-pointer bg-[#5D4ED4] hover:bg-[#5441c7] text-white font-medium py-[14px] rounded-[6px] text-[16px] transition-colors flex items-center justify-center gap-[8px]">
              Buy with <span className="font-bold">Shop</span><span className="text-[12px] bg-white text-[#5D4ED4] px-[6px] py-[2px] rounded-[3px]">Pay</span>
            </button>
            
            <button className="w-full cursor-pointer text-[var(--secondary-text-color)] font-medium py-[8px] text-[14px] underline hover:no-underline transition-all">
              More payment options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;