"use client";
import React from "react";
import Hero from "../press/Hero";
import ArtistGallery from "../designers/ArtistsGallery";
import DynamicGallery from "../designers/DynamicGallery";
import PressMediaRecognition from "../designers/PressMediaRecognition";
import Companies from "./Companies";
import Artists from "../landing/Artists";
import Partners from "../home/Partners";
import { useDesignerPageData } from "@/utils/designerPageUtils";

const Designer = () => {
  const { designerData, loading, error } = useDesignerPageData();

  // Debug logging
  console.log('🎭 Designer component received data:', designerData);

  if (error) {
    console.error('Error loading designer page:', error);
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading designers...</div>
      </div>
    );
  }

  // Use data from hook or fallback to empty object
  const {
    title = "Designers",
    subtitle = "Fashion Runway", 
    heroImage = "/designers/1.png",
    videos = [],
    galleryImages = [],
    pressPartners = [],
    companies = [],
    artistData = {
      title: "And +500 Other Artists",
      description: "ONCHAINMONKEY - WORLD OF WOMEN - RON ENGLISH - JEREMY COWART - LINDSAY KOKOSKA - NODEMONKES - KIRA BURSKY - VINCENT D'ONOFRIO - LATASHÁ - VAKSEEN - TALIA ZOREF - ROB PRIOR - LAURENCE FULLER - JANEDAO - IZZY WEISSGERBER - GRETTA KRUESI - JANEDAO -YIYANG LU - SKYE NICOLAS - AEFORIA - ARNO CARSTENS - MOHSEN HAZRATI - RAGZY X - MUSKETON - TILLAVISION - MADE BY OONA - STACIE ANT - YOUNG & SICK"
    }
  } = designerData || {};

  return (
    <div>
      <div className="py-8 px-4 ml-5">
        <h1 className="text-[48px] 2xl:text-[64px] font-bold text-[#000000] mb-2">
          {title}
        </h1>
        <p className=" font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[#000000] text-sm md:text-xl 2xl:text-2xl ">
          {subtitle}
        </p>
      </div>
      <img src={heroImage} className="w-full" alt="Designer Image" />
      <Artists
        textColor={"text-[var(--tertiary-text-color)]"}
        videos={videos}
        artistData={artistData}
      />
      {/* <ArtistGallery /> */}
      {galleryImages && galleryImages.length > 0 && (
        <DynamicGallery imagesGallery={galleryImages} />
      )}
      {pressPartners && pressPartners.length > 0 && (
        <div className="mt-10 2xl:mt-15">
          <Partners
            title={"Press and Media Recognition"}
            partners={pressPartners}
            bg={"bg-[#F4F4F4]"}
          />
        </div>
      )}
      {/* {companies && companies.length > 0 && (
        <div className="bg-[#F4F4F4] mt-5">
          <Companies companies={companies} title={"Press & Media Recognition"} />
        </div>
      )} */}

    </div>
  );
};

export default Designer;
