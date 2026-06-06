import Link from "next/link";
import HorizontalDragScroll from "@/components/common/HorizontalDragScroll";
import { getExperienceCategorySectionId } from "@/lib/experienceCategoryNav";

/** Break title into lines at each period (same as experiences page header). */
const splitHeadlineLines = (text) => {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return [];
  if (!trimmed.includes(".")) return [trimmed];
  return trimmed
    .split(/(?<=\.)\s*/)
    .map((line) => line.trim())
    .filter(Boolean);
};

function ExperienceTags({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-block border border-[#111111] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[#333333] sm:text-[12px] lg:text-[13px]">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceEventRow({ title, href, images = [], tags = [] }) {
  if (!images.length) return null;

  return (
    <article>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:mb-6">
        <div>
          <h3 className="text-[16px] font-normal uppercase leading-[1.3] tracking-[0.02em] text-[#1D1D1D] sm:text-[18px] lg:text-[22px]">
            {title}
          </h3>
          <ExperienceTags tags={tags} />
        </div>

        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-wider text-[#111111] transition-colors hover:text-[#555555] sm:mt-1 lg:text-[16px]"
        >
          <span>VIEW EXPERIENCE</span>
          <span aria-hidden>↗</span>
        </Link>
      </div>

      <HorizontalDragScroll className="gap-2 sm:gap-2.5 lg:gap-3">
        {images.map((src, index) => (
          <Link
            key={`${src}-${index}`}
            href={href}
            draggable={false}
            className="relative h-[200px] w-[min(42vw,280px)] shrink-0 overflow-hidden bg-[#d4d4d4] sm:h-[240px] sm:w-[min(32vw,320px)] lg:h-[280px] lg:w-[min(22vw,380px)] xl:h-[320px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={index === 0 ? title : ""}
              className="pointer-events-none h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </Link>
        ))}
      </HorizontalDragScroll>
    </article>
  );
}

/** One Strapi experience category with its assigned experiences. */
export default function ExperienceListRow({
  categoryId,
  title,
  experiences = [],
}) {
  if (!experiences.length || !categoryId) return null;

  const sectionId = getExperienceCategorySectionId(categoryId);
  const headlineLines = splitHeadlineLines(title);

  return (
    <section
      id={sectionId}
      className="scroll-mt-28 border-t border-[#1D1D1D]/15 pt-8 first:border-t-0 first:pt-0 lg:scroll-mt-36 lg:pt-10"
    >
      <h2 className="mb-8 m-0 p-0 text-[36px] font-normal uppercase leading-[0.95] tracking-[-0.04em] text-[#111111] sm:text-[48px] md:text-[60px] lg:mb-10 lg:text-[84px]">
        {headlineLines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="flex flex-col gap-10 lg:gap-12">
        {experiences.map((experience) => (
          <ExperienceEventRow
            key={experience.id}
            title={experience.title}
            href={experience.href}
            images={experience.images}
            tags={experience.tags}
          />
        ))}
      </div>
    </section>
  );
}
