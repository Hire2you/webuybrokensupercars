"use client";

import { useId } from "react";

type GreenPanelBackdropProps = {
  className?: string;
};

export default function GreenPanelBackdrop({
  className = "",
}: GreenPanelBackdropProps) {
  const grainId = useId();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary via-red-dark to-red-dark" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 95% 75% at 14% 92%, var(--bg-dark) 0%, transparent 52%), radial-gradient(ellipse 70% 60% at 92% 12%, var(--bg-surface) 0%, transparent 48%), radial-gradient(ellipse 55% 45% at 62% 58%, rgba(0,0,0,0.32) 0%, transparent 58%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(128deg, transparent 32%, rgba(226,27,22,0.45) 52%, transparent 72%), linear-gradient(215deg, rgba(2,18,12,0.55) 0%, transparent 42%)",
        }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_-10%,rgba(255,255,255,0.12),transparent_48%)]"
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-soft-light"
        preserveAspectRatio="none"
      >
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </div>
  );
}
