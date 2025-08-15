"use client";
import Companies from "@/components/common/Companies";
import About from "@/components/landing/About";
import Card from "@/components/press/Card";
import Hero from "@/components/press/Hero";
import React from "react";

function page() {
  const companies = [
    { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
    { name: "BNB", logo: "/landing/bnb.svg" },
    { name: "Stacks", logo: "/landing/stacks.svg" },
    { name: "Trust", logo: "/landing/trust.svg" },
    { name: "Alchemy", logo: "/landing/alchemy.svg" },
  ];
  return (
    <div>
      <Hero />
      <Companies companies={companies} />
      <div className="bg-[var(--secondary-color)]">
        <About
          title={"Media Coverage"}
          paragraphs={[
            "Nolcha Events has garnered notable media recognition as the premier destination for brands and organizations to connect and enhance their presence during major conferences in Blockchain, Art, and Crypto.",
          ]}
          link={"#"}
          linkText={"Co-host an event with us"}
          image={"/press/about.jpg"}
          imageStyle={"max-w-[772px]"}
        />
      </div>
      <div className="flex lg:flex-wrap gap-[24px] lg:py-[80px] lg:px-[40px] py-[20px] px-[16px] flex-col lg:flex-row lg:gap-[40px] max-w-[1440px] mx-auto">
        <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image1.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
        <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image2.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
         <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image1.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
        <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image2.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
         <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image1.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
        <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image2.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
         <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image1.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
        <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image2.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
         <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image1.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
        <Card
          newsPaper={"/press/forbes.svg"}
          image={"/press/image2.jpg"}
          title={
            "“Bitcoin Ordinals Take Center Stage With Nolcha Shows, Miami Art Week”"
          }
          link={"#"}
        />
      </div>
    </div>
  );
}

export default page;
