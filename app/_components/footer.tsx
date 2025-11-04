import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">03</span>
              </div>
              <span className="font-serif text-lg font-bold">The Press</span>
            </div>
            <p className="text-sm opacity-75">Thoughtful articles on technology, finance, and culture.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Tech
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Follow</h4>
            <div className="flex gap-4">
              <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-75">
            <p>&copy; 2025 The Press. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
