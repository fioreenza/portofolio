"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronsRight, X } from "lucide-react";
import type { NavItem } from "../types";
import About from "./About";
import Projects from "./Projects";
import Navigation from "./Navigation";

export default function Window() {
  const sections: { id: NavItem; component: React.ReactNode }[] = [
    { id: "about", component: <About /> },
    { id: "projects", component: <Projects /> },
  ];

  const [activeSection, setActiveSection] = useState<NavItem>("about");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = useCallback((id: NavItem) => {
    const container = containerRef.current;
    const target = document.getElementById(id);
    if (!container || !target) return;

    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const offset = 48;

    container.scrollTo({
      top: container.scrollTop + (targetTop - containerTop) - offset,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as NavItem);
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="relative w-[90vw] max-w-6xl h-[88dvh] lg:max-h-170 bg-slate-900/90 backdrop-blur-2xl rounded-xl shadow-window border-2 border-xp-blue/30 flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between h-9 px-2 bg-xp-header shadow-xp-header">
        <div className="flex items-center gap-2">
          <Image src="/explorer.png" alt="logo" width={26} height={26} />
          <p className="text-white font-bold text-xs md:text-sm text-shadow-xp-header">
            My Portofolio
          </p>
        </div>

        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded-sm bg-blue-500/80 hover:bg-blue-400 border border-white/30 shadow-inner flex items-center justify-center transition-colors cursor-pointer group">
            <div className="w-2 h-0.5 bg-white shadow-sm" />
          </div>
          <div className="w-5 h-5 rounded-sm bg-blue-500/80 hover:bg-blue-400 border border-white/30 shadow-inner flex items-center justify-center transition-colors cursor-pointer group">
            <div className="w-2 h-2 border border-white shadow-sm" />
          </div>
          <div className="w-5 h-5 rounded-sm bg-xp-red hover:bg-red-400 border border-white/30 shadow-inner flex items-center justify-center transition-colors cursor-pointer group">
            <div className="text-white font-bold text-xs leading-none drop-shadow-sm">
              <X className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[calc(100%-36px)] rounded-b-xl flex flex-col">
        <div className="h-9 px-4 bg-[#EDEBDA] flex items-center border-b-2 border-[#dcdace] gap-2">
          <span className="text-xs text-gray-500">Address:</span>

          <div className="flex items-center flex-1 bg-white border border-[#a19f94] shadow-inner px-2 py-0.5 text-xs">
            <Image src="/explorer-file.png" alt="file" width={14} height={14} />
            <input
              value="https://fiorenza.site"
              readOnly
              className="flex-1 outline-none ml-2 bg-transparent"
            />
            <ChevronDown className="w-4 h-4" />
          </div>

          <button
            type="button"
            className="px-3 h-6 bg-linear-to-b from-[#62C044] to-[#429526] border border-[#30681B] text-white text-xs flex items-center gap-1"
          >
            <ArrowRight className="w-3 h-3" /> Go
          </button>

          <div className="pl-3 border-l border-[#ACA899] items-center gap-1 text-xs hidden sm:flex">
            Links <ChevronsRight className="w-3 h-3" />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden lg:flex flex-col p-4 space-y-4 shrink-0 w-1/4 lg:w-1/4 xl:w-1/5 bg-linear-to-b from-[#2b7de9]/5 to-transparent">
            <Navigation
              activeSection={activeSection}
              onNavigate={scrollToSection}
            />
          </aside>

          <div ref={containerRef} className="flex-1 overflow-y-auto relative">
            <div
              className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "120px 120px",
                backgroundRepeat: "repeat",
              }}
            />

            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={`
                    overflow-x-hidden px-8 md:px-12 mb-20  overflow-hidden
                    ${section.id === "about" ? "h-[75vh] lg:max-h-150" : "min-h-[75vh]"}
                  `}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45 }}
                  className="w-full max-w-4xl mx-auto h-full"
                >
                  {section.component}
                </motion.div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
