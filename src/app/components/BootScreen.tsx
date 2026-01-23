"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progressKey, setProgressKey] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setProgressKey((k) => k + 1);
      },
      1800 + Math.random() * 1200,
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const done = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 700);
    }, 4800);

    return () => clearTimeout(done);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center select-none cursor-wait"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[100%_3px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[url('/noise.png')]" />

          <div className="flex flex-col items-center gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-sm tracking-widest uppercase"
            >
              Loading system...
            </motion.div>

            <div className="w-64 md:w-80 h-4 md:h-5 border border-slate-600 rounded-md p-0.5 overflow-hidden bg-black relative">
              <motion.div
                key={progressKey}
                className="flex gap-1 h-full absolute left-0 top-0"
                initial={{ x: -120 }}
                animate={{ x: 420 }}
                transition={{
                  duration: 1.9 + Math.random(),
                  ease: "linear",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="
                      w-4 h-full rounded-xs
                      bg-linear-to-b
                      from-[#1f3fb8]
                      via-[#4f7cff]
                      to-[#1f3fb8]
                      shadow-[0_0_4px_rgba(79,124,255,0.45)]
                    "
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 font-mono flex justify-between w-full px-12 md:px-24 items-center">
            <div className="text-slate-500 text-xs">Copyright © 2026</div>
            <div className="font-bold text-slate-500 text-sm tracking-widest">
              Fiorenza
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
