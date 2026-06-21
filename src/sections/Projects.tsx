"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Github, ExternalLink, Folder, Star, GitFork } from "lucide-react";

import TiltCard from "@/components/layout/TiltCard";

interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  topics?: string[];
}

interface MergedProject {
  repoName: string;
  title: string;
  description: string;
  githubUrl: string;
  liveDemoUrl?: string;
  stars: number;
  forks: number;
  techStack: string[];
  highlights: string[];
  featured: boolean;
}

export default function Projects() {
  const { username, projectOverrides, allowedRepos } = portfolioConfig.github;
  const [projects, setProjects] = useState<MergedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error("GitHub API request failed");
        }
        const data: RepoData[] = await response.json();

        // Map and merge with overrides
        const merged = data
          .filter((repo) => {
            // Only include repos in allowedRepos
            return allowedRepos.includes(repo.name);
          })
          .map((repo) => {
            const override = projectOverrides.find((o) => o.repoName === repo.name);
            return {
              repoName: repo.name,
              title: override?.customTitle || repo.name,
              description: override?.customDescription || repo.description || "",
              githubUrl: repo.html_url,
              liveDemoUrl: override?.liveDemoUrl,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              techStack: override?.techStackOverride || (repo.language ? [repo.language] : []),
              highlights: override?.highlights || [],
              featured: override?.featured || false,
            };
          });

        // Sort by featured first, then by stars
        merged.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.stars - a.stars;
        });

        setProjects(merged);
        setError(false);
      } catch (err) {
        console.warn("Failed to fetch from GitHub API, falling back to local config overrides:", err);
        setError(true);

        // Fallback: Generate list purely from local config overrides
        const fallbackList = projectOverrides.map((override) => ({
          repoName: override.repoName,
          title: override.customTitle || override.repoName,
          description: override.customDescription || "",
          githubUrl: `https://github.com/${username}/${override.repoName}`,
          liveDemoUrl: override.liveDemoUrl,
          stars: 0,
          forks: 0,
          techStack: override.techStackOverride || [],
          highlights: override.highlights,
          featured: override.featured,
        }));

        setProjects(fallbackList);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username, projectOverrides, allowedRepos]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  } as const;

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 border-t border-border/40 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 flex items-center justify-between opacity-15 pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-zinc-600 blur-[130px] -translate-x-24"></div>
        <div className="w-[350px] h-[350px] rounded-full bg-zinc-500 blur-[150px] translate-x-24"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            03 / Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-foreground/20 rounded mt-1 self-center md:self-start"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin dark:border-zinc-800 dark:border-t-zinc-200"></div>
            <span className="text-xs font-mono text-muted-foreground animate-pulse">
              Syncing with GitHub API...
            </span>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <motion.div key={project.repoName} variants={itemVariants} className="w-full h-full">
                <TiltCard className="w-full h-full">
                  <div className="group relative flex flex-col justify-between glass p-6 md:p-8 rounded-2xl border border-border/40 hover:border-border/80 shadow-md h-full transition-all duration-300 overflow-hidden">
                {/* Visual glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/5 to-zinc-300/0 dark:from-zinc-800/10 dark:to-zinc-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="flex flex-col gap-5 relative z-10">
                  {/* Top bar with folder icon & external links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-foreground transition-colors duration-200" />
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        title="View GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-foreground/95 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="flex flex-col gap-1.5 border-t border-border/40 pt-4">
                      {project.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2 text-xs text-muted-foreground leading-normal"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom tech tag pills & counts */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40 relative z-10">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono border border-border/60 bg-muted/40 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Star/Fork counters from GitHub API (only if dynamic fetch succeeded) */}
                  {!error && (project.stars > 0 || project.forks > 0) && (
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                      {project.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {project.stars}
                        </span>
                      )}
                      {project.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          {project.forks}
                        </span>
                      )}
                    </div>
                  )}
                  </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
