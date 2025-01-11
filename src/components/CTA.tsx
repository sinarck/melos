import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Images into Music?
        </h2>
        <p className="text-xl text-white/80 mb-8">
          Join thousands of users discovering new music through visual
          inspiration.
        </p>
        <Button
          className="px-8 py-6 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
        >
          Get Started Free
        </Button>
      </div>
    </section>
  )
}

