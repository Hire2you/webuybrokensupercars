import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  hoverable?: boolean;
};

const CARD_BASE =
  "rounded-md border border-border-primary bg-bg-surface p-6";

const CARD_HOVER =
  "motion-card-hover transition duration-200 hover:-translate-y-0.5 hover:border-red-primary/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function Card({
  children,
  className = "",
  as: Tag = "div",
  hoverable = true,
}: CardProps) {
  return (
    <Tag
      className={`${CARD_BASE} ${hoverable ? CARD_HOVER : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
