"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Linkedin, Github, Send, MapPin, Terminal, ExternalLink } from "lucide-react"

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-profile",
    handle: "linkedin.com/in/your-profile"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/migue11001",
    handle: "github.com/migue11001"
  }
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      })
      if (res.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
              Ready to <span className="text-primary">Collaborate?</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed border-l-2 border-primary/30 pl-4">
              Always open to new opportunities — industrial projects, consulting, 
              or simply sharing knowledge about the fascinating world of mechanics and processes.
            </p>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10">
              <MapPin size={14} className="text-primary shrink-0" />
              <span className="font-mono text-xs tracking-wide">Mexico City, MX</span>
              <div className="ml-2 w-2 h-2 bg-primary animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-primary">Available</span>
            </div>

            {/* Social Links */}
            <div className="border border-border">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-all ${index < socialLinks.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="w-9 h-9 bg-secondary border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all shrink-0">
                    <link.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold tracking-widest uppercase group-hover:text-primary transition-colors">
                      {link.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono truncate">
                      {link.handle}
                    </div>
                  </div>
                  <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border"
          >
            {/* Form header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-secondary/40">
              <Terminal size={14} className="text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase">Send a Message</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2 h-2 bg-border" />
                <div className="w-2 h-2 bg-border" />
                <div className="w-2 h-2 bg-primary/60" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 bg-secondary border border-border text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_1px_oklch(0.60_0.22_228/0.3)] transition-all placeholder:text-muted-foreground/50 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-secondary border border-border text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_1px_oklch(0.60_0.22_228/0.3)] transition-all placeholder:text-muted-foreground/50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1.5">
                  Topic
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2.5 bg-secondary border border-border text-sm focus:outline-none focus:border-primary transition-all text-foreground font-mono"
                >
                  <option value="">Select a topic</option>
                  <option value="project">Project Proposal</option>
                  <option value="collab">Collaboration</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-3 py-2.5 bg-secondary border border-border text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_1px_oklch(0.60_0.22_228/0.3)] transition-all resize-none placeholder:text-muted-foreground/50 font-mono"
                />
              </div>

              {status === "sent" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/30 text-xs font-bold tracking-widest uppercase text-primary">
                  <div className="w-2 h-2 bg-primary" />
                  Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-destructive/10 border border-destructive/30 text-xs font-bold tracking-widest uppercase text-destructive">
                  <div className="w-2 h-2 bg-destructive" />
                  Failed to send. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase hover:bg-primary/80 transition-all hover:shadow-[0_0_20px_oklch(0.60_0.22_228/0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {status === "sending" ? "Transmitting..." : status === "sent" ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
