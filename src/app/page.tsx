"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollFollower from "@/components/layout/ScrollFollower";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Playground from "@/sections/Playground";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <Navbar />
      <ScrollFollower />

      <main className="flex-1 flex flex-col">
        {/* Sections */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Playground />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
