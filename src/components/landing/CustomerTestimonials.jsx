import React, { useState } from "react";

export function Card({ name, role, image, text }) {
  return (
    <div className="relative h-[270px] 2xl:h-[400px] flex-shrink-0">
      {/* background shape */}
      <div className="absolute bottom-[0px] left-[-25px] 2xl:left-[-35px] w-[392px] 2xl:w-[580px] h-[110px] 2xl:h-[160px] border border-[var(--secondary-color)] bg-[var(--secondary-color)] rounded-[10px] 2xl:rounded-[15px]"></div>

      {/* main card */}
      <div className="relative z-10 border border-[#D5D5D5] w-[343px] h-[235px] 2xl:w-[500px] 2xl:h-[350px] bg-[var(--tertiary-color)] p-[25px] 2xl:p-[35px] rounded-[10px] 2xl:rounded-[15px] flex flex-col gap-[25px] 2xl:gap-[35px] left-[10px] md:left-[0px]">
        <div className="flex gap-[10px] 2xl:gap-[15px]">
          <img
            src={image}
            className="h-[40px] w-[40px] 2xl:h-[60px] 2xl:w-[60px] rounded-[10px] 2xl:rounded-[15px] object-cover"
          />
          <div className="flex flex-col gap-[10px] 2xl:gap-[12px]">
            <h3 className="font-medium text-[var(--secondary-text-color)] 2xl:text-[20px]">
              {name}
            </h3>
            <p className="text-[14px] 2xl:text-[16px] text-[var(--tertiary-text-color)]">
              {role}
            </p>
          </div>
        </div>
        <p className="text-[var(--secondary-text-color)] 2xl:text-[22px] 2xl:leading-[1.6]">{text}</p>
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
    },
    {
      name: "Leslie Alexander",
      role: "Marketer",
      image: "/landing/cust3.png",
      text: "Rorem ipsum dolor sit amet consectetur. Ac quam sem mi nibh volutpat enim pellentesque. Proin iaculis nisl et neque sed fermentum sollicitudin lectus. "
    },
    {
      name: "Albert Flores",
      role: "Designer",
      image: "/landing/cust2.png",
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
        <h1 className="uppercase lg:text-[48px] 2xl:text-[56px] text-[24px] text-center font-medium text-[var(--primary-text-color)]">
          See why our customers love us
        </h1>

        {/* Slider container */}
        <div className="relative w-full flex xl:max-w-[1200px] 2xl:max-w-[1800px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(calc(-${index} * (343px + 73px)))`,
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="mr-[73px] 2xl:mr-[100px]">
                <Card {...t} />
              </div>
            ))}
          </div>
          
          {/* 2xl transform override */}
          <div
            className="absolute inset-0 transition-transform duration-500 ease-in-out 2xl:block hidden"
            style={{ 
              transform: `translateX(calc(-${index} * (520px + 100px)))`,
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="mr-[100px]">
                <Card {...t} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-[10px] 2xl:gap-[15px]">
          <img
            src="/landing/left.svg"
            className="cursor-pointer 2xl:scale-125"
            onClick={handlePrev}
          />
          <img
            src="/landing/right.svg"
            className="cursor-pointer 2xl:scale-125"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerTestimonials;