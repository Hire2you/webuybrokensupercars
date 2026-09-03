"use client";

import Image from "next/image";
import { useState } from "react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { SettleImage } from "@/components/motion";

const ACCENT_ON_DARK = "var(--red-primary)";

function AboutHeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-20 top-1/2 h-[16rem] w-[16rem] -translate-y-1/2 rounded-full opacity-35 blur-3xl sm:h-[18rem] sm:w-[18rem]"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 9%, transparent) 0%, transparent 72%)",
        }}
      />

      <svg
        className="absolute bottom-0 left-0 h-[40%] w-[46%] max-w-sm opacity-[0.065] sm:h-[46%] sm:w-[50%]"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        fill="none"
      >
        <line
          x1="0"
          y1="320"
          x2="360"
          y2="52"
          stroke={ACCENT_ON_DARK}
          strokeWidth="1.25"
        />
        <line
          x1="0"
          y1="320"
          x2="400"
          y2="124"
          stroke={ACCENT_ON_DARK}
          strokeWidth="0.9"
        />
        <line
          x1="56"
          y1="320"
          x2="400"
          y2="204"
          stroke={ACCENT_ON_DARK}
          strokeWidth="0.65"
        />
      </svg>
    </div>
  );
}

function AboutHeroImage() {
  const [imageMissing, setImageMissing] = useState(false);

  if (imageMissing) {
    return null;
  }

  return (
    <SettleImage
      trigger="mount"
      className="pointer-events-none absolute inset-y-0 -right-6 left-[34%] z-0 sm:left-[36%] lg:left-[40%] lg:-right-8"
    >
      <div className="relative h-full min-h-[11rem] w-full sm:min-h-[13rem] lg:min-h-0">
        <Image
          src="/about-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-[74%_center] brightness-[0.4] saturate-[0.28] contrast-[1.08] sm:object-[72%_center]"
          onError={() => setImageMissing(true)}
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-bg-dark from-[22%] via-bg-dark/88 via-[42%] to-transparent to-[68%] max-lg:from-[28%] max-lg:via-[48%] max-lg:to-[76%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark/70 to-transparent to-[52%] lg:from-bg-dark/55 lg:via-transparent lg:to-transparent"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent to-[28%] max-lg:to-[22%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 72% 88% at 90% 44%, rgba(226,27,22,0.2), transparent 58%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-[10%] right-[6%] w-px bg-gradient-to-b from-transparent via-red-primary/30 to-transparent opacity-70"
        />
      </div>
    </SettleImage>
  );
}

export default function AboutHero() {
  return (
    <Section
      id="about-hero"
      background="black"
      className="relative overflow-hidden !py-12 sm:!py-14 lg:!py-16"
    >
      <div className="relative">
        <AboutHeroBackdrop />
        <AboutHeroImage />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-bg-dark/30 via-transparent to-transparent lg:hidden"
        />

        <div className="relative z-10 flex min-h-[14rem] items-center sm:min-h-[15rem] lg:min-h-[16rem]">
          <div className="w-full lg:max-w-[45%]">
            <SectionHeading
              align="left"
              theme="dark"
              titleSize="display"
              revealTrigger="mount"
              headingLevel="h1"
              eyebrow="ABOUT US"
              title="We buy the supercars nobody else will touch"
              intro="Broken, damaged or non-running, we see a car where a scrap yard sees weight. Here is who we are and why sellers trust us."
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
