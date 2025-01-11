import { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login - Melos AI",
  description: "Login to your Melos AI account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

