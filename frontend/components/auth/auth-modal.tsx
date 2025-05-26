"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SignInForm } from "./signin-form"
import { SignUpForm } from "./signup-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "signin" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode)

  const handleSuccess = () => {
    onClose()
    // You might want to refresh the page or update global state here
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {mode === "signin" ? (
          <SignInForm onSuccess={handleSuccess} onSignUpClick={() => setMode("signup")} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} onSignInClick={() => setMode("signin")} />
        )}
      </DialogContent>
    </Dialog>
  )
}
