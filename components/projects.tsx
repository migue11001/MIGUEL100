"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"

const projects = [
  {
    id: "PRJ-001",
    title: "Assembly Line Optimization",
    description: "Complete redesign of an automotive production line, achieving a 35% improvement in efficiency and 20% reduction in downtime.",
    tags: ["Lean Manufacturing", "Automation", "OEE"],
    year: "2024",
    metric: "+35% OEE",
    featured: true
  },
  {
    id: "PRJ-002",
    title: "Predictive Maintenance System",
    description: "Implementation of IoT sensors and ML algorithms to predict failures in rotating equipment with 95% accuracy.",
    tags: ["IoT", "Machine Learning", "Industry 4.0"],
    year: "2024",
    metric: "95% Accuracy",
    featured: true
  },
  {
    id: "PRJ-003",
    title: "Modular Conveyor Design",
    description: "Development of a scalable modular transport system for the food industry, complying with FDA sanitary standards.",
    tags: ["Mechanical Design", "Food Grade", "CAD"],
    year: "2023",
    metric: "FDA Certified",
    featured: false
  },
  {
    id: "PRJ-004",
    title: "Robotic Welding Cell",
    description: "Integration of collaborative robots in welding process, reducing operator exposure and increasing weld quality.",
    tags: ["Robotics", "Cobots", "Safety"],
    year: "2023",
    metric: "−40% Exposure",
    featured: false
  }
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/20 border-y border-border">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Featured <span className="text-primary">Work</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm border-l border-border pl-4">
            A selection of projects demonstrating my comprehensive approach to industrial engineering challenges.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-px bg-border mb-px">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card p-8 hover:bg-primary/5 transition-all cursor-default"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black font-mono text-muted-foreground tracking-widest">{project.id}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={11} />
                    <span>{project.year}</span>
                  </div>
                  <span className="text-xs font-bold text-primary border border-primary/30 px-2 py-0.5 font-mono">
                    {project.metric}
                  </span>
                </div>
              </div>

              {/* Blueprint placeholder */}
              <div className="aspect-video mb-6 bg-secondary/60 border border-border flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(oklch(0.60 0.22 228 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.60 0.22 228 / 0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                />
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground/40 font-mono relative z-10">
                  {project.id}
                </span>
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/40" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/40" />
              </div>

              <h3 className="text-lg font-black uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-secondary border border-border text-muted-foreground font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Projects */}
        <div className="border border-border border-t-0">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: (index + 2) * 0.1 }}
              className={`group flex items-center gap-6 px-6 py-4 hover:bg-primary/5 transition-all cursor-default ${index < projects.filter(p => !p.featured).length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="text-[10px] font-black font-mono text-muted-foreground tracking-widest shrink-0 w-16">{project.id}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm uppercase tracking-wide group-hover:text-primary transition-colors truncate mb-0.5">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">{project.tags.join(" · ")}</p>
              </div>
              <span className="text-xs font-bold text-primary font-mono shrink-0">{project.metric}</span>
              <span className="text-xs text-muted-foreground shrink-0">{project.year}</span>
              <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
