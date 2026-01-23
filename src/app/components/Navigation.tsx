"use client";

import { useState, useEffect } from "react";
import type { NavItem } from "../types";

import {
  ChevronDown,
  User,
  FolderOpen,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

interface NavigationProps {
  activeSection: NavItem;
  onNavigate: (item: NavItem) => void;
}

const TASKS = [
  { key: "about", label: "About me", icon: User },
  { key: "projects", label: "Projects", icon: FolderOpen },
];

export default function Navigation({
  activeSection,
  onNavigate,
}: NavigationProps) {
  const [active, setActive] = useState<NavItem>(activeSection || "about");

  useEffect(() => {
    if (activeSection) setActive(activeSection);
  }, [activeSection]);

  const handleClick = (key: NavItem) => {
    setActive(key);
    if (onNavigate) onNavigate(key);
  };

  return (
    <>
      <div className="rounded-lg h-1/2 overflow-hidden border border-white/10 shadow-2xl">
        <div
          className="h-8 bg-slate-700
          flex items-center justify-between px-3 cursor-pointer text-slate-200"
        >
          <span className="font-bold text-sm">System Tasks</span>
          <ChevronDown size={12} />
        </div>

        <div className="bg-slate-800 h-full p-4 space-y-2">
          {TASKS.map((task) => {
            const Icon = task.icon;
            const isActive = active === task.key;

            return (
              <button
                type="button"
                key={task.key}
                onClick={() => handleClick(task.key as NavItem)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClick(task.key as NavItem);
                  }
                }}
                className={`
                  flex items-center gap-2 p-2 rounded-md w-full
                  text-sm cursor-pointer transition-colors
                  ${
                    isActive
                      ? "bg-[#F1EFE2]/20 text-white w-full"
                      : "text-white/80 hover:bg-white/10 hover:w-full"
                  }
                `}
              >
                <Icon size={16} className="text-blue-200 shrink-0" />
                <span className="font-bold">{task.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg h-1/2 overflow-hidden border border-white/10">
        <div
          className="h-8 bg-slate-700
          flex items-center justify-between px-3 text-slate-200"
        >
          <span className="font-bold text-sm">Contacts</span>
          <ChevronDown size={12} className="" />
        </div>

        <div
          className="bg-slate-800 h-full p-4 
          text-white/80 leading-relaxed space-y-1"
        >
          <div className="space-y-1 text-xs leading-relaxed tracking-wide ">
            <p> Get in touch</p>
            <div className="flex items-center gap-2 my-3">
              <a
                href="https://github.com/fioreenza"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  size={30}
                  className="bg-white/10 hover:bg-xp-blue/50 rounded-sm p-1 transition-colors"
                />
              </a>
              <a
                href="https://linkedin.com/in/fiorenzanalle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  size={30}
                  className="bg-white/10 hover:bg-xp-blue/50 rounded-sm p-1 transition-colors"
                />
              </a>
              <a
                href="https://instagram.com/blurrybassist"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  size={30}
                  className="bg-white/10 hover:bg-xp-blue/50 rounded-sm p-1 transition-colors"
                />
              </a>
            </div>
            <a
              href="mailto: fiorenzanalle05@gmail.com"
              className="flex items-center gap-2"
            >
              fiorenzanalle05@gmail.com
            </a>
            <p> I'm open to opportunities and collaborations!</p>
          </div>
        </div>
      </div>
    </>
  );
}
