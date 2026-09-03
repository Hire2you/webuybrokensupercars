import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  coverImage: string;
  readingTime?: string;
};

export type BlogPostMeta = BlogPostFrontmatter & {
  slug: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function getMdxFilenames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

function parsePostFile(filename: string): BlogPost {
  const slug = slugFromFilename(filename);
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? ""),
    category: String(data.category ?? ""),
    coverImage: String(data.coverImage ?? ""),
    readingTime: data.readingTime ? String(data.readingTime) : undefined,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getMdxFilenames()
    .map((filename) => {
      const { content: _content, ...meta } = parsePostFile(filename);
      return meta;
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.mdx`;
  const filePath = path.join(BLOG_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parsePostFile(filename);
}

export function getAllPostSlugs(): string[] {
  return getMdxFilenames().map(slugFromFilename);
}
