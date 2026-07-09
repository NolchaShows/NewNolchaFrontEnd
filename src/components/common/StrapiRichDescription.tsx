"use client";

import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import {
  ABOUT_HEADLINE_TEXT_CLASS,
  ABOUT_HEADLINE_WRAP_CLASS,
  hasRenderableDescription,
  isRenderableNormalized,
  normalizeStrapiRichText,
  SERVICES_TITLE_TEXT_CLASS,
  SERVICES_TITLE_WRAP_CLASS,
  splitAboutHeadlineLines,
  splitRichTitleLines,
} from "@/lib/strapiRichText";

export { hasRenderableDescription, normalizeStrapiRichText };

type Variant =
  | "experience"
  | "modal"
  | "buildMomentum"
  | "legal"
  | "aboutHeadline"
  | "servicesTitle";

const markdownWrap: Record<Variant, string> = {
  experience:
    "detail-row-markdown max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_strong]:font-semibold [&_em]:italic [&_a]:text-[#1a1a1a] [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#c4c4c4] [&_blockquote]:pl-4 [&_blockquote]:italic",
  modal:
    "event-modal-markdown max-w-none text-sm sm:text-base leading-relaxed text-white [&_strong]:font-semibold [&_em]:italic [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-90 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-white/35 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/90",
  buildMomentum:
    "max-w-none text-left text-[18px] font-normal leading-[1.45] text-[#1A1A1A]/80 lg:text-[28px] [&_strong]:font-bold [&_em]:italic [&_a]:text-[#1A1A1A] [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  legal:
    "legal-page-markdown max-w-none text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed [&_h2]:text-[26px] [&_h2]:2xl:text-[40px] [&_h2]:font-medium [&_h2]:text-black [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:first:mt-0 [&_h3]:text-[20px] [&_h3]:2xl:text-[30px] [&_h3]:text-black [&_h3]:mb-2 [&_strong]:font-medium [&_em]:italic [&_a]:text-[#000000] [&_a]:underline [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:ml-4",
  aboutHeadline: `about-headline-markdown ${ABOUT_HEADLINE_WRAP_CLASS}`,
  servicesTitle: `services-title-markdown ${SERVICES_TITLE_WRAP_CLASS}`,
};

const blocksWrap: Record<Variant, string> = {
  experience:
    "detail-row-rich-text max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_a]:text-[#1a1a1a] [&_a]:underline [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  modal:
    "event-modal-blocks max-w-none text-sm sm:text-base leading-relaxed text-white [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-90 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  buildMomentum:
    "max-w-none text-left text-[18px] font-normal leading-[1.45] text-[#1A1A1A]/80 lg:text-[28px] [&_a]:text-[#1A1A1A] [&_a]:underline [&_strong]:font-bold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  legal:
    "legal-page-blocks max-w-none text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed [&_h2]:text-[26px] [&_h2]:2xl:text-[40px] [&_h2]:font-medium [&_h2]:text-black [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:first:mt-0 [&_h3]:text-[20px] [&_h3]:2xl:text-[30px] [&_h3]:text-black [&_h3]:mb-2 [&_a]:text-[#000000] [&_a]:underline [&_strong]:font-medium [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:ml-4",
  aboutHeadline: `about-headline-blocks ${ABOUT_HEADLINE_WRAP_CLASS}`,
  servicesTitle: `services-title-blocks ${SERVICES_TITLE_WRAP_CLASS}`,
};

function isLineBreakTitleVariant(variant: Variant) {
  return variant === "aboutHeadline" || variant === "servicesTitle";
}

function titleLineClassForVariant(variant: Variant) {
  if (variant === "servicesTitle") return `${SERVICES_TITLE_TEXT_CLASS} block`;
  return `${ABOUT_HEADLINE_TEXT_CLASS} block`;
}

function splitLinesForVariant(variant: Variant, text: unknown) {
  if (variant === "servicesTitle") return splitRichTitleLines(text);
  return splitAboutHeadlineLines(text);
}

