"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const steps = [
  {
    title: "Upload Your Image",
    description: "Simply drag and drop or select any image that inspires you.",
    image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800",
  },
  {
    title: "AI Analysis",
    description:
      "Our AI analyzes your image and understands its emotional context.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    title: "Get Matched Songs",
    description:
      "Receive a curated list of songs that perfectly match your image.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (isInView) {
      setHasBeenInView(true);
    }
  }, [isInView]);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={hasBeenInView ? { opacity } : { opacity: 0 }}
      id="how-it-works"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          style={hasBeenInView ? { y } : {}}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
        >
          How Melos AI Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative">
                <div
                  className={`absolute -left-4 -top-4 w-12 h-12 rounded-full bg-${
                    ["pink", "violet", "indigo"][index]
                  }-500 text-white flex items-center justify-center font-bold text-xl`}
                >
                  {index + 1}
                </div>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full aspect-video object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
