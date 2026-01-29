"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className,
  intensity = 15,
  speed = 1000,
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;
      setPosition({ x: xPct, y: yPct });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const x = useSpring(position.x, { stiffness: 150, damping: 15 });
  const y = useSpring(position.y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(y, [-1, 1], [intensity, -intensity]);
  const rotateY = useTransform(x, [-1, 1], [-intensity, intensity]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn(
        "relative transition-all duration-200 ease-out will-change-transform pointer-events-none",
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d"
        }}
        className="h-full w-full pointer-events-auto"
      >
        {children}
      </div>
    </motion.div>
  );
}
