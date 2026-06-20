"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import { ArrowRight, Terminal, FileText, MapPin } from "lucide-react";

export default function Hero() {
  const { name, title, subTitle, bio, location, socials, resumeUrl } = portfolioConfig.profile;

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
      {/* Background Decorative Blur Gradients */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-zinc-400 dark:bg-zinc-800 blur-[80px] md:blur-[120px] -translate-x-12 -translate-y-12"></div>
        <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-zinc-300 dark:bg-zinc-900 blur-[60px] md:blur-[100px] translate-x-12 translate-y-12"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl flex flex-col gap-6 md:gap-8 text-center md:text-left"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex self-center md:self-start">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground">
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
            Hi, I&apos;m <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">{name}</span>
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-mono font-medium text-muted-foreground leading-relaxed"
          >
            {title}
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
          <a
            href="#playground"
            className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 text-xs font-mono font-semibold text-primary-foreground hover:opacity-90 transition-all duration-200"
          >
            <Terminal className="w-4 h-4" />
            Launch Dev Shell
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <a
            href="#projects"
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-card/50 hover:bg-accent px-6 text-xs font-mono font-semibold transition-all duration-200"
          >
            Explore Projects
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-card/50 hover:bg-accent px-6 text-xs font-mono font-semibold transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
