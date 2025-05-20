import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function Home() {
  // This would fetch from an API in a real application
  const posts = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js and React.",
      author: "Jane Doe",
      date: "May 15, 2025",
      commentCount: 5,
    },
    {
      id: "2",
      title: "The Power of Server Components",
      excerpt: "Explore how React Server Components can improve your application's performance.",
      author: "John Smith",
      date: "May 10, 2025",
      commentCount: 8,
    },
    {
      id: "3",
      title: "Styling with Tailwind CSS",
      excerpt: "Discover how to create beautiful UIs quickly with utility-first CSS.",
      author: "Alex Johnson",
      date: "May 5, 2025",
      commentCount: 3,
    },
  ]

  return (
    <div className="container p-10 w-full max-w-none">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recent Posts</h1>
        <Link href="/posts/new">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>
                <Link href={`/posts/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>
                By {post.author} • {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/posts/${post.id}`}>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </Link>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{post.commentCount} comments</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
