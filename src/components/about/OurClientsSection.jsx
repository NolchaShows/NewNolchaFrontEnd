import Link from "next/link";

const clientLogos = [
  "/home/logo-slider/forbes.webp",
  "/landing/forbes.svg",
  "/home/logo-slider/vogue.webp",
  "/home/logo-slider/wwd.webp",
  "/home/logo-slider/adage.webp",
  "/home/logo-slider/one37.webp",
  "/home/logo-slider/coindesk.webp",
  "/home/logo-slider/cointale.webp",
  "/home/logo-slider/nftnow.webp",
];

export default function OurClientsSection() {
  return (
    <section className="w-full bg-[#F4F4F4] px-5 py-16 lg:px-11 lg:py-24">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:text-[14px]">
              [ OUR CLIENTS ]
            </p>
            <h2 className="mt-3 max-w-[680px] text-[36px] uppercase leading-[0.95] tracking-[-0.02em] text-[#1D1D1D] lg:text-[50px]">
              CATEGORY AGNOSTIC PARTNER PORTFOLIO
            </h2>
          </div>

          <div className="lg:max-w-[700px]">
            <p className="text-[14px] leading-[1.35] text-[#1D1D1D] lg:text-[16px]">
              At MATTE, our diverse client portfolio spans various industries,
              enabling us to approach each project uniquely. Working across diverse
              industries provides us with cross-industry insights, allowing us to
              create impactful work that influences culture and identify unique
              partnership opportunities.
            </p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[#1D1D1D] transition-opacity hover:opacity-70 lg:text-[16px]"
            >
              <span>CONTACT US</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-x-12 lg:gap-y-16">
          {clientLogos.map((logoPath) => (
            <div
              key={logoPath}
              className="flex h-12 items-center justify-center lg:h-16"
            >
              <img
                src={logoPath}
                alt="Client logo"
                className="max-h-full w-auto max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
