import Link from "next/link";

export default function OurPressSection({
  label = "[ PRESS ]",
  title = "MATTE MOVES PEOPLE TO MAKE CULTURE, TOGETHER",
  viewMoreText = "VIEW MORE",
  viewMoreHref = "/press",
  featureImage = "/about/press.webp",
  featureDate = "April 11, 2024",
  featureTitle = "PUMA WANTS TO SPRINT IN OLYMPICS BRAND RACE AGAINST NIKE AND ADIDAS",
  featureSource = "ADWEEK",
}) {
  return (
    <section className="w-full bg-[#F4F4F4] px-5 py-16 lg:px-11 lg:py-24">
      <div className="mx-auto w-full">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-[12px] uppercase tracking-[0.08em] text-[#3A3A3A] lg:text-[14px]">
              {label}
            </p>
            <h2 className="mt-3 max-w-[860px] text-[36px] uppercase leading-[0.95] tracking-[-0.02em] text-[#1D1D1D] lg:text-[50px]">
              {title}
            </h2>
          </div>

          <Link
            href={viewMoreHref}
            className="mt-1 inline-flex items-center gap-2 text-[16px] uppercase tracking-[0.02em] text-[#1D1D1D] transition-opacity hover:opacity-70 lg:mt-5 lg:text-[25px]"
          >
            <span>{viewMoreText}</span>
            <span aria-hidden className="text-[16px] lg:text-[25px]">
              ↓
            </span>
          </Link>
        </div>

        <hr className="my-8 border-t border-[#1D1D1D] lg:mt-14 lg:mb-8" />

        <article className="grid grid-cols-1 gap-5 lg:grid-cols-[540px_1fr] lg:gap-6">
          <img
            src={featureImage}
            alt="Press feature"
            className="h-[220px] w-full object-cover lg:h-[320px]"
          />

          <div className="flex flex-col">
            <p className="text-[14px] font-semibold text-[#1D1D1D] lg:text-[16px]">
              {featureDate}
            </p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <h3 className="max-w-[920px] text-[24px] uppercase leading-[0.95] tracking-[-0.02em] text-[#1D1D1D] lg:text-[32px]">
                {featureTitle}
              </h3>
              <svg class="arrow-link__svg object-contain h-12 w-12 text-[#1D1D1D]" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.544922" y="0.5" width="10.4411" height="1.59609" fill="currentColor"></rect><rect width="10.4411" height="1.59609" transform="matrix(-6.40025e-08 1 1 6.40025e-08 9.4043 0.514771)" fill="currentColor"></rect><rect y="10.2979" width="13.7662" height="1.59609" transform="rotate(-45 0 10.2979)" fill="currentColor"></rect></svg>
            </div>
            <p className="mt-auto font-serif uppercase text-[18px] leading-[22px] -tracking-[0.03em] text-[#1D1D1D]">
              {featureSource}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
