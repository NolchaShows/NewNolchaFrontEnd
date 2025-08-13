"use client";
import Companies from "@/components/common/Companies";
import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import RecentEvents from "@/components/landing/RecentEvents";
import Slider from "@/components/landing/Slider";
import Speakers from "@/components/landing/Speakers";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingEvents from "@/components/landing/UpcomingEvents";

export default function Home() {
    const companies = [
    { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
    { name: "BNB", logo: "/landing/bnb.svg" },
    { name: "Stacks", logo: "/landing/stacks.svg" },
    { name: "Trust", logo: "/landing/trust.svg" },
    { name: "Alchemy", logo: "/landing/alchemy.svg" },
  ];
  const slideData = [
  {
    mainImage: "/landing/slider-image.png",
    logo: "/landing/forbes.svg",
    text: "“Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.”",
  },
  {
    mainImage: "/landing/slider-image.png",
    logo: "/landing/forbes.svg",
    text: "“Web3 innovation is transforming the creative industry.”",
  },
  // Add more slides here
];
  return (
    <div className="">
     <div className="bg-[var(--surface-color2)]">
          <Hero/>
          <About/>
     </div>
     <Companies companies={companies} title={"Partners that trailblaze with us"}/>
     <div className="bg-[var(--secondary-color)]">
        <RecentEvents/>
     </div>
     <UpcomingEvents/>
      <div className="bg-[var(--surface-color2)]">
          <Companies companies={companies} title={"Press & Media Recognation"}/>
     </div>
     <Slider slides={slideData}/>
     <div className="bg-[var(--surface-color2)]">
        <Testimonials/>
        <Speakers/>
     </div>
    </div>
  );
}
