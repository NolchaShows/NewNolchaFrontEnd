"use client";
import React from "react";
import Hero from "./Hero";
import { default as PressHero } from "../press/Hero";
import MagazineCard from "./MagazineCard";
import { ImageSlider } from "./ImageSlider";
import HeadingSlider from "./HeadingSlider";

const Designer = () => {
  const magazines = [
    {
      title: "Portraits / Celebrities ",
      image: "/designers/jeremy/8.png",
      description:
        "Emma Stone, Taylor Swift, The Killers, Gwyneth Paltrow, Barack Obama, The Kardashians, Chris Stapleton, Britney Spears, Maggie Gyllenhaal, Sting, Ryan Seacrest, Zachary Levi, Garth Brooks, Hayden Panettiere, Miley Cyrus, Minnie Driver, Courtney Cox, Carrie Underwood, Taylor Swift, Tyler Perry, Denise Richards, Dolly Parton, Jewel, Luke Combs, Blake Shelton, Joel McHale, Nathan Fillion, Chelsea Handler, Brad Paisley, Hank Williams Jr., One Republic, Dierks Bentley, George Strait, Miranda Lambert, Switchfoot, Imogen Heap, Iron and Wine, Feist, Holly Williams, Brandi Carlile, Christopher Guest, Eugene Levy.",
    },
    {
      title: "Clients",
      image: "/designers/jeremy/9.png",
      description:
        "Nike, Sports Illustrated, GAP, ABC, FOX, F/X, A&E, Discovery Channel, The Style Network, E!, CNN, The Travel Channel, CMT, MTV, ESPN, NFL, People Magazine, US Weekly, VIBE Magazine, Fortune Magazine, Fast Company, Paste Magazine, Relevant Magazine, CBS Records, EMI, Word Records, Warner Brothers Records, Universal Records, Interscope Records, Blue Note Records, Sony Music",
    },
  ];
  const social = ["/designers/jeremy/2.png"];

  const images = [
    "/designers/jeremy/4.png",
    "/designers/jeremy/9.png",
    "/designers/jeremy/8.png",
    "/designers/jeremy/9.png",
  ];

  const sampleData = {
    heading:
      "Jeremy Cowart's Career Has Often Been Called A Forrest Gump Art Career.",
    paragraphs: [
      "He Just Chases Ideas In Whichever Direction They Lead Him, Finding Himself In The Most Random Of New Situations, Moments Of Success And Failure All While Dealing With His Own Life's Hardships (Raising 4 Kids - One With Special Needs - And Managing His Own Neurological Disease).",
      "From Being Named The Internet's Most Influential Photographer At One Point To Speaking In Stadiums To Kickstarting A Hotel Chain To Launching A Worldwide Give-Back Initiative To Being Featured At An Art Auction Alongside The Greatest Artists That Have Ever Lived... It's Always Something Wildly Surprising, Even For Cowart Himself.",
      "\"I Don't Set Goals Or Plan Ahead And Money Never Motivates Me. It's Always About The Idea, Always Has Been And Always Will Be. Some Of The Ideas Fail Miserably But The Lessons Learned Are Invaluable So I Immediately Go Chase The Next One. I've Done It For 20 Years And I'll Do It For The Rest Of My Life. My Hope Is That The Public Sees My Love For Art And Love For People Throughout All Of It.\"",
    ],
    image: "/designers/jeremy/1.png",
    source: "Instagram",
  };

  const headings = [
    "Jeremy Cowart",
    "Sarah Johnson",
    "Michael Chen",
    "Emily Rodriguez",
    "David Thompson",
  ];

  return (
    <div>
      <HeadingSlider headings={headings} />
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden">
        <div className="mt-10 mx-6">
          <ImageSlider images={images} />
        </div>
        <div>
          <Hero
            heading={sampleData.heading}
            paragraphs={sampleData.paragraphs}
            image={sampleData.image}
            source={sampleData.source}
          />
        </div>
        <div>
          <PressHero images={social} />
          <div className="mx-6">
            <MagazineCard {...magazines[0]} />
          </div>
          <div className="mx-6 my-10">
            <MagazineCard {...magazines[1]} />
          </div>
        </div>
      </div>

      {/* Desktop Layout with Independent Scrolling */}
      <div className="hidden lg:flex lg:flex-row lg:h-screen">
        {/* Left Section - Independently Scrollable */}
        <div className="w-1/2 h-full overflow-y-auto">
          <div className="mb-10">
            <Hero
              heading={sampleData.heading}
              paragraphs={sampleData.paragraphs}
              image={sampleData.image}
              source={sampleData.source}
            />
          </div>
        </div>

        {/* Right Section - Independently Scrollable */}
        <div className="w-1/2 h-full overflow-y-auto flex flex-col">
          <div className="mt-10 mx-6">
            <ImageSlider images={images} />
          </div>
          <div>
            <PressHero images={social} />
            <div className="mx-6">
              <MagazineCard {...magazines[0]} />
            </div>
            <div className="mx-6 my-10">
              <MagazineCard {...magazines[1]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designer;
