"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email,
        password,
        name,
        callbackURL : "/"

      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Success - redirect to dashboard or login
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md min-h-[500px] flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <CardContent className="space-y-6 flex-1 flex flex-col pt-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              disabled={loading}
              className="h-12"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={loading}
              className="h-12"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="password" className="text-base">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={loading}
              className="h-12"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              disabled={loading}
              className="h-12"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </form>
    </Card>
  );
}