"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AssetConfig, getAssetsForBreakpoint, AssetValues, getAssetDefaults } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";

interface FloatingAssetsProps {
  assetValues?: { [key: string]: AssetValues } | null;
}

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ assetValues: externalAssetValues }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { breakpoint } = useViewport();

  const assetsToRender = useMemo(() => {
    return getAssetsForBreakpoint(breakpoint);
  }, [breakpoint]);

  const isMobile = breakpoint === 'mobile';

  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");
    }
  }, []);

  // Simply use external values if provided, otherwise use defaults
  const getAssetValue = useCallback((asset: AssetConfig): AssetValues => {
    const key = `${asset.src}-${asset.alt}`;
    return externalAssetValues?.[key] || getAssetDefaults(asset, isMobile);
  }, [externalAssetValues, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY) {
        lastScrollY = currentScrollY;
        scrollY.set(currentScrollY);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY, prefersReducedMotion]);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      {assetsToRender.map((asset) => {
        const values = getAssetValue(asset);
        
        // Calculate position - X and Y are percentages (0-100)
        const left = `${values.x}%`;
        const top = `${values.y}%`;
        
        // Base size - assets are sized relative to container
        const baseSize = isMobile ? 80 : 120;
        const assetSize = baseSize * values.scale;

        const parallaxOffsetX = scrollY.get() * values.parallaxX;
        const parallaxOffsetY = scrollY.get() * values.parallaxY;

        const breathingX = [0, values.breathingX * (isMobile ? 0.4 : 1)];
        const breathingY = [0, values.breathingY * (isMobile ? 0.4 : 1) * -1];
        const breathingScale = [1, 1 + values.breathingScale];

        return (
          <motion.div
            key={asset.src}
            className="floating-asset transform-gpu absolute"
            style={{
              left,
              top,
              width: assetSize,
              height: assetSize,
              zIndex: values.zIndex,
              marginLeft: -assetSize / 2, // Center on the point
              marginTop: -assetSize / 2,  // Center on the point
              transform: `translate(${parallaxOffsetX}px, ${parallaxOffsetY}px)`
            }}
            initial={{
              opacity: 0,
              filter: "blur(4px)"
            }}
            animate={{
              x: breathingX,
              y: breathingY,
              scale: isLayoutMode ? 1 : breathingScale[1],
              opacity: 1,
              filter: "blur(0px)"
            }}
            transition={{
              type: "spring" as const,
              stiffness: isMobile ? 150 : 100,
              damping: isMobile ? 25 : 20,
              duration: isMobile ? 0.8 : 1.2,
              delay: asset.animation.delay * (isMobile ? 0.5 : 1)
            }}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={assetSize}
              height={assetSize}
              className="pointer-events-none select-none w-full h-full"
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.08)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.04))'
              }}
              priority={asset.animation.delay === 0}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingAssets;
