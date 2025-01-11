"use client"

import ImageUpload from './ImageUpload'
import { ScrollAnimation } from './ScrollAnimation'

export default function Showcase() {
  return (
    <section id="showcase" className="bg-black/20 backdrop-blur-xl py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            See Melos AI in Action
          </h2>
          <ImageUpload />
      </div>
    </section>
  )
}

