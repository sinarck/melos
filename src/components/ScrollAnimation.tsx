"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
}

export function ScrollAnimation({ children }: ScrollAnimationProps) {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

