"use client";

import Image from "next/image";
import { BadgePoundSterling, Car } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Section from "@/components/Section";
import {
  CountUp,
  RevealGroup,
  RevealItem,
} from "@/components/motion";
import { createLineVariants } from "@/lib/motion";

type Review = {
  quote: string;
  name: string;
  location: string;
  modelTag: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Our Lamborghini Huracán had turbo issues we could not afford to repair. I found these guys on Google and the process was so quick and easy — quoted and collected the same day.",
    name: "Jason",
    location: "Maidstone",
    modelTag: "Sold a Lamborghini Huracán",
  },
  {
    quote:
      "Cannot recommend these guys enough. I have sold both my Ferrari and my wife's Bentley to them over the past year. They make selling a broken supercar so easy.",
    name: "Mark",
    location: "Canterbury",
    modelTag: "Sold a Ferrari 488",
  },
  {
    quote:
      "The staff are very friendly. I was surprised at how much they ended up offering — quotes from non-specialist buyers were nowhere near what these guys offered. Same-day payment as well.",
    name: "Sharron",
    location: "Dartford",
    modelTag: "Sold a Porsche 911",
  },
];

function CardStarRow({ label = "5 out of 5 stars" }: { label?: string }) {
  return (
    <div className="flex gap-1 text-red-primary" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            d="m12 3.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.6 7.2 18.1l.9-5.4-3.9-3.8 5.4-.8z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  featured = false,
}: {
  review: Review;
  featured?: boolean;
}) {
  const initial =
    review.name.replace(/[[\]]/g, "").trim().charAt(0).toUpperCase() || "N";

  return (
    <article
      className={`motion-card-hover group rounded-md border border-[#272727] bg-bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-red-primary/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        featured ? "p-7 sm:p-8" : "p-6 sm:p-7"
      }`}
    >
      <CardStarRow />
      <blockquote
        className={`mt-4 leading-relaxed text-text-secondary ${
          featured ? "text-base sm:text-[1.0625rem]" : "text-sm sm:text-base"
        }`}
      >
        <p>&ldquo;{review.quote}&rdquo;</p>
      </blockquote>
      <div
        className="my-5 h-px bg-border-primary"
        role="separator"
        aria-hidden="true"
      />
      <footer className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-primary/15 text-sm font-bold text-red-primary"
          >
            {initial}
          </span>
          <cite className="min-w-0 not-italic">
            <span className="block truncate font-semibold text-text-primary">
              {review.name}
            </span>
            <span className="block truncate text-sm text-text-muted">
              {review.location}
            </span>
          </cite>
        </div>
        <span className="w-fit shrink-0 rounded-sm border border-border-primary bg-bg-dark px-3 py-1 text-xs font-medium text-text-muted">
          {review.modelTag}
        </span>
      </footer>
    </article>
  );
}

export default function Testimonials() {
  const [featuredReview, ...otherReviews] = REVIEWS;
  const reducedMotion = useReducedMotion();
  const lineVariants = createLineVariants(reducedMotion);

  return (
    <Section id="reviews" background="black" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full opacity-80 blur-3xl"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 5%, transparent) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="relative z-10 grid items-start gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:items-center lg:gap-14 xl:gap-16">
        <div className="flex min-w-0 flex-col justify-center">
          <RevealGroup>
            <RevealItem>
              <div aria-hidden="true" className="mb-6 sm:mb-8">
                <Image
                  src="/logo.webp"
                  alt=""
                  width={2000}
                  height={1200}
                  className="h-12 w-auto sm:h-14"
                />
              </div>
            </RevealItem>

            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                SELLER STORIES
              </p>
            </RevealItem>

            <RevealItem>
              <h2 className="mt-4 max-w-sm text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                What supercar owners say about us
              </h2>
            </RevealItem>

            <RevealItem>
              <div className="relative mt-10 flex max-w-xs flex-col gap-3 pt-8 sm:mt-12 sm:gap-4 sm:pt-9">
                <motion.span
                  aria-hidden="true"
                  variants={lineVariants}
                  className="absolute inset-x-0 top-0 block h-px origin-left bg-red-primary/40"
                />

                <div className="rounded-md border border-red-primary/30 bg-red-primary/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Car
                      size={24}
                      strokeWidth={2.25}
                      aria-hidden
                      className="shrink-0 text-red-primary"
                    />
                    <p className="text-base font-semibold leading-snug text-text-primary sm:text-lg">
                      <CountUp value={100} suffix="+ jags paid" />
                    </p>
                  </div>
                </div>

                <div className="rounded-md border border-border-primary bg-bg-surface px-5 py-4">
                  <div className="flex items-center gap-3">
                    <BadgePoundSterling
                      size={24}
                      strokeWidth={2.25}
                      aria-hidden
                      className="shrink-0 text-red-primary"
                    />
                    <p className="text-base font-semibold leading-snug text-text-primary sm:text-lg">
                      Paid upon collection
                    </p>
                  </div>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>

        <RevealGroup className="flex min-w-0 flex-col gap-5 sm:gap-6">
          <RevealItem>
            <ReviewCard review={featuredReview} featured />
          </RevealItem>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {otherReviews.map((review) => (
              <RevealItem key={review.modelTag}>
                <ReviewCard review={review} />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </Section>
  );
}
