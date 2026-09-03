import { buildPageMetadata } from "@/lib/seo";
import Image from "next/image";
import {
  Check,
  Minus,
  X,
} from "lucide-react";
import CTAband from "@/components/CTAband";
import IconSquare from "@/components/IconSquare";
import OfferCountPanel from "@/components/OfferCountPanel";
import GreenPanelBackdrop from "@/components/GreenPanelBackdrop";
import PlaceholderImage from "@/components/PlaceholderImage";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
  Reveal,
  SettleImage,
} from "@/components/motion";

export const metadata = buildPageMetadata({
  title: "How It Works",
  description:
    "Sell your broken Jaguar in three simple steps. Enter your details online, get a fair no-obligation offer, and receive same-day payment with free nationwide collection.",
  path: "/how-it-works",
});

const ICON_SIZE = 22;
const ICON_STROKE = 2.25;

const HERO_TRUST_POINTS = [
  "Under a minute",
  "No obligation",
  "Same-day payment",
];

const STEPS = [
  {
    number: "01",
    title: "Enter your details",
    body: "Pop in your reg, mileage and postcode, and tell us what is wrong with the car. It takes under a minute and there is no obligation.",
    subPoints: [
      "Takes less than a minute",
      "No account needed",
      "Running or not",
    ],
    imageLabel: "Person entering car details on phone",
    imageSrc: "/how-it-works/enter-details-phone.jpg",
    imageAlt:
      "Person entering their Jaguar details on the We Buy Broken Jaguars website on a phone",
  },
  {
    number: "02",
    title: "Get your offer",
    body: "We review your details and come back with a fair, no-obligation offer based on your Jaguar's model, condition and spec.",
    subPoints: [
      "Fair market-based pricing",
      "No lowball tactics",
      "Offer explained clearly",
    ],
    imageLabel: "Jaguar being valued",
    visual: "offer" as const,
  },
  {
    number: "03",
    title: "We collect and pay",
    body: "Accept and we arrange free collection anywhere in mainland UK, and pay you by secure bank transfer the same day.",
    subPoints: [
      "Free nationwide collection",
      "Same-day payment",
      "We handle the DVLA paperwork",
    ],
    imageLabel: "Jaguar being collected on a transporter",
    imageSrc: "/how-it-works/jaguar-f-pace.webp",
    imageAlt: "Grey Jaguar F-Pace — we collect your car and pay you the same day",
  },
];

const HELPFUL_ITEMS = ["V5 logbook", "Service history", "Spare keys"];

const NOT_ESSENTIAL_ITEMS = [
  "MOT",
  "The car running",
  "The car driveable (we collect on a trailer)",
];

const OLD_WAY_ITEMS = [
  "Advertise it and wait",
  "Field tyre-kickers and low offers",
  "Haggle over faults",
  "Arrange your own transport",
  "Chase payment and no-shows",
];

const NEW_WAY_ITEMS = [
  "One quick form",
  "One fair no-obligation offer",
  "Any condition accepted",
  "Free collection to you",
  "Same-day secure payment",
];

type Step = {
  number: string;
  title: string;
  body: string;
  subPoints: string[];
  imageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  visual?: "offer";
};

