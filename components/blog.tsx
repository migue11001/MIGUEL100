"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Clock, BookOpen } from "lucide-react"

const posts = [
  {
    title: "What is Lean Manufacturing and Why Does It Matter?",
    excerpt: "A friendly introduction to lean manufacturing principles and how they can transform your operation.",
    readTime: "5 min",
    category: "Fundamentals"
  },
  {
    title: "Visual Guide: Types of Bearings and Their Applications",
    excerpt: "We explore different types of bearings with clear illustrations and real-world examples.",
    readTime: "8 min",
    category: "Mechanics"
  },
  {
    title: "Industry 4.0: Beyond the Buzzword",
    excerpt: "We demystify the fourth industrial revolution with practical examples you can implement today.",
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-balance">
              Shared Knowledge
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View all articles
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <BookOpen size={16} />
                Read article
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
