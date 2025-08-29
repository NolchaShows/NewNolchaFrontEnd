"use client";
import Artists from "@/components/landing/Artists";
import React from "react";
import Card from "@/components/artists/Card";
function page() {
  return (
    <div className=" max-w-[1440px] 2xl:max-w-none mx-auto ">
      <h1 className="text-[var(--primary-text-color)] lg:text-[48px] text-[24px] uppercase lg:px-[60px] px-[16px] lg:pt-[64px] pt-[20px]">
        Featured Artists
      </h1>
      <Artists
        textColor={"text-[var(--primary-text-color)]"}
        isFade={false}
        backgroundColor={"bg-[var(--surface-color)]"}
      />
      <div className="flex lg:flex-wrap gap-[24px] lg:gap-[40px] xl:gap-[50px] 2xl:gap-[60px] lg:py-[80px] xl:py-[100px] 2xl:py-[120px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px] py-[20px] px-[16px] flex-col lg:flex-row max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-none mx-auto">
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
        <Card
          title={"Crypto executive works smarter with Even G1."}
          image={"/artists/background.png"}
        />
      </div>
    </div>
  );
}

export default page;
