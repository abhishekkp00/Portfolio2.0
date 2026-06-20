"use client";

import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Briefcase, Calendar, Star, Compass } from "lucide-react";

export default function About() {
  const { bio, location } = portfolioConfig.profile;
  const { timeline } = portfolioConfig;

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  const corePhilosophies = [
    {
      title: "Performance First",
      desc: "Optimizing database queries, caching, and streaming protocols for sub-second responses.",
    },
    {
      title: "Robust Security",
      desc: "Implementing secure authentication mechanisms, role-based authorization, and content protection.",
    },
    {
      title: "Memorable UX",
      desc: "Designing dynamic, responsive interfaces with clean layout, animations, and micro-interactions.",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 border-t border-border/40 overflow-hidden"
    >
      {/* Decorative Blur Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-between opacity-20 dark:opacity-10 pointer-events-none">
        <div className="w-[250px] h-[250px] rounded-full bg-zinc-500 blur-[100px] translate-y-24"></div>
        <div className="w-[300px] h-[300px] rounded-full bg-zinc-400 blur-[120px] -translate-y-24"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            01 / Profile & History
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            About & Experience
          </h2>
          <div className="h-1 w-20 bg-foreground/20 rounded mt-1 self-center md:self-start"></div>
        </div>

        {/* Main Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column: Bio & Core Philosophies */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              variants={itemVariants}
              className="glass p-8 rounded-2xl border border-border/60 shadow-xl flex flex-col gap-6"
            >
              <h3 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
                <Compass className="w-5 h-5 text-muted-foreground" />
                The Developer Mindset
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-sans">
                {bio}
              </p>
              <div className="text-xs font-mono text-muted-foreground border-t border-border/40 pt-4 flex items-center justify-between">
                <span>Location: {location}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active for Hire
                </span>
              </div>
            </motion.div>

            {/* Core Philosophies List */}
            <div className="flex flex-col gap-4">
              <motion.h4
                variants={itemVariants}
                className="text-xs font-mono text-zinc-500 uppercase tracking-wider pl-1"
              >
                Core Engineering Values
              </motion.h4>
              {corePhilosophies.map((p, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                  className="glass p-5 rounded-xl border border-border/40 hover:border-border/80 transition-colors duration-200 flex gap-4"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Star className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h5 className="font-bold text-sm font-mono">{p.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline / History */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.h3
              variants={itemVariants}
              className="text-xl font-bold font-mono tracking-tight flex items-center gap-2 mb-2 pl-2"
            >
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              Professional Timeline
            </motion.h3>

            <div className="relative border-l border-border/80 ml-4 pl-8 flex flex-col gap-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border/80 group-hover:border-foreground transition-colors duration-200">
                    <span className={`h-2 w-2 rounded-full bg-zinc-400 group-hover:bg-foreground transition-colors duration-200 ${index === 0 ? 'bg-emerald-500 group-hover:bg-emerald-500 animate-pulse' : ''}`}></span>
                  </span>

                  {/* Timeline Card */}
                  <div className="glass p-6 md:p-8 rounded-xl border border-border/40 hover:border-border/80 shadow-md group-hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <h4 className="font-bold text-lg leading-tight tracking-tight">
                          {item.role}
                        </h4>
                        <span className="text-sm font-mono text-zinc-400 mt-1">
                          {item.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/60 bg-muted/30 w-fit text-xs font-mono text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.year}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="flex flex-col gap-2 mt-2 border-t border-border/40 pt-4">
                        {item.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
