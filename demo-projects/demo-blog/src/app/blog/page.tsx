import Link from "next/link";
import {
  getAllMarkdownPosts,
  getAllApiPosts,
  ApiPost,
  PostSummary,
} from "@/lib/posts";

export default async function Blog() {
  const markdownPosts = getAllMarkdownPosts();
  const apiPosts: ApiPost[] = await getAllApiPosts();

  // Normalize both into PostSummary
  const posts: PostSummary[] = [
    ...markdownPosts.map((m) => ({ id: m.id, title: m.title })),
    ...apiPosts.map((p) => ({ id: p.id.toString(), title: p.title })),
  ];

  return (
    <div className="mx-auto my-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-5">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-3">
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
