"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Sun, Moon, Terminal, Cpu, Database, Layout } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground font-mono">
        Loading System Core...
      </div>
    );
  }

  const iconMap: Record<string, React.ReactNode> = {
    coffee: <Database className="w-5 h-5" />,
    python: <Cpu className="w-5 h-5" />,
    node: <Cpu className="w-5 h-5" />,
    database: <Database className="w-5 h-5" />,
    zap: <Terminal className="w-5 h-5" />,
    box: <Layout className="w-5 h-5" />,
    react: <Layout className="w-5 h-5" />,
    "code-2": <Terminal className="w-5 h-5" />,
    layers: <Layout className="w-5 h-5" />,
    wind: <Cpu className="w-5 h-5" />,
    "git-branch": <Terminal className="w-5 h-5" />,
    activity: <Cpu className="w-5 h-5" />,
    terminal: <Terminal className="w-5 h-5" />,
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-mono font-bold text-sm">
            AP
          </div>
          <span className="font-mono text-sm font-semibold tracking-wide">
            {portfolioConfig.profile.name.toLowerCase().replace(/\s+/g, ".")}
          </span>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-all duration-200 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl px-6 py-12 md:py-20 flex flex-col gap-12">
        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-4 text-center md:text-left"
        >
          <div className="inline-flex self-center md:self-start items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Phase 1: Environment Active
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
            {portfolioConfig.profile.name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono leading-relaxed">
            {portfolioConfig.profile.title}
          </p>
        </motion.section>

        {/* Diagnostic Check Panel */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="border border-border bg-card rounded-xl p-6 glow-accent flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h3 className="font-mono text-sm font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              SYSTEM_DIAGNOSTICS.SH
            </h3>
            <span className="font-mono text-xs text-muted-foreground">STATUS: OK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-mono">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">Framework:</span>
                <span className="text-foreground">Next.js 15+ (App Router)</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">Styling:</span>
                <span className="text-foreground">Tailwind CSS v4 (CSS variables)</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-foreground">{portfolioConfig.profile.location}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">Theme Manager:</span>
                <span className="text-foreground">next-themes (Active: {theme})</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">Animation Engine:</span>
                <span className="text-foreground">Framer Motion</span>
              </div>
              <div className="flex justify-between border-b border-border/50 py-1">
                <span className="text-muted-foreground">GitHub Integration:</span>
                <span className="text-foreground">Config & API proxy structured</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Demo Animation block */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold tracking-tight">Interactive Preview Components</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioConfig.skills.flatMap(cat => cat.items.slice(0, 1)).map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-4 border border-border bg-card hover:bg-accent hover:text-accent-foreground rounded-lg flex flex-col gap-2 cursor-pointer transition-colors duration-200"
              >
                {iconMap[skill.iconName] || <Terminal className="w-5 h-5" />}
                <span className="font-mono text-xs font-semibold">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border py-8 text-center text-xs text-muted-foreground font-mono mt-auto">
        &copy; {new Date().getFullYear()} {portfolioConfig.profile.name}. All rights reserved.
      </footer>
    </div>
  );
}
