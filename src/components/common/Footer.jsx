import React from "react";
import Link from "next/link";
function Footer() {
  const footerLinks = [
    { label: "NoichaBTC", href: "#" },
    { label: "Charity Partners", href: "#" },
    { label: "Experiences", href: "#" },
    { label: "Artists", href: "#" },
    { label: "Press", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Shop", href: "#" },
  ];

  const socialLinks = [
    { href: "#", icon: "/footer/yt.svg", alt: "YouTube" },
    { href: "#", icon: "/footer/linkedin.svg", alt: "LinkedIn" },
  ];
  const legalLinks = [
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookies", href: "#" },
  ];
  // Utility to split into chunks of 4
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const columns = chunkArray(footerLinks, 4);
  return (
    <div className="md:py-[64px] md:px-[60px] py-[40px] px-[16px] max-w-[1440px] mx-auto flex flex-col gap-[10px]">
      <div className="flex lg:gap-[121px] gap-[24px] flex-col lg:flex-row">
        {/*NewsLetter Subscription */}
        <div className="bg-[var(--tertiary-color)] px-[32px] pt-[19px] pb-[35px] rounded-[8px]">
          <div className="flex flex-col gap-[80px] lg:max-w-[420px] ">
            <h1 className="text-[var(--primary-text-color)]  md:text-center lg:text-left font-medium sm:text-[32px] text-[26px] uppercase">
              Subscribe to our newsletter
            </h1>
            <div className="bg-[var(--brown2)] py-[10px] pl-[10px] pr-[5px] rounded-[8px]">
              <div className="flex justify-between">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="bg-transparent text-[var(--secondary-text-color)] placeholder-[var(--secondary-text-color)] border-none outline-none focus:outline-none focus:border-none w-full px-[5px]"
                />
                <button className=" py-[10px] px-[20px] bg-[var(--secondary-text-color)] text-[var(--primary-color)] rounded-[8px] cursor-pointer">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Links */}
        <div className="flex justify-between w-full  text-[var(--secondary-text-color)] text-[20px]">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-[20px]">
              {col.map((link, linkIdx) => (
                <Link key={linkIdx} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="border-l border-l-[#D5D5D5] h-fit py-[10px] pl-[30px] flex flex-col gap-[10px]">
            {socialLinks.map((social, idx) => (
              <Link key={idx} href={social.href} className="h-[56px] w-[56px]">
                <img src={social.icon} alt={social.alt} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-[30px] flex lg:flex-row flex-col justify-between   text-[var(--secondary-text-color)] font-medium">
        <div className="flex flex-col gap-[19px] text-[16px] items-center lg:items-start ">
          <img src="/footer/logo.svg" className="w-[104px] h-[30.33px]" />
          <div className="flex gap-[10px] flex-col">
            <p className="text-center lg:text-left">1345 Ave of the Americas, 2nd floor, New York, NY 10105</p>
            <p className="text-center lg:text-left">Pr@nolcha.com</p>
            <p className="text-center lg:text-left">© Copyright Rudy 2024</p>
          </div>
        </div>
        <div className="flex lg:gap-[45px] justify-between text-[20px] pt-[32px] lg:pt-[0px]">
          {legalLinks.map((link, idx) => (
            <Link key={idx} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
