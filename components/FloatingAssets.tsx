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
  assetValues?: { [key: string]: GridAssetValue } | null;
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
  desktop: { columns: 12, rows: 8 },
  tablet: { columns: 8, rows: 6 },
  mobile: { columns: 5, rows: 5, aspectRatio: '1/1' }
};

const STORAGE_KEY = 'grid-asset-values';

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ onAssetValuesChange, assetValues: externalAssetValues }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentValues, setCurrentValues] = useState<{ [key: string]: GridAssetValue }>({});

  const { breakpoint } = useViewport();

  const getAssetsForCurrentBreakpoint = useCallback(() => {
    return getAssetsForBreakpoint(breakpoint);
  }, [breakpoint]);

  const assetsToRender = getAssetsForCurrentBreakpoint();
  const gridConfig = useMemo(() => GRID_CONFIG[breakpoint === 'tablet' ? 'tablet' : breakpoint], [breakpoint]);
  const isMobile = breakpoint === 'mobile';

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");
    }
  }, []);

  // Sync external values when they change
  useEffect(() => {
    if (externalAssetValues && Object.keys(externalAssetValues).length > 0) {
      setCurrentValues(externalAssetValues);
    }
  }, [externalAssetValues]);

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

      if (currentValues && currentValues[key]) {
        result[key] = currentValues[key];
      } else if (externalAssetValues && externalAssetValues[key]) {
        result[key] = externalAssetValues[key];
      } else {
        result[key] = getAssetDefaults(asset, breakpoint);
      }
    });

    return result;
  }, [assetsToRender, currentValues, externalAssetValues, breakpoint, getAssetDefaults]);

  useEffect(() => {
    if (mounted && onAssetValuesChange && computedAssetValues) {
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

  const handleMouseDown = useCallback((e: React.MouseEvent, asset: AssetConfig, action: 'move' | 'resize', direction?: string) => {
    if (!isLayoutMode || !gridContainerRef.current) return;
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
    if (!dragState || !gridContainerRef.current) return;

    const containerRect = gridContainerRef.current.getBoundingClientRect();
    const cellWidth = containerRect.width / gridConfig.columns;
    const cellHeight = containerRect.height / gridConfig.rows;

    if (dragState.action === 'move') {
      const deltaX = (e.clientX - dragState.startX) / cellWidth;
      const deltaY = (e.clientY - dragState.startY) / cellHeight;

      const newColStart = Math.max(0, Math.min(gridConfig.columns - 1, dragState.startColStart + deltaX));
      const newColEnd = Math.max(newColStart + 0.5, Math.min(gridConfig.columns, dragState.startColEnd + deltaX));
      const newRowStart = Math.max(0, Math.min(gridConfig.rows - 1, dragState.startRowStart + deltaY));
      const newRowEnd = Math.max(newRowStart + 0.5, Math.min(gridConfig.rows, dragState.startRowEnd + deltaY));

      const newValues = {
        ...computedAssetValues,
        [dragState.assetSrc]: {
          ...computedAssetValues[dragState.assetSrc],
          rowStart: newRowStart,
          rowEnd: newRowEnd,
          colStart: newColStart,
          colEnd: newColEnd
        }
      };

      setCurrentValues(newValues);
      onAssetValuesChange?.(newValues);
    } else if (dragState.action === 'resize') {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const scaleChange = distance / 100;
      const scaleMultiplier = deltaX > 0 || deltaY > 0 ? 1 : -1;

      const newScale = Math.max(0.1, Math.min(5, dragState.startScale + (scaleChange * scaleMultiplier)));

      const newValues = {
        ...computedAssetValues,
        [dragState.assetSrc]: {
          ...computedAssetValues[dragState.assetSrc],
          scale: newScale
        }
      };

      setCurrentValues(newValues);
      onAssetValuesChange?.(newValues);
    }
  }, [dragState, gridConfig, computedAssetValues, onAssetValuesChange]);

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
    position: 'relative' as const,
    ...(isMobile && { aspectRatio: '1', width: '100%', height: '100%' })
  }), [gridConfig, isMobile]);

  const GridOverlay = useMemo(() => {
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
    const containerWidth = gridContainerRef.current?.getBoundingClientRect().width || 800;
    const containerHeight = gridContainerRef.current?.getBoundingClientRect().height || 600;
    const cellWidth = containerWidth / gridConfig.columns;
    const cellHeight = containerHeight / gridConfig.rows;
    const spanWidth = (values.colEnd - values.colStart) * cellWidth;
    const spanHeight = (values.rowEnd - values.rowStart) * cellHeight;
    const baseSize = Math.min(spanWidth, spanHeight);
    return baseSize * values.scale;
  };

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} style={gridStyle}>
        {assetsToRender.map((asset) => {
          const assetKey = `${asset.src}-${asset.alt}`;
          const values = computedAssetValues[assetKey];
          const assetSize = getAssetSize(values);

          return (
            <div
              key={asset.src}
              style={{
                gridRow: `${values.rowStart} / ${values.rowEnd}`,
                gridColumn: `${values.colStart} / ${values.colEnd}`,
                zIndex: values.zIndex,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                  objectFit: 'contain'
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
      <div ref={gridContainerRef} style={gridStyle}>
        {assetsToRender.map((asset) => {
          const assetKey = `${asset.src}-${asset.alt}`;
          const values = computedAssetValues[assetKey];
          const assetSize = getAssetSize(values);

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
                position: 'relative',
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
              {isLayoutMode && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid rgba(99, 102, 241, 0.5)',
                    borderRadius: '0.75rem',
                    zIndex: -1
                  }}
                />
              )}

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
