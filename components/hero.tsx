"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronRight, Cpu, Wrench } from "lucide-react"

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Collaborators" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 overflow-hidden">

      {/* Background accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ right: "25%" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"
          style={{ right: "50%" }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
        />
        {/* Corner bracket decoration */}
        <div className="absolute top-24 right-12 md:right-24 w-16 h-16 border-t-2 border-r-2 border-primary/30" />
        <div className="absolute bottom-16 left-12 md:left-24 w-16 h-16 border-b-2 border-l-2 border-primary/30" />
      </div>

      <div className="relative z-10 max-w-5xl">

        {/* System badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
            Industrial &amp; Mechanical Engineer
          </span>
          <div className="h-px w-12 bg-primary/40" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8"
        >
          <span className="block text-foreground/90">PRECISION.</span>
          <span className="block text-primary">PROCESS.</span>
          <span className="block text-foreground/90">RESULTS.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed border-l-2 border-primary/40 pl-4"
        >
          Specialist in mechanics, manufacturing, and industrial process optimization.
          Turning complex engineering challenges into efficient, scalable solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold tracking-widest uppercase hover:bg-primary/80 transition-all hover:shadow-[0_0_20px_oklch(0.60_0.22_228/0.4)]"
          >
            <Wrench size={16} />
            View Projects
            <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-bold tracking-widest uppercase hover:border-primary hover:text-primary transition-all"
          >
            <Cpu size={16} />
            Work With Me
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-0 border border-border"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 min-w-[120px] px-6 py-5 ${i < stats.length - 1 ? "border-r border-border" : ""}`}
            >
              <div className="text-3xl font-black text-primary leading-none mb-1">{stat.value}</div>
              <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center px-6 py-5 border-l border-border">
            <ChevronRight size={20} className="text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
