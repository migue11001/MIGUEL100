"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Cog, Wrench, Factory, Gauge, Cpu, FileSpreadsheet, Workflow, Settings2 } from "lucide-react"

const skills = [
  { icon: Cog, title: "Mechanical Design", description: "CAD/CAM, 3D modeling, FEA and mechanical component design.", tools: ["SolidWorks", "AutoCAD", "Inventor"] },
  { icon: Factory, title: "Manufacturing Processes", description: "Production line optimization, lean manufacturing and quality control.", tools: ["Six Sigma", "Lean", "Kaizen"] },
  { icon: Workflow, title: "Industrial Automation", description: "PLC programming, SCADA systems and industrial robotics integration.", tools: ["Siemens", "Allen-Bradley", "ABB"] },
  { icon: Gauge, title: "Process Control", description: "Instrumentation, variable control and operating parameter optimization.", tools: ["PID", "MATLAB", "LabVIEW"] },
  { icon: Cpu, title: "Industry 4.0", description: "Industrial IoT, digital twins, data analytics and predictive maintenance.", tools: ["Python", "Azure IoT", "Power BI"] },
  { icon: Wrench, title: "Industrial Maintenance", description: "TPM, RCM, failure analysis and industrial asset management.", tools: ["SAP PM", "CMMS", "Vibration"] },
  { icon: FileSpreadsheet, title: "Project Management", description: "Planning, budgeting, resource management and KPI tracking.", tools: ["MS Project", "Primavera", "Agile"] },
  { icon: Settings2, title: "Continuous Improvement", description: "Implementation of improvement methodologies and operational excellence culture.", tools: ["DMAIC", "5S", "VSM"] },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Skills</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Technical Expertise &amp;{" "}
              <span className="text-primary">Core Capabilities</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Specialized knowledge combined with hands-on industrial experience.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-border">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className={`group p-6 hover:bg-primary/5 transition-all cursor-default
                ${index % 4 !== 3 ? "border-r border-border" : ""}
                ${index < 4 ? "border-b border-border" : ""}
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <skill.icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black text-border group-hover:text-primary/30 transition-colors font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-bold text-sm tracking-wide uppercase mb-2">{skill.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>
              <div className="flex flex-wrap gap-1">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] px-2 py-0.5 bg-secondary border border-border text-muted-foreground font-mono tracking-wide"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
