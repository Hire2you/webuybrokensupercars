import type { BlogPostMeta } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog-format";

type BlogMetaProps = {
  post: Pick<BlogPostMeta, "date" | "author" | "readingTime">;
  theme?: "light" | "dark";
  className?: string;
};

export default function BlogMeta({
  post,
  theme = "light",
  className = "",
}: BlogMetaProps) {
  const isDark = theme === "dark";
  const textClass = isDark ? "text-white/50" : "text-text-secondary";
  const dividerClass = isDark ? "text-white/25" : "text-line";

  const items = [
    formatBlogDate(post.date),
    post.author,
    post.readingTime,
  ].filter(Boolean);

  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${textClass} ${className}`}
    >
      {items.map((item, index) => (
        <span key={item} className="inline-flex items-center gap-3">
          {index > 0 ? (
            <span aria-hidden="true" className={dividerClass}>
              /
            </span>
          ) : null}
          <span>{item}</span>
        </span>
      ))}
    </p>
  );
}
