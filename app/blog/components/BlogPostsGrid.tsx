"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { BlogPostMeta } from "@/lib/blog";
import BlogCoverImage from "@/app/blog/components/BlogCoverImage";
import BlogMeta from "@/app/blog/components/BlogMeta";
import { RevealGroup, RevealItem } from "@/components/motion";
import {
  createLineVariants,
  createSettleImageVariants,
} from "@/lib/motion";

type BlogPostsGridProps = {
  posts: BlogPostMeta[];
  categories: string[];
};

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors motion-reduce:transition-none ${
        active
          ? "border-red-primary bg-red-primary text-white"
          : "border-border-primary bg-bg-surface text-text-secondary hover:border-red-primary/70 hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function ArticleCard({ post }: { post: BlogPostMeta }) {
  const reducedMotion = useReducedMotion();
  const settleVariants = createSettleImageVariants(reducedMotion);
  const lineVariants = createLineVariants(reducedMotion);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="motion-card-hover group relative flex h-full flex-col overflow-hidden rounded-md border border-border-primary bg-bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-red-primary/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border-primary">
        <motion.div
          variants={settleVariants}
          className="absolute inset-0 overflow-hidden"
        >
          {post.coverImage ? (
            <BlogCoverImage
              src={post.coverImage}
              alt={post.title}
              className="motion-img-zoom object-cover object-center"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          ) : (
            <PlaceholderImage
              label={post.title}
              aspectRatio="16/10"
              className="absolute inset-0 h-full w-full rounded-none ring-0"
            />
          )}
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-red-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {post.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-bold tracking-tight text-text-primary md:text-xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {post.description}
        </p>
        <div className="mt-auto pt-5">
          <BlogMeta post={post} theme="light" />
          <motion.span
            aria-hidden="true"
            variants={lineVariants}
            className="motion-accent-line mt-4 block h-px w-8 origin-left bg-red-primary"
          />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPostsGrid({
  posts,
  categories,
}: BlogPostsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) {
      return posts;
    }

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <>
      {categories.length > 1 ? (
        <div className="mb-10 flex flex-wrap gap-2 md:mb-12">
          <CategoryPill
            label="All"
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((category) => (
            <CategoryPill
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      ) : null}

      {filteredPosts.length > 0 ? (
        <RevealGroup
          as="ul"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {filteredPosts.map((post) => (
            <RevealItem as="li" key={post.slug} className="list-none">
              <ArticleCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <p className="text-base text-text-secondary">
          No articles in this category yet.
        </p>
      )}
    </>
  );
}
