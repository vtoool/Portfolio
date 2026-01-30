"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { AssetConfig, getAssetsForBreakpoint, AssetValues, getAssetDefaults } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";

interface FloatingAssetsProps {
  assetValues?: { [key: string]: AssetValues } | null;
}

// Animation timing for wave effect - cascading ripple pattern
// Order: Me → Plane → Big Gear → Small Gear → Guitar → Map
// Gears have smaller delay (0.4s) between them
const getWaveDelay = (assetSrc: string): number => {
  if (assetSrc.includes('Me')) {
    return 0; // First to start the wave
  }
  if (assetSrc.includes('Plane')) {
    return 0.75; // Follows Me
  }
  if (assetSrc.includes('Gear1')) {
    return 1.5; // Big gear follows Plane
  }
  if (assetSrc.includes('Gear2')) {
    return 1.9; // Small gear follows big gear (0.4s delay)
  }
  if (assetSrc.includes('Guitar')) {
    return 2.65; // Follows small gear
  }
  if (assetSrc.includes('Map')) {
    return 3.4; // Last, follows Guitar
  }
  return 0;
};

// Get entrance animation direction for each asset
const getEntranceDirection = (assetSrc: string): { x: number; y: number } => {
  if (assetSrc.includes('Me')) {
    return { x: 0, y: 80 }; // From below
  }
  if (assetSrc.includes('Guitar') || assetSrc.includes('Map')) {
    return { x: -100, y: 0 }; // From left
  }
  if (assetSrc.includes('Plane') || assetSrc.includes('Gear')) {
    return { x: 100, y: 0 }; // From right
  }
  return { x: 0, y: 0 };
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
                className="pointer-events-none select-none w-full h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.15)] drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.08)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.04)]"
                style={{
                  objectFit: 'contain'
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
        
        // Get entrance direction
        const entrance = getEntranceDirection(asset.src);
        
        // Animation variants
        const variants = {
          initial: {
            opacity: 0,
            x: entrance.x,
            y: entrance.y,
            filter: "blur(8px)",
            scale: 0.8
          },
          entrance: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            scale: 1
          },
          floating: {
            y: [0, -floatAmplitude, 0],
            transition: {
              duration: floatDuration,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: waveDelay
            }
          }
        };

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
            initial="initial"
            animate={["entrance", "floating"]}
            variants={variants}
            transition={{
              opacity: { duration: 1, delay: asset.animation.delay, ease: "easeOut" },
              x: { duration: 1.2, delay: asset.animation.delay, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 1.2, delay: asset.animation.delay, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 1, delay: asset.animation.delay, ease: "easeOut" },
              scale: { duration: 1, delay: asset.animation.delay, ease: "easeOut" }
            }}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={assetSize}
              height={assetSize}
              className="pointer-events-none select-none w-full h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.15)] drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.08)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.04)]"
              style={{
                objectFit: 'contain'
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
