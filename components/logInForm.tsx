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
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const onSubmit = async (data: LoginFormData) => {
  try {
    const { error } = await signIn.email({
      email: data.email,  
      password: data.password,
      callbackURL: "/blogs",
    });

    if (error) {
      toast({
        variant: "destructive",
        description: error.message || "Login failed—check your credentials.",
      });
      return;
    }

    toast({
      variant: "default",
      description: "Successfully Signed In",
    });

    form.reset();
    router.push("/blogs"); 
  } catch (err) {

    toast({
      variant: "destructive",
      description: "An unexpected error occurred. Please try again.",
    });
  }
};

  return (
    <Card className="w-full max-w-md min-h-[500px] flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col"
        >
          <CardContent className="space-y-6 flex-1 flex flex-col pt-6">
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

            <Button
              type="submit"
              className="w-full h-12 text-base cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
