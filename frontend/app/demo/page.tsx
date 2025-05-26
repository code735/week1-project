import { AuthButton } from "@/components/auth/auth-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AuthDemoPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Authentication Components Demo</h1>
          <p className="text-lg text-muted-foreground">
            Try out the sign-in and sign-up components with different styles
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sign In Components</CardTitle>
              <CardDescription>Different variations of the sign-in button and modal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Default Button</p>
                <AuthButton mode="signin">Sign In</AuthButton>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Outline Variant</p>
                <AuthButton mode="signin" variant="outline">
                  Sign In
                </AuthButton>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Ghost Variant</p>
                <AuthButton mode="signin" variant="ghost">
                  Sign In
                </AuthButton>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Link Variant</p>
                <AuthButton mode="signin" variant="link">
                  Sign In
                </AuthButton>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sign Up Components</CardTitle>
              <CardDescription>Different variations of the sign-up button and modal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Default Button</p>
                <AuthButton mode="signup">Create Account</AuthButton>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Outline Variant</p>
                <AuthButton mode="signup" variant="outline">
                  Get Started
                </AuthButton>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Large Size</p>
                <AuthButton mode="signup" size="lg" className="w-full">
                  Join Now
                </AuthButton>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Small Size</p>
                <AuthButton mode="signup" size="sm">
                  Sign Up
                </AuthButton>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What's included in these authentication components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Sign In Form</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Email and password fields</li>
                  <li>• Password visibility toggle</li>
                  <li>• Forgot password link</li>
                  <li>• Form validation</li>
                  <li>• Loading states</li>
                  <li>• Switch to sign up</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sign Up Form</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full name, email, and password fields</li>
                  <li>• Password confirmation</li>
                  <li>• Password strength requirements</li>
                  <li>• Terms and conditions checkbox</li>
                  <li>• Form validation</li>
                  <li>• Switch to sign in</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
