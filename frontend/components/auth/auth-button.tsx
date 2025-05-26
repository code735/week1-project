"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"

interface AuthButtonProps {
  mode?: "signin" | "signup"
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
  children?: React.ReactNode
}

export function AuthButton({
  mode = "signin",
  variant = "default",
  size = "default",
  className,
  children,
}: AuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setIsModalOpen(true)}>
        {children || (mode === "signin" ? "Sign In" : "Sign Up")}
      </Button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defaultMode={mode} />
    </>
  )
}
