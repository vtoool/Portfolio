"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ART_ASSETS, AssetConfig } from "@/lib/assets";

const FloatingAssets: React.FC = () => {
  const scrollY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

        // Breathing/panning animation configuration
        // Each asset has unique subtle movement pattern
        const getBreathingAnimation = (index: number) => {
          const animations = [
            { x: [0, 8], y: [0, -5], scale: [1, 1.02] }, // Me
            { x: [0, -5], y: [0, 6], scale: [1, 1.01] }, // Guitar
            { x: [0, 4], y: [0, -4], scale: [1, 1.015] }, // Map
            { x: [0, 6], y: [0, 5], scale: [1, 1.01] }, // Plane
            { x: [0, 5], y: [0, -3], scale: [1, 1.02] }, // Gear 1
            { x: [0, -6], y: [0, 4], scale: [1, 1.015] }, // Gear 2
          ];
          return animations[index % animations.length];
        };

        const breathingAnimation = getBreathingAnimation(assetIndex);

        return (
          <motion.div
            key={`${asset.src}-${assetIndex}`}
            className="absolute floating-asset transform-gpu"
            style={{
              top: asset.position.top,
              left: asset.position.left,
              zIndex: asset.position.zIndex,
              scale: asset.scale,
              y: parallaxOffset
            }}
            initial={{
              x: breathingAnimation.x[0],
              y: breathingAnimation.y[0],
              scale: breathingAnimation.scale[0] * asset.scale
            }}
            animate={{
              x: breathingAnimation.x,
              y: breathingAnimation.y,
              scale: breathingAnimation.scale.map(s => s * asset.scale)
            }}
            transition={{
              type: "spring" as const,
              stiffness: 50,
              damping: 15,
              delay: asset.animation.delay,
              duration: 4 + (assetIndex * 0.5),
              repeat: Infinity,
              repeatType: "reverse" as const,
              ease: "easeInOut"
            }}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="pointer-events-none select-none drop-shadow-2xl"
              priority={asset.animation.delay === 0}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingAssets;
