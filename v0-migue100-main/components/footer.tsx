"use client"

import { Cog } from "lucide-react"

export function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2 font-bold text-lg">
          <Cog size={20} className="text-primary" />
          <span>migue100.com</span>
        </a>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  )
}
