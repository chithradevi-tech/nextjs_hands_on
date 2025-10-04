import { getMarkdownPostById, getAllMarkdownPosts, getApiPostById } from '@/lib/posts';

interface BlogPostProps {
  params: { id: string }
}

// 👇 This runs at build time
export async function generateStaticParams() {
  // Look into /posts directory → return ids like ["first-post", "second-post"]
  const posts = getAllMarkdownPosts(); // Only Markdown for SSG
  return posts.map(post => ({ id: post.id }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  // When someone visits /blog/first-post, Next.js already knows it exists
  let post;

  try {
    post = await getMarkdownPostById(params.id); // Try Markdown
  } catch {
    post = await getApiPostById(params.id);     // Fallback to API
  }

  return (
    <div className="prose mx-auto my-10">
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html:
            "contentHtml" in post
              ? post.contentHtml || ""
              : (post as any).body || "",
        }}
      />
    </div>
  );
}
