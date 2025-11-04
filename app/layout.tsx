import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Footer from "@/components/footer"
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/header"


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "The Press - Modern Editorial Blog",
  description: "Thoughtful articles on technology, finance, and lifestyle",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        <NuqsAdapter>
          <Header/>
          {children}
          <Footer/>
          </NuqsAdapter>
        <Analytics />
        <Toaster/>
      </body>
    </html>
  )
}
