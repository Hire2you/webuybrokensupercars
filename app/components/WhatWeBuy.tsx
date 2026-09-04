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
import Button from "@/components/Button";
import IconSquare from "@/components/IconSquare";
import Section from "@/components/Section";
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
    <div className="motion-card-hover group flex min-h-[4.25rem] items-center gap-3.5 rounded-md border border-border-primary bg-bg-primary px-3.5 py-4 transition duration-200 hover:border-red-primary/70 hover:bg-red-primary/10 motion-reduce:transition-none">
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

export default function WhatWeBuy() {
  return (
    <Section
      id="what-we-buy"
      background="black"
      className="what-we-buy-section relative overflow-hidden border-t border-border-primary"
    >
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
          <div className="relative overflow-hidden rounded-md border border-border-primary bg-bg-surface p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-red-primary/10 sm:p-4">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_-10%,rgba(255,255,255,0.07),transparent_48%)]"
            />
            <RevealGroup as="ul" className="relative flex flex-col gap-2 sm:gap-2.5">
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
