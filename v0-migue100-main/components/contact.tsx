"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Linkedin, Github, Send, MapPin, MessageSquare } from "lucide-react"

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
    handle: "@industrial-pro"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "#",
    handle: "@indumech"
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contact@example.com",
    handle: "contact@example.com"
  }
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-balance">
              Ready to collaborate?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I am always open to new collaboration opportunities, whether for 
              industrial projects, consulting, or simply to share knowledge about 
              the fascinating world of mechanics and processes.
            </p>

            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <MapPin size={18} className="text-primary" />
              <span>Mexico City, Mexico</span>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <link.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {link.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {link.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-primary" size={24} />
              <h3 className="text-xl font-semibold">Send me a message</h3>
            </div>

            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground"
                >
                  <option value="">Select a topic</option>
                  <option value="project">Project Proposal</option>
                  <option value="collab">Collaboration</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
