// Animation system type definitions

export interface AnimationConfig {
  type?: "fade" | "slide" | "scale" | "parallax" | "rotate" | "bounce" | "flip";
  direction?: "up" | "down" | "left" | "right" | "center";
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
  parallaxSpeed?: number;
  distance?: number;
  scale?: number;
  opacity?: number;
  rotate?: number;
  stiffness?: number;
  damping?: number;
  intensity?: number;
  scaleFrom?: number;
  scaleTo?: number;
  rotateAngle?: number;
  easing?: string;
  reducedMotion?: boolean;
}

export interface ArtAsset {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
  sizes?: string;
  priority?: boolean;
  quality?: number;
  initialX?: number;
  initialY?: number;
  parallaxSpeed?: number;
  blurAmount?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  delay?: number;
}

export interface ScrollRevealEnhancedProps {
  children: React.ReactNode;
  config: AnimationConfig;
  artAsset?: ArtAsset;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  debug?: boolean;
  performanceMode?: boolean;
}

export interface FloatingAsset extends ArtAsset {
  id: string;
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface FloatingAssetsProps {
  assets: FloatingAsset[];
  className?: string;
  debug?: boolean;
  performanceMode?: boolean;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  triggerOnce?: boolean;
}

// Animation performance monitoring
export interface AnimationPerformanceMetrics {
  componentId: string;
  animationType: string;
  startTime: number;
  endTime: number;
  duration: number;
  frameDrops: number;
  memoryUsage?: number;
  scrollPerformance?: {
    totalScrolls: number;
    averageScrollSpeed: number;
    maxScrollSpeed: number;
  };
}

export interface PerformanceMonitorContext {
  metrics: AnimationPerformanceMetrics[];
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  clearMetrics: () => void;
  getMetrics: (componentId?: string) => AnimationPerformanceMetrics[];
}