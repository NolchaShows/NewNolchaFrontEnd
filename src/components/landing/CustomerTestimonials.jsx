import React, { useState } from "react";

export function Card({ name, role, image, text }) {
  return (
    <div className="relative h-[270px] flex-shrink-0">
      {/* background shape */}
      <div className="absolute bottom-[0px] left-[-25px] w-[392px] h-[110px] border border-[var(--secondary-color)] bg-[var(--secondary-color)] rounded-[10px]"></div>

      {/* main card */}
      <div className="relative z-10 border border-[#D5D5D5] w-[343px]   h-[235px] bg-[var(--tertiary-color)] p-[25px] rounded-[10px] flex flex-col gap-[25px] left-[10px] md:left-[0px]">
        <div className="flex gap-[10px]">
          <img
            src={image}
            className="h-[40px] w-[40px] rounded-[10px] object-cover"
          />
          <div className="flex flex-col gap-[10px]">
            <h3 className="font-medium text-[var(--secondary-text-color)]">
              {name}
            </h3>
            <p className="text-[14px] text-[var(--tertiary-text-color)]">
              {role}
            </p>
          </div>
        </div>
        <p className="text-[var(--secondary-text-color)]">{text}</p>
      </div>
    </div>
  );
}

function CustomerTestimonials() {
  const testimonials = [
    {
      name: "Cameron Williamson",
      role: "Web Designer",
      image: "/landing/cust1.png",
      text: "Rorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisl et neque sed fermentum sollicitudin lectus. "
    },
    {
      name: "Brooklyn Simmons",
      role: "Developer",
      image: "/landing/cust2.png",
      text: "Rorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisl et neque sed fermentum sollicitudin lectus. "
    },
    {
      name: "Leslie Alexander",
      role: "Marketer",
      image: "/landing/cust3.png",
      text: "Rorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisl et neque sed fermentum sollicitudin lectus. "
    },
    {
      name: "Darlene Robertson",
      role: "CEO",
      image: "/landing/cust1.png",
      text: "Rorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisl et neque sed fermentum sollicitudin lectus. "
    },
    {
      name: "Albert Flores",
      role: "Designer",
      image: "/landing/cust2.png",
      text: "Rorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisl et neque sed fermentum sollicitudin lectus. "
    }
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 3));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : 0));
  };

  return (
    <div className="lg:py-[64px] lg:px-[60px] py-[20px] px-[16px]">
      <div className="flex-col flex md:gap-[59px] gap-[40px] py-[6px] items-center">
        <h1 className="uppercase lg:text-[48px] text-[24px] text-center font-medium text-[var(--primary-text-color)]">
          See why our customers love us
        </h1>

        {/* Slider container */}
        <div className="relative w-full flex xl:max-w-[1200px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * (343 + 73)}px)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="mr-[73px]">
                <Card {...t} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-[10px]">
          <img
            src="/landing/left.svg"
            className="cursor-pointer"
            onClick={handlePrev}
          />
          <img
            src="/landing/right.svg"
            className="cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerTestimonials;
