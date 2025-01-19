"use client";

import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { dark } from "@clerk/themes";
import { Appearance } from "@clerk/types";

const appearance: Appearance = {
  baseTheme: dark,
  elements: {
    rootBox: "w-full max-w-md",
    card: "bg-white/10 backdrop-blur-md border-white/20",
    headerTitle: "text-white",
    headerSubtitle: "text-white",
    socialButtonsBlockButton: 
      "bg-white/10 border-white/30 text-white hover:bg-white/20",
    socialButtonsBlockButtonText: "text-white",
    socialButtonsBlockButtonArrow: "text-white",
    dividerLine: "bg-white/20",
    dividerText: "text-white/60 bg-purple-900",
    formButtonPrimary: 
      "bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90",
    formFieldInput: 
      "bg-white/20 border-white/30 text-white placeholder-white/50",
    formFieldLabel: "text-white",
    footerActionLink: "text-violet-300 hover:text-violet-200",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-violet-300 hover:text-violet-200",
    navbar: "hidden",
    main: "w-full flex items-center justify-center px-4",
    internal: "w-full flex flex-col gap-6"
  },
  layout: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton" // Changed to a valid value
  },
};

export default function LoginPage() {
  const router = useRouter();

  return (
    <ClerkProvider appearance={appearance}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <SignIn 
          routing="hash"
          appearance={appearance}
          
          signUpUrl="/sign-up"
        />
      </div>
    </ClerkProvider>
  );
}