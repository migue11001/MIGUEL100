"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap } from "lucide-react"

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-3">
      <nav className="flex items-center justify-between max-w-7xl mx-auto bg-card/90 backdrop-blur-md px-6 py-3 border border-border"
        style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-base tracking-wider">
          <Zap size={18} className="text-primary" />
          <span className="text-foreground">MIGUE<span className="text-primary">100</span></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase hover:bg-primary/80 transition-all hover:shadow-[0_0_16px_oklch(0.60_0.22_228/0.5)]"
        >
          <Zap size={12} />
          Collaborate
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-4 right-4 mt-1 bg-card border border-border p-6"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase mt-4 hover:bg-primary/80 transition-all"
              >
                <Zap size={12} />
                Collaborate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
