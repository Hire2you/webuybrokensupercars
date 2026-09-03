"use client";

import { CheckIcon } from "@/components/icons";
import { CountUp, RevealGroup, RevealItem } from "@/components/motion";
import { parseCountValue } from "@/lib/motion";

const POINTS = [
  "Nationwide collection",
  "Instant online valuation",
  "100+ Jaguars Purchased",
  "5★ Service",
];

function TrustPoint({ point, index }: { point: string; index: number }) {
  const parsed = parseCountValue(point);

  return (
    <RevealItem
      as="li"
      className={`flex list-none items-center justify-center gap-2 px-3 py-4 text-center text-xs font-medium text-white sm:text-sm md:flex-1 md:gap-2.5 md:py-5 ${
        index % 2 === 1 ? "border-l border-red-primary" : ""
      } ${index >= 2 ? "border-t border-red-primary" : ""} md:border-t-0 ${
        index > 0 ? "md:border-l" : ""
      }`}
    >
      <CheckIcon className="h-4 w-4 shrink-0 text-red-primary" />
      <span>
        {parsed ? (
          <CountUp
            value={parsed.value}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
            decimals={parsed.decimals}
          />
        ) : (
          point
        )}
      </span>
    </RevealItem>
  );
}

export default function TrustBar() {
  return (
    <section id="trust" className="scroll-mt-28 bg-bg-dark">
      <div className="mx-auto max-w-6xl px-6">
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 md:flex md:flex-row"
        >
          {POINTS.map((point, index) => (
            <TrustPoint key={point} point={point} index={index} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
