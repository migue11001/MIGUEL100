"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Calendar, Tag } from "lucide-react"

const projects = [
  {
    title: "Assembly Line Optimization",
    description: "Complete redesign of an automotive production line, achieving a 35% improvement in efficiency and 20% reduction in downtime.",
    image: "/placeholder-project-1.jpg",
    tags: ["Lean Manufacturing", "Automation", "OEE"],
    year: "2024",
    featured: true
  },
  {
    title: "Predictive Maintenance System",
    description: "Implementation of IoT sensors and machine learning algorithms to predict failures in rotating equipment with 95% accuracy.",
    image: "/placeholder-project-2.jpg",
    tags: ["IoT", "Machine Learning", "Industry 4.0"],
    year: "2024",
    featured: true
  },
  {
    title: "Modular Conveyor Design",
    description: "Development of a scalable modular transport system for the food industry, complying with FDA sanitary standards.",
    image: "/placeholder-project-3.jpg",
    tags: ["Mechanical Design", "Food Grade", "CAD"],
    year: "2023",
    featured: false
  },
  {
    title: "Robotic Welding Cell",
    description: "Integration of collaborative robots in welding process, reducing operator exposure and increasing weld quality.",
    image: "/placeholder-project-4.jpg",
    tags: ["Robotics", "Cobots", "Safety"],
    year: "2023",
    featured: false
  }
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-balance">
              Featured Work
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A selection of projects that demonstrate my comprehensive approach to 
            industrial challenges.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Tag className="text-primary" size={32} />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar size={14} />
                  <span>{project.year}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Tag className="text-primary" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {project.tags.join(" - ")}
                </p>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" size={20} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
