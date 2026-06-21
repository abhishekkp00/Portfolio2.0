"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Mail, Linkedin, Github, Send, CheckCircle2, Clock } from "lucide-react";
import TiltCard from "@/components/layout/TiltCard";

export default function Contact() {
  const { email, github, linkedin } = portfolioConfig.profile.socials;
  const { timezone, location } = portfolioConfig.profile;

  const [currentTime, setCurrentTime] = useState("");
  const [isAwake, setIsAwake] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Dynamic Clock
  useEffect(() => {
    function updateClock() {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const timeStr = formatter.format(new Date());
      setCurrentTime(timeStr);

      // Determine if awake (between 7:00 and 23:00)
      const hour = parseInt(timeStr.split(":")[0], 10);
      setIsAwake(hour >= 7 && hour < 23);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !formEmail || !message) return;

    setStatus("sending");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setName("");
      setFormEmail("");
      setMessage("");
    }, 2000);
  };

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
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  } as const;

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 border-t border-border/40 overflow-hidden"
    >
      {/* Background Blurs */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[450px] h-[450px] rounded-full bg-zinc-500 blur-[150px]"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            05 / Connection
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-foreground/20 rounded mt-1 self-center md:self-start"></div>
        </div>

        {/* Contact Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Info, Clock, Socials */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div variants={itemVariants} className="w-full">
              <TiltCard maxRotation={4}>
                <div className="glass p-6 md:p-8 rounded-2xl border border-border/60 group-hover:border-transparent transition-all duration-300 shadow-lg flex flex-col gap-6">
                  <h3 className="text-lg font-bold font-mono tracking-tight flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    Local Coordinates
                  </h3>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase">Current Time ({location.split(",")[0]})</span>
                    <div className="text-3xl font-extrabold font-mono tracking-tight text-foreground">
                      {currentTime || "00:00:00"}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-muted-foreground border-t border-border/40 pt-4 flex items-center justify-between">
                    <span>Status:</span>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isAwake ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                      {isAwake ? "Awake & Building" : "Offline / Sleeping"}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Quick Contact & Social Cards */}
            <div className="flex flex-col gap-4">
              <motion.div variants={itemVariants} className="w-full">
                <TiltCard maxRotation={5}>
                  <a
                    href={`mailto:${email}`}
                    className="glass p-5 rounded-xl border border-border/40 group-hover:border-transparent flex items-center gap-4 transition-all duration-300 w-full"
                  >
                    <div className="p-2.5 rounded-lg bg-muted/40 text-muted-foreground group-hover:text-foreground group-hover:bg-muted/80 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-muted-foreground uppercase">Direct Mail</span>
                      <span className="text-sm font-semibold">{email}</span>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="w-full">
                  <TiltCard maxRotation={6}>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-5 rounded-xl border border-border/40 group-hover:border-transparent flex flex-col gap-3 transition-all duration-300 w-full"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-muted-foreground">LinkedIn</span>
                        <span className="text-[10px] font-mono text-zinc-400 mt-1 truncate">Connect</span>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                  <TiltCard maxRotation={6}>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass p-5 rounded-xl border border-border/40 group-hover:border-transparent flex flex-col gap-3 transition-all duration-300 w-full"
                    >
                      <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-muted-foreground">GitHub</span>
                        <span className="text-[10px] font-mono text-zinc-400 mt-1 truncate">Follow</span>
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="w-full">
              <TiltCard maxRotation={2}>
                <div className="glass p-6 md:p-8 rounded-2xl border border-border/60 group-hover:border-transparent transition-all duration-300 shadow-lg w-full">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    <h3 className="text-2xl font-bold tracking-tight">Transmission Complete</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Your message was successfully routed. I will reply shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-2 rounded-lg border border-border bg-card hover:bg-accent text-xs font-mono font-semibold transition-colors duration-200"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-mono text-muted-foreground uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        disabled={status === "sending"}
                        className="w-full h-11 px-4 rounded-lg border border-border/60 bg-muted/10 hover:border-border focus:border-foreground focus:ring-1 focus:ring-ring outline-none transition-all duration-200 text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="john@example.com"
                        disabled={status === "sending"}
                        className="w-full h-11 px-4 rounded-lg border border-border/60 bg-muted/10 hover:border-border focus:border-foreground focus:ring-1 focus:ring-ring outline-none transition-all duration-200 text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-mono text-muted-foreground uppercase">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your project, question, or proposition..."
                        disabled={status === "sending"}
                        className="w-full p-4 rounded-lg border border-border/60 bg-muted/10 hover:border-border focus:border-foreground focus:ring-1 focus:ring-ring outline-none transition-all duration-200 text-sm font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending" || !name || !formEmail || !message}
                      className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-xs font-mono font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all duration-200"
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                          Routing message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Transmission
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