function markdownLinkProps(variant: Variant) {
  if (variant !== "modal") return {};
  return {
    a({ href, children }: { href?: string; children?: ReactNode }) {
      const external =
        typeof href === "string" && /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="text-primary underline"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  };
}

function blocksForVariant(variant: Variant) {
  const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const titleLineClass = titleLineClassForVariant(variant);

  return {
    paragraph: ({ children }: { children?: ReactNode }) =>
      isLineBreakTitleVariant(variant) ? (
        <p className={titleLineClass}>{children}</p>
      ) : (
        <p className="mb-3 last:mb-0">{children}</p>
      ),
    heading: ({
      children,
      level,
    }: {
      children?: ReactNode;
      level: number;
    }) => {
      if (isLineBreakTitleVariant(variant)) {
        const Tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
        return <Tag className={titleLineClass}>{children}</Tag>;
      }

      const base =
        "mb-2 mt-4 font-semibold uppercase tracking-tight first:mt-0";
      const className =
        variant === "modal" ? `${base} text-white` : base;
      switch (level) {
        case 1:
          return <h1 className={className}>{children}</h1>;
        case 2:
          return <h2 className={className}>{children}</h2>;
        case 3:
          return <h3 className={className}>{children}</h3>;
        case 4:
          return <h4 className={className}>{children}</h4>;
        case 5:
          return <h5 className={className}>{children}</h5>;
        case 6:
          return <h6 className={className}>{children}</h6>;
        default:
          return <h3 className={className}>{children}</h3>;
      }
    },
    quote: ({ children }: { children?: ReactNode }) =>
      variant === "modal" ? (
        <blockquote className="my-3 border-l-2 border-white/35 pl-4 italic text-white/90">
          {children}
        </blockquote>
      ) : (
        <blockquote className="my-3 border-l-2 border-[#c4c4c4] pl-4 italic">
          {children}
        </blockquote>
      ),
    code: ({ plainText }: { plainText?: string }) =>
      variant === "modal" ? (
        <pre className="my-3 overflow-x-auto rounded bg-white/10 p-3 text-[13px] text-white">
          <code>{plainText}</code>
        </pre>
      ) : (
        <pre className="my-3 overflow-x-auto rounded bg-black/5 p-3 text-[13px]">
          <code>{plainText}</code>
        </pre>
      ),
    list: ({
      format,
      children,
    }: {
      format?: string;
      children?: ReactNode;
    }) => {
      const ListTag = format === "ordered" ? "ol" : "ul";
      return <ListTag className="my-2 pl-5">{children}</ListTag>;
    },
    "list-item": ({ children }: { children?: ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    link: ({
      children,
      url,
    }: {
      children?: ReactNode;
      url?: string;
    }) => (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          variant === "modal"
            ? "text-primary underline hover:opacity-90"
            : "text-[#1a1a1a] underline"
        }
      >
        {children}
      </a>
    ),
    image: ({
      image,
    }: {
      image?: {
        url?: string;
        alternativeText?: string;
        width?: number;
        height?: number;
      };
    }) => {
      const raw = image?.url || "";
      const src = raw.startsWith("http") ? raw : `${strapiBase}${raw}`;
      if (!src) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={image?.alternativeText || ""}
          className="my-3 h-auto max-w-full rounded"
          width={image?.width}
          height={image?.height}
        />
      );
    },
  };
}

function renderTitleLines(
  lines: string[],
  wrapperClass: string,
  lineClass: string
) {
  return (
    <div className={wrapperClass}>
      {lines.map((line, index) => (
        <p key={index} className={lineClass}>
          {line}
        </p>
      ))}
    </div>
  );
}

function expandTitleBlocks(
  blocks: BlocksContent,
  variant: Variant
): BlocksContent {
  const expanded: BlocksContent = [];

  for (const block of blocks) {
    if (block.type !== "paragraph" || !Array.isArray(block.children)) {
      expanded.push(block);
      continue;
    }

    const text = block.children
      .map((child) => {
        if (child && typeof child === "object" && "text" in child) {
          return String((child as { text?: string }).text ?? "");
        }
        return "";
      })
      .join("");

    const lines = splitLinesForVariant(variant, text);
    if (lines.length <= 1) {
      expanded.push(block);
      continue;
    }

    for (const line of lines) {
      expanded.push({
        type: "paragraph",
        children: [{ type: "text", text: line }],
      });
    }
  }

  return expanded;
}

export function StrapiRichDescription({
  value,
  fallback,
  variant = "experience",
  className,
}: {
  value: unknown;
  fallback?: unknown;
  variant?: Variant;
  /** Override variant wrapper classes (applies to both markdown and blocks). */
  className?: string;
}) {
  const primary = normalizeStrapiRichText(value);
  const secondary = normalizeStrapiRichText(fallback);

  const resolved = isRenderableNormalized(primary)
    ? primary
    : isRenderableNormalized(secondary)
      ? secondary
      : null;

  if (!isRenderableNormalized(resolved)) return null;

  const markdownClass = className ?? markdownWrap[variant];
  const blocksClass = className ?? blocksWrap[variant];

  if (typeof resolved === "string") {
    if (isLineBreakTitleVariant(variant)) {
      const lines = splitLinesForVariant(variant, resolved);
      if (lines.length > 1) {
        return renderTitleLines(
          lines,
          markdownClass,
          titleLineClassForVariant(variant)
        );
      }
    }

    return (
      <div className={markdownClass}>
        <Markdown
          components={{
            p({ children }) {
              return isLineBreakTitleVariant(variant) ? (
                <p className={titleLineClassForVariant(variant)}>{children}</p>
              ) : (
                <p className="mb-3 last:mb-0">{children}</p>
              );
            },
            ...markdownLinkProps(variant),
          }}
        >
          {resolved}
        </Markdown>
      </div>
    );
  }

  if (Array.isArray(resolved)) {
    const blocks = isLineBreakTitleVariant(variant)
      ? expandTitleBlocks(resolved as BlocksContent, variant)
      : (resolved as BlocksContent);

    return (
      <div className={blocksClass}>
        <BlocksRenderer
          content={blocks}
          blocks={blocksForVariant(variant)}
        />
      </div>
    );
  }

  return null;
}
