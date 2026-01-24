"use client";

import { useState, useEffect } from "react";

export function useScrollDirection(threshold: number = 10) {
  const [scrollDir, setScrollDir] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (direction !== scrollDir && Math.abs(scrollY - lastScrollY) > threshold) {
        setScrollDir(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [scrollDir, threshold]);

  return scrollDir;
}
