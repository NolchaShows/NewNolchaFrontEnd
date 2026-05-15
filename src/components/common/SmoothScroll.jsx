"use client";
import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let lenis;
    let rafId;

    // Defer Lenis parse+eval until after first paint to avoid main-thread blocking
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
