"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const DEFAULT_CHUNK_SIZE = 12;
const GRID_CELL_HEIGHT =
  "relative h-[166px] lg:h-[320px] xl:h-[480px] 2xl:h-[600px] xxl:h-[854px] 3xl:h-[1200px] 4xl:h-[1600px] overflow-hidden bg-white";

type ProgressiveFashionGridGalleryProps = {
  images: string[];
  background?: string;
  chunkSize?: number;
};

function chunkImages(images: string[], chunkSize: number) {
  const chunks: string[][] = [];

  for (let index = 0; index < images.length; index += chunkSize) {
    chunks.push(images.slice(index, index + chunkSize));
  }

  return chunks;
}

function GalleryImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className={GRID_CELL_HEIGHT}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 33vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function GalleryRow({
  images,
  startIndex,
}: {
  images: string[];
  startIndex: number;
}) {
  if (!images.length) return null;

  return (
    <div
      className={`grid gap-[5px] mb-[5px] ${
        images.length === 1
          ? "grid-cols-1"
          : images.length === 2
          ? "grid-cols-2"
          : "grid-cols-3"
      }`}
    >
      {images.map((image, index) => (
        <GalleryImage
          key={`${image}-${startIndex + index}`}
          src={image}
          alt={`Gallery image ${startIndex + index + 1}`}
        />
      ))}
    </div>
  );
}

function GalleryChunk({
  images,
  chunkIndex,
  background,
}: {
  images: string[];
  chunkIndex: number;
  background: string;
}) {
  const firstRow = images.slice(0, 3);
  const secondRow = images.slice(3, 5);
  const thirdRow = images.slice(5, 8);
  const baseIndex = chunkIndex * DEFAULT_CHUNK_SIZE;

  return (
    <section
      className="w-full"
      style={{ backgroundColor: background, contentVisibility: "auto" }}
    >
      <div className="bg-[#D1FFE9]" style={{ backgroundColor: background }}>
        <GalleryRow images={firstRow} startIndex={baseIndex} />
        <GalleryRow images={secondRow} startIndex={baseIndex + 3} />
        <div className={thirdRow.length ? "grid" : "hidden"}>
          <GalleryRow images={thirdRow} startIndex={baseIndex + 5} />
        </div>
      </div>
    </section>
  );
}

export default function ProgressiveFashionGridGallery({
  images,
  background = "#FEF991",
  chunkSize = DEFAULT_CHUNK_SIZE,
}: ProgressiveFashionGridGalleryProps) {
  const allChunks = useMemo(() => chunkImages(images, chunkSize), [images, chunkSize]);
  const [visibleChunkCount, setVisibleChunkCount] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 200px 0px",
    triggerOnce: false,
  });

  const visibleChunks = allChunks.slice(0, visibleChunkCount);
  const hasMoreChunks = visibleChunkCount < allChunks.length;

  useEffect(() => {
    if (!inView || !hasMoreChunks) return;

    const timeoutId = window.setTimeout(() => {
      setVisibleChunkCount((current) => Math.min(current + 1, allChunks.length));
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [allChunks.length, hasMoreChunks, inView]);

  return (
    <div className="w-full">
      {visibleChunks.map((chunk, index) => (
        <GalleryChunk
          key={`gallery-chunk-${index}`}
          images={chunk}
          chunkIndex={index}
          background={background}
        />
      ))}

      {hasMoreChunks ? (
        <div
          ref={ref}
          className="h-8 w-full"
          aria-hidden="true"
          style={{ backgroundColor: background }}
        />
      ) : null}
    </div>
  );
}
