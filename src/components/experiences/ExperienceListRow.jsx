import Link from "next/link";
import {
  getExperienceCategoryPageHref,
  getExperienceCategorySectionId,
} from "@/lib/experienceCategoryNav";

/** One Strapi experience category with its assigned experiences. */
export default function ExperienceListRow({
  categoryId,
  title,
  tags = [],
  experiences = [],
}) {
  if (!experiences.length || !categoryId) return null;

  const sectionId = getExperienceCategorySectionId(categoryId);
  const categoryHref = getExperienceCategoryPageHref(categoryId);

  return (
    <section
      id={sectionId}
      className="scroll-mt-28 border-t border-[#1D1D1D]/15 pt-8 first:border-t-0 first:pt-0 lg:scroll-mt-36 lg:pt-10"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:mb-6">
        <div>
          <h2 className="text-[20px] font-normal uppercase leading-[1.3] tracking-[0.02em] text-[#1D1D1D] sm:text-[22px] lg:text-[28px]">
            {title}
          </h2>
          {tags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-block border border-[#111111] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[#333333] sm:text-[12px] lg:text-[13px]">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Link
          href={categoryHref}
          className="inline-flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-wider text-[#111111] transition-colors hover:text-[#555555] sm:mt-1 lg:text-[16px]"
        >
          <span>VIEW EXPERIENCE</span>
          <span aria-hidden>↗</span>
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:gap-2.5 lg:gap-3">
        {experiences.map((experience) => (
          <Link
            key={experience.id}
            href={experience.href}
            className="relative h-[200px] w-[min(42vw,280px)] shrink-0 overflow-hidden bg-[#d4d4d4] sm:h-[240px] sm:w-[min(32vw,320px)] lg:h-[280px] lg:w-[min(22vw,380px)] xl:h-[320px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={experience.image}
              alt={experience.title}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
