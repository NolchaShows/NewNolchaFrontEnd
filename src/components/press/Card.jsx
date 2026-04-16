import React from "react";

const isExternalHref = (href) =>
  typeof href === "string" &&
  (href.startsWith("http://") || href.startsWith("https://"));

function Card({ newsPaper, image, title, link, variant = "legacy", dateLabel = "" }) {
  if (variant === "modern") {
    return (
      <article className="relative isolate flex h-full min-h-[480px] w-full flex-col overflow-hidden lg:min-h-[560px]">
        {/* Full card surface (border-to-border) so blur covers the entire box, not only image + text */}
        <div className="press-card-blur-target absolute inset-0 flex min-h-0 flex-col transition-[filter] duration-300 ease-out will-change-[filter]">
          <div className="shrink-0 overflow-hidden bg-[#E7E7E7]">
            <img
              src={image}
              alt={title || "Press card image"}
              className="h-[260px] w-full object-cover sm:h-[300px] lg:h-[360px]"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-[#EEEEEE]">
            <div className="mt-3 flex shrink-0 items-center justify-between text-[12px] italic text-[#636363] lg:text-[18px]">
              <span>Article</span>
              {dateLabel ? <span>{dateLabel}</span> : <span className="opacity-0">00/00/00</span>}
            </div>

            <h3 className="mt-3 shrink-0 text-[14px] uppercase text-[#111111] lg:text-[18px]">
              {title}
            </h3>

            <div className="mt-5 flex shrink-0 items-center gap-4 text-[10px] uppercase text-[#1A1A1A] lg:text-[16px]">
              <a
                href={link}
                {...(isExternalHref(link) ? { target: "_blank", rel: "noreferrer" } : {})}
                className="hover:opacity-75 transition-opacity"
              >
                View Article
              </a>
              <a
                href={link}
                {...(isExternalHref(link) ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-flex items-center hover:opacity-75 transition-opacity"
                aria-label={`Open ${title}`}
              >
                ↗
              </a>
            </div>

            <div className="min-h-0 flex-1" aria-hidden />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <a
            href={link}
            {...(isExternalHref(link) ? { target: "_blank", rel: "noreferrer" } : {})}
            className="pointer-events-auto inline-flex items-center justify-center bg-white/80 px-5 py-2 text-[18px] uppercase text-[#2A2A2A] transition hover:bg-white"
          >
            View Article
          </a>
        </div>
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
