"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">Stay Updated</h2>
          <p className="text-muted-foreground text-lg">Get the latest articles delivered to your inbox every week.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-background text-foreground placeholder-muted-foreground rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {submitted ? (
              <>
                <Check className="w-5 h-5" />
                Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
