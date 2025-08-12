"use client";
import Companies from "@/components/common/Companies";
import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import RecentEvents from "@/components/landing/RecentEvents";

export default function Home() {
    const companies = [
    { name: "Coca Cola", logo: "/landing/coca-cola.svg" },
    { name: "BNB", logo: "/landing/bnb.svg" },
    { name: "Stacks", logo: "/landing/stacks.svg" },
    { name: "Trust", logo: "/landing/trust.svg" },
    { name: "Alchemy", logo: "/landing/alchemy.svg" },
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
    </div>
  );
}
