"use client";

import { useState, useEffect } from "react";
import { Music2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, UserButton } from "@clerk/nextjs"; // Import UserButton from Clerk

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useSession(); // Get sign-in status from Clerk
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`navbar-blur border-b border-white/10 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "scrolled shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Music2 className="w-8 h-8 text-pink-500" />
            </Link>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
            >
              Melos AI
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {["features", "how-it-works", "showcase"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative group"
              >
                <span className="text-white/80 hover:text-white transition-colors">
                  {section
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/shivenv123"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-white transition-colors transform hover:scale-110 hover:rotate-3 duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            {/* Only render the Log In button if the user is not signed in */}
            {!isSignedIn ? (
              <Button
                className="bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90 transition-all duration-300 hover:scale-105"
                onClick={() => router.push("/login")}
              >
                Log In
              </Button>
            ) : (
              // Render UserButton when the user is signed in
              <div className="flex items-center">
                <UserButton  />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
