"use client";
import About from "@/components/landing/About";
import Artists from "@/components/landing/Artists";
import RecentEvents from "@/components/landing/RecentEvents";
import Speakers from "@/components/landing/Speakers";
import TextHero from "@/components/charity_partners/TextHero";
import ImageCarousel from "@/components/experiences/ImageCarousel";
import ContactForm from "./contact-us/page";
import Hero from "@/components/home/Hero";
import LogoSlider from "@/components/home/TextSlider";
import Services from "@/components/home/Services";
import NolchaExperience from "@/components/home/Collaboration";
import UpcomingEvents from "@/components/home/UpcomingEvents";
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
      video: "/video.mp4",
      title: "/home/forbes.png",
      description:
        "“Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.”",
    },
    {
      video: "/video.mp4",
      title: "home/forbes.png",
      description: "lorem ipsum",
    },
  ];
  const posts = [
    "/experiences/jack/posts/1.png",
    "/experiences/jack/posts/2.png",
    "/experiences/jack/posts/3.png",
    "/experiences/jack/posts/4.png",
    "/experiences/jack/posts/5.png",
  ];
  const logos = [
    { name: "AdAge", url: "/home/slider1.png" },
    { name: "VOGUE", url: "/home/slider2.png" },
    { name: "Forbes", url: "/home/slider3.png" },
  ];
  const videos = [
    "/video.mp4",
    "/video.mp4",
    "/video.mp4",
    "/video.mp4",
  ]
  return (
    <div className="">
      <div className="bg-[var(--surface-color2)]">
        <Hero />
        <LogoSlider logos={logos} />
        <About
          title={"About Nolcha"}
          paragraphs={[
            "Partnering with leading brands and global blockchain, AI, and crypto conferences, Nolcha has 15+ years of shaping culture, tech, and community through high-impact experiential events",
          ]}
          link={"#"}
          linkText={"Learn More"}
          image={"/home/about.png"}
          imageStyle={"max-w-[667px]"}
        />
      </div>
      <Services />
      <div className="bg-[var(--secondary-color)]">
        <RecentEvents />
      </div>
      <UpcomingEvents />
      <Speakers />
      <NolchaExperience />

      <TextHero images={slideData} />
      <img src="/home/AboveArtist.png"/>
      <Artists textColor={"text-[var(--tertiary-text-color)]"} videos={videos} />
      <div className="bg-[var(--surface-color2)]">
        <img src="/landing/background.png" className="mx-auto w-full" />
        <div className="bg-[var(--surface-color2)]">
          <ImageCarousel posts={posts} />
        </div>
        <div className="mt-10 mb-10">
          <ContactForm bg={"/landing/background2.jpg"} />
        </div>
      </div>
    </div>
  );
}
