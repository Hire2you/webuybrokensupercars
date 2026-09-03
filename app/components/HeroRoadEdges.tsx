"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { HERO_ENTRANCE_DURATION, EASE } from "@/lib/motion";

/** Top (vanishing point) → bottom; reveal runs downward along the edge. */
const LEFT_EDGE = { id: "hero-road-left", topX: 30, topY: 0, bottomX: 13, bottomY: 100 };
const RIGHT_EDGE = { id: "hero-road-right", topX: 70, topY: 0, bottomX: 87, bottomY: 100 };

const FADE_FEATHER = 14;

function LineRevealMask({
  id,
  topX,
  topY,
  bottomX,
  bottomY,
  delay,
  children,
}: {
  id: string;
  topX: number;
  topY: number;
  bottomX: number;
  bottomY: number;
  delay: number;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const gradId = `${id}-reveal-grad`;
  const maskId = `${id}-reveal-mask`;
  const transition = {
    duration: HERO_ENTRANCE_DURATION,
    ease: EASE,
    delay,
  };

  return (
    <>
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1={topX}
          y1={topY}
          x2={bottomX}
          y2={bottomY}
        >
          <stop offset="0%" stopColor="white" />
          {reducedMotion ? (
            <stop offset="100%" stopColor="white" />
          ) : (
            <>
              <motion.stop
                offset="0%"
                stopColor="white"
                initial={{ offset: "0%" }}
                animate={{ offset: `${100 - FADE_FEATHER}%` }}
                transition={transition}
              />
              <motion.stop
                offset={`${FADE_FEATHER}%`}
                stopColor="black"
                initial={{ offset: `${FADE_FEATHER}%` }}
                animate={{ offset: "100%" }}
                transition={transition}
              />
            </>
          )}
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <rect x="0" y="0" width="100" height="100" fill={`url(#${gradId})`} />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>{children}</g>
    </>
  );
}

function RoadEdgeLine({
  id,
  topX,
  topY,
  bottomX,
  bottomY,
  delay,
}: {
  id: string;
  topX: number;
  topY: number;
  bottomX: number;
  bottomY: number;
  delay: number;
}) {
  const coords = { x1: topX, y1: topY, x2: bottomX, y2: bottomY };

  return (
    <LineRevealMask
      id={id}
      topX={topX}
      topY={topY}
      bottomX={bottomX}
      bottomY={bottomY}
      delay={delay}
    >
      <line
        className="hero-road-edge-glow"
        {...coords}
        filter="url(#hero-road-edge-blur)"
      />
      <line className="hero-road-edge-core" {...coords} />
    </LineRevealMask>
  );
}

export default function HeroRoadEdges() {
  return (
    <svg
      className="hero-road-edge-overlay"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="hero-road-edge-stroke"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="100"
          x2="0"
          y2="0"
        >
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
          <stop offset="45%" stopColor="rgba(255, 255, 255, 0.5)" />
          <stop offset="100%" stopColor="rgba(148, 156, 153, 0.22)" />
        </linearGradient>

        <linearGradient
          id="hero-road-edge-glow-fill"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="100"
          x2="0"
          y2="0"
        >
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="35%" stopColor="rgba(255, 255, 255, 0.35)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>

        <filter
          id="hero-road-edge-blur"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <RoadEdgeLine {...LEFT_EDGE} delay={0.4} />
      <RoadEdgeLine {...RIGHT_EDGE} delay={0.45} />
    </svg>
  );
}
