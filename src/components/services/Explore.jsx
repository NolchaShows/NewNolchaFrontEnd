"use client";
import React, { useState } from "react";
import ServicesModal from "../Modals/ServicesModal";

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [srv, setSrv] = useState({});

  const services = [
    {
      id: 1,
      title: "Strategy & Event Production",
      headline: "We handle the details — you own the spotlight",
      description:
        "From vision to execution, we create cultural moments that ignite conversations, spark business opportunities, and position your brand at the center of influence.",
      image1: "/services/31.png",
      image2: "/services/32.png",
      capabilities: {
        "End-to-End Event Management":
          "Strategy, planning, budgeting, timelines, logistics",
        "Venue & Experience Design":
          "Scouting, immersive transformations, stage design",
        "VIP & Guest Relations":
          "Invite-only curation, founders, investors, and industry leaders",
        "Talent & Programming":
          "Speakers, artists, entertainment, custom showflow",
        "Creative & Brand Integration":
          "Concept development, art direction, music curation",
        "Onsite Excellence":
          "Registration systems, guest list management, security & operations",
      },
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/903c119133fa831c0f81eced85d50816f8d68d5b?width=880",
      media: ["/services/40.png"],
      gallery: [
        "/services/gallery/1.png",
        "/services/gallery/2.png",
        "/services/gallery/3.png",
        "/services/gallery/4.png",
        "/services/gallery/5.png",
        "/services/gallery/6.png",
        "/services/gallery/7.png",
        "/services/gallery/8.png",
        "/services/gallery/9.png",
        "/services/gallery/10.png",
        "/services/gallery/11.png",
        "/services/gallery/12.png",
        "/services/gallery/13.png",
        "/services/gallery/14.png",
      ]
    },
    {
      id: 2,
      title: "Creative & Immersive",
      description:
        " From large-scale projection mapping to fully immersive real-world environments, we bring ideas to life with experiences that captivate and connect. We blend design, technology, and storytelling to create unforgettable brand moments that resonate long after the event ends.",
      image1: "/services/33.png",
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/7d249f6bcdb4646ae24fcc6eee579f70b383d27f?width=880",
      media: ["/services/41.png"],
      media2: ["/services/46.png"],
      gallery: [
        "/services/gallery/15.png",
        "/services/gallery/16.png",
        "/services/gallery/17.png",
        "/services/gallery/18.png",
        "/services/gallery/19.png",
        "/services/gallery/20.png",
        "/services/gallery/21.png",
        "/services/gallery/22.png",
        "/services/gallery/23.png",
        "/services/gallery/24.png",
        "/services/gallery/25.png",
      ]
    },
    {
      id: 3,
      title: "Sponsorship Sales & Partner",
      headline: "Nolcha Sponsorship Sales & Partner Management",
      description:
        "We connect innovative brands with the world’s most influential events — from blockchain summits and tech conferences to fashion runways and art fairs. Our sponsorship programs are built to deliver measurable ROI, amplify brand presence, and create lasting impact.",
      image1: "/services/34.png",
      image2: "/services/35.png",
      capabilities: {
        "Strategic Sponsorship Program Design": "",
        "Sponsorship management": "",
        "Premium Prospectus & Sales Collateral": "",
        "High-Value Sponsor Acquisition & Management": "",
        "Targeted Industry Outreach & Deal Negotiation": "",
        "Benefit Fulfillment & ROI Reporting": "",
      },
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/1574f7d58c3598db6b51067de8f701e8dbca5be2?width=880",
      media: ["/services/42.png"],
      media: ["/services/44.png"],
      gallery: [
        "/services/gallery/26.png",
        "/services/gallery/27.png",
        "/services/gallery/28.png",
        "/services/gallery/29.png",
        "/services/gallery/30.png",
        "/services/gallery/31.png",
        "/services/gallery/32.png",
        "/services/gallery/33.png",
        "/services/gallery/34.png",
        "/services/gallery/35.png",
        "/services/gallery/36.png",
      ]
    },
    {
      id: 4,
      title: "Experience Technology",
      headline: "We harness the latest in AR, VR",
      description:
        "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement. From gamified activations and holographic showcases to custom-built apps and live data visualizations, we integrate technology that enhances storytelling, drives participation, and amplifies brand impact — both onsite and online.",
      image1: "/services/36.png",
      image2: "/services/37.png",
      capabilities: {
        "Investor & Strategic Partner Sourcing": "",
        "Capital Raise Strategy & Advisory": "",
        "Sponsorship & Partnership Development": "",
        "Pitch Deck & Fundraising Material Creation": "",
        "High-Value Industry Introductions": "",
        "Deal Negotiation & Relationship Management": "",
      },
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/8e2a36c7e0e028e942a2b5c0a8760d1add733d90?width=1344",
            media: ["/services/43.png"],
      media2: ["/services/45.png"],
      gallery: [
        "/services/gallery/37.png",
        "/services/gallery/38.png",
        "/services/gallery/39.png",
        "/services/gallery/40.png",
        "/services/gallery/41.png",
        "/services/gallery/42.png",
        "/services/gallery/43.png",
        "/services/gallery/44.png",
      ]
    },
    {
      id: 5,
      title: "Business Dev and fund raising",
      headline: "We harness the latest in AR, VR",
      description:
        "We harness the latest in AR, VR, mixed reality, and interactive installations to turn ideas into next-level audience engagement. From gamified activations and holographic showcases to custom-built apps and live data visualizations, we integrate technology that enhances storytelling, drives participation, and amplifies brand impact — both onsite and online.",
      image1: "/services/38.png",
      image2: "/services/39.png",
      capabilities: {
        "Augmented & Virtual Reality Experiences": "",
        "Interactive Installations & Gamification": "",
        "Projection Mapping & Holographic Displays": "",
        "Custom Event Apps & Digital Platforms": "",
        "Live Polling, Data Visualization & Social Walls": "",
        "RFID, NFC & Wearable Tech Integration": "",
        "Hybrid Event Streaming & Multi-Camera Production": "",
      },
      backgroundImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/85980f9cac61ea5d3cf303ba5d055af624279b71?width=1336",
        gallery: [
        "/services/gallery/47.png",
        "/services/gallery/48.png",
        "/services/gallery/49.png",
        "/services/gallery/50.png",
        "/services/gallery/51.png",
        "/services/gallery/52.png",
        "/services/gallery/53.png",
        "/services/gallery/54.png",
        "/services/gallery/55.png",
        "/services/gallery/56.png",
        "/services/gallery/57.png",
        "/services/gallery/58.png",
        "/services/gallery/59.png",
      ]

    },
  ];

  const handleClick = (id) => {
    setSrv(services[id - 1]);
    setIsModalOpen(true);
  };

  if (isModalOpen) {
    return <ServicesModal setIsModalOpen={setIsModalOpen} service={srv} />;
  }

  return (
    <section className="flex w-full max-w-none py-16 px-6 sm:px-10 flex-col items-center gap-10 bg-white mx-auto">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-[#003233] font-sans text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-medium uppercase m-0 text-center">
            Explore our services
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
          {services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="flex h-[466px] lg:flex-1 rounded-xl overflow-hidden lg:flex-shrink-0 w-full"
            >
              <div
                className="flex w-full h-full p-4 justify-center items-end cursor-pointer bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${service.backgroundImage})` }}
                onClick={() => handleClick(service.id)}
              >
                <div className="flex py-6 px-2.5 justify-center items-center gap-2.5 w-full rounded-xl bg-[#77777799] bg-opacity-60 backdrop-blur-sm">
                  <h3 className="text-white font-sans text-lg sm:text-xl lg:text-2xl font-medium uppercase text-center m-0">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
          <div className="flex h-[466px] w-full lg:w-[668px] lg:flex-1/2 lg:flex-shrink-0 rounded-xl overflow-hidden">
            <div
              className="flex w-full h-full p-4 justify-center items-end cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${services[3].backgroundImage})`,
              }}
              onClick={() => handleClick(4)}
            >
              <div className="flex py-6 px-2.5 justify-center items-center gap-2.5 w-full rounded-xl bg-[#77777799] bg-opacity-60 backdrop-blur-sm">
                <h3 className="text-white font-sans text-lg sm:text-xl lg:text-2xl font-medium uppercase text-center m-0">
                  {services[3].title}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex h-[466px] w-full lg:w-[668px]  lg:flex-1/2 lg:flex-shrink-0 rounded-xl overflow-hidden">
            <div
              className="flex w-full h-full p-4 justify-center items-end cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${services[4].backgroundImage})` }}
              onClick={() => handleClick(5)}
            >
              <div className="flex py-6 px-2.5 justify-center items-center gap-2.5 w-full rounded-xl bg-[#77777799] bg-opacity-60 backdrop-blur-sm">
                <h3 className="text-white font-sans text-lg sm:text-xl lg:text-2xl font-medium uppercase text-center m-0">
                  {services[4].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
