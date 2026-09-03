"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { EASE, HERO_ENTRANCE_DURATION } from "@/lib/motion";

const PILLAR_RED_RGB = "226, 27, 22";
const PILLAR_RED_DARK_RGB = "157, 13, 10";
const PILLAR_COUNT_MOBILE = 13;
const PILLAR_COUNT_DESKTOP = 33;
const PILLAR_ENTRANCE_STAGGER = 0.045;
const PILLAR_ENTRANCE_DELAY = 0.08;
const PILLAR_RISE_Y = 11;
const MOBILE_QUERY = "(max-width: 640px)";

const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 100;
const TOP_CLEARANCE_MAX = 0.06;

function getPillarHeights(count: number, compact = false) {
  const centerIndex = (count - 1) / 2;
  const minHeight = compact ? 0.08 : 0.24;
  const heightRange = compact ? 0.48 : 0.76;
  const curve = compact ? 1.55 : 1.35;

  return Array.from({ length: count }, (_, index) => {
    const distance = Math.abs(index - centerIndex) / centerIndex;
    return minHeight + Math.pow(distance, curve) * heightRange;
  });
}

function subscribeToMedia(query: string, onStoreChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function subscribeToMobileViewport(onStoreChange: () => void) {
  return subscribeToMedia(MOBILE_QUERY, onStoreChange);
}

function getIsMobileViewport() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

/** Shortest centre pillars first, then outward to the tallest edge pillars. */
function getCenterOutDelay(index: number, count: number) {
  const fromCenter = Math.min(index, count - 1 - index);
  return PILLAR_ENTRANCE_DELAY + fromCenter * PILLAR_ENTRANCE_STAGGER;
}

function getPillarGeometry(
  height: number,
  distanceFromCenter: number,
  compact = false,
) {
  const topClearance = compact ? 0.14 : TOP_CLEARANCE_MAX;
  const topInset = topClearance * distanceFromCenter * VIEW_HEIGHT;
  const pillarHeight = VIEW_HEIGHT * height - topInset;

  return {
    y: VIEW_HEIGHT - pillarHeight,
    height: pillarHeight,
  };
}

function pillarFadeStops(height: number) {
  const fadeThrough = 18 + (1 - height) * 52;
  const fadeSolid = fadeThrough + 18 + (1 - height) * 10;

  return {
    fadeSoft: fadeThrough * 0.45,
    fadeThrough,
    fadeSolid: Math.min(fadeSolid, 92),
  };
}

export default function HeroPillars() {
  const reducedMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getIsMobileViewport,
    () => true,
  );
  const pillarCount = isMobile ? PILLAR_COUNT_MOBILE : PILLAR_COUNT_DESKTOP;
  const pillarWidth = VIEW_WIDTH / pillarCount;
  const centerIndex = (pillarCount - 1) / 2;
  const pillarHeights = getPillarHeights(pillarCount, isMobile);

  return (
    <div className="hero-pillars" aria-hidden="true">
      <svg
        className="hero-pillars-svg"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="hero-pillar-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={`rgba(${PILLAR_RED_DARK_RGB}, 0.35)`} />
            <stop offset="50%" stopColor={`rgba(${PILLAR_RED_DARK_RGB}, 0)`} />
            <stop offset="100%" stopColor={`rgba(${PILLAR_RED_DARK_RGB}, 0.35)`} />
          </linearGradient>

          {pillarHeights.map((height, index) => {
            const fade = pillarFadeStops(height);

            return (
              <linearGradient
                key={index}
                id={`hero-pillar-fill-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={`rgba(${PILLAR_RED_RGB}, 0)`} />
                <stop
                  offset={`${fade.fadeSoft}%`}
                  stopColor={`rgba(${PILLAR_RED_RGB}, 0.22)`}
                />
                <stop
                  offset={`${fade.fadeThrough}%`}
                  stopColor={`rgba(${PILLAR_RED_RGB}, 0.62)`}
                />
                <stop
                  offset={`${fade.fadeSolid}%`}
                  stopColor={`rgba(${PILLAR_RED_DARK_RGB}, 0.9)`}
                />
                <stop offset="100%" stopColor="var(--red-primary)" />
              </linearGradient>
            );
          })}
        </defs>

        {pillarHeights.map((height, index) => {
          const distance = Math.abs(index - centerIndex) / centerIndex;
          const { y, height: pillarHeight } = getPillarGeometry(
            height,
            distance,
            isMobile,
          );
          const x = index * pillarWidth;
          const delay = getCenterOutDelay(index, pillarCount);

          return (
            <motion.g
              key={index}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center bottom",
              }}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: PILLAR_RISE_Y }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: HERO_ENTRANCE_DURATION,
                ease: EASE,
                delay: reducedMotion ? 0 : delay,
              }}
            >
              <rect
                x={x}
                y={y}
                width={pillarWidth}
                height={pillarHeight}
                fill={`url(#hero-pillar-fill-${index})`}
              />
              <rect
                x={x}
                y={y}
                width={pillarWidth}
                height={pillarHeight}
                fill="url(#hero-pillar-edge)"
                opacity="0.28"
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
