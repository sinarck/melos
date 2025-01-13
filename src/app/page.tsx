"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Showcase from "@/components/Showcase"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"
import ProgressBar from "@/components/ProgressBar"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navbar and Progress Bar */}
      <div className="sticky top-0 z-50">
        <Navbar />
        <ProgressBar />
      </div>

      {/* Page Content */}
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <CTA />
      <Footer />
    </main>
  )
}
