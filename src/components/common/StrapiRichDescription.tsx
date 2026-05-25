"use client";

import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import {
  hasRenderableDescription,
  isRenderableNormalized,
  normalizeStrapiRichText,
} from "@/lib/strapiRichText";

export { hasRenderableDescription, normalizeStrapiRichText };

type Variant = "experience" | "modal" | "buildMomentum" | "legal";

const markdownWrap: Record<Variant, string> = {
  experience:
    "detail-row-markdown max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_strong]:font-semibold [&_em]:italic [&_a]:text-[#1a1a1a] [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#c4c4c4] [&_blockquote]:pl-4 [&_blockquote]:italic",
  modal:
    "event-modal-markdown max-w-none text-sm sm:text-base leading-relaxed text-white [&_strong]:font-semibold [&_em]:italic [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-90 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-white/35 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/90",
  buildMomentum:
    "max-w-none text-left text-[20px] font-normal leading-relaxed text-[#1A1A1A]/80 lg:text-[36px] [&_strong]:font-bold [&_em]:italic [&_a]:text-[#1A1A1A] [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  legal:
    "legal-page-markdown max-w-none text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed [&_h2]:text-[26px] [&_h2]:2xl:text-[40px] [&_h2]:font-medium [&_h2]:text-black [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:first:mt-0 [&_h3]:text-[20px] [&_h3]:2xl:text-[30px] [&_h3]:text-black [&_h3]:mb-2 [&_strong]:font-medium [&_em]:italic [&_a]:text-[#000000] [&_a]:underline [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:ml-4",
};

const blocksWrap: Record<Variant, string> = {
  experience:
    "detail-row-rich-text max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_a]:text-[#1a1a1a] [&_a]:underline [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  modal:
    "event-modal-blocks max-w-none text-sm sm:text-base leading-relaxed text-white [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-90 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  buildMomentum:
    "max-w-none text-left text-[20px] font-normal leading-relaxed text-[#1A1A1A]/80 lg:text-[36px] [&_a]:text-[#1A1A1A] [&_a]:underline [&_strong]:font-bold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  legal:
    "legal-page-blocks max-w-none text-[#000000B3] text-[20px] 2xl:text-[30px] leading-relaxed [&_h2]:text-[26px] [&_h2]:2xl:text-[40px] [&_h2]:font-medium [&_h2]:text-black [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:first:mt-0 [&_h3]:text-[20px] [&_h3]:2xl:text-[30px] [&_h3]:text-black [&_h3]:mb-2 [&_a]:text-[#000000] [&_a]:underline [&_strong]:font-medium [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:ml-4",
};

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

  return {
    paragraph: ({ children }: { children?: ReactNode }) => (
      <p className="mb-3 last:mb-0">{children}</p>
    ),
    heading: ({
      children,
      level,
    }: {
      children?: ReactNode;
      level: number;
    }) => {
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
    return (
      <div className={markdownClass}>
        <Markdown
          components={{
            p({ children }) {
              return <p className="mb-3 last:mb-0">{children}</p>;
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
    return (
      <div className={blocksClass}>
        <BlocksRenderer
          content={resolved as BlocksContent}
          blocks={blocksForVariant(variant)}
        />
      </div>
    );
  }

  return null;
}
