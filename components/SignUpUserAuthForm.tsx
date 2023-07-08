"use client";

import React, { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Database } from "@/lib/database.types";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  async function handleSignUp(event: React.SyntheticEvent) {
    event.preventDefault();

    if (password !== confirmPassword) return;

    setIsLoading(true);
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    router.refresh();

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSignUp}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label
              className="mb-1 text-slate-600"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label
              className="mt-3 mb-1 text-slate-600"
              htmlFor="email"
            >
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••••••"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label
              className="mt-3 mb-1 text-slate-600"
              htmlFor="email"
            >
              Confirm password
            </Label>
            <Input
              id="password"
              placeholder="••••••••••••"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
