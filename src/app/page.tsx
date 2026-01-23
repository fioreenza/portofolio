"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Window from "./components/Window";
import Clock from "./components/Clock";

export default function Home() {
  return (
    <main className="font-sans w-full h-screen relative flex items-center justify-center overflow-hidden">
      <Image
        src="/background.jpg"
        alt="wallpaper"
        fill
        priority
        className="object-cover z-0 brightness-30"
      />

      <div className="z-10 w-full flex items-center justify-center pb-10">
        <Window />
      </div>

      <div className="absolute bottom-0 z-20 w-full">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="h-10 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/30 to-transparent pointer-events-none" />
          <div className="h-full relative group px-4 rounded-r-xl bg-linear-to-b from-xp-green to-[#2E7D27] shadow-[0_2px_10px_rgba(61,158,52,0.5)] border border-green-400/30 hover:brightness-110 transition-all active:scale-95 flex items-center space-x-2">
            <Image src="/xp.png" alt="windows xp logo" width={20} height={20} />
            <div
              className="italic font-black text-white text-lg pr-1"
              style={{ textShadow: "0 2px 2px rgba(0,0,0,0.3)" }}
            >
              start
            </div>
          </div>

          <div className="flex-1 flex px-4 space-x-2">
            <div className="flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-1 rounded-lg shadow-inner">
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              <span className="text-xs text-white font-medium truncate">
                Fiorenza's Portfolio
              </span>
            </div>
          </div>

          <div className="bg-black/20 h-full rounded-l-xl px-4 py-1.5 flex items-center space-x-3 border border-white/5">
            <div className="flex flex-col items-end">
              <Clock />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
