"use client";

import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation"; // Correct import for client-side routing
import { useEffect } from "react";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is signed in and redirect them to Home if so
    const redirectToHome = () => {
      if (window.Clerk && window.Clerk.session) {
        router.push("/home"); // Adjust this path to your actual Home page path
      }
    };

    // If already signed in, redirect right away
    if (window.Clerk?.session) {
      redirectToHome();
    }
  }, [router]);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <SignIn routing="hash" />
          </SignedOut>
          <SignedIn>{children}</SignedIn>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}

