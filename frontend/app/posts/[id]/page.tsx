import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommentForm } from "@/components/comment-form"

export default function PostPage({ params }: { params: { id: string } }) {
  // This would fetch from an API in a real application
  const post = {
    id: params.id,
    title:
      params.id === "1"
        ? "Getting Started with Next.js"
        : params.id === "2"
          ? "The Power of Server Components"
          : "Styling with Tailwind CSS",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Key Points</h2>
      <ul>
        <li>First important point about this topic</li>
        <li>Second key insight that readers should know</li>
        <li>Third valuable piece of information</li>
      </ul>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `,
    author: {
      name: params.id === "1" ? "Jane Doe" : params.id === "2" ? "John Smith" : "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "May 15, 2025",
    comments: [
      {
        id: "c1",
        author: {
          name: "Sarah Parker",
          image: "/placeholder.svg?height=32&width=32",
        },
        content: "Great article! I learned a lot from this.",
        date: "May 16, 2025",
      },
      {
        id: "c2",
        author: {
          name: "Michael Brown",
          image: "/placeholder.svg?height=32&width=32",
        },
        content: "I have a question about the second point. Could you elaborate more on that?",
        date: "May 17, 2025",
      },
    ],
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <article className="prose prose-stone dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-2 mb-8 text-muted-foreground">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{post.author.name}</p>
              <p className="text-xs">{post.date}</p>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <Separator className="my-10" />

        <section>
          <h2 className="text-2xl font-bold mb-6">Comments ({post.comments.length})</h2>

          <div className="space-y-6">
            {post.comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.image || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.date}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
            <CommentForm postId={post.id} />
          </div>
        </section>
      </div>
    </div>
  )
}
