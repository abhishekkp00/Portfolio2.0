"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for the outer ring trailing effect (smooth lag)
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 28, mass: 0.5 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Global event listener to detect hovered items (links, buttons, interactive targets)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".glass") !== null;

      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window === "undefined" || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-zinc-400/40 dark:border-zinc-500/40 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.6 : 1,
          backgroundColor: hovered
            ? "rgba(161, 161, 170, 0.05)"
            : "rgba(161, 161, 170, 0)",
          borderColor: hovered ? "var(--ring)" : "rgba(161, 161, 170, 0.4)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? "var(--ring)" : "rgba(161, 161, 170, 0.8)",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      />
    </>
  );
}
