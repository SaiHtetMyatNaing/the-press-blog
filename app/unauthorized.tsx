import { Button } from "@/app/_components/ui/button"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex grow items-center justify-center px-4 text-center bg-background/80 backdrop-blur [backdrop-filter]:bg-background/60">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white/90 drop-shadow-md">
            401 – Unauthorized
          </h1>
          <p className="text-mute text-white/70">
            Please sign in to continue.
          </p>
        </div>
        <div>
          <Button
            asChild
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur [backdrop-filter]:bg-white/10"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}