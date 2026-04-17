"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Target, Users } from "lucide-react"

const values = [
  {
    id: "01",
    icon: Lightbulb,
    title: "Practical Innovation",
    description: "Transforming complex ideas into implementable solutions, always balancing efficiency with sustainability."
  },
  {
    id: "02",
    icon: Target,
    title: "Technical Precision",
    description: "Every process, every component, every detail matters. Meticulous attention to quality standards defines my work."
  },
  {
    id: "03",
    icon: Users,
    title: "Open Collaboration",
    description: "The best work comes from diverse teams. I actively seek collaborators who bring new perspectives and skills."
  }
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-8 uppercase tracking-tight">
              Driven by Mechanics &amp;{" "}
              <span className="text-primary">Industrial Processes</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                With over 8 years of experience in the industrial sector, I have worked on 
                diverse projects ranging from production line optimization to the design 
                of complex mechanical systems.
              </p>
              <p>
                My approach combines technical rigor with clear communication. 
                I firmly believe that industrial knowledge should be shared in an{" "}
                <span className="text-primary font-semibold">engaging and accessible</span> way, 
                making complex engineering understandable for everyone.
              </p>
              <p>
                I constantly seek collaborators who share this vision — curious, creative 
                professionals committed to the continuous improvement of industrial processes.
              </p>
            </div>

            {/* Horizontal rule with label */}
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-border">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Based in</span>
              <span className="text-sm font-semibold text-foreground">Mexico City, MX</span>
              <div className="ml-auto w-2 h-2 bg-primary animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-primary">Available</span>
            </div>
          </motion.div>

          {/* Right - Values Cards */}
          <div className="space-y-0 border border-border">
            {values.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
                className={`group flex gap-5 p-6 hover:bg-primary/5 transition-all cursor-default ${index < values.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="shrink-0 text-xs font-black text-primary/40 group-hover:text-primary transition-colors pt-1 font-mono">
                  {item.id}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={16} className="text-primary" />
                    <h3 className="font-bold text-sm tracking-wide uppercase">{item.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
