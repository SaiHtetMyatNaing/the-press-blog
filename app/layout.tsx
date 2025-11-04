import type React from "react";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "@/app/_components/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/app/_components/ui/sonner";
import { Header } from "@/app/_components/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  // Basic
  title: {
    default: "The Press - Modern Editorial Blog",
    template: " The Press | %s ",
  },
  description:
    "Thoughtful, in-depth articles on technology, finance, lifestyle, and culture. Curated insights for the modern reader.",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://the-press-blog.vercel.app/",
    siteName: "The Press",
    title: "The Press - Modern Editorial Blog",
    description:
      "Thoughtful, in-depth articles on technology, finance, lifestyle, and culture.",
    images: [
      {
        url: "https://the-press-blog.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Press - Modern Editorial Blog",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@ThePressBlog",
    creator: "@ThePressBlog",
    title: "The Press - Modern Editorial Blog",
    description:
      "Thoughtful articles on tech, finance, and lifestyle. Read the latest.",
    images: [
      {
        url: "https://the-press-blog.vercel.app/og-image.png",

        alt: "The Press Blog",
      },
    ],
  },

  // Additional SEO & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },


};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        <NuqsAdapter>
          <Header />
          {children}
          <Footer />
        </NuqsAdapter>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
