"use client"
import About from "@/components/landing/About";
import ImageFloatingCard from "@/components/membership/ImageFloatingCard";
import ImageWithQuote from "@/components/membership/ImageWithQuote";
import InfoCard from "@/components/membership/InfoCard";
import MembershipTiers from "@/components/membership/MembershipTiers";
import React, { useState } from "react";
import ContactForm from "@/components/common/ContactForm";

const Page = () => {
  
  return (
    <div className="w-full bg-white">
      <div className="py-8 px-4 ml-5">
        <h1 className="text-2xl md:text-3xl xl:text-5xl 2xl:text-5xl font-neue font-bold text-[#000000] mb-2">
          Nolcha Access
        </h1>
        <p className="text-[#003233] text-lg xl:text-xl 2xl:text-2xl md:text-base font-medium">
          Unlock Capital. Expand Networks. Build Influence.
        </p>
      </div>

      <InfoCard
        imageUrl={"/membership/1.png"}
        description={
          "Nolcha Access connects founders, builders, and investors with the capital, partnerships, and networks driving Web3, AI, and culture forward. It’s a platform for meaningful deal-flow, strategic growth, and trusted relationships with the people shaping what’s next."
        }
      />
      <div className="bg-[#EBE2D7] mt-3">
        <About
          title={"Why It Matters"}
          paragraphs={[
            "Nolcha Inner Circle was born from a day of giving — and from that moment, it became something more. A brand project turned into a soul-level alliance. Presence, loyalty, integrity — these are not features. They are requirements.",
            "Our mission is to amplify the voices of those who move quietly but build boldly — and to offer them a circle worthy of their vision.",
          ]}
          link={"#"}
          linkText={"Learn More"}
          image={"/membership/2.png"}
        />
      </div>

      <MembershipTiers />

      <ContactForm bg={"/landing/background2.jpg"} heading={"Apply to Join"} isButton={true} desc={"Membership by Invitation or Application Only Waitlist and screening required."}/>

      {/* <ImageFloatingCard
        imageUrl={"/membership/2.png"}
        title={"WHY IT MATTERS"}
        description={"Nolcha Inner Circle was born from a day of giving — and from that moment, it became something more. A brand project turned into a soul-level alliance. Presence, loyalty, integrity — these are not features. They are requirements.\n \n Our mission is to amplify the voices of those who move quietly but build boldly — and to offer them a circle worthy of their vision.".toUpperCase()}
      /> */}

      {/* <ImageWithQuote
        imageUrl={"/membership/3.png"}
        title={
          "Now you’re crafting a private influence network, not a social club."
        }
        description={
          "We don’t need a traditional ‘club.’ We need a living concept. A curated, rotating space in that feels like a cultural moment — not a building. Nolcha’s strength is not bricks. It’s energy."
        }
      /> */}
    </div>
  );
};

export default Page;
