import { faker } from '@faker-js/faker';
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils/post.utils.ts
export function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200); // Average 200 words per minute
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") + faker.string.uuid().slice(0,4)
}