function StepVisual({ step }: { step: Step }) {
  if (step.visual === "offer") {
    return <OfferCountPanel />;
  }

  if (step.imageSrc) {
    return (
      <SettleImage
        className="relative aspect-[16/10] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10"
      >
        <Image
          src={step.imageSrc}
          alt={step.imageAlt ?? step.imageLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={90}
          className="object-cover object-center"
        />
      </SettleImage>
    );
  }

  return (
    <PlaceholderImage
      label={step.imageLabel}
      className="w-full shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)]"
    />
  );
}

function HeroBackdrop() {
  return (
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
        <line x1="0" y1="320" x2="400" y2="40" stroke="white" strokeWidth="1" />
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
  );
}

function StepSubList({ points }: { points: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {points.map((point) => (
        <li key={point} className="flex items-center gap-3.5">
          <IconSquare
            icon={Check}
            variant="solid"
            size="sm"
            iconSize={16}
            strokeWidth={2.5}
          />
          <span className="text-sm font-medium leading-snug text-text-secondary md:text-[0.9375rem]">
            {point}
          </span>
        </li>
      ))}
    </ul>
  );
}

function StepContent({
  step,
  direction,
  className = "",
}: {
  step: Step;
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <RevealFrom direction={direction} className={`min-w-0 ${className}`}>
      <div className="relative pr-16 sm:pr-20">
        <RevealGroup>
          <RevealItem>
            <h3 className="text-xl font-bold tracking-tight text-bg-dark sm:text-2xl">
              {step.title}
            </h3>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-text-secondary">
              {step.body}
            </p>
          </RevealItem>
          <RevealItem>
            <StepSubList points={step.subPoints} />
          </RevealItem>
        </RevealGroup>
        <Reveal
          delay={0.14}
          className="pointer-events-none absolute right-0 top-0"
        >
          <span
            className="font-numeral text-[3.25rem] font-medium italic leading-none tracking-tight text-red-primary/25 sm:text-5xl"
            aria-hidden="true"
          >
            {step.number}
          </span>
        </Reveal>
      </div>
    </RevealFrom>
  );
}

function TimelineStep({
  step,
  index,
}: {
  step: Step;
  index: number;
}) {
  const imageLeft = index % 2 === 0;

  return (
    <li className="relative list-none">
      <div
        aria-hidden="true"
        className="absolute top-10 left-4 z-20 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-text-primary bg-red-primary shadow-[0_0_0_4px_rgba(245,246,245,1)] lg:left-1/2"
      />

      <div className="grid items-center gap-8 overflow-visible pl-10 lg:grid-cols-2 lg:gap-14 lg:pl-0 xl:gap-20">
        {imageLeft ? (
          <>
            <RevealFrom direction="left" className="min-w-0 overflow-visible">
              <StepVisual step={step} />
            </RevealFrom>
            <StepContent step={step} direction="right" />
          </>
        ) : (
          <>
            <StepContent step={step} direction="left" className="lg:order-1" />
            <RevealFrom direction="right" className="min-w-0 overflow-visible lg:order-2">
              <StepVisual step={step} />
            </RevealFrom>
          </>
        )}
      </div>
    </li>
  );
}

function SpecSheetRow({
  label,
  variant,
}: {
  label: string;
  variant: "helpful" | "optional";
}) {
  return (
    <li className="flex items-center gap-4 border-b border-black/[0.08] py-4 last:border-b-0">
      {variant === "helpful" ? (
        <IconSquare
          icon={Check}
          variant="light"
          iconSize={26}
          strokeWidth={ICON_STROKE}
        />
      ) : (
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-black/[0.05]"
        >
          <Minus
            size={ICON_SIZE}
            strokeWidth={ICON_STROKE}
            aria-hidden
            className="text-text-secondary/45"
          />
        </span>
      )}
      <span className="text-base font-medium tracking-tight text-bg-dark md:text-[1.05rem]">
        {label}
      </span>
    </li>
  );
}

function ComparisonList({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "muted" | "highlight";
}) {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={
        isHighlight
          ? "rounded-md border border-red-primary bg-red-primary p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_30px_48px_-20px_rgba(157,13,10,0.85)] sm:p-8 lg:-translate-y-1 lg:scale-[1.02]"
          : "rounded-md border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      }
    >
      <h3
        className={
          isHighlight
            ? "text-lg font-bold tracking-tight text-white"
            : "text-lg font-semibold tracking-tight text-white/45"
        }
      >
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3.5">
            {isHighlight ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white/15">
                <Check
                  size={16}
                  strokeWidth={2.5}
                  aria-hidden
                  className="text-white"
                />
              </span>
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white/[0.06]">
                <X
                  size={16}
                  strokeWidth={2.25}
                  aria-hidden
                  className="text-white/35"
                />
              </span>
            )}
            <span
              className={
                isHighlight
                  ? "text-sm font-medium leading-snug text-white md:text-[0.9375rem]"
                  : "text-sm leading-snug text-white/40 md:text-[0.9375rem]"
              }
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Section
        id="how-it-works-hero"
        background="black"
        className="relative overflow-hidden"
      >
        <HeroBackdrop />

        <div className="relative z-10">
          <SectionHeading
            align="left"
            theme="dark"
            titleSize="display"
            headingLevel="h1"
            eyebrow="HOW IT WORKS"
            title="Selling your Jaguar, made simple"
            intro="From first click to same-day payment, here is exactly how it works. No auctions, no haggling, no hassle."
          />

          <RevealGroup
            as="ul"
            className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/55"
          >
            {HERO_TRUST_POINTS.map((point, index) => (
              <RevealItem
                as="li"
                key={point}
                className="flex list-none items-center gap-2"
              >
                {index > 0 && <span aria-hidden="true">·</span>}
                {point}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section
        id="the-process"
        background="offwhite"
        className="relative overflow-hidden"
      >
        <SectionHeading
          align="left"
          eyebrow="THE PROCESS"
          title="Three steps from quote to payment"
          intro="A clear path through the sale — each step is simple, fast, and handled by our team."
        />

        <div className="relative mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px bg-red-primary/35 lg:left-1/2 lg:-translate-x-1/2"
          />

          <RevealGroup as="ol" className="relative flex flex-col gap-16 lg:gap-24">
            {STEPS.map((step, index) => (
              <RevealItem as="li" key={step.number} className="list-none">
                <TimelineStep step={step} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="what-you-need" background="white">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <SettleImage
              className="relative aspect-[16/10] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(10,10,10,0.18)] ring-1 ring-red-primary/10"
            >
              <Image
                src="/how-it-works/jaguar-documents.webp"
                alt="Jaguar keys, V5 logbook and service history on a wooden surface"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center"
              />
            </SettleImage>
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                WHAT YOU NEED
              </h3>
              <p className="mt-3 text-2xl font-bold tracking-tight text-bg-dark md:text-3xl">
                What helps, and what does not matter
              </p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    Helpful to have
                  </p>
                  <ul className="mt-4">
                    {HELPFUL_ITEMS.map((item) => (
                      <SpecSheetRow key={item} label={item} variant="helpful" />
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    Not essential
                  </p>
                  <ul className="mt-4">
                    {NOT_ESSENTIAL_ITEMS.map((item) => (
                      <SpecSheetRow
                        key={item}
                        label={item}
                        variant="optional"
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealFrom>
        </div>

        <RevealGroup className="mt-10 lg:mt-12">
          <RevealItem>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
              Do not worry if you are missing any of these. We can still buy your
              car, just tell us what you have when you get your quote.
            </p>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section
        id="the-comparison"
        background="black"
        className="relative overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-32 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 9%, transparent) 0%, transparent 68%)",
            }}
          />
        </div>

        <div className="relative z-10">
          <SectionHeading
            align="left"
            theme="dark"
            eyebrow="WHY BOTHER WITH THE REST"
            title="There is an easier way"
          />

          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-10">
            <RevealFrom direction="left">
              <ComparisonList
                title="The usual route"
                items={OLD_WAY_ITEMS}
                variant="muted"
              />
            </RevealFrom>
            <RevealFrom direction="right">
              <ComparisonList
                title="Selling to us"
                items={NEW_WAY_ITEMS}
                variant="highlight"
              />
            </RevealFrom>
          </div>
        </div>
      </Section>

      <Section
        id="why-easy"
        background="green"
        className="relative overflow-hidden"
      >
        <GreenPanelBackdrop />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              clipPath: "polygon(66% 0, 100% 0, 100% 100%, 56% 100%)",
              background:
                "linear-gradient(90deg, var(--red-dark) 0%, var(--red-primary) 5%, color-mix(in srgb, var(--red-primary) 45%, transparent) 38%, color-mix(in srgb, var(--red-primary) 12%, transparent) 62%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              clipPath: "polygon(61% 0, 100% 0, 100% 100%, 51% 100%)",
              background:
                "linear-gradient(90deg, var(--red-dark) 0%, var(--red-primary) 5%, color-mix(in srgb, var(--red-primary) 45%, transparent) 38%, color-mix(in srgb, var(--red-primary) 12%, transparent) 62%, transparent 100%)",
            }}
          />
        </div>
        <RevealGroup className="relative z-10 max-w-4xl">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              WHY IT IS THIS EASY
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-[2rem] lg:text-[2.35rem] lg:leading-[1.15]">
              No auctions. No tyre-kickers. No waiting around. One offer, one
              collection, paid the same day.
            </p>
          </RevealItem>
        </RevealGroup>
      </Section>

      <CTAband />
    </>
  );
}
