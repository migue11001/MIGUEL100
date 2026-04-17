"use client"

import { Zap } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-base tracking-wider">
            <Zap size={16} className="text-primary" />
            <span className="text-foreground">MIGUE<span className="text-primary">100</span></span>
          </a>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} migue100.com
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest">SYSTEM ONLINE</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
            Industrial &amp; Mechanical Engineer — Mexico City
          </span>
        </div>
      </div>
    </footer>
  )
}
