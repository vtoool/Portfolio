"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AssetConfig, getAssetsForBreakpoint, AssetValues, getAssetDefaults } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";

interface FloatingAssetsProps {
  assetValues?: { [key: string]: AssetValues } | null;
}

// Animation timing for wave effect
// Group 1: Guitar + Map (phase 0)
// Group 2: Me (phase 1/3 of cycle)
// Group 3: Plane + Gears (phase 2/3 of cycle)
const getWaveDelay = (assetSrc: string): number => {
  if (assetSrc.includes('Guitar') || assetSrc.includes('Map')) {
    return 0; // First wave
  }
  if (assetSrc.includes('Me')) {
    return 1.5; // Second wave (1/3 of 4.5s cycle)
  }
  // Plane and Gears
  return 3; // Third wave (2/3 of 4.5s cycle)
};

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ assetValues: externalAssetValues }) => {
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

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  if (prefersReducedMotion) {
    // Static version for users who prefer reduced motion
    return (
      <div ref={containerRef} className="relative w-full h-full overflow-visible">
        {assetsToRender.map((asset) => {
          const values = getAssetValue(asset);
          const left = `${values.x}%`;
          const top = `${values.y}%`;
          const baseSize = isMobile ? 80 : 120;
          const assetSize = baseSize * values.scale;

          return (
            <div
              key={asset.src}
              className="floating-asset absolute"
              style={{
                left,
                top,
                width: assetSize,
                height: assetSize,
                zIndex: values.zIndex,
                marginLeft: -assetSize / 2,
                marginTop: -assetSize / 2,
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
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      {assetsToRender.map((asset) => {
        const values = getAssetValue(asset);
        const left = `${values.x}%`;
        const top = `${values.y}%`;
        const baseSize = isMobile ? 80 : 120;
        const assetSize = baseSize * values.scale;
        
        // Get wave timing based on asset type
        const waveDelay = getWaveDelay(asset.src);
        const floatAmplitude = isMobile ? 6 : 10; // Pixels to float up/down
        const floatDuration = 4.5; // Total wave cycle duration

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
              marginLeft: -assetSize / 2,
              marginTop: -assetSize / 2,
            }}
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(4px)"
            }}
            animate={{
              opacity: 1,
              y: [0, -floatAmplitude, 0], // Smooth up and down motion
              filter: "blur(0px)"
            }}
            transition={{
              opacity: { duration: 0.8, delay: asset.animation.delay },
              y: {
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: waveDelay + asset.animation.delay,
                times: [0, 0.5, 1] // Peak at middle of cycle
              },
              filter: { duration: 0.8, delay: asset.animation.delay }
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
