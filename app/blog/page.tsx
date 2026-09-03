import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import BlogCoverImage from "@/app/blog/components/BlogCoverImage";
import BlogMeta from "@/app/blog/components/BlogMeta";
import BlogPostsGrid from "@/app/blog/components/BlogPostsGrid";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
  RevealLine,
  SettleImage,
} from "@/components/motion";
import { getAllPosts } from "@/lib/blog";
import { getBlogCategories } from "@/lib/blog-format";

export const metadata = buildPageMetadata({
  title: "Supercar Selling Guides & News",
  description:
    "Expert guides, tips and news on selling broken, damaged and non-running supercars in the UK. Fair valuations, common faults explained, and practical selling advice.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);
  const categories = getBlogCategories(posts);

  return (
    <>
      <Section
        id="blog-hero"
        background="black"
        className="relative overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-55 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 13%, transparent) 0%, transparent 68%)",
            }}
          />
          <svg
            className="absolute inset-y-0 right-0 h-full w-[38%] opacity-[0.06]"
            viewBox="0 0 200 600"
            preserveAspectRatio="none"
            fill="none"
          >
            <line
              x1="100"
              y1="600"
              x2="100"
              y2="0"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="18 28"
            />
            <line
              x1="0"
              y1="600"
              x2="200"
              y2="80"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="600"
              x2="200"
              y2="160"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <SectionHeading
            eyebrow="THE BLOG"
            title="supercar guides, tips and news"
            intro="Everything you need to know about selling a broken, damaged or non-running supercar."
            align="left"
            theme="dark"
            titleSize="display"
            headingLevel="h1"
          />
          <RevealLine className="mt-8 h-px w-24 origin-left bg-red-primary/70" />
        </div>
      </Section>

      {featuredPost ? (
        <Section id="featured-post" background="offwhite">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
            <RevealFrom direction="left" className="min-w-0 lg:order-1">
              <SettleImage className="relative aspect-[16/10] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10">
                <BlogCoverImage
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </SettleImage>
            </RevealFrom>

            <RevealFrom direction="right" className="min-w-0 lg:order-2">
              <RevealGroup>
                <RevealItem>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                    {featuredPost.category}
                  </p>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="transition-colors hover:text-red-primary"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                    {featuredPost.description}
                  </p>
                </RevealItem>
                <RevealItem>
                  <BlogMeta post={featuredPost} className="mt-6" />
                </RevealItem>
                <RevealItem>
                  <Button
                    href={`/blog/${featuredPost.slug}`}
                    showArrow
                    className="mt-8"
                  >
                    Read article
                  </Button>
                </RevealItem>
              </RevealGroup>
            </RevealFrom>
          </div>
        </Section>
      ) : (
        <Section id="featured-post" background="offwhite">
          <p className="text-base text-text-secondary">
            Articles coming soon. Check back for supercar selling guides and news.
          </p>
        </Section>
      )}

      {remainingPosts.length > 0 ? (
        <Section id="recent-posts" background="white">
          <RevealGroup className="mb-10 md:mb-12">
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                RECENT ARTICLES
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
                More from the blog
              </h2>
            </RevealItem>
          </RevealGroup>

          <BlogPostsGrid posts={remainingPosts} categories={categories} />
        </Section>
      ) : null}

      <CTAband />
    </>
  );
}
