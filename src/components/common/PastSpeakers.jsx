'use client';
import React, { useRef, useEffect } from 'react';
import StyledHeading from './StyledHeading';
import { motion } from "framer-motion";

const PastSpeakers = ({ speakers = [] }) => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  // Default placeholder speakers if none provided
  const defaultSpeakersRow1 = [
    { id: 1, image: '/past_speakers/1.png', name: 'Speaker Name 1', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 2, image: '/past_speakers/2.png', name: 'Speaker Name 2', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 3, image: '/past_speakers/3.png', name: 'Speaker Name 3', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 4, image: '/past_speakers/4.png', name: 'Speaker Name 4', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 5, image: '/past_speakers/5.png', name: 'Speaker Name 5', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 6, image: '/past_speakers/6.png', name: 'Speaker Name 6', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
  ];

  const defaultSpeakersRow2 = [
    { id: 7, image: '/past_speakers/7.png', name: 'Speaker Name 7', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 8, image: '/past_speakers/8.png', name: 'Speaker Name 8', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 9, image: '/past_speakers/9.png', name: 'Speaker Name 9', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 10, image: '/past_speakers/10.png', name: 'Speaker Name 10', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 11, image: '/past_speakers/11.png', name: 'Speaker Name 11', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
    { id: 12, image: '/past_speakers/12.png', name: 'Speaker Name 12', description: 'Speaker description goes here', twitter: 'https://twitter.com' },
  ];

  const displaySpeakers = speakers.length > 0 ? speakers : [...defaultSpeakersRow1, ...defaultSpeakersRow2];

  // Duplicate speakers for infinite scroll effect (mobile)
  const duplicatedSpeakers = [...displaySpeakers, ...displaySpeakers];

  // Split speakers into two rows for desktop with different images
  const row1 = [...defaultSpeakersRow1, ...defaultSpeakersRow1]; // Duplicate for infinite scroll
  const row2 = [...defaultSpeakersRow2, ...defaultSpeakersRow2]; // Duplicate for infinite scroll

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const animationRow1Ref = useRef(null);
  const animationRow2Ref = useRef(null);
  const pauseTimeoutRow1Ref = useRef(null);
  const pauseTimeoutRow2Ref = useRef(null);
  const isPausedRow1Ref = useRef(false);
  const isPausedRow2Ref = useRef(false);

  const handleScrollLeft = () => {
    if (row1Ref.current && row2Ref.current) {
      const scrollAmount = 331; // card width (299) + gap (32)
      row1Ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      row2Ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

      // Pause auto-scroll for 3 seconds
      isPausedRow1Ref.current = true;
      isPausedRow2Ref.current = true;

      if (pauseTimeoutRow1Ref.current) clearTimeout(pauseTimeoutRow1Ref.current);
      if (pauseTimeoutRow2Ref.current) clearTimeout(pauseTimeoutRow2Ref.current);

      pauseTimeoutRow1Ref.current = setTimeout(() => {
        isPausedRow1Ref.current = false;
      }, 3000);

      pauseTimeoutRow2Ref.current = setTimeout(() => {
        isPausedRow2Ref.current = false;
      }, 3000);
    }
  };

  const handleScrollRight = () => {
    if (row1Ref.current && row2Ref.current) {
      const scrollAmount = 331; // card width (299) + gap (32)
      row1Ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      row2Ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Pause auto-scroll for 3 seconds
      isPausedRow1Ref.current = true;
      isPausedRow2Ref.current = true;

      if (pauseTimeoutRow1Ref.current) clearTimeout(pauseTimeoutRow1Ref.current);
      if (pauseTimeoutRow2Ref.current) clearTimeout(pauseTimeoutRow2Ref.current);

      pauseTimeoutRow1Ref.current = setTimeout(() => {
        isPausedRow1Ref.current = false;
      }, 3000);

      pauseTimeoutRow2Ref.current = setTimeout(() => {
        isPausedRow2Ref.current = false;
      }, 3000);
    }
  };

  // Auto-scroll for mobile
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Pixels per frame (adjust for speed)

    const autoScroll = () => {
      scrollPosition += scrollSpeed;

      // Get the width of one set of cards
      const cardWidth = 280 + 32; // card width + gap (mobile)
      const totalWidth = cardWidth * displaySpeakers.length;

      // Reset position when we've scrolled through one full set
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      carousel.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [displaySpeakers.length]);

  // Auto-scroll for desktop Row 1
  useEffect(() => {
    const row1 = row1Ref.current;
    if (!row1) return;

    let scrollPosition = row1.scrollLeft || 0;
    const scrollSpeed = 0.5; // Pixels per frame
    let isHovered = false;

    const autoScrollRow1 = () => {
      // Only scroll if not paused and not hovered
      if (!isPausedRow1Ref.current && !isHovered) {
        scrollPosition += scrollSpeed;

        const cardWidth = 299 + 32; // card width + gap
        const totalWidth = cardWidth * row1.children.length;

        if (scrollPosition >= totalWidth / 2) {
          scrollPosition = 0;
        }

        row1.scrollLeft = scrollPosition;
      } else {
        // Update scrollPosition to current position when paused
        scrollPosition = row1.scrollLeft;
      }

      animationRow1Ref.current = requestAnimationFrame(autoScrollRow1);
    };

    animationRow1Ref.current = requestAnimationFrame(autoScrollRow1);

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    row1.addEventListener('mouseenter', handleMouseEnter);
    row1.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRow1Ref.current) {
        cancelAnimationFrame(animationRow1Ref.current);
      }
      row1.removeEventListener('mouseenter', handleMouseEnter);
      row1.removeEventListener('mouseleave', handleMouseLeave);
      if (pauseTimeoutRow1Ref.current) {
        clearTimeout(pauseTimeoutRow1Ref.current);
      }
    };
  }, [row1.length]);

  // Auto-scroll for desktop Row 2
  useEffect(() => {
    const row2 = row2Ref.current;
    if (!row2) return;

    let scrollPosition = row2.scrollLeft || 0;
    const scrollSpeed = 0.5; // Pixels per frame
    let isHovered = false;

    const autoScrollRow2 = () => {
      // Only scroll if not paused and not hovered
      if (!isPausedRow2Ref.current && !isHovered) {
        scrollPosition += scrollSpeed;

        const cardWidth = 299 + 32; // card width + gap
        const totalWidth = cardWidth * row2.children.length;

        if (scrollPosition >= totalWidth / 2) {
          scrollPosition = 0;
        }

        row2.scrollLeft = scrollPosition;
      } else {
        // Update scrollPosition to current position when paused
        scrollPosition = row2.scrollLeft;
      }

      animationRow2Ref.current = requestAnimationFrame(autoScrollRow2);
    };

    animationRow2Ref.current = requestAnimationFrame(autoScrollRow2);

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    row2.addEventListener('mouseenter', handleMouseEnter);
    row2.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRow2Ref.current) {
        cancelAnimationFrame(animationRow2Ref.current);
      }
      row2.removeEventListener('mouseenter', handleMouseEnter);
      row2.removeEventListener('mouseleave', handleMouseLeave);
      if (pauseTimeoutRow2Ref.current) {
        clearTimeout(pauseTimeoutRow2Ref.current);
      }
    };
  }, [row2.length]);

  return (
    <div className="pb-[70px] lg:pb-[150px] max-w-none w-full mx-auto bg-[#F4F4F4] overflow-hidden">
      <div className="px-[22px] lg:px-12 relative mb-[30px] md:mb-[50px] flex flex-row items-center justify-between">
        <StyledHeading
          firstPart="Past"
          secondPart="Speakers"
          strokeColor="#000000"
          fillColor="#FEF991"
          textColor="#000000"
          size="small"
        />

        {/* Navigation Arrows - Desktop Only */}
        <div className="hidden lg:flex gap-4">
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll left"
          >
            <motion.img
              src="/left_yellow.png"
              className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
          <button
            onClick={handleScrollRight}
            aria-label="Scroll right"
          >
            <motion.img
              src="/right_yellow.png"
              className="cursor-pointer w-[36px] h-[36px] md:w-[60px] md:h-[60px] 2xl:h-[70px] 2xl:w-[70px]"
              whileTap={{ scale: 0.9 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile: Single Row */}
      <div className="lg:hidden relative">
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-hidden px-[22px]"
        >
          {duplicatedSpeakers.map((speaker, index) => (
            <div key={`${speaker.id}-${index}`} className="group flex-shrink-0 w-[280px] h-[350px] perspective-[2000px]">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name || 'Speaker'}
                    className="w-full h-full object-cover rounded-[15px] shadow-lg select-none pointer-events-none"
                    draggable="false"
                  />
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#7FFFD4] rounded-[15px] p-6 flex flex-col justify-start">
                  <h3 className="text-black text-[1.4rem] font-extrabold uppercase mb-4 leading-tight">
                    {speaker.name || 'Speaker Name'}
                  </h3>
                  <p className="text-black text-[0.85rem] font-semibold leading-[1.4] mb-4 flex-grow overflow-y-auto">
                    {speaker.description || 'Speaker description goes here'}
                  </p>
                  {speaker.twitter && (
                    <div className="flex items-center gap-3 mt-auto pt-4">
                      <a
                        href={speaker.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-black hover:opacity-80 transition-opacity"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
                          alt="X (Twitter) Logo"
                          className="w-6 h-6 invert"
                        />
                        <h3 className="text-[1rem] font-bold">
                          {speaker.name || 'Speaker Name'}
                        </h3>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Two Rows */}
      <div className="hidden lg:block relative">
        <div className="space-y-8 overflow-x-hidden">
          {/* Row 1 */}
          <div ref={row1Ref} className="flex gap-8 overflow-x-hidden">
            {row1.map((speaker, index) => (
              <div key={`row1-${speaker.id}-${index}`} className="group flex-shrink-0 w-[299px] h-[359px] perspective-[2000px]">
                <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name || 'Speaker'}
                      className="w-full h-full object-cover rounded-[15px] shadow-lg select-none pointer-events-none"
                      draggable="false"
                    />
                  </div>

                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#7FFFD4] rounded-[15px] p-6 flex flex-col justify-start">
                    <h3 className="text-black text-[1.4rem] font-extrabold uppercase mb-4 leading-tight">
                      {speaker.name || 'Speaker Name'}
                    </h3>
                    <p className="text-black text-[0.9rem] font-semibold leading-[1.4] mb-4 flex-grow overflow-y-auto">
                      {speaker.description || 'Speaker description goes here'}
                    </p>
                    {speaker.twitter && (
                      <div className="flex items-center gap-3 mt-auto pt-4">
                        <a
                          href={speaker.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-black hover:opacity-80 transition-opacity"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
                            alt="X (Twitter) Logo"
                            className="w-5 h-5 invert"
                          />
                          <h3 className="text-[1rem] font-bold">
                            {speaker.name || 'Speaker Name'}
                          </h3>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div ref={row2Ref} className="flex gap-8 overflow-x-hidden">
            {row2.map((speaker, index) => (
              <div key={`row2-${speaker.id}-${index}`} className="group flex-shrink-0 w-[299px] h-[359px] perspective-[2000px]">
                <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img
                      src={speaker.image}
                      alt={speaker.name || 'Speaker'}
                      className="w-full h-full object-cover rounded-[15px] shadow-lg select-none pointer-events-none"
                      draggable="false"
                    />
                  </div>

                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#7FFFD4] rounded-[15px] p-6 flex flex-col justify-start">
                    <h3 className="text-black text-[1.4rem] font-extrabold uppercase mb-4 leading-tight">
                      {speaker.name || 'Speaker Name'}
                    </h3>
                    <p className="text-black text-[0.9rem] font-semibold leading-[1.4] mb-4 flex-grow overflow-y-auto">
                      {speaker.description || 'Speaker description goes here'}
                    </p>
                    {speaker.twitter && (
                      <div className="flex items-center gap-3 mt-auto pt-4">
                        <a
                          href={speaker.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-black hover:opacity-80 transition-opacity"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
                            alt="X (Twitter) Logo"
                            className="w-5 h-5 invert"
                          />
                          <h3 className="text-[1rem] font-bold">
                            {speaker.name || 'Speaker Name'}
                          </h3>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastSpeakers;

