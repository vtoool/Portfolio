"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, Variants, useAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ScrollRevealEnhancedProps, AnimationConfig, ArtAsset } from "@/types/animation";

/**
 * Enhanced ScrollReveal Component
 * Supports art assets, parallax, performance monitoring, and advanced animations
 */
export function ScrollRevealEnhanced({
  children,
  config,
  artAsset,
  className,
  as,
  debug = false,
  performanceMode = true,
}: ScrollRevealEnhancedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const inView = useInView(ref, {
    once: config.triggerOnce ?? true,
    margin: (config.rootMargin as any) || "-50px",
    amount: config.threshold || 0.1,
  });

  useEffect(() => {
    if (hasMounted) {
      setIsInView(inView);
      if (inView && config.triggerOnce !== false) {
        controls.start("visible");
      }
    }
  }, [inView, hasMounted, controls, config.triggerOnce]);

  // Parallax support
  const useParallax = config.type === "parallax" && config.parallaxSpeed;
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (useParallax && ref.current) {
      const parallaxSpeed = config.parallaxSpeed || 1;

      const updateParallax = () => {
        const scrolled = window.pageYOffset;

        if (config.direction === "up" || config.direction === "down" || !config.direction) {
          y.set(scrolled * parallaxSpeed);
        } else if (config.direction === "left" || config.direction === "right") {
          x.set(scrolled * parallaxSpeed);
        }
      };

      updateParallax();
      const handleScroll = () => requestAnimationFrame(updateParallax);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
    return undefined;
  }, [useParallax, y, x, config.parallaxSpeed, config.direction]);

  // Generate animation variants
  const generateVariants = useCallback((): Variants => {
    const baseHidden: any = {
      opacity: config.type === "fade" ? 0 : 1,
      x: 0,
      y: 0,
      scale: config.scaleFrom || 1,
      rotate: config.rotateAngle || 0,
      filter: "blur(0px)",
    };

    // Apply directional offset
    if (config.direction && config.direction !== "center") {
      const intensity = config.intensity || 40;
      switch (config.direction) {
        case "up":
          baseHidden.y = intensity;
          break;
        case "down":
          baseHidden.y = -intensity;
          break;
        case "left":
          baseHidden.x = intensity;
          break;
        case "right":
          baseHidden.x = -intensity;
          break;
      }
    }

    // Type-specific configurations
    switch (config.type) {
      case "fade":
        baseHidden.opacity = 0;
        break;
      case "scale":
        baseHidden.scale = config.scaleFrom || 0.8;
        break;
      case "rotate":
        baseHidden.rotate = config.rotateAngle || -45;
        break;
      case "flip":
        baseHidden.rotateY = -90;
        break;
    }

    const baseVisible: any = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: config.scaleTo || 1,
      rotate: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: config.duration || 0.6,
        delay: config.delay || 0,
        ease: config.easing || "easeOut",
        type: "tween" as const,
        ...(config.type === "bounce" && {
          type: "spring" as const,
          stiffness: 100,
          damping: 10,
        }),
      },
    };

    return {
      hidden: baseHidden,
      visible: baseVisible,
    };
  }, [config]);

  const variants = generateVariants();

  // Reduced motion handling
  if (reduceMotion && config.reducedMotion !== false) {
    return (
      <div ref={ref} className={cn(className)}>
        {artAsset ? (
          <Image
            src={artAsset.src}
            alt={artAsset.alt}
            width={artAsset.width}
            height={artAsset.height}
            blurDataURL={artAsset.blurDataURL}
            placeholder={artAsset.placeholder}
            sizes={artAsset.sizes}
            priority={artAsset.priority}
            quality={artAsset.quality}
            className="w-full h-auto"
          />
        ) : (
          children
        )}
      </div>
    );
  }

  const Component = (as || "div") as any;

  return (
    <>
      {debug && (
        <div className="fixed top-0 left-0 z-50 bg-red-500 text-white p-2 text-xs">
          <div>In View: {isInView.toString()}</div>
          <div>Type: {config.type}</div>
        </div>
      )}
      <Component
        ref={ref}
        initial="hidden"
        animate={config.triggerOnce === false ? undefined : controls}
        variants={variants}
        className={cn(
          "will-change-transform",
          performanceMode && "transform-gpu",
          className
        )}
        style={
          useParallax
            ? {
                y,
                x,
              }
            : undefined
        }
      >
        {artAsset ? (
          <Image
            src={artAsset.src}
            alt={artAsset.alt}
            width={artAsset.width}
            height={artAsset.height}
            blurDataURL={artAsset.blurDataURL}
            placeholder={artAsset.placeholder}
            sizes={artAsset.sizes}
            priority={artAsset.priority}
            quality={artAsset.quality}
            className="w-full h-auto"
            style={{
              objectFit: "cover",
              backfaceVisibility: "hidden",
            }}
          />
        ) : (
          children
        )}
      </Component>
    </>
  );
}

/**
 * Animation Presets
 */
export const animationPresets = {
  fadeIn: {
    type: "fade" as const,
    duration: 0.6,
    delay: 0,
  },
  slideUp: {
    type: "slide" as const,
    direction: "up" as const,
    intensity: 50,
    duration: 0.6,
    delay: 0,
  },
  slideDown: {
    type: "slide" as const,
    direction: "down" as const,
    intensity: 50,
    duration: 0.6,
    delay: 0,
  },
  slideLeft: {
    type: "slide" as const,
    direction: "left" as const,
    intensity: 50,
    duration: 0.6,
    delay: 0,
  },
  slideRight: {
    type: "slide" as const,
    direction: "right" as const,
    intensity: 50,
    duration: 0.6,
    delay: 0,
  },
  scaleIn: {
    type: "scale" as const,
    scaleFrom: 0.8,
    duration: 0.6,
    delay: 0,
  },
  rotateIn: {
    type: "rotate" as const,
    rotateAngle: -45,
    duration: 0.8,
    delay: 0,
  },
  bounce: {
    type: "bounce" as const,
    duration: 0.8,
    delay: 0,
  },
  parallax: {
    type: "parallax" as const,
    parallaxSpeed: 0.5,
    triggerOnce: true,
  },
};
