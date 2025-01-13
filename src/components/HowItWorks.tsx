"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from 'react'

const steps = [
  {
    title: "Upload Your Image",
    description: "Simply drag and drop or select any image that inspires you.",
    image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800",
  },
  {
    title: "AI Analysis",
    description: "Our AI analyzes your image and understands its emotional context.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    title: "Get Matched Songs",
    description: "Receive a curated list of songs that perfectly match your image.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    <section ref={ref} id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
        >
          How Melos AI Works
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="relative">
                <div className={`absolute -left-4 -top-4 w-12 h-12 rounded-full bg-${['pink', 'violet', 'indigo'][index]}-500 text-white flex items-center justify-center font-bold text-xl`}>
                  {index + 1}
                </div>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full aspect-video object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

