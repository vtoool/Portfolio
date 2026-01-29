"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
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

const STORAGE_KEY = 'grid-asset-values';

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ onAssetValuesChange, assetValues: externalAssetValues }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [localAssetValues, setLocalAssetValues] = useState<{ [key: string]: GridAssetValue }>({});
  const [mounted, setMounted] = useState(false);

  const { breakpoint } = useViewport();

  const getAssetsForCurrentBreakpoint = useCallback(() => {
    return getAssetsForBreakpoint(breakpoint);
  }, [breakpoint]);

  const assetsToRender = getAssetsForCurrentBreakpoint();
  const gridConfig = useMemo(() => GRID_CONFIG[breakpoint === 'tablet' ? 'tablet' : breakpoint], [breakpoint]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLocalAssetValues(parsed);
        } catch (e) {
          console.error('Failed to parse stored asset values');
        }
      }
    }
  }, []);

  const getAssetDefaults = useCallback((asset: AssetConfig, breakpoint: string): GridAssetValue => {
    const isMobile = breakpoint === 'mobile';
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
  }, []);

  const computedAssetValues = useMemo(() => {
    const result: { [key: string]: GridAssetValue } = {};

    assetsToRender.forEach(asset => {
      const key = `${asset.src}-${asset.alt}`;

      if (externalAssetValues && externalAssetValues[key]) {
        result[key] = externalAssetValues[key];
      } else if (localAssetValues[key]) {
        result[key] = localAssetValues[key];
      } else {
        result[key] = getAssetDefaults(asset, breakpoint);
      }
    });

    return result;
  }, [assetsToRender, externalAssetValues, localAssetValues, breakpoint, getAssetDefaults]);

  useEffect(() => {
    if (mounted && onAssetValuesChange) {
      onAssetValuesChange(computedAssetValues);
    }
  }, [computedAssetValues, onAssetValuesChange, mounted]);

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

  const saveToLocalStorage = useCallback((values: { [key: string]: GridAssetValue }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent, asset: AssetConfig, action: 'move' | 'resize', direction?: string) => {
    if (!isLayoutMode || !containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const assetKey = `${asset.src}-${asset.alt}`;
    const currentValues = computedAssetValues[assetKey];

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
  }, [isLayoutMode, computedAssetValues]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cellWidth = containerRect.width / gridConfig.columns;
    const cellHeight = containerRect.height / gridConfig.rows;

    if (dragState.action === 'move') {
      const deltaX = (e.clientX - dragState.startX) / cellWidth;
      const deltaY = (e.clientY - dragState.startY) / cellHeight;

      const newColStart = Math.max(0, Math.min(gridConfig.columns - 1, dragState.startColStart + deltaX));
      const newColEnd = Math.max(newColStart + 0.5, Math.min(gridConfig.columns, dragState.startColEnd + deltaX));
      const newRowStart = Math.max(0, Math.min(gridConfig.rows - 1, dragState.startRowStart + deltaY));
      const newRowEnd = Math.max(newRowStart + 0.5, Math.min(gridConfig.rows, dragState.startRowEnd + deltaY));

      const updatedValues = {
        ...computedAssetValues,
        [dragState.assetSrc]: {
          ...computedAssetValues[dragState.assetSrc],
          rowStart: newRowStart,
          rowEnd: newRowEnd,
          colStart: newColStart,
          colEnd: newColEnd
        }
      };

      setLocalAssetValues(updatedValues);
      saveToLocalStorage(updatedValues);
    } else if (dragState.action === 'resize') {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const scaleChange = distance / 100;
      const scaleMultiplier = deltaX > 0 || deltaY > 0 ? 1 : -1;

      const newScale = Math.max(0.1, Math.min(3, dragState.startScale + (scaleChange * scaleMultiplier)));

      const updatedValues = {
        ...computedAssetValues,
        [dragState.assetSrc]: {
          ...computedAssetValues[dragState.assetSrc],
          scale: newScale
        }
      };

      setLocalAssetValues(updatedValues);
      saveToLocalStorage(updatedValues);
    }
  }, [dragState, gridConfig, computedAssetValues, saveToLocalStorage]);

  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

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

  const gridStyle = useMemo(() => ({
    display: 'grid' as const,
    gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
    gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
    width: '100%',
    height: '100%',
    position: 'relative' as const
  }), [gridConfig]);

  const GridOverlay = useMemo(() => {
    if (!isLayoutMode) return null;

    const rows = Array.from({ length: gridConfig.rows }, (_, i) => i + 1);
    const cols = Array.from({ length: gridConfig.columns }, (_, i) => i + 1);

    return (
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
          width: '100%',
          height: '100%'
        }}
      >
        {rows.map(row => (
          <React.Fragment key={`row-${row}`}>
            {cols.map(col => (
              <div
                key={`cell-${row}-${col}`}
                className="border border-white/20"
                style={{
                  gridRow: `${row} / ${row + 1}`,
                  gridColumn: `${col} / ${col + 1}`
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }, [isLayoutMode, gridConfig]);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} style={gridStyle}>
        {assetsToRender.map((asset) => {
          const assetKey = `${asset.src}-${asset.alt}`;
          const isMobile = breakpoint === 'mobile';
          const position = isMobile && asset.mobile ? asset.mobile.position : asset.position;
          const scale = isMobile && asset.mobile ? asset.mobile.scale : asset.scale;
          const values = computedAssetValues[assetKey];

          return (
            <div
              key={asset.src}
              style={{
                gridRow: `${values.rowStart} / ${values.rowEnd}`,
                gridColumn: `${values.colStart} / ${values.colEnd}`,
                zIndex: values.zIndex,
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
                  transform: `scale(${values.scale})`
                }}
                priority={asset.animation.delay === 0}
              />
            </div>
          );
        })}
        {GridOverlay}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      <div className="absolute inset-0" style={gridStyle}>
        {assetsToRender.map((asset) => {
          const assetKey = `${asset.src}-${asset.alt}`;
          const isMobile = breakpoint === 'mobile';
          const values = computedAssetValues[assetKey];

          const isDragging = dragState?.assetSrc === assetKey;

          const parallaxOffsetX = scrollY.get() * values.parallaxX;
          const parallaxOffsetY = scrollY.get() * values.parallaxY;

          const breathingX = [0, values.breathingX * (isMobile ? 0.4 : 1)];
          const breathingY = [0, values.breathingY * (isMobile ? 0.4 : 1) * -1];
          const breathingScale = [1, 1 + values.breathingScale];

          return (
            <motion.div
              key={`${asset.src}-${asset.alt}`}
              className={`floating-asset transform-gpu ${isLayoutMode ? "cursor-move" : ""}`}
              style={{
                gridRow: `${values.rowStart} / ${values.rowEnd}`,
                gridColumn: `${values.colStart} / ${values.colEnd}`,
                zIndex: isLayoutMode && isDragging ? 9999 : values.zIndex,
                position: 'relative' as const,
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
        {GridOverlay}
      </div>
    </div>
  );
};

export default FloatingAssets;
