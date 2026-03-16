/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useTheme } from "next-themes"
import { StarButton } from "../ui/star-button"

const LINKS = [
  { label: "Özellikler", href: "#features" },
  { label: "Fiyatlar", href: "/billing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
  { label: "Destek", href: "/support" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()
  const [lightColor, setLightColor] = useState("#ff7300")
  useEffect(() => {
    setLightColor(theme === "dark" ? "#ff7300" : "#ff7300")
  }, [theme])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <img src="/logo.png" alt="Worktio Logo" className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold text-foreground">Worktio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <StarButton lightColor={lightColor} className="rounded-3xl px-10 py-4 border border-primary text-primary hover:bg-primary/10"> 
              <Link href="/login">Login</Link>
            </StarButton>


            {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get started free
            </Button> */}
            {/* <LanguageSwitcher /> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  onClick={() => router.push("/login")}
                  variant="ghost" className="w-full text-foreground">

                </Button>
                <Button className="w-full bg-primary text-primary-foreground">
                  Get started free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
