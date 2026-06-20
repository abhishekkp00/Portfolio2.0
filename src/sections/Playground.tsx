"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/data/portfolioConfig";
import { Terminal, Maximize2, Minimize2, RefreshCw } from "lucide-react";
import { useTheme } from "next-themes";

interface HistoryItem {
  type: "input" | "output";
  text: string | string[];
}

export default function Playground() {
  const { welcomeMessage, promptUser, promptHost, easterEggs } = portfolioConfig.terminal;
  const { name, title, location, socials } = portfolioConfig.profile;
  const { theme, setTheme } = useTheme();

  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus terminal input
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, []);

  // Scroll to bottom on history change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Handle command execution
  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();

    // Save to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory: HistoryItem[] = [
      ...history,
      { type: "input", text: `${promptUser}@${promptHost}:~$ ${trimmed}` },
    ];

    let outputText: string | string[] = "";

    // Check easter eggs first
    const egg = easterEggs.find((e) => e.trigger === command);
    if (egg) {
      outputText = egg.response;
    } else {
      switch (command) {
        case "help":
          outputText = [
            "Available commands:",
            "  about      - Display brief bio / details",
            "  skills     - List capabilities & stack",
            "  projects   - Show override projects & links",
            "  neofetch   - Display system configuration banner",
            "  theme      - Toggle theme between dark/light",
            "  contact    - Print social networks & email",
            "  clear      - Clear the screen buffer",
            "  matrix     - Toggle green matrix code override",
            "  exit       - Reset the dev shell console",
          ];
          break;

        case "about":
          outputText = [
            `Name: ${name}`,
            `Title: ${title}`,
            `Location: ${location}`,
            "",
            "I design, architect and implement complex distributed systems, backend services,",
            "ML preprocessing steps and creative web applications. Reach out for collaboration!",
          ];
          break;

        case "skills":
          outputText = portfolioConfig.skills.flatMap((cat) => [
            `[${cat.category}]`,
            ...cat.items.map((item) => `  - ${item.name}`),
            "",
          ]);
          break;

        case "projects":
          outputText = portfolioConfig.github.projectOverrides.flatMap((proj) => [
            `Project: ${proj.customTitle || proj.repoName}`,
            `  Description: ${proj.customDescription}`,
            `  URL: ${proj.liveDemoUrl || "No live demo URL"}`,
            `  Highlights:`,
            ...proj.highlights.map((h) => `    * ${h}`),
            "",
          ]);
          break;

        case "neofetch":
          outputText = [
            "         .---.        " + `   OS: ${name}-OS v1.0.0`,
            "        /     \\       " + `   Host: x86_64 Localhost`,
            "        \\     /       " + `   Kernel: Dev-Shell-v16`,
            "         `---'        " + `   Shell: Node/BASH Client`,
            "      .---------.     " + `   Resolution: 1920x1080`,
            "     /           \\    " + `   WM: NextTheme`,
            "    |             |   " + `   Terminal: Retro-Terminal-v1`,
            "     \\           /    " + `   Active Dev: TypeScript & Spring Boot`,
            "      `---------'     " + `   Location: ${location}`,
          ];
          break;

        case "theme":
          const nextTheme = theme === "dark" ? "light" : "dark";
          setTheme(nextTheme);
          outputText = `System theme updated to: ${nextTheme.toUpperCase()}`;
          break;

        case "contact":
          outputText = [
            "Contact & Socials:",
            `  Email:    ${socials.email}`,
            `  GitHub:   ${socials.github}`,
            `  LinkedIn: ${socials.linkedin}`,
            socials.twitter ? `  Twitter:  ${socials.twitter}` : "",
          ].filter(Boolean);
          break;

        case "clear":
          setHistory([]);
          setInput("");
          return;

        case "matrix":
          setIsMatrixActive((prev) => !prev);
          outputText = isMatrixActive
            ? "Matrix code rain deactivated."
            : "Matrix code rain activated! Look at the overlay...";
          break;

        case "exit":
          setHistory([{ type: "output", text: welcomeMessage }]);
          setInput("");
          setIsMatrixActive(false);
          return;

        default:
          outputText = `shell: command not found: ${command}. Type 'help' for suggestions.`;
      }
    }

    setHistory([...newHistory, { type: "output", text: outputText }]);
    setInput("");
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <section
      id="playground"
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 border-t border-border/40 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            04 / Interactive
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Developer Terminal
          </h2>
          <div className="h-1 w-20 bg-foreground/20 rounded mt-1 self-center md:self-start"></div>
        </div>

        {/* Terminal Window Container */}
        <div
          ref={containerRef}
          onClick={focusInput}
          className="relative w-full h-[500px] rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-800 bg-[#0c0c0e] text-[#1af13b] font-mono text-sm shadow-2xl flex flex-col cursor-text group"
        >
          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/20 opacity-30"></div>
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,_16,_16,_0)_50%,_rgba(0,_0,_0,_0.25)_50%),_linear-gradient(90deg,_rgba(255,_0,_0,_0.06),_rgba(0,_255,_0,_0.02),_rgba(0,_0,_255,_0.06))] bg-[size:100%_4px,_6px_100%]"></div>

          {/* Matrix Code Rain Simulation */}
          <AnimatePresence>
            {isMatrixActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black pointer-events-none overflow-hidden z-0"
              >
                <div className="matrix-rain-sim text-xs text-green-500 leading-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-matrix-drop"
                      style={{
                        left: `${i * 7}%`,
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: `${1.5 + ((i * 7) % 3) * 0.7}s`,
                      }}
                    >
                      {Array.from({ length: 25 }).map((_, j) => (
                        <div key={j} style={{ opacity: (25 - j) / 25 }}>
                          {String.fromCharCode(33 + ((i * 37 + j * 13) % 93))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#19191d] border-b border-zinc-800 flex-shrink-0 select-none z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              <span className="text-xs text-zinc-400 font-mono ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                abhishek@dev-shell:~$
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <Minimize2 className="w-3.5 h-3.5 hover:text-zinc-300 transition-colors" />
              <Maximize2 className="w-3.5 h-3.5 hover:text-zinc-300 transition-colors" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([{ type: "output", text: welcomeMessage }]);
                  setInput("");
                  setIsMatrixActive(false);
                }}
                title="Reset Terminal"
                className="hover:text-zinc-300 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-2 relative z-10 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {history.map((item, idx) => (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text">
                {item.type === "input" ? (
                  <span className="text-[#38bdf8]">{item.text}</span>
                ) : Array.isArray(item.text) ? (
                  item.text.map((line, lineIdx) => (
                    <div key={lineIdx} className="min-h-[1.25rem]">
                      {line}
                    </div>
                  ))
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0e0e11] border-t border-zinc-900 flex-shrink-0 relative z-10">
            <span className="text-[#38bdf8] flex-shrink-0 select-none">
              {promptUser}@{promptHost}:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#1af13b] font-mono caret-[#1af13b]"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </div>

        <p className="text-center text-xs font-mono text-muted-foreground select-none">
          Click inside the terminal to focus. Try typing <span className="text-zinc-600 dark:text-zinc-400 font-bold">help</span> or <span className="text-zinc-600 dark:text-zinc-400 font-bold">matrix</span>.
        </p>
      </div>
    </section>
  );
}
