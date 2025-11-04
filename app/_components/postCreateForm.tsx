"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  CreatePostFormInput,
  createPostFormSchema,
} from "@/server/validations/post.schema";
import { createPostAction } from "@/server/actions/post.action";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";

export default function CreatePost({
  categories,
}: {
  categories: { title: string; id: string }[];
}) {
  const router = useRouter();

  const form = useForm<CreatePostFormInput>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      categoryId: categories[0]?.id || "", // Fixed: access first item in array
    },
  });

  async function onSubmit(data: CreatePostFormInput) {

    const result = await createPostAction(data);

    if (result.success) {
      router.push("/profile");
    } else {
      form.setError("root", {
        type: "server",
        message: result.error,
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="border-b bg-background">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm" className="cursor-pointer">
            <Link href="/profile">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">
              Create New Article
            </CardTitle>
            <CardDescription>
              Fill in the details and publish your article.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Server Error Display */}
            {form.formState.errors.root && (
              <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {form.formState.errors.root.message}
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FieldGroup>
                {/* Title */}
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="blog-title">Title</FieldLabel>
                      <Input
                        {...field}
                        id="blog-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter the title"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Category */}
                <Controller
                  name="categoryId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="blog-category">Category</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="blog-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Excerpt */}
                <Controller
                  name="excerpt"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="blog-excerpt">Excerpt</FieldLabel>
                      <Textarea
                        {...field}
                        id="blog-excerpt"
                        aria-invalid={fieldState.invalid}
                        rows={3}
                        placeholder="Brief summary of your article"
                        className="resize-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Content */}
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="blog-content">
                        Article Content
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="blog-content"
                        aria-invalid={fieldState.invalid}
                        rows={10}
                        placeholder="Write your article content here..."
                        className="resize-none font-mono text-sm"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Thumbnail */}
                <Controller
                  name="thumbnail"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="blog-thumbnail">
                        Thumbnail URL
                      </FieldLabel>
                      <Input
                        {...field}
                        id="blog-thumbnail"
                        type="url"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://..."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Action Buttons */}
              <Field className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex-1 transform-gpu transition-all duration-150 ease-out active:scale-95 hover:scale-105 cursor-pointer disabled:opacity-50"
                >
                  {form.formState.isSubmitting
                    ? "Publishing..."
                    : "Publish Article"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="flex-1 transform-gpu transition-all duration-150 ease-out active:scale-95 hover:scale-105 cursor-pointer"
                >
                  <Link href="/profile">Cancel</Link>
                </Button>
              </Field>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}