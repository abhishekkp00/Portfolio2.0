"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [phase, setPhase] = useState("closed");
  const [typingStep, setTypingStep] = useState(0);

  const handleOpen = () => {
    setIsProfileOpen(true);
    setPhase("popup");
    setTypingStep(0);
    setTimeout(() => {
      setPhase("typing");
    }, 850);
  };

  const handleClose = () => {
    setPhase("popup");
    setTimeout(() => {
      setIsProfileOpen(false);
    }, 450);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const handleScroll = () => {
      // Background blur toggle on scroll
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.href.replace("#", ""));
        return {
          id: item.href.replace("#", ""),
          offset: el ? el.offsetTop - 100 : 0,
          height: el ? el.offsetHeight : 0,
        };
      });

      const scrollPos = window.scrollY;
      const currentSection = sections.find(
        (sec) => scrollPos >= sec.offset && scrollPos < sec.offset + sec.height
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (scrollPos < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "border-border glass shadow-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleOpen}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border border-border/80 overflow-hidden flex items-center justify-center bg-muted/20 transition-transform duration-300 group-hover:scale-110 shadow-sm relative">
            <img
              src="/avatar.jpg"
              alt="AP"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-mono text-sm font-semibold tracking-wide text-foreground hover:text-muted-foreground transition-colors duration-200">
            {portfolioConfig.profile.name.toLowerCase().replace(/\s+/g, ".")}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-md bg-secondary -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Utilities: Theme Toggle & Mobile Menu button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-border/80 bg-card/50 text-foreground hover:bg-accent transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-border/80 bg-card/50 text-foreground hover:bg-accent transition-all duration-200 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden w-full border-t border-border bg-background glass-light dark:bg-background/95 flex flex-col px-6 py-4 gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 py-3 px-4 rounded-lg font-mono text-sm transition-colors duration-200",
                    isActive
                      ? "bg-secondary text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                  )}
                >
                  <Terminal className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Popup Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              layout
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass max-w-xl w-full mx-4 rounded-3xl border border-border/60 p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 shadow-2xl overflow-hidden cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-border/40 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close Profile"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Avatar Photo */}
              <motion.div
                layout
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] overflow-hidden flex-shrink-0 bg-muted/20 relative"
              >
                <img
                  src="/avatar.jpg"
                  alt="Abhishek Prajapati"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Typewriter terminal content */}
              {phase === "typing" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-grow flex flex-col gap-4 text-center md:text-left w-full"
                >
                  <div className="font-mono text-xs md:text-sm text-muted-foreground flex flex-col gap-2.5 bg-black/40 p-5 rounded-xl border border-border/40 w-full text-left">
                    <div>
                      <span className="text-emerald-500 font-bold">&gt; </span>
                      <span className="text-foreground font-semibold">name:</span>{" "}
                      <Typewriter text="Abhishek Kr Prajapati" delay={25} onComplete={() => setTypingStep(1)} />
                    </div>
                    {typingStep >= 1 && (
                      <div>
                        <span className="text-emerald-500 font-bold">&gt; </span>
                        <span className="text-foreground font-semibold">channel:</span>{" "}
                        <Typewriter text="@abhi.iterates (Instagram)" delay={20} onComplete={() => setTypingStep(2)} />
                      </div>
                    )}
                    {typingStep >= 2 && (
                      <div>
                        <span className="text-emerald-500 font-bold">&gt; </span>
                        <span className="text-foreground font-semibold">mentoring:</span>{" "}
                        <Typewriter text="1000+ engineering students" delay={20} onComplete={() => setTypingStep(3)} />
                      </div>
                    )}
                    {typingStep >= 3 && (
                      <div>
                        <span className="text-emerald-500 font-bold">&gt; </span>
                        <span className="text-foreground font-semibold">notes:</span>{" "}
                        <Typewriter text="Placement roadmaps & dev contents" delay={20} onComplete={() => setTypingStep(4)} />
                      </div>
                    )}
                    {typingStep >= 4 && (
                      <div className="text-foreground/90 font-semibold mt-1">
                        <span className="text-emerald-500 font-bold">&gt; </span>
                        <span className="text-indigo-400">learn | build | iterate</span>
                        <span className="animate-pulse duration-700 ml-1">▋</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Typewriter({
  text,
  delay = 25,
  onComplete,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
  }, [currentIndex, text, delay]);

  return <span>{currentText}</span>;
}
