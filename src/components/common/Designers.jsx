import React from "react";
import Hero from "../press/Hero";
import ArtistGallery from "../designers/ArtistsGallery";
import DynamicGallery from "../designers/DynamicGallery";
import PressMediaRecognition from "../designers/PressMediaRecognition";
import Companies from "./Companies";

const Designer = () => {
  const images = ["/designers/1.png"];
  const imagesGallery = [
    { image: "/designers/6.png", text: "YUE MINJUN" },
    { image: "/designers/7.png", text: "YUE MINJUN" },
    { image: "/designers/8.png", text: "YUE MINJUN" },
    { image: "/designers/9.png", text: "YUE MINJUN" },
    { image: "/designers/10.png", text: "YUE MINJUN" },
    { image: "/designers/11.png", text: "YUE MINJUN" },
    { image: "/designers/12.png", text: "YUE MINJUN" },
    { image: "/designers/13.png", text: "YUE MINJUN" },
    { image: "/designers/14.png", text: "YUE MINJUN" },
    { image: "/designers/15.png", text: "YUE MINJUN" },
    { image: "/designers/16.png", text: "YUE MINJUN" },
    { image: "/designers/17.png", text: "YUE MINJUN" },
  ];
  const companies = [
    { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
    { name: "BNB", logo: "/landing/bnb.svg" },
    { name: "Stacks", logo: "/landing/stacks.svg" },
    { name: "Trust", logo: "/landing/trust.svg" },
    { name: "Alchemy", logo: "/landing/alchemy.svg" },
  ];

  return (
    <div>
      <Hero heading="Designers" images={images} />
      <ArtistGallery />
      <DynamicGallery imagesGallery={imagesGallery} />
      <div className="bg-[#F4F4F4] mt-5">
        <Companies companies={companies} title={"Press & Media Recognition"} />
      </div>

      <img
        src={"/designers/18.png"}
        alt={`Designers`}
        className="mt-10 mb-10 w-full object-contain"
      />
    </div>
  );
};

export default Designer;
