"use client";

import { useEffect, useState } from "react";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Github, Linkedin, Mail, Clock, ArrowUp } from "lucide-react";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata timezone
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTimeStr(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { socials } = portfolioConfig.profile;

  return (
    <footer className="w-full border-t border-border/80 bg-card/10 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-sm font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} {portfolioConfig.profile.name}.
          </span>
          <p className="text-xs text-muted-foreground font-mono">
            Handcrafted in Bengaluru, India.
          </p>
        </div>

        {/* Middle: Live Time */}
        {timeStr && (
          <div className="flex items-center gap-2 border border-border/60 bg-card/30 px-3 py-1.5 rounded-full font-mono text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Bengaluru Time:</span>
            <span className="font-bold text-foreground tabular-nums">{timeStr} IST</span>
          </div>
        )}

        {/* Right: Socials & Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
