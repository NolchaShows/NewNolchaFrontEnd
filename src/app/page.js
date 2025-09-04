"use client";
import Companies from "@/components/common/Companies";
import About from "@/components/landing/About";
import Artists from "@/components/landing/Artists";
import CustomerTestimonials from "@/components/landing/CustomerTestimonials";
import Hero from "@/components/landing/Hero";
import RecentEvents from "@/components/landing/RecentEvents";
import Slider from "@/components/landing/Slider";
import Speakers from "@/components/landing/Speakers";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingEvents from "@/components/landing/UpcomingEvents";
import Form from "@/components/landing/Form";
import TextHero from "@/components/charity_partners/TextHero";
import ImageCarousel from "@/components/experiences/ImageCarousel";
import ContactForm from "./contact-us/page";
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
  return (
    <div className="">
      <div className="bg-[var(--surface-color2)]">
        <Hero />
        <About
          title={"What we do"}
          paragraphs={[
            "Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per.",
            "Our focus is on mastering the cryptocurrency market through rigorous analysis and advanced technological tools",
          ]}
          link={"#"}
          linkText={"More about us"}
          image={"/landing/about.jpg"}
          imageStyle={"max-w-[667px]"}
        />
      </div>
      <Companies
        companies={companies}
        title={"Partners that trailblaze with us"}
      />
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
