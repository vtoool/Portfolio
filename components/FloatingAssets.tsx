"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ART_ASSETS, AssetConfig, getAssetsForBreakpoint } from "@/lib/assets";
import { useViewport } from "@/hooks/useViewport";
import AssetHandle from "./AssetHandle";

interface AssetValue {
  top: string;
  left: string;
  scale: number;
  zIndex: number;
}

interface FloatingAssetsProps {
  onAssetValuesChange?: (values: { [key: string]: AssetValue }) => void;
  assetValues?: { [key: string]: AssetValue };
}

interface DragState {
  assetSrc: string;
  startX: number;
  startY: number;
  startTop: number;
  startLeft: number;
  startScale: number;
  action: 'move' | 'resize';
  direction?: string;
}

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ onAssetValuesChange, assetValues: externalAssetValues }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Check if layout mode is enabled via URL parameter
  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [assetValues, setAssetValues] = useState<{ [key: string]: AssetValue }>({});

  // Viewport detection for responsive assets
  const { breakpoint } = useViewport();

  // Get assets for current breakpoint
  const getAssetsForCurrentBreakpoint = () => {
    return getAssetsForBreakpoint(breakpoint);
  };

  const assetsToRender = getAssetsForCurrentBreakpoint();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutMode = urlParams.get("layoutMode");
      setIsLayoutMode(layoutMode === "true");
    }
  }, []);

  useEffect(() => {
    if (onAssetValuesChange) {
      onAssetValuesChange(assetValues);
    }
  }, [assetValues, onAssetValuesChange]);

  // Sync external assetValues with internal state
  useEffect(() => {
    if (externalAssetValues) {
      setAssetValues(externalAssetValues);
    }
  }, [externalAssetValues]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateScroll = () => {
      if (typeof window !== 'undefined') {
        scrollY.set(window.scrollY);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [scrollY, prefersReducedMotion]);

  const parsePercentage = (value: string): number => {
    return parseFloat(value.replace('%', ''));
  };

  const handleMouseDown = (e: React.MouseEvent, asset: any, action: 'move' | 'resize', direction?: string) => {
    if (!isLayoutMode || !containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    // Create unique key using src and alt
    const assetKey = `${asset.src}-${asset.alt}`;

    const containerRect = containerRef.current.getBoundingClientRect();
    const currentValues = assetValues[assetKey] || {
      top: asset.position.top,
      left: asset.position.left,
      scale: asset.scale,
      zIndex: asset.position.zIndex
    };

    const currentTop = parsePercentage(currentValues.top);
    const currentLeft = parsePercentage(currentValues.left);

    setDragState({
      assetSrc: assetKey,
      startX: e.clientX,
      startY: e.clientY,
      startTop: currentTop,
      startLeft: currentLeft,
      startScale: currentValues.scale,
      action,
      direction
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState || !containerRef.current) return;

    if (dragState.action === 'move') {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      const deltaX = ((e.clientX - dragState.startX) / containerWidth) * 100;
      const deltaY = ((e.clientY - dragState.startY) / containerHeight) * 100;

      const newLeft = Math.max(0, Math.min(90, dragState.startLeft + deltaX));
      const newTop = Math.max(0, Math.min(90, dragState.startTop + deltaY));

      setAssetValues(prev => ({
        ...prev,
        [dragState.assetSrc]: {
          ...prev[dragState.assetSrc] || {
            top: "0%",
            left: "0%",
            scale: 1,
            zIndex: 1
          },
          top: `${newTop}%`,
          left: `${newLeft}%`
        }
      }));
    } else if (dragState.action === 'resize') {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      // Calculate distance from starting point
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Scale factor: moving away from start increases size, towards decreases
      // Adjust sensitivity with divisor
      const scaleChange = distance / 100;

      // Determine direction (increase or decrease)
      const scaleMultiplier = deltaX > 0 || deltaY > 0 ? 1 : -1;

      const newScale = Math.max(0.1, Math.min(5, dragState.startScale + (scaleChange * scaleMultiplier)));

      setAssetValues(prev => ({
        ...prev,
        [dragState.assetSrc]: {
          ...prev[dragState.assetSrc] || {
            top: "0%",
            left: "0%",
            scale: 1,
            zIndex: 1
          },
          scale: newScale
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setDragState(null);
  };

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
  }, [dragState]);

  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {assetsToRender.map((asset) => (
          <div
            key={asset.src}
            className="absolute"
            style={{
              top: asset.position.top,
              left: asset.position.left,
              zIndex: asset.position.zIndex,
              transform: `scale(${asset.scale})`
            }}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="pointer-events-none select-none"
              priority={asset.animation.delay === 0}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      {assetsToRender.map((asset, assetIndex) => {
        const getBreathingAnimation = (index: number, isMobile: boolean) => {
          // Mobile: Smaller, less frequent animations for better performance
          if (isMobile) {
            const mobileAnimations = [
              { x: [0, 2], y: [0, -2], scale: [1, 1.002] },
              { x: [0, -2], y: [0, 2], scale: [1, 1.0015] },
              { x: [0, 1.5], y: [0, -1.5], scale: [1, 1.0025] },
              { x: [0, 2], y: [0, 1.5], scale: [1, 1.0015] },
              { x: [0, 1.5], y: [0, -1], scale: [1, 1.003] },
              { x: [0, -1.5], y: [0, 1.5], scale: [1, 1.002] },
            ];
            return mobileAnimations[index % mobileAnimations.length];
          }

          // Desktop: Original animations
          const desktopAnimations = [
            { x: [0, 5], y: [0, -4], scale: [1, 1.004] },
            { x: [0, -4], y: [0, 5], scale: [1, 1.003] },
            { x: [0, 3], y: [0, -3], scale: [1, 1.005] },
            { x: [0, 4], y: [0, 3], scale: [1, 1.003] },
            { x: [0, 3], y: [0, -2], scale: [1, 1.006] },
            { x: [0, -3.5], y: [0, 3], scale: [1, 1.004] },
          ];
          return desktopAnimations[index % desktopAnimations.length];
        };

        const isMobile = breakpoint === 'mobile';
        const breathingAnimation = getBreathingAnimation(assetIndex, isMobile);
        const assetKey = `${asset.src}-${asset.alt}`;
        const currentValues = assetValues[assetKey] || {
          top: asset.position.top,
          left: asset.position.left,
          scale: asset.scale,
          zIndex: asset.position.zIndex
        };

        const isDragging = dragState?.assetSrc === assetKey;

        // Calculate parallax offset directly without useTransform hook
        const parallaxOffset = scrollY.get() * asset.animation.parallaxSpeed;

        return (
          <motion.div
            key={`${asset.src}-${assetIndex}`}
            className={`absolute floating-asset transform-gpu ${isLayoutMode ? "cursor-move" : ""}`}
            style={{
              top: currentValues.top,
              left: currentValues.left,
              zIndex: isLayoutMode && isDragging ? 9999 : currentValues.zIndex,
              scale: isLayoutMode ? currentValues.scale : breathingAnimation.scale[1] * asset.scale
            }}
            initial={{
              x: isMobile ? 0 : asset.animation.initialX,
              y: isMobile ? 20 : asset.animation.initialY,
              opacity: 0,
              filter: "blur(4px)"
            }}
            animate={{
              x: 0,
              y: 0,
              scale: isLayoutMode ? currentValues.scale : breathingAnimation.scale[1] * asset.scale,
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
              width={asset.width}
              height={asset.height}
              className="pointer-events-none select-none"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.08)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.04))',
              }}
              priority={asset.animation.delay === 0}
            />

            {isLayoutMode && (
              <>
                {/* Main drag area - center of asset */}
                <div
                  className="absolute inset-0 cursor-move z-10"
                  onMouseDown={(e) => handleMouseDown(e, asset, 'move')}
                  style={{ zIndex: 10 }}
                />

                {/* Resize handles - much more visible */}
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
  );
};

export default FloatingAssets;
