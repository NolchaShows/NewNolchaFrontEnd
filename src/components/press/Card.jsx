import React from "react";

const isExternalHref = (href) =>
  typeof href === "string" &&
  (href.startsWith("http://") || href.startsWith("https://"));

function Card({ newsPaper, image, title, link, variant = "legacy", dateLabel = "" }) {
  if (variant === "modern") {
    const linkProps = isExternalHref(link) ? { target: "_blank", rel: "noreferrer" } : {};

    return (
      <article className="relative isolate flex h-full min-h-[420px] w-full flex-col overflow-hidden lg:min-h-[560px] xl:min-h-[590px] 2xl:min-h-[640px]">
        {/* Full card surface (border-to-border) so blur covers the entire box, not only image + text */}
        <div className="flex min-h-0 flex-col relative px-0 md:px-3 press-card-blur-target transition-[filter] duration-300 ease-out will-change-[filter]">
          <div className="shrink-0 overflow-hidden bg-[#E7E7E7]">
            <img
              src={image}
              alt={title || "Press card image"}
              className="h-[260px] w-full object-cover sm:h-[300px] lg:h-[360px] xl:h-[360px] 2xl:h-[600px]"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-[#EEEEEE]">
            <div className="mt-3 flex shrink-0 items-center justify-between text-[12px] italic text-[#636363] lg:text-[16px]">
              <span>Article</span>
              {dateLabel ? <span>{dateLabel}</span> : <span className="opacity-0">00/00/00</span>}
            </div>

            <h3 className="mt-3 shrink-0 text-[14px] uppercase text-[#111111] lg:text-[20px]">
              {title}
            </h3>

            <div className="mt-6 flex shrink-0 items-center gap-4 text-[10px] uppercase text-[#1A1A1A] lg:text-[16px]">
              <span className="hover:opacity-75 transition-opacity">
                View Article
              </span>
              <span
                className="inline-flex items-center hover:opacity-75 transition-opacity"
                aria-hidden
              >
                <svg class="arrow-link__svg" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.544922" y="0.5" width="10.4411" height="1.59609" fill="currentColor"></rect><rect width="10.4411" height="1.59609" transform="matrix(-6.40025e-08 1 1 6.40025e-08 9.4043 0.514771)" fill="currentColor"></rect><rect y="10.2979" width="13.7662" height="1.59609" transform="rotate(-45 0 10.2979)" fill="currentColor"></rect></svg>
              </span>
            </div>

            <div className="min-h-0 flex-1" aria-hidden />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white">
            View Article
          </span>
        </div>

        {link ? (
          <a
            href={link}
            {...linkProps}
            aria-label={`Open ${title || "article"}`}
            className="absolute inset-0 z-20"
          />
        ) : null}
      </article>
    );
  }

  return (
    <div
      className="backdrop-blur-[4px] bg-[#1a1a1a] lg:py-[30px] py-[20px] xxl:py-[40px] 3xl:py-[60px] lg:px-[20px] px-[16px] xxl:px-[30px] 3xl:px-[45px] flex flex-col gap-[20px] xxl:gap-[30px] 3xl:gap-[45px] w-full rounded-[17px] 3xl:rounded-[34px] shadow-[0px_0.5px_10px_rgba(0,0,0,0.1),0px_20px_26px_rgba(0,0,0,0.4)] text-white transition-transform duration-300"
    >
      <div className="flex justify-center items-center h-[58px] xxl:h-[80px] 3xl:h-[112px]">
        <img
          src={newsPaper}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="overflow-hidden rounded-[4px] 3xl:rounded-[8px]">
        <img
          src={image}
          className="w-full h-[200px] sm:h-[230px] xxl:h-[300px] 3xl:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <h1 className="text-[16px] sm:text-[18px] xxl:text-[24px] 3xl:text-[36px] text-center leading-[1.5] tracking-[-0.54px]">
        {title}
      </h1>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-center cursor-pointer bg-primary py-[12px] sm:py-[16px] xxl:py-[20px] 3xl:py-[30px] px-[24px] w-full rounded-lg hover:opacity-90 transition-opacity text-[16px] lg:text-[18px] xxl:text-[24px] 3xl:text-[36px] text-black font-medium"
      >
        View Article
      </a>
    </div>
  );
}
export default Card;
