'use client';
import React, { useRef, useEffect, useState } from 'react';
import StyledHeading from './StyledHeading';
import { motion } from "framer-motion";

const PastSpeakers = ({ speakers = [] }) => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const [flippedCards, setFlippedCards] = useState(new Set());

  // Default placeholder speakers if none provided
  const defaultSpeakersRow1 = [
    { id: 1, image: '/past_speakers/1.png', name: 'Elizabeth Olson', description: 'Elizabeth Olson is Head of Marketing at Magic Eden Wallet and was previously Head of Growth at Xverse.', twitter: 'https://x.com/elizabethols0n?lang=en' },
    { id: 2, image: '/past_speakers/2.png', name: 'Pete Rizzo', description: "Pete Rizzo conducts archival research on Bitcoin's history, working to identify the people and events that most impacted its development', twitter: 'https://x.com/pete_rizzo_?lang=en" },
    { id: 3, image: '/past_speakers/3.png', name: 'Avihu levy', description: 'CPO at StarkWare', twitter: 'https://x.com/avihu28' },
    { id: 4, image: '/past_speakers/4.png', name: 'Dan held', description: 'Dan is investing in Bitcoin DeFi as a GP at Asymmetric, and a marketing advisor at Taproot Wizards, Mezo, Starkware others.', twitter: 'https://x.com/danheld?lang=en' },
    { id: 5, image: '/past_speakers/5.png', name: 'Charlie Spears', description: 'Charlie Spears is Co-Founder of Blockspace Media, Strategy at Nakamotor Partners, a Bitcoin mining company building the future of energy.', twitter: 'https://x.com/cbspears' },
    { id: 6, image: '/past_speakers/6.png', name: 'Trevor Owens', description: 'Trevor Owens is the managing partner of Bitcoin Frontier Fund and co-founder and CEO of Ninjalerts. He graduated from the Stern School of Business at New York University.', twitter: 'https://x.com/TO' },
  ];

  const defaultSpeakersRow2 = [
    { id: 7, image: '/past_speakers/7.png', name: 'Casey Rodarmor', description: 'Casey Rodarmor is a prominent Bitcoin developer, creator of Ordinals and, most recently, Runes Protocol.', twitter: 'https://x.com/rodarmor' },
    { id: 8, image: '/past_speakers/8.png', name: 'Violetta Zironi', description: 'Violetta Zironi, Italian singer-songwriter and actress with a decade-long career in traditional music, has birthed five studio albums and multiple world tours. In film, she has starred in three movies, including a Netflix Original production.', twitter: 'https://x.com/ZironiVioletta/' },
    { id: 9, image: '/past_speakers/9.png', name: 'BOOTOSHI', description: 'BOOTOSHI is a Digital Creator & teaches AI Development.', twitter: 'https://x.com/KingBootoshi' },
    { id: 10, image: '/past_speakers/10.png', name: 'Amanda Terry', description: "Amanda is the Co-Founder & COO OnChainMonkey, Bitcoin's 1st 10K Ordinals Collection and @osura_com Co-Founder & GP @ACTAIVentures", twitter: 'https://x.com/amandaterry' },
    { id: 11, image: '/past_speakers/11.png', name: 'Danny Yang', description: 'Builder of 3 x Bitcoin ventures since 2013. Creator of @OnChainMonkey', twitter: 'https://x.com/huuep' },
    { id: 12, image: '/past_speakers/12.png', name: 'Cara Ponzini', description: 'CEO of PolyBeam building infrastructure to unlock the untapped potential of Bitcoin-native assets.', twitter: 'https://x.com/ponzini' },
    { id: 13, image: '/past_speakers/13.png', name: 'Jack Butcher', description: 'Jack Butcher is a pioneering digital artist and entrepreneur at the forefront of the NFT revolution. As the founder of Visualize Value, Butcher has established himself as a master of minimalist design, translating complex philosophical and economic concepts into striking visual metaphors.', twitter: 'https://x.com/jackbutcher' },
  ];

  const displaySpeakers = speakers.length > 0 ? speakers : [...defaultSpeakersRow1, ...defaultSpeakersRow2];

  // Duplicate speakers for infinite scroll effect (mobile) - always use default data
  const duplicatedSpeakers = [...defaultSpeakersRow1, ...defaultSpeakersRow2, ...defaultSpeakersRow1, ...defaultSpeakersRow2];

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

  const handleCardClick = (cardId) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

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

  // Touch scroll handling for mobile (no auto-scroll)
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Enable smooth scrolling and touch behavior
    carousel.style.scrollBehavior = 'smooth';
    carousel.style.touchAction = 'pan-x';
    carousel.style.overflowX = 'auto';
    carousel.style.webkitOverflowScrolling = 'touch';

    // Add momentum scrolling for iOS
    carousel.style.webkitOverflowScrolling = 'touch';
    
    return () => {
      // Cleanup if needed
    };
  }, []);

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
          className="flex gap-8 overflow-x-auto px-[22px] scrollbar-hide"
          style={{
            touchAction: 'pan-x',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {duplicatedSpeakers.map((speaker, index) => {
            const cardId = `${speaker.id}-${index}`;
            const isFlipped = flippedCards.has(cardId);
            return (
            <div key={cardId} className="flex-shrink-0 w-[280px] h-[350px] perspective-[2000px]">
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} lg:group-hover:rotate-y-180`}
                onClick={() => handleCardClick(cardId)}
                style={{ cursor: 'pointer' }}
              >
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
            );
          })}
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

