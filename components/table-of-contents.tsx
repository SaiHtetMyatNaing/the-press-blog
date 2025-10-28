"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface Section {
  id: string
  title: string
}

export default function TableOfContents({ sections }: { sections: Section[] }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-muted rounded-sm p-6">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full mb-4">
        <h3 className="font-serif font-bold text-foreground">Table of Contents</h3>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <nav className="space-y-2">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              {section.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
