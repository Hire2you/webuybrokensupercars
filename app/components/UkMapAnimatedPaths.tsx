"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { UK_MAP_PATHS } from "./uk-map-paths";
import { EASE } from "@/lib/motion";

const MAIN_PATH_DURATION = 2.75;
const ISLAND_PATH_DURATION = 0.35;
const ISLAND_STAGGER = 0.06;
const MAP_DRAW_DELAY = 0.35;
const EASE_CSS = `cubic-bezier(${EASE.join(", ")})`;

const PATH_PROPS = {
  fill: "none" as const,
  stroke: "rgba(255,255,255,0.92)",
  strokeWidth: 0.9,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

type UkMapAnimatedPathsProps = {
  play?: boolean;
};

function getPathTiming(index: number) {
  const isMain = index === 0;
  const delay = isMain
    ? MAP_DRAW_DELAY
    : MAP_DRAW_DELAY + MAIN_PATH_DURATION * 0.82 + (index - 1) * ISLAND_STAGGER;
  const duration = isMain ? MAIN_PATH_DURATION : ISLAND_PATH_DURATION;

  return { delay, duration };
}

function showPath(path: SVGPathElement) {
  const length = path.getTotalLength();

  if (length > 0) {
    path.style.strokeDasharray = `${length}`;
  } else {
    path.style.strokeDasharray = "none";
  }

  path.style.strokeDashoffset = "0";
  path.style.opacity = "1";
  path.style.transition = "none";
}

function hidePath(path: SVGPathElement) {
  path.style.strokeDasharray = "none";
  path.style.strokeDashoffset = "0";
  path.style.opacity = "0";
  path.style.transition = "none";
}

function drawPath(path: SVGPathElement, index: number, attempt = 0) {
  const length = path.getTotalLength();

  if (length === 0) {
    if (attempt < 12) {
      window.requestAnimationFrame(() => drawPath(path, index, attempt + 1));
      return;
    }

    showPath(path);
    return;
  }

  const { delay, duration } = getPathTiming(index);

  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.style.opacity = "1";
  path.style.transition = "none";

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        path.style.transition = `stroke-dashoffset ${duration}s ${EASE_CSS}`;
        path.style.strokeDashoffset = "0";
      }, delay * 1000);
    });
  });
}

export function UkMapAnimatedPaths({ play = false }: UkMapAnimatedPathsProps) {
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const hasPlayedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const paths = pathRefs.current.filter(
      (path): path is SVGPathElement => path !== null,
    );

    if (paths.length === 0) return;

    if (!play) {
      paths.forEach(hidePath);
      return;
    }

    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    paths.forEach((path, index) => {
      drawPath(path, index);
    });
  }, [play, reducedMotion]);

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
    <>
      {UK_MAP_PATHS.map((path, index) => (
        <path
          key={index}
          ref={(element) => {
            pathRefs.current[index] = element;
          }}
          d={path}
          {...PATH_PROPS}
          style={{ opacity: 0 }}
        />
      ))}
    </>
  );
}
