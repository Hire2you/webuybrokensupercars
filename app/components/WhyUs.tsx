"use client";

import {
  Award,
  BadgePoundSterling,
  ClipboardCheck,
  HeartHandshake,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Section from "@/components/Section";
import IconSquare from "@/components/IconSquare";
import UkLocationPin from "./UkLocationPin";
import { RevealGroup, RevealItem } from "@/components/motion";
import {
  EASE,
  REVEAL_DURATION,
  REVEAL_X,
  SETTLE_SCALE_FROM,
} from "@/lib/motion";
import type { Variants } from "motion/react";
const ICON_SIZE = 26;
const ICON_STROKE = 2.25;

type Benefit = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const BENEFITS: Benefit[] = [
  {
    title: "Free nationwide collection",
    body: "We come to you, anywhere in mainland UK, at no cost to you.",
    icon: Truck,
  },
  {
    title: "Same-day payment",
    body: "Secure bank transfer on collection. No cheques, no waiting around.",
    icon: BadgePoundSterling,
  },
  {
    title: "Any condition considered",
    body: "From minor faults to complete write-offs, we genuinely want it.",
    icon: ShieldCheck,
  },
  {
    title: "We handle the paperwork",
    body: "We take care of the DVLA notification so you do not have to.",
    icon: ClipboardCheck,
  },
  {
    title: "Supercar specialists",
    body: "We know these cars, so you get a real, fair price, never a lowball.",
    icon: Award,
  },
  {
    title: "No obligation, ever",
    body: "Get your valuation with zero pressure and no hidden fees.",
    icon: HeartHandshake,
  },
];

function BenefitRow({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;

  return (
    <div className="motion-card-hover h-full rounded-md border border-border-primary bg-bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-red-primary/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-start gap-4">
        <IconSquare
          icon={Icon}
          variant="light"
          iconSize={ICON_SIZE}
          strokeWidth={ICON_STROKE}
        />
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-text-primary md:text-[1.05rem]">
            {benefit.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
            {benefit.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function useWhyUsImageVariants(): {
  pinVariants: Variants;
  carVariants: Variants;
} {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const fade: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: REVEAL_DURATION, ease: EASE },
      },
    };
    return { pinVariants: fade, carVariants: fade };
  }

  return {
    pinVariants: {
      hidden: { opacity: 0, y: 16, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: REVEAL_DURATION, ease: EASE },
      },
    },
    carVariants: {
      hidden: { opacity: 0, x: -REVEAL_X, scale: SETTLE_SCALE_FROM },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: REVEAL_DURATION, ease: EASE },
      },
    },
  };
}

function WhyUsImage() {
  const { pinVariants, carVariants } = useWhyUsImageVariants();

  return (
    <figure className="flex flex-col pt-20 pb-0 sm:pt-16 lg:min-h-0 lg:h-full lg:pt-0 lg:pb-0 max-lg:-mb-8">
      <div
        aria-hidden="true"
        className="relative hidden flex-1 flex-col items-center justify-end px-2 pb-2 lg:flex lg:min-h-[6rem]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-[12%] mx-auto h-32 w-32 rounded-full bg-red-primary/[0.05] blur-3xl sm:h-40 sm:w-40" />
      </div>

      <RevealGroup className="relative mx-auto w-full max-w-[min(78vw,260px)] shrink-0 overflow-visible sm:max-w-[min(84vw,300px)] lg:mx-0 lg:max-w-none">
        <motion.div
          variants={carVariants}
          className="relative z-10 overflow-hidden rounded-none"
        >
          <Image
            src="/damaged-mclaren-supercar.webp"
            alt="Yellow McLaren with front-end collision damage — we buy broken and accident-damaged supercars"
            width={4703}
            height={3527}
            sizes="(max-width: 1024px) 70vw, 40vw"
            unoptimized
            className="relative z-10 h-auto w-full object-contain object-bottom"
          />
        </motion.div>
        <motion.div
          variants={pinVariants}
          className="pointer-events-none absolute bottom-[calc(83%-130px)] left-1/2 z-0 w-full -translate-x-1/2 sm:bottom-[calc(84%-130px)] lg:max-w-[360px]"
        >
          <UkLocationPin className="w-full" />
        </motion.div>
      </RevealGroup>
    </figure>
  );
}

export default function WhyUs() {
  return (
    <Section id="why-us" background="black" className="border-t border-border-primary">
      <div className="grid items-stretch gap-4 sm:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12 xl:gap-16">
        <WhyUsImage />

        <div className="min-w-0">
          <RevealGroup>
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                WHY US
              </p>
            </RevealItem>

            <RevealItem>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                Why sell your broken{" "}
                <span className="whitespace-nowrap">supercar to us</span>
              </h2>
            </RevealItem>
          </RevealGroup>

          <RevealGroup
            as="ul"
            className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5"
          >
            {BENEFITS.map((benefit) => (
              <RevealItem as="li" key={benefit.title} className="list-none">
                <BenefitRow benefit={benefit} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
