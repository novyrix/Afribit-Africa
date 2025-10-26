import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold text-bitcoin">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
            <p className="text-xl text-muted-foreground">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/programs">
                Browse Programs
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
