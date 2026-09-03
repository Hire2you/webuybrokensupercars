import type { ReactNode } from "react";

const BACKGROUND = {
  white: "bg-white",
  offwhite: "bg-text-primary",
  black: "bg-bg-dark text-white",
  green: "bg-red-primary text-white",
} as const;

export type SectionBackground = keyof typeof BACKGROUND;

type SectionProps = {
  id: string;
  children: ReactNode;
  background?: SectionBackground;
  compact?: boolean;
  className?: string;
};

export default function Section({
  id,
  children,
  background = "white",
  compact = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 ${BACKGROUND[background]} ${compact ? "py-8 md:py-10" : "py-20 md:py-28"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
