"use client";

import React from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import SmoothScroll from "@/components/common/SmoothScroll";
import TweetCarousel from "@/components/common/TweetCarousel";
import VideoHeroSection from "@/components/common/VideoHeroSection";
import MediaGalleryGrid from "@/components/common/MediaGalleryGrid";
import {
  buildStructuredGalleryItems,
  getStructuredMediaUrl,
} from "@/lib/structuredPageMedia";

function hasRenderableDescription(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

function DetailRowDescription({ value }: { value: unknown }) {
  if (!hasRenderableDescription(value)) return null;

  if (typeof value === "string") {
    /** Strapi "Rich Text (Markdown)" stores bold/italic as ** / * in the REST API as plain strings. */
    return (
      <div className="detail-row-markdown max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_strong]:font-semibold [&_em]:italic [&_a]:text-[#1a1a1a] [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#c4c4c4] [&_blockquote]:pl-4 [&_blockquote]:italic">
        <Markdown
          components={{
            p({ children }) {
              return <p className="mb-3 last:mb-0">{children}</p>;
            },
          }}
        >
          {value}
        </Markdown>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="detail-row-rich-text max-w-[900px] text-[14px] leading-[1.45] text-[#4a4a4a] lg:text-[16px] [&_a]:text-[#1a1a1a] [&_a]:underline [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5">
        <BlocksRenderer
          content={value as BlocksContent}
          blocks={{
            paragraph: ({ children }) => (
              <p className="mb-3 last:mb-0">{children}</p>
            ),
            heading: ({ children, level }) => {
              const className =
                "mb-2 mt-4 font-semibold uppercase tracking-tight first:mt-0";
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
            quote: ({ children }) => (
              <blockquote className="my-3 border-l-2 border-[#c4c4c4] pl-4 italic">
                {children}
              </blockquote>
            ),
            code: ({ plainText }) => (
              <pre className="my-3 overflow-x-auto rounded bg-black/5 p-3 text-[13px]">
                <code>{plainText}</code>
              </pre>
            ),
            list: ({ format, children }) => {
              const ListTag = format === "ordered" ? "ol" : "ul";
              return <ListTag className="my-2 pl-5">{children}</ListTag>;
            },
            "list-item": ({ children }) => <li className="mb-1">{children}</li>,
            image: ({ image }) => {
              const src = image?.url?.startsWith("http")
                ? image.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${image?.url || ""}`;
              if (!src) return null;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={image.alternativeText || ""}
                  className="my-3 h-auto max-w-full rounded"
                  width={image.width}
                  height={image.height}
                />
              );
            },
          }}
        />
      </div>
    );
  }

  return null;
}

const mapDetailRows = (page: any) => {
  return (page?.detail_rows || []).map((row: any) => ({
    label: row?.label || "",
    title: row?.title || "",
    description: row?.description,
    tags: (row?.tags || []).map((tag: any) => tag?.text).filter(Boolean),
  }));
};

export default function ExperienceDetailPageClient({ page }: { page: any }) {
  const title = page?.title || "Page";
  const heroVideo = getStructuredMediaUrl(page?.hero?.video) || "";
  const detailRows = mapDetailRows(page);
  const galleryItems = buildStructuredGalleryItems(page?.gallery);
  const tweetCarousel =
    page?.shared_tweet_carousel ?? page?.sharedTweetCarousel ?? null;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f0eee6] px-5 lg:px-11">
        {heroVideo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-auto aspect-video lg:h-screen lg:aspect-auto"
          >
            <VideoHeroSection
              videoSrc={heroVideo}
              firstPart=""
              secondPart=""
              strokeColor="#000000"
              fillColor="#000000"
              textColor="#000000"
              size="large"
              overlayOpacity={0}
              showControls={true}
              autoPlay={true}
              muted={true}
              loop={true}
              className="!h-full !w-full"
            />
          </motion.div>
        ) : null}

        <motion.section
          className="py-8 lg:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-[34px] uppercase leading-[0.95] tracking-tight text-[#1A1A1A] sm:text-[42px] lg:mb-5 lg:text-[100px]">
            {title}
          </h1>

          <div className="flex flex-col gap-y-5 lg:gap-y-6">
            {detailRows.map((item, index) => (
              <motion.div
                key={`${item.label}-${index}`}
                className="grid grid-cols-1 gap-y-2 md:grid-cols-[160px_1fr] md:gap-x-8 md:gap-y-0 lg:grid-cols-[200px_1fr] lg:gap-x-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#1d1d1d] sm:text-[14px] md:text-[16px] md:tracking-normal">
                  {item.label}
                </span>

                <div className="flex flex-col gap-y-3">
                  {item.tags?.length ? (
                    <div className="flex flex-wrap gap-2.5 lg:gap-3">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className={`border border-black px-3 py-1 text-[11px] uppercase sm:px-4 sm:py-1.5 sm:text-[12px] ${
                            tagIndex !== 0 ? "rounded-full" : ""
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-1.5">
                      {item.title ? (
                        <span
                          className={`text-[13px] font-bold uppercase tracking-[0.12em] sm:text-[14px] lg:text-[16px] ${
                            hasRenderableDescription(item.description)
                              ? "text-[#818181]"
                              : "text-[#1d1d1d]"
                          }`}
                        >
                          {item.title}
                        </span>
                      ) : null}

                      <DetailRowDescription value={item.description} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {tweetCarousel?.items?.length ? (
          <motion.section
            className="mt-8 w-full lg:mt-12"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <TweetCarousel
              carousalData={tweetCarousel}
              posts={[]}
              variant="light"
              padding=""
              title={tweetCarousel.title || "Community moments"}
            />
          </motion.section>
        ) : null}

        {galleryItems.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
          >
            <MediaGalleryGrid items={galleryItems} />
          </motion.div>
        ) : null}
      </div>
    </SmoothScroll>
  );
}
