"use client";

import Link from "next/link";
import { Menu, Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";

export function Header() {
  const [mobileSearch, setMobileSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    setMobileOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];

  const avatarUrl = session?.user?.image ?? null;
  const userName = session?.user?.email?.split("@")[0] ?? "User";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur [backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
            <span className="font-serif text-lg font-bold text-primary-foreground">
              03
            </span>
          </div>
          <span className="hidden font-serif text-lg font-bold sm:inline-block">
            The Press
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={userName} />
                    ) : null}
                    <AvatarFallback className="cursor-pointer">
                      {userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-medium">
                    {session.user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-80 sm:w-96 p-0">
              <DialogHeader className="p-6 pb-4">
                <DialogTitle className="flex items-center gap-3">
                  {session && avatarUrl && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarUrl} alt={userName} />
                      <AvatarFallback>
                        {userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  Menu
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-6 px-6 pb-6">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-secondary/30 text-primary font-bold"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="border-t pt-4">
                  {session ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href="/profile"
                          onClick={() => setMobileOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full" asChild>
                        <Link
                          href="/sign-in"
                          onClick={() => setMobileOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link
                          href="/sign-up"
                          onClick={() => setMobileOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}