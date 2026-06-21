export interface ProjectOverride {
  repoName: string;
  featured: boolean;
  order: number;
  customTitle?: string;
  customDescription?: string;
  liveDemoUrl?: string;
  highlights: string[];
  techStackOverride?: string[];
}

export interface PortfolioConfig {
  profile: {
    name: string;
    title: string;
    subTitle: string;
    bio: string;
    location: string;
    timezone: string;
    socials: {
      github: string;
      linkedin: string;
      email: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
    };
    resumeUrl: string;
  };
  skills: {
    category: string;
    items: { name: string; iconName: string; level?: string }[];
  }[];
  timeline: {
    year: string;
    role: string;
    company: string;
    description: string;
    highlights: string[];
  }[];
  github: {
    username: string;
    allowedRepos: string[]; // Explicitly allow/pin these repos
    hiddenRepos: string[];  // Hide these from the dynamic feed
    projectOverrides: ProjectOverride[];
  };
  terminal: {
    welcomeMessage: string[];
    promptUser: string;
    promptHost: string;
    easterEggs: { trigger: string; response: string }[];
  };
}

export const portfolioConfig: PortfolioConfig = {
  profile: {
    name: "Abhishek Kr Prajapati",
    title: "CSE(Data Science) Undergraduate",
    subTitle: "Developer & Mentor (@abhi.iterates)",
    bio: "I am a developer and educational content creator based in Bengaluru, India. I specialize in backend systems, distributed network architectures, and machine learning pipelines. Through my platform, abhi.iterates (Instagram), I mentor engineering students, share placement roadmaps, and distribute structured study notes to accelerate placement preparation.",
    location: "Bengaluru, Karnataka, India",
    timezone: "Asia/Kolkata",
    socials: {
      github: "https://github.com/abhishekkp00",
      linkedin: "https://linkedin.com/in/abhishekkp00",
      email: "abhishekforcollege@gmail.com",
      instagram: "https://instagram.com/abhi.iterates",
      youtube: "https://youtube.com/@abhi.iterates",
    },
    resumeUrl: "/resume.pdf",
  },
  skills: [
    {
      category: "Backend & Systems",
      items: [
        { name: "Java / Spring Boot", iconName: "coffee" },
        { name: "Python / FastAPI", iconName: "python" },
        { name: "Node.js / Express", iconName: "node" },
        { name: "PostgreSQL / MySQL", iconName: "database" },
        { name: "Redis", iconName: "zap" },
        { name: "Docker", iconName: "box" },
      ],
    },
    {
      category: "Machine Learning & Data",
      items: [
        { name: "PyTorch", iconName: "cpu" },
        { name: "Scikit-Learn", iconName: "trending-up" },
        { name: "NumPy / Pandas", iconName: "table" },
        { name: "Data Analysis", iconName: "bar-chart-2" },
      ],
    },
    {
      category: "Frontend & UI",
      items: [
        { name: "React / Next.js", iconName: "react" },
        { name: "TypeScript", iconName: "code-2" },
        { name: "Tailwind CSS", iconName: "layers" },
        { name: "Framer Motion", iconName: "wind" },
      ],
    },
    {
      category: "Tools & Testing",
      items: [
        { name: "Git & CI/CD", iconName: "git-branch" },
        { name: "Network Testing", iconName: "activity" },
        { name: "Linux / Bash", iconName: "terminal" },
      ],
    },
  ],
  timeline: [
    {
      year: "2026- Present",
      role: "Technical Content Creator",
      company: "abhi.iterates (Instagram)",
      description: "Produce technical educational content, design interactive roadmaps, and publish comprehensive systems engineering guides.",
      highlights: [
        "Create conceptual backend architectures and coding tutorials for 100+ followers.",
        "Design and distribute comprehensive DSA and Full-Stack preparation cheat sheets.",
        "Build open-source projects to showcase practical learning guides for student placement prep.",
      ],
    }
  ],
  github: {
    username: "abhishekkp00",
    allowedRepos: ["Wifi-Monitor", "Abhi.iterates-OS", "AbhiKharidoo-Ecommerce", "Image-editor"],
    hiddenRepos: [],
    projectOverrides: [
      {
        repoName: "wifi-monitor",
        featured: true,
        order: 1,
        customTitle: "Distributed Wi-Fi Monitor",
        customDescription: "A production-grade network diagnostic suite featuring live telemetry dashboard, active network diagnostics, and automated test triggers.",
        liveDemoUrl: "https://wifi-monitor-demo.vercel.app",
        highlights: [
          "React frontend with Tailwind CSS and Next.js optimization",
          "Secure Spring Boot JWT Auth & JPA-based test profiles",
          "Automated ping/speed tests and custom system service integrations",
        ],
      },
      {
        repoName: "whatsapp-analyzer",
        featured: true,
        order: 2,
        customTitle: "WhatsApp Chat Analyzer",
        customDescription: "An end-to-end analytical dashboard parsing chat exports to yield conversational cadence, sentiment tracking, word clouds, and key activity heatmaps.",
        liveDemoUrl: "",
        highlights: [
          "Python parser running under 3 seconds for 10k+ messages",
          "Interactive statistics and visual charts with high performance",
          "Data privacy guaranteed by local, offline preprocessing pipelines",
        ],
      },
    ],
  },
  terminal: {
    welcomeMessage: [
      "==================================================",
      "   Welcome to Abhishek's Interactive Shell v1.0   ",
      "==================================================",
      "Type 'help' to see available commands.",
      "Type 'projects' or 'neofetch' to learn more.",
      "",
    ],
    promptUser: "guest",
    promptHost: "abhishek-os",
    easterEggs: [
      { trigger: "sudo", response: "Nice try, but you do not have root access here." },
      { trigger: "coffee", response: "☕ Hot coffee served! Fueling backend computations..." },
      { trigger: "secret", response: "Easter Egg Found! Try typing 'matrix' for a visual override." },
    ],
  },
};
