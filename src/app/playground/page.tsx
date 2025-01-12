import Navbar from "@/components/Navbar"
import ImagePlayground from "@/components/ImagePlayground"
import Footer from "@/components/Footer"

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Melos AI Playground
        </h1>
        <p className="text-xl text-white/80 text-center mb-12">
          Upload an image and discover music that matches its mood and atmosphere.
        </p>
        <ImagePlayground />
      </div>
      <Footer />
    </main>
  )
}

