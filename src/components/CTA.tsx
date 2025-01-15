import { Button } from "./ui/button";

export default function CTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Get Started Now
        </Button>
      </div>
    </section>
  );
}

