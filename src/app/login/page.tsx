"use client";

import { ClerkProvider, SignIn, SignedIn, SignedOut, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { isSignedIn } = useSession(); // Using Clerk's useSession hook

  useEffect(() => {
    if (isSignedIn) {
      // If the user is signed in, redirect to /home
      router.push("/home");
    }
  }, [isSignedIn, router]); // Dependency array with isSignedIn to trigger the effect when authentication status changes

  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="w-full max-w-md">
          <SignedOut>
            <SignIn routing="hash" />
          </SignedOut>
          <SignedIn>
            {/* This block is optional and will display while redirecting */}
            <div>Redirecting...</div>
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  );
}
