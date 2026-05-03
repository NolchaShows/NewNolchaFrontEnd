"use client";

import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

/**
 * Strapi Rich Text (Blocks) often arrives as an array, a `{ children }` wrapper,
 * a `{ root: { children } }` payload, or a JSON string. Normalize before Markdown / BlocksRenderer.
 */
export function normalizeStrapiRichText(raw: unknown): unknown {
  if (raw === null || raw === undefined) return null;

  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return null;
    if (t.startsWith("[") || t.startsWith("{")) {
      try {
        return normalizeStrapiRichText(JSON.parse(t) as unknown);
      } catch {
        return raw;
      }
    }
    return raw;
  }

  if (Array.isArray(raw)) {
    return raw.length ? raw : null;
  }

  if (typeof raw === "object") {
    const o = raw as Record<string, unknown>;

    if (Array.isArray(o.children)) {
      return o.children.length ? o.children : null;
    }

    const root = o.root;
    if (root && typeof root === "object") {
      const rc = (root as Record<string, unknown>).children;
      if (Array.isArray(rc)) {
        return rc.length ? rc : null;
      }
    }

    if (Array.isArray(o.document)) {
      return o.document.length ? o.document : null;
    }

    if (
      typeof o.type === "string" &&
      o.type !== "root" &&
      o.type !== "doc"
    ) {
      return [raw];
    }
  }

  return null;
}

function isRenderableNormalized(normalized: unknown): boolean {
  if (normalized === null || normalized === undefined) return false;
  if (typeof normalized === "string") return normalized.trim().length > 0;
  if (Array.isArray(normalized)) return normalized.length > 0;
  return false;
}

export function hasRenderableDescription(value: unknown): boolean {
  return isRenderableNormalized(normalizeStrapiRichText(value));
}

type Variant = "experience" | "modal";

const markdownWrap: Record<Variant, string> = {
  experience:
    "detail-row-markdown max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_strong]:font-semibold [&_em]:italic [&_a]:text-[#1a1a1a] [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#c4c4c4] [&_blockquote]:pl-4 [&_blockquote]:italic",
  modal:
    "event-modal-markdown max-w-none text-sm sm:text-base leading-relaxed text-white [&_strong]:font-semibold [&_em]:italic [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-90 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-white/35 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/90",
};

const blocksWrap: Record<Variant, string> = {
  experience:
    "detail-row-rich-text max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_a]:text-[#1a1a1a] [&_a]:underline [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  modal:
    "event-modal-blocks max-w-none text-sm sm:text-base leading-relaxed text-white [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-90 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
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
}: {
  value: unknown;
  fallback?: unknown;
  variant?: Variant;
}) {
  const primary = normalizeStrapiRichText(value);
  const secondary = normalizeStrapiRichText(fallback);

  const resolved = isRenderableNormalized(primary)
    ? primary
    : isRenderableNormalized(secondary)
      ? secondary
      : null;

  if (!isRenderableNormalized(resolved)) return null;

  if (typeof resolved === "string") {
    return (
      <div className={markdownWrap[variant]}>
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
      <div className={blocksWrap[variant]}>
        <BlocksRenderer
          content={resolved as BlocksContent}
          blocks={blocksForVariant(variant)}
        />
      </div>
    );
  }

  return null;
}
