"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { Reveal } from "@/components/motion";

export default function ModelsCtaPanel() {
  return (
    <Reveal className="cta-banner relative mt-12 overflow-hidden rounded-md px-6 py-10 text-center sm:px-10 sm:py-12 md:mt-16 md:px-14 md:py-16">
      <Image
        src="/ferrari-bottom.webp"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1152px"
        quality={90}
        className="pointer-events-none object-cover object-center opacity-45"
      />

      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        <h3 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          Do not see your supercar?
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
          We buy every model, in any condition. If it is a supercar, we want
          it.
        </p>
        <Button
          href="/#valuation"
          variant="primary"
          showArrow
          className="mt-8 w-full max-w-xs sm:w-auto"
        >
          Get your free valuation
        </Button>
      </div>
    </Reveal>
  );
}
