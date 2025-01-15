"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";

function LoginCard({
  onSubmit,
  isLoading,
}: {
  onSubmit: (e: React.SyntheticEvent) => void;
  isLoading: boolean;
}) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-white">Login</CardTitle>
          <CardDescription className="text-white">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-white/20 border-white/30 text-white placeholder-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-white/20 border-white/30 text-white placeholder-white/50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function RegisterCard({
  onSubmit,
  isLoading,
}: {
  onSubmit: (e: React.SyntheticEvent) => void;
  isLoading: boolean;
}) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-white">Create an account</CardTitle>
          <CardDescription className="text-white">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              required
              className="bg-white/20 border-white/30 text-white placeholder-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-white/20 border-white/30 text-white placeholder-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-white/20 border-white/30 text-white placeholder-white/50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create account
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<"login" | "register">(
    "login"
  );
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 3000);
  }

  async function handleGitHubLogin() {
    setIsLoading(true);
    // Implement GitHub OAuth login here
    // For example:
    // window.location.href = '/api/auth/github'
    console.log("GitHub login clicked");
    setIsLoading(false);
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    // Implement Google OAuth login here
    // For example:
    // window.location.href = '/api/auth/google'
    console.log("Google login clicked");
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/20">
          <TabsTrigger
            value="login"
            onClick={() => setActiveTab("login")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeTab === "login"
                ? "text-white bg-white/20"
                : "text-white/70 hover:text-white"
            )}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            onClick={() => setActiveTab("register")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeTab === "register"
                ? "text-white bg-white/20"
                : "text-white/70 hover:text-white"
            )}
          >
            Register
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "login" ? (
              <LoginCard onSubmit={onSubmit} isLoading={isLoading} />
            ) : (
              <RegisterCard onSubmit={onSubmit} isLoading={isLoading} />
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-purple-900 px-2 text-white/60">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={handleGitHubLogin}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={handleGoogleLogin}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>
    </div>
  );
}

