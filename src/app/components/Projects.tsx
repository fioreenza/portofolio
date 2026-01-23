import Image from "next/image";
import { motion } from "framer-motion";
import { MyProject } from "../constants";
import { ExternalLink, Terminal } from "lucide-react";

const Badge = ({ children }: { children: string }) => (
  <span
    className="px-3 py-1 text-[10px] lg:text-[11px] font-mono tracking-wide rounded-md bg-slate-900/40 backdrop-blur-sm border border-white/20 
      text-slate-100 shadow-sm hover:bg-slate-900/50 transition"
  >
    {children}
  </span>
);

export default function Projects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-10 overflow-hidden"
    >
      <div className="flex items-center space-x-2 text-blue-400 border-b border-blue-500/20 pb-4">
        <Terminal size={18} />
        <h2 className="font-mono text-lg tracking-tight">~/projects</h2>
      </div>

      <div className="grid grid-cols-1 gap-14">
        {MyProject.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            <div className="absolute -left-5 top-0 bottom-0 w-px bg-linear-to-b from-blue-500/40 to-transparent hidden md:block" />
            <div className="absolute -left-5.5 top-6 w-1.5 h-1.5 rounded-full bg-blue-500 hidden md:block shadow-[0_0_8px_rgba(59,130,246,1)]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start h-full">
              <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/10 bg-slate-900/60 aspect-video group-hover:border-blue-500/40 transition-colors">
                <div className="absolute bottom-2 left-2 flex-wrap-reverse gap-2 z-20 hidden md:flex">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <div className="font-mono text-xs text-blue-400 mb-1">
                    0{index + 1} | {project.year}
                  </div>

                  <h3 className="text-lg xl:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-200 mt-1">{project.role}</p>

                  <p className="mt-3 text-slate-400 leading-relaxed text-xs xl:text-sm border-l-2 border-slate-700 pl-4">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:hidden">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div className="pt-4 flex items-center space-x-4">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
                    >
                      Visit Site
                      <ExternalLink size={12} className="ml-2" />
                    </a>
                  ) : (
                    <span className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Site Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
