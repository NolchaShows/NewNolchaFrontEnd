"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "@/components/common/SmoothScroll";

const INTRO_DELAY_S = 0.35;
const INTRO_DURATION_S = 0.9;

/** MATTE-style ease — close to cubic-bezier(0.22, 1, 0.36, 1) */
function matteEase(t) {
  return 1 - Math.pow(1 - t, 2.8);
}

function animateNativeScroll(targetY, durationS, ease) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const durationMs = durationS * 1000;
  const start = performance.now();

  return new Promise((resolve) => {
    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

/**
 * MATTE-style page open: double-height black block, fast auto-scroll,
 * then remove the block so scrolling up never returns to black.
 */
export function MattePageReveal({ children, className = "" }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const introRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [showIntro, setShowIntro] = useState(true);

  const releaseScrollLock = () => {
    document.body.style.overflow = "";
    isAnimatingRef.current = false;
  };

  const finishIntro = () => {
    setShowIntro(false);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
      releaseScrollLock();
    });
  };

  useLayoutEffect(() => {
    setShowIntro(true);

    if (reduceMotion) return;

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname, reduceMotion, lenis]);

  useEffect(() => {
    if (reduceMotion || !showIntro) return;

    let cancelled = false;

    const runIntro = async () => {
      if (cancelled || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const target =
        introRef.current?.offsetHeight ?? window.innerHeight * 2;

      const onDone = () => {
        if (!cancelled) finishIntro();
      };

      if (lenis) {
        lenis.scrollTo(target, {
          duration: INTRO_DURATION_S,
          easing: matteEase,
          lock: true,
          onComplete: onDone,
        });
      } else {
        await animateNativeScroll(target, INTRO_DURATION_S, matteEase);
        onDone();
      }
    };

    const timeoutId = window.setTimeout(() => {
      runIntro();
    }, INTRO_DELAY_S * 1000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      releaseScrollLock();
    };
  }, [pathname, reduceMotion, lenis, showIntro]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      {showIntro ? (
        <div
          ref={introRef}
          className="h-[200vh] w-full shrink-0 bg-black"
          aria-hidden
        />
      ) : null}
      <div className={className}>{children}</div>
    </>
  );
}
