"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AssetConfig, getAssetsForBreakpoint } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";
import AssetHandle from "./AssetHandle";

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
  onAssetValuesChange?: (values: { [key: string]: GridAssetValue }) => void;
  assetValues?: { [key: string]: GridAssetValue };
}

interface DragState {
  assetSrc: string;
  startX: number;
  startY: number;
  startRowStart: number;
  startRowEnd: number;
  startColStart: number;
  startColEnd: number;
  startScale: number;
  action: 'move' | 'resize';
  direction?: string;
}

const GRID_CONFIG = {
  desktop: { columns: 12, rows: 12 },
  tablet: { columns: 8, rows: 8 },
  mobile: { columns: 5, rows: 5 }
};

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ onAssetValuesChange, assetValues: externalAssetValues }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [assetValues, setAssetValues] = useState<{ [key: string]: GridAssetValue }>({});

  const { breakpoint } = useViewport();

  const getAssetsForCurrentBreakpoint = useCallback(() => {
    return getAssetsForBreakpoint(breakpoint);
  }, [breakpoint]);

  const assetsToRender = getAssetsForCurrentBreakpoint();
  const gridConfig = GRID_CONFIG[breakpoint === 'tablet' ? 'tablet' : breakpoint];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");
    }
  }, []);

  useEffect(() => {
    if (externalAssetValues) {
      setAssetValues(externalAssetValues);
    }
  }, [externalAssetValues]);

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

  const handleMouseDown = useCallback((e: React.MouseEvent, asset: AssetConfig, action: 'move' | 'resize', direction?: string) => {
    if (!isLayoutMode || !containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const assetKey = `${asset.src}-${asset.alt}`;

    const assetBreakpoint = asset.mobile && breakpoint === 'mobile' ? 'mobile' : 'desktop';
    const gridCols = GRID_CONFIG[assetBreakpoint].columns;

    const currentValues = assetValues[assetKey] || {
      rowStart: asset.position.rowStart,
      rowEnd: asset.position.rowEnd,
      colStart: asset.position.colStart,
      colEnd: asset.position.colEnd,
      scale: asset.mobile && breakpoint === 'mobile' ? asset.mobile.scale : asset.scale,
      zIndex: asset.animation.breathingAmplitude.x > 4 ? 3 : 1,
      parallaxX: asset.animation.parallaxSpeedX,
      parallaxY: asset.animation.parallaxSpeedY,
      breathingX: asset.animation.breathingAmplitude.x,
      breathingY: asset.animation.breathingAmplitude.y,
      breathingScale: asset.animation.breathingAmplitude.scale
    };

    setDragState({
      assetSrc: assetKey,
      startX: e.clientX,
      startY: e.clientY,
      startRowStart: currentValues.rowStart,
      startRowEnd: currentValues.rowEnd,
      startColStart: currentValues.colStart,
      startColEnd: currentValues.colEnd,
      startScale: currentValues.scale,
      action,
      direction
    });
  }, [isLayoutMode, assetValues, breakpoint]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState || !containerRef.current) return;

    const assetBreakpoint = dragState.assetSrc.includes('mobile') ? 'mobile' : 'desktop';
    const gridCols = GRID_CONFIG[assetBreakpoint].columns;
    const gridRows = GRID_CONFIG[assetBreakpoint].rows;

    if (dragState.action === 'move') {
      const containerRect = containerRef.current.getBoundingClientRect();
      const cellWidth = containerRect.width / gridCols;
      const cellHeight = containerRect.height / gridRows;

      const deltaX = (e.clientX - dragState.startX) / cellWidth;
      const deltaY = (e.clientY - dragState.startY) / cellHeight;

      const newColStart = Math.max(0, Math.min(gridCols - 1, dragState.startColStart + deltaX));
      const newColEnd = Math.max(newColStart + 0.5, Math.min(gridCols, dragState.startColEnd + deltaX));
      const newRowStart = Math.max(0, Math.min(gridRows - 1, dragState.startRowStart + deltaY));
      const newRowEnd = Math.max(newRowStart + 0.5, Math.min(gridRows, dragState.startRowEnd + deltaY));

      setAssetValues(prev => ({
        ...prev,
        [dragState.assetSrc]: {
          ...prev[dragState.assetSrc] || getDefaultGridValue(dragState.assetSrc),
          rowStart: newRowStart,
          rowEnd: newRowEnd,
          colStart: newColStart,
          colEnd: newColEnd
        }
      }));
    } else if (dragState.action === 'resize') {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const scaleChange = distance / 100;
      const scaleMultiplier = deltaX > 0 || deltaY > 0 ? 1 : -1;

      const newScale = Math.max(0.1, Math.min(3, dragState.startScale + (scaleChange * scaleMultiplier)));

      setAssetValues(prev => ({
        ...prev,
        [dragState.assetSrc]: {
          ...prev[dragState.assetSrc] || getDefaultGridValue(dragState.assetSrc),
          scale: newScale
        }
      }));
    }
  }, [dragState]);

  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

  const getDefaultGridValue = (assetKey: string): GridAssetValue => ({
    rowStart: 2,
    rowEnd: 5,
    colStart: 2,
    colEnd: 5,
    scale: 0.5,
    zIndex: 1,
    parallaxX: 0.2,
    parallaxY: 0.2,
    breathingX: 3,
    breathingY: 3,
    breathingScale: 0.003
  });

  useEffect(() => {
    if (dragState) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
    return undefined;
  }, [dragState, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (onAssetValuesChange) {
      onAssetValuesChange(assetValues);
    }
  }, [assetValues, onAssetValuesChange]);

  const getGridStyle = () => ({
    display: 'grid' as const,
    gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
    gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
    width: '100%',
    height: '100%',
    position: 'relative' as const
  });

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} style={getGridStyle()}>
        {assetsToRender.map((asset) => {
          const assetKey = `${asset.src}-${asset.alt}`;
          const isMobile = breakpoint === 'mobile';
          const position = isMobile && asset.mobile ? asset.mobile.position : asset.position;
          const scale = isMobile && asset.mobile ? asset.mobile.scale : asset.scale;

          return (
            <div
              key={asset.src}
              style={{
                gridRow: `${position.rowStart} / ${position.rowEnd}`,
                gridColumn: `${position.colStart} / ${position.colEnd}`,
                zIndex: asset.animation.breathingAmplitude.x > 4 ? 3 : 1,
                position: 'relative' as const
              }}
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                width={200}
                height={200}
                className="pointer-events-none select-none"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1',
                  objectFit: 'contain',
                  transform: `scale(${scale})`
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
      <div className="absolute inset-0" style={getGridStyle()}>
        {assetsToRender.map((asset, assetIndex) => {
          const assetKey = `${asset.src}-${asset.alt}`;
          const isMobile = breakpoint === 'mobile';
          const position = isMobile && asset.mobile ? asset.mobile.position : asset.position;
          const scale = isMobile && asset.mobile ? asset.mobile.scale : asset.scale;
          const currentValues = assetValues[assetKey] || {
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

          const isDragging = dragState?.assetSrc === assetKey;

          const parallaxOffsetX = scrollY.get() * currentValues.parallaxX;
          const parallaxOffsetY = scrollY.get() * currentValues.parallaxY;

          const breathingX = [0, currentValues.breathingX * (isMobile ? 0.4 : 1)];
          const breathingY = [0, currentValues.breathingY * (isMobile ? 0.4 : 1) * -1];
          const breathingScale = [1, 1 + currentValues.breathingScale];

          return (
            <motion.div
              key={`${asset.src}-${assetIndex}`}
              className={`floating-asset transform-gpu ${isLayoutMode ? "cursor-move" : ""}`}
              style={{
                gridRow: `${currentValues.rowStart} / ${currentValues.rowEnd}`,
                gridColumn: `${currentValues.colStart} / ${currentValues.colEnd}`,
                zIndex: isLayoutMode && isDragging ? 9999 : currentValues.zIndex,
                position: 'relative',
                transform: `translate(${parallaxOffsetX}px, ${parallaxOffsetY}px)`
              }}
              initial={{
                opacity: 0,
                filter: "blur(4px)"
              }}
              animate={{
                x: breathingX,
                y: breathingY,
                scale: isLayoutMode ? currentValues.scale : breathingScale[1] * currentValues.scale,
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
              {isLayoutMode && (
                <div
                  className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl pointer-events-none"
                  style={{ zIndex: -1 }}
                />
              )}

              <Image
                src={asset.src}
                alt={asset.alt}
                width={200}
                height={200}
                className="pointer-events-none select-none"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.08)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.04))'
                }}
                priority={asset.animation.delay === 0}
              />

              {isLayoutMode && (
                <>
                  <div
                    className="absolute inset-0 cursor-move z-10"
                    onMouseDown={(e) => handleMouseDown(e, asset, 'move')}
                    style={{ zIndex: 10 }}
                  />
                  <AssetHandle
                    position="nw"
                    onMouseDown={(e) => handleMouseDown(e, asset, 'resize', 'nw')}
                    isVisible={true}
                  />
                  <AssetHandle
                    position="ne"
                    onMouseDown={(e) => handleMouseDown(e, asset, 'resize', 'ne')}
                    isVisible={true}
                  />
                  <AssetHandle
                    position="sw"
                    onMouseDown={(e) => handleMouseDown(e, asset, 'resize', 'sw')}
                    isVisible={true}
                  />
                  <AssetHandle
                    position="se"
                    onMouseDown={(e) => handleMouseDown(e, asset, 'resize', 'se')}
                    isVisible={true}
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingAssets;
