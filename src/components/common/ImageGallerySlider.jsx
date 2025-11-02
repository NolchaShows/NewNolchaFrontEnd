import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';

const DEFAULT_IMAGES = [
  "/homepage/image_gallery/1.jpg",
  "/homepage/image_gallery/2.jpg",
  "/homepage/image_gallery/3.jpg",
  "/homepage/image_gallery/4.jpg",
  "/homepage/image_gallery/5.jpg",
  "/homepage/image_gallery/6.jpg",
  "/homepage/image_gallery/7.jpg",
  "/homepage/image_gallery/8.jpg",
  "/homepage/image_gallery/9.jpg",
  "/homepage/image_gallery/10.jpg",
  "/homepage/image_gallery/11.jpg",
  "/homepage/image_gallery/12.jpg"
];

const ImageGallerySlider = ({ images }) => {
  const items = useMemo(() => (Array.isArray(images) && images.length ? images : DEFAULT_IMAGES), [images]);
  const [index, setIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const autoTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const AUTO_DELAY_MS = 4000; // auto-advance delay
  const RESUME_DELAY_MS = 2500; // wait after user interaction before resuming

  const handlePrev = useCallback(() => {
    setIsInteracting(true);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIndex((i) => (i - 1 + items.length) % items.length);
    resumeTimerRef.current = setTimeout(() => setIsInteracting(false), RESUME_DELAY_MS);
  }, [items.length]);

  const handleNext = useCallback(() => {
    setIsInteracting(true);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIndex((i) => (i + 1) % items.length);
    resumeTimerRef.current = setTimeout(() => setIsInteracting(false), RESUME_DELAY_MS);
  }, [items.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePrev, handleNext]);

  // Auto-advance using a timeout (easier to pause/clear when interacting)
  useEffect(() => {
    if (items.length <= 1 || isInteracting) return;
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_DELAY_MS);
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [index, items.length, isInteracting]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[100vw] md:h-[42vw]">
        <img
          src={items[index]}
          alt={`image-${index}`}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />

        {items.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute top-1/2 -translate-y-1/2 left-3 md:left-6 2xl:left-10 z-20"
            >
              <div
                className="w-[44px] h-[72px] md:w-[54px] md:h-[86px] 2xl:w-[70px] 2xl:h-[100px] rounded-[3px] grid place-items-center shadow-md"
                style={{ backgroundColor: "rgba(250, 250, 250, 0.33)" }}
              >
                <img src="/homepage/image_gallery/carousel-left-arrow.svg" alt="prev" className="w-8 md:w-12 2xl:w-[70px] select-none" draggable={false} />
              </div>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 2xl:right-10 z-20"
            >
              <div
                className="w-[44px] h-[72px] md:w-[54px] md:h-[86px] 2xl:w-[70px] 2xl:h-[100px] rounded-[3px] grid place-items-center shadow-md"
                style={{ backgroundColor: "rgba(250, 250, 250, 0.33)" }}
              >
                <img src="/homepage/image_gallery/carousel-right-arrow.svg" alt="next" className="w-8 md:w-12 2xl:w-[70px] select-none" draggable={false} />
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallerySlider;