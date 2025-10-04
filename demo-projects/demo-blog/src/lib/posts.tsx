import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface MarkdownPost {
  id: string;
  title: string;
  date?: string;
  author?: string;
  content: string;
  contentHtml?: string;
}

export interface ApiPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Unified type for Blog listing
export type PostSummary = {
  id: string;
  title: string;
};


const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export function getAllMarkdownPosts(): MarkdownPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, fileName),
      "utf8"
    );
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title ?? "Untitled",
      date: data.date,
      author: data.author,
      content,
    };
  });
}

export async function getMarkdownPostById(id: string): Promise<MarkdownPost> {
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, `${id}.md`),
    "utf8"
  );
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: data.title ?? "Untitled",
    date: data.date,
    author: data.author,
    content,
    contentHtml,
  };
}

// ----- API Option (Option B) -----
export async function getAllApiPosts(): Promise<ApiPost[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export async function getApiPostById(id: string): Promise<ApiPost> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}