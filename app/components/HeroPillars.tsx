"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore, Fragment } from "react";
import { EASE, HERO_ENTRANCE_DURATION } from "@/lib/motion";

const PILLAR_GREY_LIGHT_RGB = "38, 38, 38";
const PILLAR_GREY_RGB = "22, 22, 22";
const PILLAR_GREY_DARK_RGB = "10, 10, 10";
const PILLAR_RED_RGB = "226, 27, 22";
const PILLAR_RED_BRIGHT_RGB = "255, 43, 36";
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
  const fadeThrough = 22 + (1 - height) * 38;
  const fadeSolid = fadeThrough + 14 + (1 - height) * 8;

  return {
    fadeSoft: fadeThrough * 0.5,
    fadeThrough,
    fadeSolid: Math.min(fadeSolid, 88),
  };
}

function getInnerEdgeX(index: number, centerIndex: number, x: number, pillarWidth: number) {
  if (index < centerIndex) {
    return x + pillarWidth;
  }

  if (index > centerIndex) {
    return x;
  }

  return x + pillarWidth / 2;
}

function getTaperedEdgePolygon(
  edgeX: number,
  topY: number,
  height: number,
  bottomWidth: number,
  topWidth: number,
) {
  const bottomY = topY + height;
  const bottomHalf = bottomWidth / 2;
  const topHalf = topWidth / 2;

  return `${edgeX - bottomHalf},${bottomY} ${edgeX + bottomHalf},${bottomY} ${edgeX + topHalf},${topY} ${edgeX - topHalf},${topY}`;
}

function getEdgeGlowStops(edgeOpacity: number, distance: number, index: number) {
  const intensity = Math.min(1, 0.78 + distance * 0.22);
  const phase = (index * 0.31) % 1;
  const peak = edgeOpacity * intensity * (0.92 + distance * 0.45);

  const upper = 20 + phase * 12;
  const mid = 46 + (1 - phase) * 14;
  const lower = 76 + phase * 8;

  return [
    { offset: 0, alpha: 0 },
    { offset: 5, alpha: edgeOpacity * 0.1 * intensity },
    { offset: upper - 4, alpha: edgeOpacity * 0.5 * intensity },
    { offset: upper, alpha: peak * 1.08 },
    { offset: upper + 5, alpha: edgeOpacity * 0.4 * intensity },
    { offset: mid - 5, alpha: edgeOpacity * 0.55 * intensity },
    { offset: mid, alpha: peak * 1.2 },
    { offset: mid + 5, alpha: edgeOpacity * 0.45 * intensity },
    { offset: lower - 4, alpha: edgeOpacity * 0.68 * intensity },
    { offset: lower, alpha: peak * 1.05 },
    { offset: lower + 4, alpha: edgeOpacity * 0.58 * intensity },
    { offset: 100, alpha: edgeOpacity * 0.76 * intensity },
  ];
}

type EdgeHotspotSegment = {
  topY: number;
  height: number;
  bottomWidth: number;
  topWidth: number;
  boost: number;
};

