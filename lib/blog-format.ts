export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getBlogCategories<T extends { category: string }>(
  posts: T[],
): string[] {
  return [...new Set(posts.map((post) => post.category))].sort();
}
