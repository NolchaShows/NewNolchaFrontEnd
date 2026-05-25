import { StrapiRichDescription } from "@/components/common/StrapiRichDescription";
import { hasRenderableDescription } from "@/lib/strapiRichText";

export function LegalDocumentShell({
  title,
  intro,
  content,
  introClassName = "mb-8 text-[20px] 2xl:text-[30px]",
  innerClassName = "py-[60px] px-[30px] 2xl:px-[60px] bg-[#F4F4F4]",
  children,
}) {
  const showIntro = hasRenderableDescription(intro);
  const showContent = hasRenderableDescription(content);
  const showFallback = !showIntro && !showContent && children;

  return (
    <div className="mx-auto bg-white p-5 md:px-30 md:py-20">
      <div className={innerClassName}>
        {title ? (
          <h1 className="mb-6 text-[36px] font-bold text-black xl:text-[64px] 2xl:text-[70px]">
            {title}
          </h1>
        ) : null}

        {showIntro ? (
          <div className={introClassName}>
            <StrapiRichDescription value={intro} variant="legal" />
          </div>
        ) : null}

        {showContent ? (
          <div className={showIntro ? "mt-8" : ""}>
            <StrapiRichDescription value={content} variant="legal" />
          </div>
        ) : null}

        {showFallback ? children : null}
      </div>
    </div>
  );
}
