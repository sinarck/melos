"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRouter } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

export default function Hero() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  })

  // Scroll to top on page refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isInView) {
      setHasBeenInView(true)
    }
  }, [isInView])

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <motion.section 
      ref={ref} 
      className="relative overflow-hidden min-h-screen flex items-center"
      style={hasBeenInView ? { opacity, scale } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div 
          className="text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={hasBeenInView ? { y } : {}}
          >
            Turn Images into
            <motion.span 
              className="bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {" "}
              Musical Magic
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={hasBeenInView ? { y } : {}}
          >
            Experience the future of music discovery. Upload any image and let
            AI find the perfect songs that match its mood and atmosphere.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.5, delay: 1 }}
            style={hasBeenInView ? { y } : {}}
          >
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

      {/* Demo Preview with Fade-in Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
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
      
      {/* Next Component */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }} // Adjust delay for when the next component appears
        className="next-component relative z-10"
      >
        {/* This is the next component that will appear after a slight delay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Insert your next component content here */}
        </div>
      </motion.div>
    </motion.section>
  )
}
