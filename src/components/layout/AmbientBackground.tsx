"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full overflow-hidden bg-background transition-colors duration-500"
      style={{
        // Initialize coordinates to prevent flashing at 0,0
        ["--mouse-x" as any]: "50vw",
        ["--mouse-y" as any]: "50vh",
      }}
    >
      {/* Dynamic Mouse Glow Layer */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 opacity-60 dark:opacity-80"
        style={{
          background: `
            radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y),
              var(--ambient-glow-color-1, rgba(99, 102, 241, 0.08)) 0%,
              var(--ambient-glow-color-2, rgba(168, 85, 247, 0.04)) 50%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 95%)",
        }}
      />

      {/* Ambient static corner blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/3 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/3 pointer-events-none" />
    </div>
  );
}
