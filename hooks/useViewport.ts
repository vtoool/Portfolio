import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export const useViewport = () => {
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateViewport = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      setViewportWidth(width);

      if (width < 640) {
        setBreakpoint('mobile');
      } else if (width < 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Initial detection
    updateViewport();

    // Listen for resize
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return { viewportWidth, breakpoint, mounted };
};