function getEdgeHotspotSegments(
  index: number,
  distance: number,
  pillarTopY: number,
  pillarHeight: number,
  pillarWidth: number,
): EdgeHotspotSegment[] {
  if (distance < 0.3 || pillarHeight < 16) {
    return [];
  }

  const phase = (index * 0.31) % 1;
  const anchors = [
    { anchor: 0.5 + phase * 0.12, length: 0.09, boost: 1.15 },
    ...(distance > 0.45
      ? [{ anchor: 0.24 + (1 - phase) * 0.1, length: 0.07, boost: 0.95 }]
      : []),
    ...(distance > 0.62
      ? [{ anchor: 0.74 + phase * 0.06, length: 0.08, boost: 1.05 }]
      : []),
  ];

  return anchors.map(({ anchor, length, boost }) => {
    const topY = pillarTopY + pillarHeight * anchor;
    const height = pillarHeight * length;
    const depth = anchor;
    const bottomWidth = pillarWidth * (0.1 + depth * 0.06);
    const topWidth = bottomWidth * 0.42;

    return { topY, height, bottomWidth, topWidth, boost };
  });
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
          <filter
            id="hero-pillar-edge-halo"
            x="-80%"
            y="-15%"
            width="260%"
            height="130%"
          >
            <feGaussianBlur stdDeviation="0.09" />
          </filter>

          <filter
            id="hero-pillar-edge-glow"
            x="-60%"
            y="-10%"
            width="220%"
            height="120%"
          >
            <feGaussianBlur stdDeviation="0.055" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

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
                <stop offset="0%" stopColor={`rgba(${PILLAR_GREY_LIGHT_RGB}, 0.08)`} />
                <stop
                  offset={`${fade.fadeSoft}%`}
                  stopColor={`rgba(${PILLAR_GREY_RGB}, 0.72)`}
                />
                <stop
                  offset={`${fade.fadeThrough}%`}
                  stopColor={`rgba(${PILLAR_GREY_RGB}, 0.92)`}
                />
                <stop
                  offset={`${fade.fadeSolid}%`}
                  stopColor={`rgba(${PILLAR_GREY_DARK_RGB}, 0.96)`}
                />
                <stop
                  offset="100%"
                  stopColor={`rgba(${PILLAR_GREY_DARK_RGB}, 1)`}
                />
              </linearGradient>
            );
          })}

          {pillarHeights.map((height, index) => {
            const distance = Math.abs(index - centerIndex) / centerIndex;
            const edgeGlow = 0.06 + distance * 0.12;
            const isLeftSide = index < centerIndex;
            const isRightSide = index > centerIndex;

            return (
              <linearGradient
                key={`edge-wash-${index}`}
                id={`hero-pillar-edge-wash-${index}`}
                x1={isLeftSide ? "1" : isRightSide ? "0" : "0.5"}
                y1="0"
                x2={isLeftSide ? "0" : isRightSide ? "1" : "0.5"}
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor={`rgba(${PILLAR_RED_RGB}, ${edgeGlow})`}
                />
                <stop
                  offset="22%"
                  stopColor={`rgba(${PILLAR_RED_RGB}, ${edgeGlow * 0.38})`}
                />
                <stop offset="100%" stopColor={`rgba(${PILLAR_RED_RGB}, 0)`} />
              </linearGradient>
            );
          })}

          {pillarHeights.map((height, index) => {
            const distance = Math.abs(index - centerIndex) / centerIndex;
            const { y, height: pillarHeight } = getPillarGeometry(
              height,
              distance,
              isMobile,
            );
            const edgeOpacity = 0.5 + distance * 0.5;
            const stops = getEdgeGlowStops(edgeOpacity, distance, index);

            return (
              <Fragment key={`edge-gradients-${index}`}>
                <linearGradient
                  id={`hero-pillar-edge-glow-${index}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={y}
                  x2="0"
                  y2={y + pillarHeight}
                >
                  {stops.map((stop) => (
                    <stop
                      key={stop.offset}
                      offset={`${stop.offset}%`}
                      stopColor={`rgba(${PILLAR_RED_RGB}, ${stop.alpha * 0.62})`}
                    />
                  ))}
                </linearGradient>
                <linearGradient
                  id={`hero-pillar-edge-core-${index}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={y}
                  x2="0"
                  y2={y + pillarHeight}
                >
                  {stops.map((stop) => (
                    <stop
                      key={stop.offset}
                      offset={`${stop.offset}%`}
                      stopColor={`rgba(${PILLAR_RED_BRIGHT_RGB}, ${Math.min(1, stop.alpha * 1.05)})`}
                    />
                  ))}
                </linearGradient>
                <linearGradient
                  id={`hero-pillar-edge-spec-${index}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={y}
                  x2="0"
                  y2={y + pillarHeight}
                >
                  {stops.map((stop) => (
                    <stop
                      key={stop.offset}
                      offset={`${stop.offset}%`}
                      stopColor={`rgba(255, 220, 215, ${Math.min(1, stop.alpha * 0.88)})`}
                    />
                  ))}
                </linearGradient>
              </Fragment>
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
          const edgeX = getInnerEdgeX(index, centerIndex, x, pillarWidth);
          const edgeOpacity = 0.5 + distance * 0.5;
          const showInnerEdge = index !== centerIndex;
          const haloBottomWidth = pillarWidth * 0.12;
          const haloTopWidth = pillarWidth * 0.007;
          const glowBottomWidth = pillarWidth * 0.065;
          const glowTopWidth = pillarWidth * 0.009;
          const coreBottomWidth = pillarWidth * 0.026;
          const coreTopWidth = pillarWidth * 0.0035;
          const specBottomWidth = pillarWidth * 0.01;
          const specTopWidth = pillarWidth * 0.001;
          const hotspotSegments = getEdgeHotspotSegments(
            index,
            distance,
            y,
            pillarHeight,
            pillarWidth,
          );

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
                fill={`url(#hero-pillar-edge-wash-${index})`}
              />
              {showInnerEdge ? (
                <>
                  <polygon
                    points={getTaperedEdgePolygon(
                      edgeX,
                      y,
                      pillarHeight,
                      haloBottomWidth,
                      haloTopWidth,
                    )}
                    fill={`url(#hero-pillar-edge-glow-${index})`}
                    opacity={0.72}
                    filter="url(#hero-pillar-edge-halo)"
                  />
                  {hotspotSegments.map((segment, segmentIndex) => (
                    <polygon
                      key={segmentIndex}
                      points={getTaperedEdgePolygon(
                        edgeX,
                        segment.topY,
                        segment.height,
                        segment.bottomWidth,
                        segment.topWidth,
                      )}
                      fill={`rgba(${PILLAR_RED_RGB}, ${edgeOpacity * segment.boost * 0.38})`}
                      filter="url(#hero-pillar-edge-halo)"
                    />
                  ))}
                  <polygon
                    points={getTaperedEdgePolygon(
                      edgeX,
                      y,
                      pillarHeight,
                      glowBottomWidth,
                      glowTopWidth,
                    )}
                    fill={`url(#hero-pillar-edge-glow-${index})`}
                    filter="url(#hero-pillar-edge-glow)"
                  />
                  <polygon
                    points={getTaperedEdgePolygon(
                      edgeX,
                      y,
                      pillarHeight,
                      coreBottomWidth,
                      coreTopWidth,
                    )}
                    fill={`url(#hero-pillar-edge-core-${index})`}
                  />
                  <polygon
                    points={getTaperedEdgePolygon(
                      edgeX,
                      y,
                      pillarHeight,
                      specBottomWidth,
                      specTopWidth,
                    )}
                    fill={`url(#hero-pillar-edge-spec-${index})`}
                  />
                </>
              ) : null}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
