import { buildPageMetadata } from "@/lib/seo";
import Image from "next/image";
import {
  BadgePoundSterling,
  Car,
  ClipboardCheck,
  Cog,
  Eye,
  HeartHandshake,
  MapPin,
  Package,
  Scale,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import GreenPanelBackdrop from "@/components/GreenPanelBackdrop";
import IconSquare from "@/components/IconSquare";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { UkMapOutline } from "@/app/components/UkLocationPin";
import AboutHero from "@/app/about/AboutHero";
import {
  CountUpFromText,
  RevealFrom,
  RevealGroup,
  RevealItem,
  RevealLine,
  RevealNumeral,
  SettleImage,
} from "@/components/motion";

export const metadata = buildPageMetadata({
  title: "About Us",
  description:
    "We buy broken, damaged and non-running supercars across mainland UK. Supercar specialists who pay fair prices, collect nationwide and handle the paperwork. Here is who we are.",
  path: "/about",
});

const ICON_SIZE = 26;
const ICON_STROKE = 2.25;

const STATS: {
  figure: string;
  label: string;
  count: boolean;
  accent?: boolean;
}[] = [
  { figure: "100+", label: "supercars bought", count: false },
  { figure: "20", label: "years in the trade", count: true },
  { figure: "Same day", label: "payment", count: false },
  { figure: "Mainland UK", label: "coverage", count: false },
];

const EXPERTISE = [
  { label: "Every marque, from Ferrari to Bentley", icon: Car },
  { label: "Common supercar faults understood, not guessed at", icon: Cog },
  { label: "Fair, knowledge-based pricing", icon: BadgePoundSterling },
  { label: "Parts and salvage value factored into every offer", icon: Package },
];

const VALUES: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Fair, honest pricing",
    body: "No lowball offers, ever.",
    icon: Scale,
  },
  {
    title: "Complete transparency",
    body: "Every offer explained clearly.",
    icon: Eye,
  },
  {
    title: "No pressure",
    body: "A valuation with zero obligation.",
    icon: HeartHandshake,
  },
  {
    title: "We handle the paperwork",
    body: "DVLA notification taken care of.",
    icon: ClipboardCheck,
  },
  {
    title: "Free nationwide collection",
    body: "We come to you.",
    icon: Truck,
  },
  {
    title: "Same-day payment",
    body: "Secure transfer before we leave.",
    icon: BadgePoundSterling,
  },
];

const REGIONS = [
  "South East",
  "South West",
  "Midlands",
  "The North",
  "Scotland",
  "Wales",
];

function SpecRow({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <li className="flex items-center gap-3.5 border-b border-black/[0.08] py-4 last:border-b-0">
      <IconSquare
        icon={Icon}
        variant="light"
        size="sm"
        iconSize={16}
        strokeWidth={2.5}
      />
      <span className="text-sm font-medium leading-snug text-bg-dark md:text-[0.9375rem]">
        {label}
      </span>
    </li>
  );
}

function ValueRow({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-black/[0.08] py-5 last:border-b-0 lg:py-6">
      <IconSquare
        icon={Icon}
        variant="light"
        iconSize={ICON_SIZE}
        strokeWidth={ICON_STROKE}
      />
      <div className="min-w-0">
        <h3 className="text-base font-semibold tracking-tight text-bg-dark md:text-[1.05rem]">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{body}</p>
      </div>
    </div>
  );
}

