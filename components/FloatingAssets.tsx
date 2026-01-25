"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ART_ASSETS, AssetConfig } from "@/lib/assets";
import AssetHandle from "./AssetHandle";

interface AssetValue {
  top: string;
  left: string;
  scale: number;
  zIndex: number;
}

interface FloatingAssetsProps {
  onAssetValuesChange?: (values: { [key: string]: AssetValue }) => void;
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

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ onAssetValuesChange }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Check if layout mode is enabled via URL parameter
  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [assetValues, setAssetValues] = useState<{ [key: string]: AssetValue }>({});

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

  const handleMouseDown = (e: React.MouseEvent, assetSrc: string, action: 'move' | 'resize', direction?: string) => {
    if (!isLayoutMode || !containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const asset = ART_ASSETS.find(a => a.src === assetSrc);
    if (!asset) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const currentValues = assetValues[assetSrc] || {
      top: asset.position.top,
      left: asset.position.left,
      scale: asset.scale,
      zIndex: asset.position.zIndex
    };

    const currentTop = parsePercentage(currentValues.top);
    const currentLeft = parsePercentage(currentValues.left);

    setDragState({
      assetSrc,
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
      const delta = (deltaX + deltaY) / 200;

      const newScale = Math.max(0.1, Math.min(3, dragState.startScale + delta));

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
  }, [dragState]);

  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-full">
        {ART_ASSETS.map((asset) => (
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
      {ART_ASSETS.map((asset, assetIndex) => {
        const parallaxOffset = useTransform(
          scrollY,
          [0, 1000],
          [0, asset.animation.parallaxSpeed * 100]
        );

        const getBreathingAnimation = (index: number) => {
          const animations = [
            { x: [0, 5], y: [0, -4], scale: [1, 1.004] },
            { x: [0, -4], y: [0, 5], scale: [1, 1.003] },
            { x: [0, 3], y: [0, -3], scale: [1, 1.005] },
            { x: [0, 4], y: [0, 3], scale: [1, 1.003] },
            { x: [0, 3], y: [0, -2], scale: [1, 1.006] },
            { x: [0, -3.5], y: [0, 3], scale: [1, 1.004] },
          ];
          return animations[index % animations.length];
        };

        const breathingAnimation = getBreathingAnimation(assetIndex);
        const currentValues = assetValues[asset.src] || {
          top: asset.position.top,
          left: asset.position.left,
          scale: asset.scale,
          zIndex: asset.position.zIndex
        };

        const isDragging = dragState?.assetSrc === asset.src;

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
              x: asset.animation.initialX,
              y: asset.animation.initialY,
              opacity: 0,
              filter: "blur(8px)"
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
              stiffness: 100,
              damping: 20,
              duration: 1.2,
              delay: asset.animation.delay
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
                  onMouseDown={(e) => handleMouseDown(e, asset.src, 'move')}
                  style={{ zIndex: 10 }}
                />

                {/* Resize handles */}
                <AssetHandle
                  type="resize"
                  position="nw"
                  onMouseDown={(e) => handleMouseDown(e, asset.src, 'resize', 'nw')}
                  isVisible={true}
                />
                <AssetHandle
                  type="resize"
                  position="ne"
                  onMouseDown={(e) => handleMouseDown(e, asset.src, 'resize', 'ne')}
                  isVisible={true}
                />
                <AssetHandle
                  type="resize"
                  position="sw"
                  onMouseDown={(e) => handleMouseDown(e, asset.src, 'resize', 'sw')}
                  isVisible={true}
                />
                <AssetHandle
                  type="resize"
                  position="se"
                  onMouseDown={(e) => handleMouseDown(e, asset.src, 'resize', 'se')}
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
