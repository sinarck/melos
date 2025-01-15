"use client";

import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import Showcase from "@/components/Showcase";
import { useSession } from "@clerk/nextjs"; // Import useSession from Clerk

export default function Home() {
  const { isSignedIn } = useSession(); // Check if the user is signed in

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
  );
}

