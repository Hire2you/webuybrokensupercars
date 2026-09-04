"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { UK_MAP_PATHS } from "./uk-map-paths";
import { EASE, VIEWPORT } from "@/lib/motion";

const MAIN_PATH_DURATION = 2.75;
const ISLAND_PATH_DURATION = 0.35;
const ISLAND_STAGGER = 0.06;
const MAP_DRAW_DELAY = 0.35;

const PATH_PROPS = {
  fill: "none" as const,
  stroke: "rgba(255,255,255,0.92)",
  strokeWidth: 0.9,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

export function UkMapAnimatedPaths() {
  const ref = useRef<SVGGElement>(null);
  const isInView = useInView(ref, VIEWPORT);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <>
        {UK_MAP_PATHS.map((path, index) => (
          <path key={index} d={path} {...PATH_PROPS} />
        ))}
      </>
    );
  }

  return (
    <g ref={ref}>
      {UK_MAP_PATHS.map((path, index) => {
        const isMain = index === 0;
        const delay = isMain
          ? MAP_DRAW_DELAY
          : MAP_DRAW_DELAY +
            MAIN_PATH_DURATION * 0.82 +
            (index - 1) * ISLAND_STAGGER;
        const duration = isMain ? MAIN_PATH_DURATION : ISLAND_PATH_DURATION;

        return (
          <motion.path
            key={index}
            d={path}
            {...PATH_PROPS}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{
              pathLength: {
                duration,
                delay,
                ease: EASE,
              },
            }}
          />
        );
      })}
    </g>
  );
}
