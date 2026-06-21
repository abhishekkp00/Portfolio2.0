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
    title: "CSE (Data Science) Undergraduate",
    subTitle: "Aspiring Backend & MLOps Engineer",
    bio: "I am a technical builder based in Bengaluru, India. I specialize in designing and engineering robust backend systems, distributed network architectures, machine learning pipelines, and highly interactive user interfaces. I focus on clean code, system performance, and crafting premium, production-ready software.",
    location: "Bengaluru, Karnataka, India",
    timezone: "Asia/Kolkata",
    socials: {
      github: "https://github.com/abhishekkp00",
      linkedin: "https://linkedin.com/in/abhishekkp00",
      email: "abhishekfrcollege@gmail.com", 
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
      year: "2024 - Present",
      role: "Senior Creative Developer & Full-Stack Architect",
      company: "Independent / Projects",
      description: "Architected secure digital marketplaces and network diagnostic suites. Integrated robust server side authorization, distributed worker nodes, and live network metrics.",
      highlights: [
        "Built Distributed Network Monitoring Portal handling real-time Wi-Fi diagnostic metrics.",
        "Implemented secure digital resource marketplaces using JPA entity tracking and secure byte-stream protection.",
      ],
    },
    {
      year: "2023 - 2024",
      role: "Software Engineer",
      company: "Tech Systems",
      description: "Focused on building microservices, developing ML pipelines, and integrating real-time telemetry systems.",
      highlights: [
        "Designed and maintained backend microservices using Spring Boot and FastAPI.",
        "Accelerated model inference pipelines by integrating optimized GPU worker pools.",
      ],
    },
    {
      year: "2021 - 2023",
      role: "Associate Engineer",
      company: "Data Solutions",
      description: "Developed and optimized data scraping protocols and automated report systems.",
      highlights: [
        "Automated WhatsApp chat diagnostic engines processing 10k+ messages under 3 seconds.",
        "Reduced database query overhead by 40% through indexing and structural denormalization.",
      ],
    },
  ],
  github: {
    username: "abhi-iterates", // Based on active workspace & name
    allowedRepos: ["wifi-monitor", "whatsapp-analyzer", "portfolio"],
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
