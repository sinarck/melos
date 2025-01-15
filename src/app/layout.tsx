"use client";

import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

