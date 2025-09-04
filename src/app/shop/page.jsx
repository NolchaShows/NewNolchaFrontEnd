"use client";
import CustomerTestimonials from "@/components/landing/CustomerTestimonials";
import ProductCard from "@/components/Shop/ProductCard";
import ProductDetails from "@/components/Shop/ProductDetails";
import React, { useState } from "react";

const Page = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = [
    {
      images: ["/products/hoodie.png", "/products/hoodie-2.png"],
      name: "Long Sleeve T-Shirt",
      price: "$49.99",
      isNewItem: false,
      description:
        "The Seeker encapsulates the journey of uncertainty, fueled by a conviction that transcends logic. It depicts a succession of rooms, each marked by hues and paces, mirroring stages of life. ",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: [
        { name: "Grey1", colorClass: "bg-[#323232]" },
        { name: "Grey2", colorClass: "bg-[#647846]" },
        { name: "Brown1", colorClass: "bg-[#875037]" },
      ],
    },
    {
      images: ["/products/cap.png"],
      name: "Long Sleeve T-Shirt",
      price: "$49.99",
      isNewItem: true,
      description:
        "The Seeker encapsulates the journey of uncertainty, fueled by a conviction that transcends logic. It depicts a succession of rooms, each marked by hues and paces, mirroring stages of life. ",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: [
        { name: "Grey1", colorClass: "bg-[#323232]" },
        { name: "Grey2", colorClass: "bg-[#647846]" },
        { name: "Brown1", colorClass: "bg-[#875037]" },
      ],
    },
    {
      images: ["/products/cap.png"],
      name: "Long Sleeve T-Shirt",
      price: "$49.99",
      isNewItem: true,
      description:
        "The Seeker encapsulates the journey of uncertainty, fueled by a conviction that transcends logic. It depicts a succession of rooms, each marked by hues and paces, mirroring stages of life. ",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: [
        { name: "Grey1", colorClass: "bg-[#323232]" },
        { name: "Grey2", colorClass: "bg-[#647846]" },
        { name: "Brown1", colorClass: "bg-[#875037]" },
      ],
    },
    {
      images: ["/products/shirt.png"],
      name: "Premium Cotton Tee",
      price: "$39.99",
      isNewItem: false,
      description:
        "The Seeker encapsulates the journey of uncertainty, fueled by a conviction that transcends logic. It depicts a succession of rooms, each marked by hues and paces, mirroring stages of life. ",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      colors: [
        { name: "Grey1", colorClass: "bg-[#323232]" },
        { name: "Grey2", colorClass: "bg-[#647846]" },
        { name: "Brown1", colorClass: "bg-[#875037]" },
      ],
    },
  ];

  if (selectedProduct) {
    return (
      <div>
        <div className="text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] ml-[16px] lg:ml-[40px] xl:ml-[60px] 2xl:ml-[80px] mt-[20px] lg:mt-[40px] xl:mt-[50px] 2xl:mt-[60px] uppercase text-[#003233]">
          Shop
        </div>
        <ProductDetails
          productName={selectedProduct.name}
          price={selectedProduct.price}
          description={selectedProduct.description}
          sizes={selectedProduct.sizes}
          images={selectedProduct.images}
          colors={selectedProduct.colors}
          onBack={() => setSelectedProduct(null)}
        />
        <div className="bg-[#E2E2E2]">
          <CustomerTestimonials />
          <div className="text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] ml-[16px] lg:ml-[40px] xl:ml-[60px] 2xl:ml-[80px] mt-[10px] lg:mt-[30px] xl:mt-[40px] 2xl:mt-[50px] uppercase text-[#003233]">
            Related Products
            <div className="flex flex-wrap gap-[24px] md:gap-[24px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px] lg:py-[40px] xl:py-[60px] 2xl:py-[80px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto">
              <ProductCard
                {...products[2]}
                onClick={() => setSelectedProduct(products[2])}
              />
              <ProductCard
                {...products[3]}
                onClick={() => setSelectedProduct(products[3])}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] ml-[16px] lg:ml-[40px] xl:ml-[60px] 2xl:ml-[80px] mt-[20px] lg:mt-[40px] xl:mt-[50px] 2xl:mt-[60px] uppercase text-[#003233]">
        Shop
      </div>
      <div className="flex flex-wrap gap-[24px] md:gap-[24px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px] lg:py-[40px] xl:py-[60px] 2xl:py-[80px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
