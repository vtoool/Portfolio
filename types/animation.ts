import { ImageProps } from "next/image";

/**
 * Art Asset Interface
 * Manages individual art assets with Next.js optimization
 */
export interface ArtAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  sizes?: string;
  quality?: number;
  format?: "auto" | "webp" | "png" | "jpg";
}

/**
 * Animation Configuration
 * Controls animation behavior and performance
 */
export interface AnimationConfig {
  type: "fade" | "slide" | "scale" | "parallax" | "rotate" | "sequence" | "bounce" | "flip";
  direction?: "up" | "down" | "left" | "right" | "center";
  duration?: number;
  delay?: number;
  easing?: string;
  intensity?: number;
  stagger?: number;
  loop?: boolean;
  yOffset?: number;
  xOffset?: number;
  rotateAngle?: number;
  scaleFrom?: number;
  scaleTo?: number;
  parallaxSpeed?: number;
  sequence?: AnimationStep[];
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  reducedMotion?: boolean;
}

/**
 * Individual animation step for sequences
 */
export interface AnimationStep {
  delay: number;
  duration: number;
  type: AnimationConfig["type"];
  intensity?: number;
}

/**
 * Performance Monitoring
 */
export interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  animationFrame?: number;
  lastFrameTime?: number;
}

/**
 * Scroll Trigger Options
 */
export interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  debug?: boolean;
}

/**
 * Enhanced ScrollReveal Props
 */
export interface ScrollRevealEnhancedProps {
  children: React.ReactNode;
  config: AnimationConfig;
  artAsset?: ArtAsset;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  debug?: boolean;
  performanceMode?: boolean;
}

/**
 * Animation Context
 */
export interface AnimationContext {
  isAnimating: boolean;
  isInView: boolean;
  progress: number;
  metrics: PerformanceMetrics;
  reduceMotion: boolean;
}
