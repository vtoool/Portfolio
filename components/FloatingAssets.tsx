"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AssetConfig, getAssetsForBreakpoint } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";

interface GridAssetValue {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
  scale: number;
  zIndex: number;
  parallaxX: number;
  parallaxY: number;
  breathingX: number;
  breathingY: number;
  breathingScale: number;
}

interface FloatingAssetsProps {
  assetValues?: { [key: string]: GridAssetValue } | null;
}

const GRID_CONFIG = {
  desktop: { columns: 12, rows: 4 },
  tablet: { columns: 8, rows: 4 },
  mobile: { columns: 5, rows: 4, aspectRatio: '1/1' }
};

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ assetValues: externalAssetValues }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { breakpoint } = useViewport();

  const assetsToRender = useMemo(() => {
    return getAssetsForBreakpoint(breakpoint);
  }, [breakpoint]);

  const gridConfig = GRID_CONFIG[breakpoint === 'tablet' ? 'tablet' : breakpoint];
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

  const getAssetDefaults = useCallback((asset: AssetConfig): GridAssetValue => {
    const position = isMobile && asset.mobile ? asset.mobile.position : asset.position;
    const scale = isMobile && asset.mobile ? asset.mobile.scale : asset.scale;

    return {
      rowStart: position.rowStart,
      rowEnd: position.rowEnd,
      colStart: position.colStart,
      colEnd: position.colEnd,
      scale,
      zIndex: asset.animation.breathingAmplitude.x > 4 ? 3 : 1,
      parallaxX: asset.animation.parallaxSpeedX,
      parallaxY: asset.animation.parallaxSpeedY,
      breathingX: asset.animation.breathingAmplitude.x,
      breathingY: asset.animation.breathingAmplitude.y,
      breathingScale: asset.animation.breathingAmplitude.scale
    };
  }, [isMobile]);

  // Simply use external values if provided, otherwise use defaults
  const getAssetValue = useCallback((asset: AssetConfig): GridAssetValue => {
    const key = `${asset.src}-${asset.alt}`;
    return externalAssetValues?.[key] || getAssetDefaults(asset);
  }, [externalAssetValues, getAssetDefaults]);

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

  const gridStyle = {
    display: 'grid' as const,
    gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
    gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    ...(isMobile && { aspectRatio: '1', width: '100%', height: '100%' })
  };

  const GridOverlay = React.useMemo(() => {
    if (!isLayoutMode) return null;

    const cells = [];
    for (let row = 1; row <= gridConfig.rows; row++) {
      for (let col = 1; col <= gridConfig.columns; col++) {
        cells.push(
          <div
            key={`cell-${row}-${col}`}
            style={{
              gridRow: `${row} / ${row + 1}`,
              gridColumn: `${col} / ${col + 1}`,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'transparent'
            }}
          />
        );
      }
    }

    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 100
        }}
      >
        {cells}
      </div>
    );
  }, [isLayoutMode, gridConfig]);

  const getAssetSize = (values: GridAssetValue) => {
    if (!gridContainerRef.current) return 100;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const cellWidth = rect.width / gridConfig.columns;
    const cellHeight = rect.height / gridConfig.rows;
    const spanWidth = (values.colEnd - values.colStart) * cellWidth;
    const spanHeight = (values.rowEnd - values.rowStart) * cellHeight;
    const baseSize = Math.min(spanWidth, spanHeight);
    return baseSize * values.scale;
  };

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      <div ref={gridContainerRef} style={gridStyle}>
        {assetsToRender.map((asset) => {
          const values = getAssetValue(asset);
          const assetSize = getAssetSize(values);

          const parallaxOffsetX = scrollY.get() * values.parallaxX;
          const parallaxOffsetY = scrollY.get() * values.parallaxY;

          const breathingX = [0, values.breathingX * (isMobile ? 0.4 : 1)];
          const breathingY = [0, values.breathingY * (isMobile ? 0.4 : 1) * -1];
          const breathingScale = [1, 1 + values.breathingScale];

          return (
            <motion.div
              key={asset.src}
              className="floating-asset transform-gpu"
              style={{
                gridRow: `${values.rowStart} / ${values.rowEnd}`,
                gridColumn: `${values.colStart} / ${values.colEnd}`,
                zIndex: values.zIndex,
                position: 'relative' as const,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translate(${parallaxOffsetX}px, ${parallaxOffsetY}px)`
              }}
              initial={{
                opacity: 0,
                filter: "blur(4px)"
              }}
              animate={{
                x: breathingX,
                y: breathingY,
                scale: isLayoutMode ? values.scale : breathingScale[1] * values.scale,
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
                className="pointer-events-none select-none"
                style={{
                  width: assetSize,
                  height: assetSize,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.08)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.04))'
                }}
                priority={asset.animation.delay === 0}
              />
            </motion.div>
          );
        })}
        {GridOverlay}
      </div>
    </div>
  );
};

export default FloatingAssets;
