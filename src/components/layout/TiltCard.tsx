"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export default function TiltCard({ children, className = "", maxRotation = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse relative position within card
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth out coordinate changes using spring
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  // Map coordinates to degrees of rotation based on maxRotation prop
  const rotateX = useTransform(springY, [0, 1], [maxRotation, -maxRotation]);
  const rotateY = useTransform(springX, [0, 1], [-maxRotation, maxRotation]);

  // Map coordinates to percentage for gradient spotlight coordinates
  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between 0 and 1
    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateX,
        rotateY: rotateY,
        perspective: 1000,
      }}
    >
      {/* Glow Effect / Glare Reflection Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle 250px at ${glowX} ${glowY}, var(--primary-foreground, rgba(255, 255, 255, 0.4)), transparent)`,
        }}
      />

      {/* Underlay glow gradient border effect on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-600"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Render children inside wrapper */}
      <div style={{ transform: "translateZ(10px)" }}>{children}</div>
    </motion.div>
  );
}
