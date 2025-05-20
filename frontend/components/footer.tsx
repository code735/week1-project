import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} BlogSite. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm text-muted-foreground hover:underline">
            About
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
