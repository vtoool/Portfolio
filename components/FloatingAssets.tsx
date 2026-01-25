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
      {ART_ASSETS.map((asset) => {
        const parallaxOffset = useTransform(
          scrollY,
          [0, 1000],
          [0, asset.animation.parallaxSpeed * 100]
        );

        const blurAmount = useTransform(
          scrollY,
          [0, 400],
          [0, 6]
        );

        const opacityLevel = useTransform(
          scrollY,
          [0, 400],
          [1, 0.5]
        );

        const entryVariants = {
          hidden: {
            x: asset.animation.initialX,
            y: asset.animation.initialY,
            opacity: 0,
            filter: "blur(12px)"
          },
          visible: {
            x: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)"
          }
        };

        return (
          <motion.div
            key={asset.src}
            className="absolute floating-asset transform-gpu"
            style={{
              top: asset.position.top,
              left: asset.position.left,
              zIndex: asset.position.zIndex,
              scale: asset.scale,
              y: parallaxOffset,
              filter: blurAmount,
              opacity: opacityLevel
            }}
            variants={entryVariants}
            initial="hidden"
            animate="visible"
            transition={{
              type: "spring" as const,
              stiffness: 50,
              damping: 15,
              delay: asset.animation.delay
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
