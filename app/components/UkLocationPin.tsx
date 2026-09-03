import { UK_MAP_PATHS, UK_MAP_VIEW_SIZE } from "./uk-map-paths";

type UkLocationPinProps = {
  className?: string;
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

export default function UkLocationPin({ className = "" }: UkLocationPinProps) {
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
        <linearGradient
          id="why-us-badge-fill"
          x1="100"
          y1="6"
          x2="100"
          y2="218"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--red-bright)" />
          <stop offset="1" stopColor="var(--red-primary)" />
        </linearGradient>
      </defs>

      <path d={BADGE_PATH} fill="url(#why-us-badge-fill)" />
      <path
        d={BADGE_PATH}
        fill="none"
        stroke="var(--red-dark)"
        strokeOpacity="0.12"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />

      <g clipPath="url(#why-us-badge-clip)">
        <g
          transform={`translate(${mapOffsetX} ${mapOffsetY}) scale(${mapScale})`}
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
        </g>
      </g>
    </svg>
  );
}
