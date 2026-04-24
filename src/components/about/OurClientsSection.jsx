import Link from "next/link";

const defaultClientLogos = [
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

export default function OurClientsSection({
  label = "[ OUR CLIENTS ]",
  title = "CATEGORY AGNOSTIC PARTNER PORTFOLIO",
  description = "At MATTE, our diverse client portfolio spans various industries, enabling us to approach each project uniquely. Working across diverse industries provides us with cross-industry insights, allowing us to create impactful work that influences culture and identify unique partnership opportunities.",
  ctaText = "CONTACT US",
  ctaHref = "/contact-us",
  clientLogos = defaultClientLogos,
}) {
  return (
    <section className="w-full bg-[#F4F4F4] px-5 py-16 lg:px-11 lg:py-24">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:text-[14px]">
              {label}
            </p>
            <h2 className="mt-3 max-w-[680px] text-[36px] uppercase leading-[0.95] tracking-[-0.02em] text-[#1D1D1D] lg:text-[50px]">
              {title}
            </h2>
          </div>

          <div className="lg:max-w-[700px]">
            <p className="text-[14px] leading-[1.35] text-[#1D1D1D] lg:text-[16px]">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[#1D1D1D] transition-opacity hover:opacity-70 lg:text-[16px]"
            >
              <span>{ctaText}</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-x-8">
          {clientLogos.map((logo, idx) => {
            const logoPath = typeof logo === 'string' ? logo : logo?.url || logo?.image?.url || "";
            if (!logoPath) return null;
            
            const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ?? "https://new-nolcha-strapi-uiai.onrender.com";
            const fullUrl = logoPath.startsWith('http') ? logoPath : `${STRAPI_URL}${logoPath.startsWith('/') ? '' : '/'}${logoPath}`;

            return (
              <div
                key={idx}
                className="flex items-center justify-center w-full"
              >
                <div className="relative w-full h-full flex items-center justify-center px-8 lg:px-8">
                  <img
                    loading="lazy"
                    src={fullUrl}
                    alt="Client logo"
                    className="max-h-full max-w-full w-auto object-contain hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
