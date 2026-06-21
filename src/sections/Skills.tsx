"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import {
  Coffee,
  Database,
  Zap,
  Box,
  Cpu,
  TrendingUp,
  Table,
  BarChart,
  Code2,
  Layers,
  Wind,
  GitBranch,
  Activity,
  Terminal,
} from "lucide-react";

import TiltCard from "@/components/layout/TiltCard";

interface SkillIconProps {
  iconName: string;
  className?: string;
}

function SkillIcon({ iconName, className = "w-5 h-5" }: SkillIconProps) {
  // Custom brand SVGs for icons not present or limited in Lucide
  if (iconName === "react") {
    return (
      <svg
        viewBox="-11.5 -10.23174 23 20.46348"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (iconName === "python") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12.002 2c-5.522 0-5.002 2.39-5.002 4.98h5.002v1.02H5.002C2.39 8 .002 8.522.002 14.044c0 5.522 2.388 4.956 4.998 4.956h1.002v-2.002c0-2.207 1.794-4 4.002-4h5.002c2.207 0 4-1.793 4-4V4c0-2.207-1.793-4-4-4H12.002z" opacity="0.8"/>
        <path d="M11.998 22c5.522 0 5.002-2.39 5.002-4.98h-5.002v-1.02h7.002C21.61 16 23.998 15.478 23.998 9.956c0-5.522-2.388-4.956-4.998-4.956h-1.002v2.002c0 2.207-1.794 4-4.002 4H8.994c-2.207 0-4 1.793-4 4v5c0 2.207 1.793 4 4 4h7.004z" />
      </svg>
    );
  }

  if (iconName === "node") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" />
        <path d="M12 6.5L6.5 9.7v4.6l5.5 3.2 5.5-3.2V9.7L12 6.5z" />
      </svg>
    );
  }

  // Lucide icon mapping
  switch (iconName) {
    case "coffee":
      return <Coffee className={className} />;
    case "database":
      return <Database className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "box":
      return <Box className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "table":
      return <Table className={className} />;
    case "bar-chart-2":
      return <BarChart className={className} />;
    case "code-2":
      return <Code2 className={className} />;
    case "layers":
      return <Layers className={className} />;
    case "wind":
      return <Wind className={className} />;
    case "git-branch":
      return <GitBranch className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "terminal":
      return <Terminal className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

export default function Skills() {
  const { skills } = portfolioConfig;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 border-t border-border/40 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-zinc-400 dark:bg-zinc-800 blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            02 / Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Technical Stack
          </h2>
          <div className="h-1 w-20 bg-foreground/20 rounded mt-1 self-center md:self-start"></div>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((category, catIdx) => (
            <motion.div key={catIdx} variants={itemVariants} className="w-full h-full">
              <TiltCard className="w-full h-full">
                <div className="glass p-8 rounded-2xl border border-border/60 group-hover:border-transparent transition-all duration-300 shadow-lg flex flex-col gap-6 h-full">
                  <h3 className="text-lg font-bold font-mono tracking-tight text-foreground border-b border-border/40 pb-3 flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400">0{catIdx + 1}.</span>
                    {category.category}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {category.items.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-3 p-3.5 rounded-xl border border-border/30 hover:border-border/80 bg-muted/10 hover:bg-muted/30 transition-all duration-200 cursor-default select-none shadow-sm hover:shadow-md"
                      >
                        <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                          <SkillIcon iconName={skill.iconName} className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
