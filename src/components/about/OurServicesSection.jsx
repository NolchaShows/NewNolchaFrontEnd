"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function OurServicesSection() {
  const serviceStories = [
    {
      title: "World Building",
      description:
        "At MATTE Projects, we see brands as immersive worlds. Each brand we create is a full sensory experience, blending art, music, and design to reflect its community's values and aspirations. We handle everything from brand strategy and design systems to content and community engagement, crafting a brand world people want to join.",
    },
    {
      title: "Experiential",
      description:
        "Creating experiences that make people feel something is our bread and butter. At MATTE, we bring elements of entertainment to craft experiential moments that people seek out and cherish.",
    },
    {
      title: "Talent Direct",
      description:
        "Talent Direct connects brands with top-tier talent effortlessly. We manage scouting, negotiations, and logistics, ensuring every collaboration shines. Trust our expertise to find the perfect match and deliver standout results.",
    },
    {
      title: "Branded Design",
      description:
        "Where creativity meets strategy. We craft compelling visuals and narratives that elevate your brand, blending design and storytelling to captivate audiences and drive engagement.",
    },
    {
      title: "Content Studio",
      description:
        "Where creativity meets efficiency. We produce high-quality content quickly and effectively, adaptable to any media. Our compelling visuals and narratives tell your brand's story across platforms.",
    }
  ];

  return (
    <section className="relative w-full bg-[#F4F4F4] px-5 py-16 lg:px-11 lg:py-32 text-[#1D1D1D]">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,500px)_1fr] lg:gap-10">
          <div className="relative z-0 space-y-6 lg:sticky lg:top-[140px] lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.08em] lg:text-[14px] text-[#1D1D1D]">
              [ OUR SERVICES ]
            </p>

            <h2 className="max-w-[650px] text-[42px] leading-[1] tracking-[-0.02em] uppercase text-[#1D1D1D] lg:text-[50px]">
              MATTE HAS A MULTIDISCIPLINARY STUDIO THAT WORKS WITH TALENT AND BRANDS
            </h2>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[#1D1D1D] transition-opacity hover:opacity-70 lg:text-[16px]"
            >
              <span>SEE ALL PROJECTS</span>
              <span aria-hidden>↗</span>
            </Link>

            <video
              className="aspect-[9/16] w-[400px] h-auto object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="space-y-10 lg:space-y-20">
            <div className="hidden lg:block lg:h-[100vh]" aria-hidden="true" />
            {serviceStories.map((story, index) => (
              <div
                className="max-w-[980px]"
              >
                <h3 className="text-[24px] font-medium leading-[1.1] tracking-[-0.015em] text-[#1D1D1D] lg:text-[30px]">
                  {story.title}
                </h3>
                <p className="mt-5 text-[18px] leading-[1.22] tracking-[-0.015em] text-[#1D1D1D] lg:text-[28px]">
                  {story.description}
                </p>
              </div>
            ))}
            <div className="hidden lg:block lg:h-[60vh]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
