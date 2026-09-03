import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import Section from "@/components/Section";
import BlogCoverImage from "@/app/blog/components/BlogCoverImage";
import BlogMeta from "@/app/blog/components/BlogMeta";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
  RevealLine,
  SettleImage,
} from "@/components/motion";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import type { ComponentPropsWithoutRef } from "react";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-10 text-2xl font-bold tracking-tight text-bg-dark md:text-[1.65rem]"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 text-xl font-bold tracking-tight text-bg-dark"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-text-secondary md:text-lg"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-text-secondary md:text-lg"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-red-primary underline-offset-2 hover:underline"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-bg-dark" {...props} />
  ),
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      title: "Article not found",
      description: "The article you are looking for could not be found.",
      path: `/blog/${slug}`,
      robots: {
        index: false,
        follow: true,
      },
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImage: post.coverImage,
    ogType: "article",
    publishedTime: post.date,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
          author: post.author,
          coverImage: post.coverImage,
        })}
      />
      <Section
        id="article-hero"
        background="black"
        className="relative overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -right-24 top-0 h-[24rem] w-[24rem] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(226,27,22,0.18) 0%, transparent 68%)",
            }}
          />
        </div>

        <div className="relative z-10">
          <RevealGroup>
            <RevealItem>
              <Link
                href="/blog"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary transition-colors hover:text-red-bright"
              >
                Back to blog
              </Link>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                {post.category}
              </p>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[2.85rem] lg:leading-[1.08]">
                {post.title}
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                {post.description}
              </p>
            </RevealItem>
            <RevealItem>
              <BlogMeta post={post} theme="dark" className="mt-6" />
            </RevealItem>
            <RevealItem>
              <RevealLine className="mt-8 h-px w-24 origin-left bg-red-primary/70" />
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section id="article-cover" background="offwhite" compact>
        <RevealFrom direction="left">
          <SettleImage className="relative aspect-[21/9] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10">
            <BlogCoverImage
              src={post.coverImage}
              alt={post.title}
              priority
              sizes="100vw"
            />
          </SettleImage>
        </RevealFrom>
      </Section>

      <Section id="article-content" background="white">
        <RevealFrom direction="right" className="mx-auto max-w-3xl">
          <article className="min-w-0">
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>
          <div className="mt-12 border-t border-border-primary pt-10">
            <Button href="/#valuation" showArrow>
              Get your free valuation
            </Button>
          </div>
        </RevealFrom>
      </Section>

      <CTAband />
    </>
  );
}
