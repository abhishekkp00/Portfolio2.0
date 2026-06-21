export function analyzeRepoSkills(name: string, description: string, language?: string): string[] {
  const skills: string[] = [];
  const content = `${name} ${description}`.toLowerCase();

  // Language mapping
  if (language) {
    const lang = language.toLowerCase();
    if (lang === "typescript" || lang === "javascript") {
      skills.push("TypeScript", "React / Next.js");
    } else if (lang === "java") {
      skills.push("Java / Spring Boot");
    } else if (lang === "python") {
      skills.push("Python / FastAPI");
    } else if (lang === "go") {
      skills.push("Linux / Bash");
    } else if (lang === "css" || lang === "html") {
      skills.push("Tailwind CSS");
    }
  }

  // Name/description keyword mapping
  if (content.includes("spring") || content.includes("boot") || content.includes("jpa") || content.includes("hibernate")) {
    if (!skills.includes("Java / Spring Boot")) skills.push("Java / Spring Boot");
  }
  if (content.includes("react") || content.includes("next.js") || content.includes("nextjs")) {
    if (!skills.includes("React / Next.js")) skills.push("React / Next.js");
  }
  if (content.includes("fastapi") || content.includes("flask") || content.includes("django")) {
    if (!skills.includes("Python / FastAPI")) skills.push("Python / FastAPI");
  }
  if (content.includes("postgres") || content.includes("mysql") || content.includes("sql") || content.includes("database") || content.includes("db")) {
    skills.push("PostgreSQL / MySQL");
  }
  if (content.includes("redis")) {
    skills.push("Redis");
  }
  if (content.includes("docker") || content.includes("container") || content.includes("kubernetes")) {
    skills.push("Docker");
  }
  if (content.includes("pytorch") || content.includes("tensor") || content.includes("ml") || content.includes("machine learning") || content.includes("deep learning")) {
    skills.push("PyTorch");
  }
  if (content.includes("scikit") || content.includes("sklearn")) {
    skills.push("Scikit-Learn");
  }
  if (content.includes("numpy") || content.includes("pandas") || content.includes("data analysis") || content.includes("dataframe") || content.includes("analytics")) {
    skills.push("NumPy / Pandas");
  }
  if (content.includes("git") || content.includes("ci/cd") || content.includes("actions") || content.includes("workflow")) {
    skills.push("Git & CI/CD");
  }
  if (content.includes("network") || content.includes("wifi") || content.includes("ping") || content.includes("telemetry") || content.includes("packet")) {
    skills.push("Network Testing");
  }
  if (content.includes("linux") || content.includes("bash") || content.includes("shell") || content.includes("script")) {
    skills.push("Linux / Bash");
  }

  // Clean duplicates and return unique list
  const uniqueSkills = Array.from(new Set(skills));
  return uniqueSkills.slice(0, 4); // Limit to 4 for clean layout
}

export function generateRepoHighlights(name: string, description: string, stars: number, forks: number, language?: string): string[] {
  const highlights: string[] = [];
  const content = `${name} ${description}`.toLowerCase();

  // Custom highlights based on repository name/content keywords
  if (content.includes("wifi") || content.includes("monitor")) {
    highlights.push(
      "Real-time network diagnostic and throughput speed profiling",
      "Interactive UI telemetry visualization dashboard",
      "Robust client-side telemetry sockets integration"
    );
  } else if (content.includes("kharidoo") || content.includes("ecommerce") || content.includes("e-commerce")) {
    highlights.push(
      "Full-stack transactional online storefront implementation",
      "Secure shopping cart and catalog microservices",
      "Role-based checkout flow and transactional logging"
    );
  } else if (content.includes("iterates") || content.includes("os")) {
    highlights.push(
      "Advanced server-side authorization and custom role guards",
      "Secure byte-stream files protection system",
      "Multi-module distributed systems backend integration"
    );
  } else if (content.includes("image") || content.includes("editor")) {
    highlights.push(
      "Client-side image processing and crop/scale filters",
      "Canvas-based vector editing framework",
      "Optimized rendering for quick edits"
    );
  } else {
    // Generics based on repo data
    if (language) {
      highlights.push(`Engineered using clean ${language} standards`);
    }
    if (stars > 0) {
      highlights.push(`Highly rated open-source repository with ${stars} stars`);
    }
    if (forks > 0) {
      highlights.push(`Active collaboration with ${forks} community forks`);
    }
    if (highlights.length < 3) {
      highlights.push("Modular, test-driven codebase architecture");
      highlights.push("Configured with hot-reloading local dev shell");
    }
  }
  return highlights.slice(0, 3);
}
