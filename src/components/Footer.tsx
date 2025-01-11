import { Music2 } from 'lucide-react'

const footerSections = [
  {
    title: "Product",
    links: ["Features", "How it Works", "Pricing"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music2 className="w-6 h-6 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                Melos AI
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Transforming visual inspiration into musical discovery.
            </p>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 Melos AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

