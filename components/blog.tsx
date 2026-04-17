"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Clock, ArrowUpRight } from "lucide-react"

const posts = [
  {
    id: "ART-001",
    title: "What is Lean Manufacturing and Why Does It Matter?",
    excerpt: "A practical introduction to lean manufacturing principles and how they can transform your operation's efficiency.",
    readTime: "5 min",
    category: "Fundamentals"
  },
  {
    id: "ART-002",
    title: "Visual Guide: Types of Bearings and Their Applications",
    excerpt: "Exploring different types of bearings with clear illustrations and real-world industrial examples.",
    readTime: "8 min",
    category: "Mechanics"
  },
  {
    id: "ART-003",
    title: "Industry 4.0: Beyond the Buzzword",
    excerpt: "Demystifying the fourth industrial revolution with practical examples you can implement today.",
    readTime: "6 min",
    category: "Trends"
  }
]

export function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog" ref={ref} className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Shared <span className="text-primary">Knowledge</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:text-primary/70 transition-colors"
          >
            View All Articles
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Articles */}
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-card p-6 hover:bg-primary/5 transition-all cursor-pointer"
            >
              {/* Top meta */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-black font-mono text-muted-foreground tracking-widest">{post.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary border border-primary/30 px-2 py-0.5">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h3 className="font-black text-sm uppercase tracking-wide mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
                Read Article
                <ArrowRight size={12} />
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center">
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
