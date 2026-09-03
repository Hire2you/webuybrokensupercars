"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { VIEWPORT } from "@/lib/motion";
import { Reveal } from "@/components/motion";
import GreenPanelBackdrop from "@/components/GreenPanelBackdrop";

const OFFER_AMOUNT = 20000;
const COUNT_DURATION = 1.8;

function formatOffer(value: number) {
  return `£${Math.round(value).toLocaleString("en-GB")}`;
}

function OfferPanelBackdrop() {
  return <GreenPanelBackdrop className="rounded-md" />;
}

export default function OfferCountPanel() {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, VIEWPORT);
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    reducedMotion ? formatOffer(OFFER_AMOUNT) : formatOffer(0),
  );

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(formatOffer(OFFER_AMOUNT));
      return;
    }

    if (!isInView) return;

    const controls = animate(0, OFFER_AMOUNT, {
      duration: COUNT_DURATION,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(formatOffer(latest)),
    });

    return () => controls.stop();
  }, [isInView, reducedMotion]);

  return (
    <Reveal
      className="relative aspect-[16/10] w-full max-w-full overflow-hidden rounded-md border-2 border-red-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_22px_40px_-24px_rgba(157,13,10,0.8)] ring-2 ring-red-dark/80 ring-offset-2 ring-offset-text-primary"
    >
      <OfferPanelBackdrop />
      <div className="relative z-10 flex h-full min-h-[12rem] w-full flex-col items-center justify-center px-8 py-10 text-center sm:min-h-[14rem] sm:px-10 md:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
          Your offer
        </p>
        <div className="mt-4 flex w-full justify-center px-3 sm:px-5">
          <span
            ref={ref}
            className="inline-block bg-gradient-to-b from-white/50 via-white/82 to-white bg-clip-text pr-[0.14em] font-numeral text-5xl font-medium italic leading-none tracking-normal text-transparent sm:text-6xl md:text-[4.75rem]"
            aria-label={`Example offer up to ${formatOffer(OFFER_AMOUNT)}`}
          >
            {display}
          </span>
        </div>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
          Fair, no-obligation valuation based on your Jaguar
        </p>
      </div>
    </Reveal>
  );
}
