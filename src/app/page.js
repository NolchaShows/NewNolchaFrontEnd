"use client";
import Companies from "@/components/common/Companies";
import About from "@/components/landing/About";
import Artists from "@/components/landing/Artists";
import CustomerTestimonials from "@/components/landing/CustomerTestimonials";
import RecentEvents from "@/components/landing/RecentEvents";
import Slider from "@/components/landing/Slider";
import Speakers from "@/components/landing/Speakers";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingEvents from "@/components/landing/UpcomingEvents";
import Form from "@/components/landing/Form";
import TextHero from "@/components/charity_partners/TextHero";
import ImageCarousel from "@/components/experiences/ImageCarousel";
import ContactForm from "./contact-us/page";
import Hero from "@/components/home/Hero";
import LogoSlider from "@/components/home/TextSlider";
import Services from "@/components/home/Services";
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
      image: "/charity_partners/cerebral/forbes.png",
      title: "FORBES",
      description:
        "“Nolcha Shows Returns To Art Basel Miami Beach Featuring Leading Web3 Brands.”",
    },
    {
      image: "/experiences/jack/galleryImages/1.png",
      title: "lorem",
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
  return (
    <div className="">
      <div className="bg-[var(--surface-color2)]">
        <Hero />
        <LogoSlider
          logos={logos}
        />
        <About
          title={"About Nolcha"}
          paragraphs={[
            "Partnering with leading brands and global blockchain, AI, and crypto conferences, Nolcha has 15+ years of shaping culture, tech, and community through high-impact experiential events"
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
      <div className="bg-[var(--surface-color2)]">
        <Companies companies={companies} title={"Press & Media Recognation"} />
      </div>
      <TextHero images={slideData} />

      <div className="bg-[var(--surface-color2)]">
        <ImageCarousel posts={posts} />
        <Speakers />
      </div>
      <Artists textColor={"text-[var(--tertiary-text-color)]"} />
      <div className="bg-[var(--surface-color2)]">
        <CustomerTestimonials />
        <img src="/landing/background.png" className="mx-auto w-full" />
        <div className="mt-10 mb-10">
          <ContactForm bg={"/landing/background2.jpg"} />
        </div>
      </div>
    </div>
  );
}
