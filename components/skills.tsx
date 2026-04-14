"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Cog, 
  Wrench, 
  Factory, 
  Gauge, 
  Cpu, 
  FileSpreadsheet,
  Workflow,
  Settings2
} from "lucide-react"

const skills = [
  {
    icon: Cog,
    title: "Mechanical Design",
    description: "CAD/CAM, 3D modeling, finite element analysis and mechanical component design.",
    tools: ["SolidWorks", "AutoCAD", "Inventor"]
  },
  {
    icon: Factory,
    title: "Manufacturing Processes",
    description: "Production line optimization, lean manufacturing and quality control.",
    tools: ["Six Sigma", "Lean", "Kaizen"]
  },
  {
    icon: Workflow,
    title: "Industrial Automation",
    description: "PLC programming, SCADA systems and industrial robotics.",
    tools: ["Siemens", "Allen-Bradley", "ABB"]
  },
  {
    icon: Gauge,
    title: "Process Control",
    description: "Instrumentation, variable control and operating parameter optimization.",
    tools: ["PID", "MATLAB", "LabVIEW"]
  },
  {
    icon: Cpu,
    title: "Industry 4.0",
    description: "Industrial IoT, digital twins, data analytics and predictive maintenance.",
    tools: ["Python", "Azure IoT", "Power BI"]
  },
  {
    icon: Wrench,
    title: "Industrial Maintenance",
    description: "TPM, RCM, failure analysis and industrial asset management.",
    tools: ["SAP PM", "CMMS", "Vibration"]
  },
  {
    icon: FileSpreadsheet,
    title: "Project Management",
    description: "Planning, budgeting, resource management and KPI tracking.",
    tools: ["MS Project", "Primavera", "Agile"]
  },
  {
    icon: Settings2,
    title: "Continuous Improvement",
    description: "Implementation of improvement methodologies and operational excellence culture.",
    tools: ["DMAIC", "5S", "VSM"]
  }
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-balance">
            Technical skills and areas of expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A combination of specialized technical knowledge and management skills 
            that allow me to approach industrial projects comprehensively.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <skill.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground"
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
