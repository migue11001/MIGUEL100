"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Lightbulb, Target, Users } from "lucide-react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-balance">
              Passionate about mechanics and industrial processes
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over 8 years of experience in the industrial sector, I have had the 
                opportunity to work on diverse projects ranging from production line 
                optimization to the design of complex mechanical systems.
              </p>
              <p>
                My approach combines technical rigor with clear and accessible communication. 
                I firmly believe that industrial knowledge should be shared in an 
                <span className="text-primary font-medium"> engaging and informative</span> way, 
                making complex concepts understandable for everyone.
              </p>
              <p>
                I constantly seek collaborators who share this vision: curious, creative 
                professionals committed to the continuous improvement of industrial 
                processes.
              </p>
            </div>
          </div>

          {/* Right - Values Cards */}
          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <Lightbulb className="text-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg mb-2">Practical Innovation</h3>
              <p className="text-sm text-muted-foreground">
                I transform complex ideas into implementable solutions, always seeking 
                the balance between efficiency and sustainability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <Target className="text-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg mb-2">Technical Precision</h3>
              <p className="text-sm text-muted-foreground">
                Every process, every component, every detail matters. My work is 
                characterized by meticulous attention to quality standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <Users className="text-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg mb-2">Open Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                The best work comes from diverse teams. I actively seek collaborators 
                who bring new perspectives and skills.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
