"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  // This would come from your auth provider in a real app
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = isLoggedIn
    ? { name: "Jane Doe", email: "jane@example.com", image: "/placeholder.svg?height=32&width=32" }
    : null

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="text-xl font-bold">
          BlogSite
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isOpen && (
              <div className="fixed inset-0 top-16 z-50 bg-background p-6 flex flex-col gap-4">
                <Link href="/" onClick={toggleMenu}>
                  Home
                </Link>
                <Link href="/posts" onClick={toggleMenu}>
                  All Posts
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/posts/new" onClick={toggleMenu}>
                      Create Post
                    </Link>
                    <Link href="/profile" onClick={toggleMenu}>
                      Profile
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        toggleMenu()
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      handleLogin()
                      toggleMenu()
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/posts" className="text-sm font-medium hover:underline underline-offset-4">
              All Posts
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/posts/new" className="w-full">
                      Create Post
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin}>Sign In</Button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
