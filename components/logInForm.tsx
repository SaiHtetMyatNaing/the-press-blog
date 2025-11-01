"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL : "/"
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Success - manually redirect
        router.push("/dashboard");
        router.refresh(); // Refresh server components
      }
    } catch (error) {
      setError("Email Or Password incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md min-h-[500px] flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <CardContent className="space-y-6 flex-1 flex flex-col pt-6">
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

          <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
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