"use client";

import Footer from "@/components/Footer";
import ImagePlayground from "@/components/ImagePlayground";
import Navbar from "@/components/Navbar";
import { Sparkles } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center space-x-3 mt-4">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            MelosAI Playground
          </h1>
        </div>
      </div>

      {/* Position StaggeredDropDown on the top left of the ImagePlayground */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xl text-white/80 text-center mb-12">
          Upload an image and discover music that matches its mood and
          atmosphere.
        </p>
        <ImagePlayground />
      </div>
      <Footer />
    </main>
  );
}

