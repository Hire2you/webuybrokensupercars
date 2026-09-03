"use client";

import { RevealGroup, RevealItem, type TriggerMode } from "./motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  titleSize?: "default" | "display";
  revealTrigger?: TriggerMode;
  headingLevel?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  theme = "light",
  titleSize = "default",
  revealTrigger = "viewport",
  headingLevel = "h2",
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const isDark = theme === "dark";
  const titleClasses =
    titleSize === "display"
      ? "mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[2.85rem] lg:leading-[1.08]"
      : "mt-3 text-3xl font-bold tracking-tight md:text-4xl";

  return (
    <RevealGroup
      trigger={revealTrigger}
      className={`max-w-2xl ${alignment} ${titleSize === "display" ? "max-w-3xl" : ""}`}
    >
      <RevealItem>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
          {eyebrow}
        </p>
      </RevealItem>
      <RevealItem>
        <HeadingTag
          className={`${titleClasses} ${isDark ? "text-white" : "text-bg-dark"}`}
        >
          {title}
        </HeadingTag>
      </RevealItem>
      {intro ? (
        <RevealItem>
          <p
            className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${isDark ? "text-white/65" : "text-text-secondary"} ${align === "center" ? "mx-auto" : ""}`}
          >
            {intro}
          </p>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );
}
