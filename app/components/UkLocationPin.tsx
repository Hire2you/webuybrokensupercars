import { UK_MAP_PATHS, UK_MAP_VIEW_SIZE } from "./uk-map-paths";
import { UkMapAnimatedPaths } from "./UkMapAnimatedPaths";

type UkLocationPinProps = {
  className?: string;
  play?: boolean;
};

type UkMapOutlineProps = {
  className?: string;
};

/** Flat-top banner — squarer head, tapered point below. */
const BADGE_PATH =
  "M18 6H182Q190 6 190 14V136L100 218L10 136V14Q10 6 18 6Z";

export function UkMapOutline({ className = "" }: UkMapOutlineProps) {
  return (
    <svg
      viewBox={`0 0 ${UK_MAP_VIEW_SIZE} ${UK_MAP_VIEW_SIZE}`}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {UK_MAP_PATHS.map((path, index) => (
        <path
          key={index}
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.88)"
          strokeWidth="0.9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default function UkLocationPin({
  className = "",
  play = false,
}: UkLocationPinProps) {
  const mapScale = 1.18;
  const mapOffsetX = (200 - UK_MAP_VIEW_SIZE * mapScale) / 2;
  const mapOffsetY = 24;

  return (
    <svg
      viewBox="0 0 200 228"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <clipPath id="why-us-badge-clip">
          <path d={BADGE_PATH} />
        </clipPath>
        <filter
          id="why-us-neon-glow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="why-us-map-glow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={BADGE_PATH} fill="rgba(18, 18, 18, 0.72)" />
      <path
        d={BADGE_PATH}
        fill="none"
        stroke="var(--red-bright)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        filter="url(#why-us-neon-glow)"
      />

      <g clipPath="url(#why-us-badge-clip)">
        <g
          transform={`translate(${mapOffsetX} ${mapOffsetY}) scale(${mapScale})`}
          filter="url(#why-us-map-glow)"
        >
          <UkMapAnimatedPaths play={play} />
        </g>
      </g>
    </svg>
  );
}
