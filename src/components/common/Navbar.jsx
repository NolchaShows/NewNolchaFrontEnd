import React from "react";
import Link from "next/link";
function Navbar() {
  const menuItems = [
    { label: "BTC Vegas", href: "#" },
    { label: "Upcoming", href: "#" },
    { label: "Charity Partners", href: "#" },
    { label: "Experiences", href: "#" },
    { label: "Speakers", href: "#" },
    { label: "Artist", href: "/artists" },
    { label: "Press", href: "/press" },
    { label: "Shop", href: "#" },
  ];
  const buttons = [
    {
      label: "Sign in",
      href: "#",
      bg: "bg-[var(--primary-color)]",
    },
    {
      label: "Membership",
      href: "#",
      bg: "bg-[var(--tertiary-color)] border-[var(--secondary-text-color)] border-[1px]",
    },
  ];
  return (
    <div className="py-[20px] md:px-[40px] px-[16px] max-w-[1440px] mx-auto flex justify-between items-center text-[var(--secondary-text-color)]">
      <div className="flex gap-[12px]">
        <img src="/navbar/dropdown.svg" className="lg:hidden cursor-pointer" />
        <img src="/navbar/logo.svg" />
      </div>
      <div className=" gap-[20px] hidden lg:flex">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item.href} className="hover:underline">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex md:gap-[10px] gap-[8px]">
        {buttons.map((btn, idx) => (
          <Link
            key={idx}
            href={btn.href}
            className={`${btn.bg} md:py-[12px] md:px-[24px] py-[6px] px-[14px] rounded-[4px] `}
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
