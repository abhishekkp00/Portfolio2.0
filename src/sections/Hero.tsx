"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import { ArrowRight, Terminal, FileText, MapPin } from "lucide-react";

export default function Hero() {
  const { name, title, bio, location, resumeUrl } = portfolioConfig.profile;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl flex flex-col gap-6 md:gap-8 text-center md:text-left relative z-10"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex self-center md:self-start">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-xs font-mono text-muted-foreground shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>{location}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </motion.div>

        {/* Name and Titles */}
        <div className="flex flex-col gap-3 md:gap-4">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block bg-gradient-to-r from-foreground via-zinc-400 to-foreground bg-clip-text text-transparent group cursor-default">
              {name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-muted-foreground leading-relaxed flex items-center justify-center md:justify-start gap-2"
          >
            <span className="text-indigo-400 font-bold">&gt;</span> {title}
          </motion.h2>
        </div>

        {/* Subtitle / Bio summary */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground font-sans max-w-2xl leading-relaxed"
        >
          {bio}
        </motion.p>

        {/* Buttons and Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
        >
          {/* Glowing Primary CTA */}
          <div className="relative group w-full sm:w-auto">
            <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-60 blur-[3px] group-hover:opacity-100 group-hover:blur-[6px] transition-all duration-300" />
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#playground"
              className="relative flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black text-xs font-mono font-semibold text-white px-6 transition-all duration-200 border border-zinc-800"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Launch Dev Shell
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </div>

          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border/80 bg-card/60 backdrop-blur-sm hover:bg-accent/80 px-6 text-xs font-mono font-semibold transition-all duration-200"
          >
            Explore Projects
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border/80 bg-card/60 backdrop-blur-sm hover:bg-accent/80 px-6 text-xs font-mono font-semibold transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-zinc-500" />
            Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
