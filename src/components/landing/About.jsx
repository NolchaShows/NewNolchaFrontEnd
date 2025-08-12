import Link from "next/link";
import React from "react";

function About() {
  return (
    <div className="md:py-[75px] md:px-[45px] py-[20px] px-[16px] flex md:flex-row flex-col gap-[20px] md:justify-between">
      <div className="flex flex-col gap-[32px] text-[var(--secondary-text-color)]">
        <div className="flex flex-col md:gap-[20px] gap-[16px]">
          <h1 className="md:text-[48px] text-[24px] font-medium text-[var(--primary-text-color)]">
            WHAT WE DO
          </h1>
          <div className="flex flex-col gap-[12px] md:gap-[4px]">
            <p>
              Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per.
            </p>
            <p>
              Our focus is on mastering the cryptocurrency market through
              rigorous analysis and advanced technological tools
            </p>
          </div>
        </div>
        <Link href={"#"} className="bg-[var(--primary-color)] py-[12px] px-[24px] rounded-[4px] w-[169px] hidden md:block">
        More about us
        </Link>
      </div>
      <img
      src="/landing/about.jpg"
      className="max-w-[667px] w-full rounded-[8px] max-h-[579px] object-cover"
      />
      <Link href={"#"} className="bg-[var(--primary-color)] text-center py-[12px] px-[24px] rounded-[4px] w-full  md:hidden">
        More about us
        </Link>
    </div>
  );
}

export default About;
