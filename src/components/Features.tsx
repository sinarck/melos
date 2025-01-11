"use client"

import { Image, Sparkles, Share2 } from 'lucide-react'
import { ScrollAnimation } from './ScrollAnimation'

const features = [
  {
    icon: Image,
    title: "Visual Analysis",
    description: "Our AI analyzes the mood, colors, and context of your images to understand their emotional essence.",
    color: "pink",
  },
  {
    icon: Sparkles,
    title: "Smart Matching",
    description: "Get perfectly matched songs from Spotify, Apple Music, and trending TikTok tracks.",
    color: "violet",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your discoveries instantly on social media or add them to your music library.",
    color: "indigo",
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-black/20 backdrop-blur-xl py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Discover the Power of AI-Powered Music Discovery
          </h2>
        </ScrollAnimation>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollAnimation key={index}>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/20 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

