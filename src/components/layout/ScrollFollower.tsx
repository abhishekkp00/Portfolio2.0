"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

const MONKEY_QUOTES = [
  "Whatcha reading there?",
  "Ooh ooh! Spring Boot or Next.js?",
  "Looks like clean code to me!",
  "Can I help you review this?",
  "Is that a recursive function?",
  "Ooh ooh aah aah! Space optimization!",
  "Are we building a startup today?",
  "Don't forget to commit your changes!",
  "Nice stack you got here.",
];

export default function ScrollFollower() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Convert scroll progress to a percentage style string
  const heightPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const topPercent = useTransform(smoothProgress, [0, 1], ["0%", "calc(100% - 16px)"]);

  const [showMonkey, setShowMonkey] = useState(false);
  const [monkeyQuote, setMonkeyQuote] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Eye movement tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [eyeOffsets, setEyeOffsets] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  const monkeyRef = useRef<HTMLDivElement>(null);

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      // Pick a random quote
      const randomQuote = MONKEY_QUOTES[Math.floor(Math.random() * MONKEY_QUOTES.length)];
      setMonkeyQuote(randomQuote);
      setShowMonkey(true);
    }, 5000);
  }, []);

  const resetIdleTimer = useCallback(() => {
    setShowMonkey(false);
    setShowBubble(false);
    startIdleTimer();
  }, [startIdleTimer]);

  useEffect(() => {
    // Start initial idle timer on mount
    startIdleTimer();

    const handleInteraction = () => {
      resetIdleTimer();
    };

    const handleMouseMove = (e: MouseEvent) => {
      resetIdleTimer();
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, [startIdleTimer, resetIdleTimer]);

  // Show dialog bubble shortly after monkey peeks
  useEffect(() => {
    if (showMonkey) {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Defer state update to next tick to avoid eslint set-state-in-effect warning
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [showMonkey]);

  // Calculate eye look direction relative to mouse position inside an effect to avoid ref render warnings
  useEffect(() => {
    if (!monkeyRef.current || !showMonkey) return;
    const rect = monkeyRef.current.getBoundingClientRect();
    const monkeyX = rect.left + rect.width / 2;
    const monkeyY = rect.top + rect.height / 2;

    const maxDist = 3; // Max pixels pupils can travel

    const angleLeft = Math.atan2(mousePos.y - monkeyY, mousePos.x - monkeyX);
    const leftX = Math.cos(angleLeft) * maxDist;
    const leftY = Math.sin(angleLeft) * maxDist;

    const angleRight = Math.atan2(mousePos.y - monkeyY, mousePos.x - monkeyX);
    const rightX = Math.cos(angleRight) * maxDist;
    const rightY = Math.sin(angleRight) * maxDist;

    setEyeOffsets({
      left: { x: leftX, y: leftY },
      right: { x: rightX, y: rightY },
    });
  }, [mousePos, showMonkey]);

  return (
    <>
      {/* Sleek Vertical Scroll Follower (Left Border) */}
      <div className="fixed left-6 top-1/4 bottom-1/4 w-[2px] bg-zinc-200/40 dark:bg-zinc-800/40 hidden md:block z-40 rounded-full">
        {/* Fill Indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-zinc-400 dark:bg-zinc-600 rounded-full origin-top"
          style={{ height: heightPercent }}
        />

        {/* Floating Follower Orb */}
        <motion.div
          className="absolute -left-[7px] w-4 h-4 rounded-full border-2 border-zinc-400 dark:border-zinc-500 bg-background shadow-md flex items-center justify-center group cursor-pointer"
          style={{ top: topPercent }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors" />
        </motion.div>
      </div>

      {/* Monkey Peeker Wrapper */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <AnimatePresence>
          {showMonkey && (
            <motion.div
              ref={monkeyRef}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative flex items-center pointer-events-auto"
            >
              {/* Custom SVG Monkey Head Peeking out */}
              <div className="w-16 h-20 bg-transparent flex items-center justify-start overflow-visible">
                <svg
                  viewBox="0 0 80 100"
                  className="w-16 h-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-[#5c3e35]"
                  fill="currentColor"
                >
                  {/* Left Ear */}
                  <circle cx="20" cy="50" r="12" fill="#5c3e35" />
                  <circle cx="20" cy="50" r="7" fill="#d2a28c" />

                  {/* Head Outer */}
                  <path
                    d="M 15,50 A 25,25 0 0,1 65,50 L 65,70 A 25,25 0 0,1 15,70 Z"
                    fill="#5c3e35"
                  />

                  {/* Lighter Face Mask (Heart-like top) */}
                  <path
                    d="M 23,46 C 23,38 38,36 40,46 C 42,36 57,38 57,46 C 57,60 55,68 40,72 C 25,68 23,60 23,46 Z"
                    fill="#d2a28c"
                  />

                  {/* Left Eye White */}
                  <circle cx="33" cy="48" r="6" fill="#ffffff" />
                  {/* Left Pupil */}
                  <motion.circle
                    cx={33 + eyeOffsets.left.x}
                    cy={48 + eyeOffsets.left.y}
                    r="3.5"
                    fill="#18181b"
                  />

                  {/* Right Eye White */}
                  <circle cx="47" cy="48" r="6" fill="#ffffff" />
                  {/* Right Pupil */}
                  <motion.circle
                    cx={47 + eyeOffsets.right.x}
                    cy={48 + eyeOffsets.right.y}
                    r="3.5"
                    fill="#18181b"
                  />

                  {/* Nose */}
                  <path
                    d="M 38,55 Q 40,53 42,55 Q 40,58 38,55"
                    fill="#402a24"
                  />

                  {/* Little Smile */}
                  <path
                    d="M 36,62 Q 40,65 44,62"
                    fill="none"
                    stroke="#402a24"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Peeking Hand */}
                  <rect x="10" y="68" width="12" height="10" rx="6" fill="#5c3e35" />
                  <rect x="8" y="70" width="12" height="10" rx="6" fill="#5c3e35" />
                </svg>
              </div>

              {/* Dynamic Speech Bubble */}
              <AnimatePresence>
                {showBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    className="ml-2 glass px-4 py-2.5 rounded-xl border border-border/80 text-xs font-mono text-foreground shadow-md max-w-[200px] leading-relaxed relative select-none"
                  >
                    {/* Bubble tail */}
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-background border-l border-b border-border/80 rotate-45 dark:bg-[#09090b] pointer-events-none" />
                    <span className="relative z-10">{monkeyQuote}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
