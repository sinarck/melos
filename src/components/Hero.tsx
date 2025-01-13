"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function Hero() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div 
          className="text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6">
            Turn Images into
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              {" "}
              Musical Magic
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the future of music discovery. Upload any image and let
            AI find the perfect songs that match its mood and atmosphere.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="px-8 py-6 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
              onClick={() => router.push('/playground')}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              className="px-8 py-6 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Demo Preview */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=2400"
            alt="Melos AI Demo"
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

