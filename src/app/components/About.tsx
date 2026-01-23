"use client";

import { motion, easeInOut } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const lift = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -3,
    scale: 1.02,
  },
};

const highlight = {
  rest: {
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.35), 0 1px 0 rgba(0,0,0,.5)",
  },
};

const fadeBlur = (delay = 0, direction: "up" | "left" | "right" = "up") => {
  const axis =
    direction === "up"
      ? { y: 30 }
      : direction === "left"
        ? { x: 40 }
        : { x: -40 };

  return {
    hidden: {
      opacity: 0,
      filter: "blur(14px)",
      ...axis,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: easeInOut,
      },
    },
  };
};

export default function About() {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <div className="absolute top-16 left-10 sm:left-20 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col py-4"
      >
        <div className="flex flex-1 flex-col justify-start">
          <motion.h1 className="font-bold text-slate-100 text-[36px] sm:text-[50px] lg:text-[72px] leading-tight">
            <motion.span
              variants={fadeBlur(0.9)}
              className="block text-slate-200 text-[32px] sm:text-[40px] lg:text-[56px]"
            >
              Hello,
              <br />
            </motion.span>

            <div className="flex gap-4 mt-4">
              <motion.span variants={fadeBlur(1.2)}>I'm</motion.span>

              <motion.span
                className="relative inline-block cursor-pointer"
                initial="hidden"
                animate="show"
                whileHover="hover"
                variants={fadeBlur(1.5)}
              >
                <motion.span
                  variants={lift}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="relative inline-block"
                >
                  <span className="xp-text relative z-10 px-2 md:px-3">
                    Fiorenza
                  </span>

                  <motion.span
                    variants={highlight}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-0 bottom-0 w-full h-[1.1em] rounded-lg -z-10 xp-highlight origin-left"
                  />
                </motion.span>
              </motion.span>
            </div>
          </motion.h1>
        </div>

        <div className="mt-8 md:mt-16 flex flex-col-reverse md:flex-row items-start md:items-end justify-between gap-10 md:gap-14">
          <motion.div
            variants={fadeBlur(2.2, "left")}
            className="flex flex-wrap gap-2 w-72"
          >
            {["Frontend", "UI", "Data Fetch", "Backend", "Deployment"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 2.3 + i * 0.08,
                    duration: 0.4,
                  }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-slate-300"
                >
                  {tech}
                </motion.span>
              ),
            )}
          </motion.div>

          <motion.div
            variants={fadeBlur(2.5, "right")}
            className="max-w-md flex md:items-end flex-col text-left md:text-right"
          >
            <div className="h-px w-full bg-linear-to-l from-white/30 to-transparent md:ml-auto mb-6" />

            <p className="text-[15px] sm:text-base text-slate-300 font-light leading-relaxed">
              I’m a university student passionate about software development,
              starting my journey in{" "}
              <span className="font-medium text-slate-100">late 2023</span>.
            </p>

            <p className="mt-4 max-w-sm text-[14px] sm:text-[15px] text-slate-400 font-light leading-relaxed">
              I began with frontend crafting using{" "}
              <span className="text-indigo-200">Next.js</span> and{" "}
              <span className="text-indigo-200">TypeScript</span>, and am
              currently exploring backend and DevOps to understand applications{" "}
              <span className="italic">end to end</span>.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
