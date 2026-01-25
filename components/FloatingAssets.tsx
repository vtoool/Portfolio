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

const FloatingAssets: React.FC<FloatingAssetsProps> = ({ onAssetValuesChange }) => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Check if layout mode is enabled via URL parameter
  const [isLayoutMode, setIsLayoutMode] = useState(false);
  const [draggedAsset, setDraggedAsset] = useState<string | null>(null);
  const [resizedAsset, setResizedAsset] = useState<string | null>(null);
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

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedAsset || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const asset = ART_ASSETS.find(a => a.src === draggedAsset);
    if (!asset) return;

    const newLeft = ((e.clientX - containerRect.left) / containerWidth) * 100;
    const newTop = ((e.clientY - containerRect.top) / containerHeight) * 100;

    setAssetValues(prev => ({
      ...prev,
      [draggedAsset]: {
        ...prev[draggedAsset] || {
          top: asset.position.top,
          left: asset.position.left,
          scale: asset.scale,
          zIndex: asset.position.zIndex
        },
        top: `${Math.max(0, Math.min(90, newTop))}%`,
        left: `${Math.max(0, Math.min(90, newLeft))}%`
      }
    }));
  };

  const handleMouseUp = () => {
    setDraggedAsset(null);
    setResizedAsset(null);
  };

  useEffect(() => {
    if (draggedAsset || resizedAsset) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggedAsset, resizedAsset]);

  const handleMove = (assetSrc: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedAsset(assetSrc);
  };

  const handleResize = (assetSrc: string, direction: string, e: React.MouseEvent) => {
    e.preventDefault();
    setResizedAsset(assetSrc);
  };

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

        return (
          <motion.div
            key={`${asset.src}-${assetIndex}`}
            className={`absolute floating-asset transform-gpu ${isLayoutMode ? "cursor-move" : ""}`}
            style={{
              top: currentValues.top,
              left: currentValues.left,
              zIndex: isLayoutMode ? 9999 : currentValues.zIndex,
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
            onMouseDown={isLayoutMode ? (e) => handleMove(asset.src, e) : undefined}
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
                <AssetHandle
                  type="move"
                  position="nw"
                  onMouseDown={(e) => handleMove(asset.src, e)}
                  isVisible={true}
                />

                <AssetHandle
                  type="resize"
                  position="nw"
                  onMouseDown={(e) => handleResize(asset.src, "nw", e)}
                  isVisible={true}
                />
                <AssetHandle
                  type="resize"
                  position="ne"
                  onMouseDown={(e) => handleResize(asset.src, "ne", e)}
                  isVisible={true}
                />
                <AssetHandle
                  type="resize"
                  position="sw"
                  onMouseDown={(e) => handleResize(asset.src, "sw", e)}
                  isVisible={true}
                />
                <AssetHandle
                  type="resize"
                  position="se"
                  onMouseDown={(e) => handleResize(asset.src, "se", e)}
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
