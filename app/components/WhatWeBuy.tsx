"use client";

import {
  BatteryLow,
  CircleGauge,
  ClipboardX,
  Cog,
  Fan,
  Gauge,
  Hammer,
  Link2,
  TriangleAlert,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/Button";
import IconSquare from "@/components/IconSquare";
import Section from "@/components/Section";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
} from "@/components/motion";

type Condition = {
  label: string;
  icon: LucideIcon;
};

const CONDITION_ROWS: [Condition, Condition][] = [
  [
    { label: "Engine faults and failures", icon: CircleGauge },
    { label: "Accident and crash damage", icon: TriangleAlert },
  ],
  [
    { label: "Gearbox & transmission", icon: Cog },
    { label: "Non-runners & non-starters", icon: BatteryLow },
  ],
  [
    { label: "Electrical and ECU faults", icon: Zap },
    { label: "MOT failures", icon: ClipboardX },
  ],
  [
    { label: "Turbo failure", icon: Fan },
    { label: "High mileage", icon: Gauge },
  ],
  [
    { label: "Timing chain issues", icon: Link2 },
    { label: "Cat S, Cat N and salvage", icon: Hammer },
  ],
];

const ICON_SIZE = 22;
const ICON_STROKE = 2.25;

function ConditionCell({ condition }: { condition: Condition }) {
  const Icon = condition.icon;

  return (
    <div className="motion-card-hover group flex min-h-[4.25rem] items-center gap-3.5 rounded-md bg-white/[0.04] px-3.5 py-4 transition-colors duration-200 hover:bg-red-primary/10 motion-reduce:transition-none">
      <IconSquare
        icon={Icon}
        variant="solid"
        size="sm"
        iconSize={ICON_SIZE}
        strokeWidth={ICON_STROKE}
        interactive
      />
      <span className="text-sm font-medium leading-snug text-white md:text-[0.9375rem]">
        {condition.label}
      </span>
    </div>
  );
}

function ConditionsCarBackdrop() {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 z-0 hidden h-[26%] min-h-[6.5rem] w-screen max-w-none -translate-x-1/2 sm:block md:h-[32%] lg:h-[38%]"
    >
      {!imageMissing ? (
        <>
          <Image
            src="/conditions-car.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_88%] opacity-[0.09] saturate-[0.15] brightness-[0.3] contrast-[0.85]"
            onError={() => setImageMissing(true)}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0a0a0a 0%, #0a0a0a 18%, rgba(10,10,10,0.94) 42%, rgba(10,10,10,0.72) 62%, rgba(10,10,10,0.35) 82%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0a0a0a 0%, transparent 22%, transparent 78%, rgba(10,10,10,0.85) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_60%_at_50%_100%,rgba(226,27,22,0.08),transparent_68%)]" />
        </>
      ) : (
        <div className="relative h-full w-full">
          <PlaceholderImage
            label="supercar silhouette"
            aspectRatio="21/9"
            className="absolute inset-0 h-full w-full rounded-none opacity-[0.12] brightness-[0.25] ring-0"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0a0a0a 0%, #0a0a0a 22%, rgba(10,10,10,0.96) 48%, rgba(10,10,10,0.7) 68%, rgba(10,10,10,0.3) 86%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_60%_at_50%_100%,rgba(226,27,22,0.06),transparent_68%)]" />
        </div>
      )}
    </div>
  );
}

export default function WhatWeBuy() {
  return (
    <Section
      id="what-we-buy"
      background="black"
      className="relative overflow-hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 13%, transparent) 0%, transparent 68%)",
          }}
        />
        <svg
          className="absolute bottom-0 right-0 h-[72%] w-[58%] opacity-[0.035]"
          viewBox="0 0 400 320"
          preserveAspectRatio="none"
          fill="none"
        >
          <line
            x1="0"
            y1="320"
            x2="400"
            y2="40"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="72"
            y1="320"
            x2="400"
            y2="112"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      <ConditionsCarBackdrop />

      <div className="relative z-10 grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <div className="min-w-0">
          <RevealGroup>
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                ANY CONDITION
              </p>
            </RevealItem>

            <RevealItem>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                We buy supercars in any condition
              </h2>
            </RevealItem>

            <RevealItem>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                Running or not, we are interested. If it is a supercar, we
                will make you an offer.
              </p>
            </RevealItem>

            <RevealItem>
              <p className="mt-8 max-w-lg text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:mt-10 md:text-[2rem] lg:text-[2.15rem]">
                <span className="text-red-primary">No V5 logbook?</span>{" "}
                <span className="text-red-primary">No MOT?</span>{" "}
                <span className="text-red-primary">No problem.</span> We can still
                buy your car.
              </p>
            </RevealItem>

            <RevealItem>
              <Button
                href="/#valuation"
                variant="primary"
                primaryTone="accent"
                showArrow
                className="mt-8"
              >
                Get your free valuation
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>

        <RevealFrom direction="right" className="min-w-0 self-center">
          <div className="rounded-md border border-white/10 bg-white/[0.02] p-3 sm:p-4">
            <RevealGroup as="ul" className="flex flex-col gap-2 sm:gap-2.5">
              {CONDITION_ROWS.map(([left, right]) => (
                <RevealItem as="li" key={left.label} className="list-none">
                  <div className="grid grid-cols-1 gap-2 sm:gap-2.5 md:grid-cols-2">
                    <ConditionCell condition={left} />
                    <ConditionCell condition={right} />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </RevealFrom>
      </div>
    </Section>
  );
}
