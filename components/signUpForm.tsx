"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Add this for spinner; npm i lucide-react

import { signUp } from "@/lib/auth-client"; // Adjust to signUp if available
import { toast } from "sonner";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (signUpData: SignUpFormData) => {
    try {
      // Assuming your auth lib supports name; otherwise, handle post-signup
      const { error } = await signUp.email({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        callbackURL: "/blogs",
      });

      if (error) {
        toast.error(error.message || "Something went wrong");
        return;
      }

      // Success
      toast.success("Sign Up Successful!");
      form.reset(); // Clear form
      router.push("/blogs");
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md min-h-[500px] flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col"
        >
          <CardContent className="space-y-6 flex-1 flex flex-col pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