function StatCell({
  figure,
  label,
  count,
  accent,
  index,
}: {
  figure: string;
  label: string;
  count: boolean;
  accent?: boolean;
  index: number;
}) {
  const isWordFigure = !count;

  return (
    <RevealItem
      as="li"
      className={`list-none px-1 py-6 text-center md:px-3 md:py-2 lg:px-4 ${
        index > 0 ? "lg:border-l lg:border-white/10" : ""
      } ${index % 2 === 1 ? "border-l border-white/10" : ""} ${
        index >= 2 ? "border-t border-white/10 lg:border-t-0" : ""
      }`}
    >
      <p
        className={`leading-none tracking-tight ${
          isWordFigure
            ? "text-2xl font-bold sm:text-3xl lg:text-[1.85rem] lg:leading-none"
            : "font-numeral text-4xl font-medium italic sm:text-5xl lg:text-[3.25rem]"
        } ${accent ? "text-red-primary" : "text-white"}`}
      >
        {count ? <CountUpFromText text={figure} /> : figure}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </p>
    </RevealItem>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <Section
        id="mission"
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

        <div className="relative z-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] lg:gap-12 xl:gap-16">
          <RevealFrom direction="left" className="hidden lg:block">
            <RevealNumeral className="block font-numeral text-[9rem] font-medium italic leading-[0.7] tracking-tight text-white/20">
              &ldquo;
            </RevealNumeral>
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <p className="font-numeral text-[5.5rem] font-medium italic leading-[0.7] tracking-tight text-white/20 lg:hidden">
              &ldquo;
            </p>
            <p className="max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
              Every supercar has a value.{" "}
              <span className="font-numeral font-medium italic text-white">
                Even a broken one.
              </span>
            </p>
            <RevealLine className="mt-8 h-px w-24 bg-white/40" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
              We built this company on that idea.
            </p>
          </RevealFrom>
        </div>
      </Section>

      <Section id="our-story" background="offwhite">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <SettleImage className="relative aspect-[16/10] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10">
              <Image
                src="/about/crashed-bentley.webp"
                alt="Damaged black Bentley Continental GT with front-end collision damage"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center"
              />
            </SettleImage>
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <RevealGroup>
              <RevealItem>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                  OUR STORY
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  Too many good cars were being written off
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  We started We Buy Broken Supercars because too many good cars
                  were being treated as scrap. A blown engine or a failed
                  gearbox does not make a Ferrari, a Lamborghini or a Porsche
                  worthless. It makes it exactly the kind of car we specialise
                  in.
                </p>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  Backed by 20 years in the motor trade, we have built a
                  reputation as a straight-talking UK buyer for broken, damaged
                  and non-running supercars. We pay a fair price based on what
                  the car actually is, and we make the process take a phone call
                  rather than a fortnight.
                </p>
              </RevealItem>
            </RevealGroup>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="about-stats"
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
          <svg
            className="absolute inset-y-0 right-0 h-full w-[40%] opacity-[0.04]"
            viewBox="0 0 200 400"
            preserveAspectRatio="none"
            fill="none"
          >
            <line
              x1="0"
              y1="400"
              x2="200"
              y2="40"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="400"
              x2="200"
              y2="120"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <RevealGroup
            as="ul"
            className="grid grid-cols-2 lg:grid-cols-4"
          >
            {STATS.map((stat, index) => (
              <StatCell key={stat.label} index={index} {...stat} />
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="supercar-specialists" background="white">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-32 lg:order-2 lg:self-start">
            <SettleImage className="relative aspect-square overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10">
              <Image
                src="/about/red-rolls-royce.webp"
                alt="Red Rolls-Royce Dawn convertible"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center"
              />
            </SettleImage>
          </div>

          <RevealFrom direction="left" className="min-w-0 lg:order-1">
            <RevealGroup>
              <RevealItem>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                  WHY SPECIALISTS
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  We know these cars inside out
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  Because we deal in supercars every day, not as a side line to
                  vans and hatchbacks, we know what yours is actually worth. We
                  understand the common failure points on a PDK gearbox, a ZF
                  automatic or an air suspension system, and what the parts and
                  salvage recovery are really worth once a fault is factored in.
                </p>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  That knowledge is what stands between you and a lowball offer.
                  A general buyer sees a broken car and prices the risk. We see a
                  Ferrari with a turbo fault and price the car.
                </p>
              </RevealItem>
              <RevealItem>
                <ul className="mt-6">
                  {EXPERTISE.map((item) => (
                    <SpecRow
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                    />
                  ))}
                </ul>
              </RevealItem>
              <RevealItem>
                <Button href="/#valuation" showArrow className="mt-8">
                  Get your free valuation
                </Button>
              </RevealItem>
            </RevealGroup>
          </RevealFrom>
        </div>
      </Section>

      <Section id="what-we-stand-for" background="offwhite">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-md bg-red-primary p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_30px_48px_-20px_rgba(157,13,10,0.85)] sm:p-10 lg:min-h-[28rem]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_-10%,rgba(255,255,255,0.14),transparent_48%)]"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  WHAT WE STAND FOR
                </p>
                <p
                  aria-hidden="true"
                  className="mt-6 font-numeral text-7xl font-medium italic leading-none tracking-tight text-white/25 sm:text-8xl"
                >
                  06
                </p>
              </div>
              <div className="relative mt-10 lg:mt-0">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]">
                  Six principles. No exceptions.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 md:text-base">
                  The way we buy every supercar, from the first valuation to
                  same-day payment.
                </p>
              </div>
            </div>
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <RevealGroup as="ul">
              {VALUES.map((value) => (
                <RevealItem as="li" key={value.title} className="list-none">
                  <ValueRow
                    title={value.title}
                    body={value.body}
                    icon={value.icon}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="coverage"
        background="black"
        className="relative overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-55 blur-3xl"
            style={{
              background: "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 13%, transparent) 0%, transparent 68%)",
            }}
          />
        </div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <figure className="relative mx-auto flex w-full max-w-[280px] items-center justify-center sm:max-w-[320px] lg:mx-0 lg:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[8%] rounded-full bg-red-primary/[0.12] blur-3xl"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_22px_40px_-24px_rgba(157,13,10,0.8)] ring-2 ring-white/35 ring-offset-2 ring-offset-bg-dark">
                <GreenPanelBackdrop className="rounded-full" />
                <UkMapOutline className="relative z-10 h-full w-full p-[18%]" />
              </div>
            </figure>
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <RevealGroup>
              <RevealItem>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                  COVERAGE
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  Buying supercars across mainland UK
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-white/65 md:text-lg">
                  From the south coast to the Scottish border, our own recovery
                  collects from anywhere in mainland UK, usually within 24 to 48
                  hours of an accepted offer.
                </p>
              </RevealItem>
              <RevealItem>
                <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {REGIONS.map((region) => (
                    <li
                      key={region}
                      className="flex items-center gap-3.5 border-b border-white/10 py-4"
                    >
                      <IconSquare
                        icon={MapPin}
                        variant="solid"
                        size="sm"
                        iconSize={16}
                        strokeWidth={2.5}
                      />
                      <span className="text-sm font-medium tracking-tight text-white md:text-[0.9375rem]">
                        {region}
                      </span>
                    </li>
                  ))}
                </ul>
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
          </RevealFrom>
        </div>
      </Section>

      <CTAband />
    </>
  );
}
