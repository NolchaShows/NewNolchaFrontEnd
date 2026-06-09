"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Applies `home-theme` on <html> for the homepage color system. */
export default function HomeThemeProvider({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    document.documentElement.classList.toggle("home-theme", isHomePage);
    return () => {
      document.documentElement.classList.remove("home-theme");
    };
  }, [isHomePage]);

  return children;
}
