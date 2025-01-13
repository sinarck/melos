"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div className="h-2 fixed top-0 left-0 w-full bg-gray-800 z-50">
      <div
        className="h-full bg-pink-500"
        style={{ width: `${scrollProgress}%`, transition: "width 0ms linear" }} // No delay
      ></div>
    </div>
  );
}
