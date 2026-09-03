import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Check,
  Cog,
  Cpu,
  Droplets,
  Fan,
  Gauge,
  Hourglass,
  Link2,
  MapPin,
  Monitor,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import GreenPanelBackdrop from "@/components/GreenPanelBackdrop";
import IconSquare from "@/components/IconSquare";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import FAQ from "@/app/components/FAQ";
import Testimonials from "@/app/components/Testimonials";
import { UkMapOutline } from "@/app/components/UkLocationPin";
import { KENT_FAQS } from "@/lib/faq";
import {
  getCountyBySlug,
  getCountyPath,
  getTownPath,
  type LocationCounty,
  type LocationTown,
} from "@/lib/locations";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
  RevealLine,
  SettleImage,
} from "@/components/motion";
import { buildPageMetadata, locationPageJsonLd } from "@/lib/seo";

const COUNTY_SLUG = "sell-my-broken-supercar-kent";
const county = getCountyBySlug(COUNTY_SLUG);

if (!county) {
  throw new Error(`Missing county config for ${COUNTY_SLUG}`);
}

const KENT: LocationCounty = county;
const PATH = getCountyPath(KENT);
const VALUATION_HREF = "#valuation";
const ICON_SIZE = 22;
const ICON_STROKE = 2.25;

export const metadata = buildPageMetadata({
  title: "Sell My Broken Supercar in Kent",
  description: KENT.description,
  path: PATH,
});

const HERO_TRUST_POINTS = [
  "Any condition",
  "No obligation",
  "Same-day payment",
];

const FAULTS: { label: string; icon: LucideIcon }[] = [
  { label: "clutch or gearbox rattle", icon: Link2 },
  { label: "ZF gearbox limp mode", icon: Cog },
  { label: "Transfer box trouble on 4WD cars", icon: Gauge },
  { label: "Air suspension collapse", icon: Truck },
  { label: "Turbo failure", icon: Fan },
  { label: "Head gasket and coolant loss", icon: Droplets },
  { label: "Body control module faults", icon: Cpu },
  { label: "Infotainment and ECU problems", icon: Monitor },
];

const MODELS: { label: string; icon: LucideIcon }[] = [
  { label: "Ferrari and Lamborghini, including V8 and V10 models", icon: Car },
  { label: "Bentley and Aston Martin, air suspension faults and all", icon: Car },
  { label: "McLaren and Porsche, turbocharged cars welcome", icon: Gauge },
  { label: "Maserati and exotic SUVs, gearbox and transfer box included", icon: Truck },
  { label: "Hybrid and electric exotics", icon: Zap },
  { label: "Lotus and niche marques, whatever their age and mileage", icon: Car },
  { label: "Classic and older supercars, running or long off the road", icon: Hourglass },
];

const SCRAP_ITEMS = [
  "The weight of the car",
  "The price of metal that week",
  "What the catalytic converter is worth",
  "The same figure on a Ferrari as a hatchback",
  "Model, spec and fault never enter the sum",
];

const SPECIALIST_ITEMS = [
  "Priced on what the whole car is worth",
  "Model, mileage and specification counted",
  "The fault is an input to the price",
  "Service history and options matter",
  "Specialist pricing beats scrap-weight pricing",
];

const OTHER_OPTIONS: { title: string; body: string }[] = [
  {
    title: "A general we-buy-any-car service",
    body: "A number comes back fast, but it is pricing a marque it does not know. A fault it cannot categorise tends to be treated as the worst case and re-priced when someone inspects the car.",
  },
  {
    title: "A scrap yard",
    body: "A yard gives you the weight arithmetic, with no account taken of which supercar it is. If the car is a stripped shell or fire damaged, that is an honest answer. For most broken supercars it is not.",
  },
  {
    title: "Listing it privately",
    body: "That can work if the car drives. If it will not start, it usually means tyre-kickers, no-shows and a lowball offer at the kerb from someone who knows you cannot easily move it.",
  },
];

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

function FaultCell({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
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
        {label}
      </span>
    </div>
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
            <span
              className={
                isHighlight
                  ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white/15"
                  : "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-white/[0.06]"
              }
            >
              {isHighlight ? (
                <Check
                  size={16}
                  strokeWidth={2.5}
                  aria-hidden
                  className="text-white"
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
              )}
            </span>
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

function TownLink({
  town,
}: {
  town: LocationTown;
}) {
  const content = (
    <>
      <IconSquare
        icon={MapPin}
        variant="light"
        size="sm"
        iconSize={16}
        strokeWidth={2.5}
      />
      <span className="text-sm font-medium tracking-tight text-bg-dark md:text-[0.9375rem]">
        {town.name}
      </span>
    </>
  );

  if (town.published) {
    return (
      <Link
        href={getTownPath(KENT, town)}
        className="flex items-center gap-3.5 border-b border-black/[0.08] py-4 transition-colors hover:text-red-primary"
      >
        {content}
      </Link>
    );
  }

  return (
    <span className="flex items-center gap-3.5 border-b border-black/[0.08] py-4">
      {content}
    </span>
  );
}

export default function KentHubPage() {
  return (
    <>
      <JsonLd
        data={locationPageJsonLd({
          title: "Sell My Broken Supercar in Kent | Any Model, Non-Runners",
          description: KENT.description,
          path: PATH,
          serviceType: "sell my broken supercar kent",
          areaServed: KENT.areaServed,
          faqs: KENT_FAQS,
          breadcrumbName: KENT.name,
        })}
      />

      <Section
        id="kent-hero"
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
            eyebrow="KENT"
            title="Sell my broken supercar in Kent"
            intro="We buy broken, damaged and non-running supercars anywhere in Kent, priced on what the whole car is worth rather than what it weighs. Enter your reg for a free, no-obligation offer."
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

          <RevealGroup className="mt-8">
            <RevealItem>
              <Button
                href={VALUATION_HREF}
                variant="primary"
                primaryTone="accent"
                showArrow
              >
                Get your free valuation
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section id="kent-intro" background="offwhite">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <SettleImage className="relative aspect-[16/10] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10">
              <Image
                src="/about/jag-f-pace-centred.png"
                alt="White Lamborghini Urus SUV"
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
                  ANYWHERE IN KENT
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  A repair bill or a scrap figure is not the only answer
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  If there is a supercar sitting on your drive or at the kerb that
                  will not start, will not come out of limp mode, or has failed
                  an MOT on something expensive, you have probably already had
                  one of two conversations. A garage has quoted a repair bill
                  worth more than the car, or someone has offered you a scrap
                  figure that felt insulting.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  Neither is the only answer. We buy broken supercars across Kent
                  in any condition, running or not, and the offer is worked out
                  on the car itself. The valuation is free, there is no
                  obligation, and nothing needs fixing, cleaning or moving
                  first.
                </p>
              </RevealItem>
            </RevealGroup>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-worth"
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
            <p className="block font-numeral text-[4.5rem] font-medium italic leading-[0.8] tracking-tight text-white/20">
              £1.2k
            </p>
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              WHAT A BROKEN JAGUAR HAS ACTUALLY BEEN WORTH
            </p>
            <p className="mt-5 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
              £1,200 to £10,000.{" "}
              <span className="font-numeral font-medium italic text-white">
                Money actually paid.
              </span>
            </p>
            <RevealLine className="mt-8 h-px w-24 bg-white/40" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              A Jag with a serious fault is still worth real money, and the
              number you were given by a yard is not the ceiling. Where a
              particular car falls in that spread comes down to the model, the
              mileage, the specification and options, and above all which fault
              it has. Read the range as evidence rather than as an offer, and
              let us look at your car before you decide what it is worth.
            </p>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-pricing"
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
            eyebrow="PRICED ON THE WHOLE CAR"
            title="Not weighed in as scrap"
            intro="A scrap yard's offer is arithmetic. Ours is priced on what the whole car is worth. That gap is usually why the figure you were quoted felt wrong."
          />

          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-10">
            <RevealFrom direction="left">
              <ComparisonList
                title="Scrap-weight pricing"
                items={SCRAP_ITEMS}
                variant="muted"
              />
            </RevealFrom>
            <RevealFrom direction="right">
              <ComparisonList
                title="Specialist pricing"
                items={SPECIALIST_ITEMS}
                variant="highlight"
              />
            </RevealFrom>
          </div>
        </div>
      </Section>

      <Section
        id="kent-faults"
        background="black"
        className="relative overflow-hidden !pt-0"
      >
        <div className="relative z-10 grid items-start gap-12 border-t border-white/10 pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pt-28 xl:gap-20">
          <div className="min-w-0">
            <RevealGroup>
              <RevealItem>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                  THE FAULT IS PART OF THE PRICE
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  Tell us what it is doing
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                  Most online buyers want a reg and a postcode and nothing else.
                  We ask you to describe the fault as well, because what is
                  wrong with the car is an input to the price rather than a box
                  to tick.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                  If you can name which one it is, the offer comes back sharper.
                  If all you know is that it stopped and has not moved since,
                  that is fine, and you are not penalised for it.
                </p>
              </RevealItem>
              <RevealItem>
                <Button
                  href={VALUATION_HREF}
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
              <RevealGroup as="ul" className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                {FAULTS.map((fault) => (
                  <RevealItem as="li" key={fault.label} className="list-none">
                    <FaultCell label={fault.label} icon={fault.icon} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </RevealFrom>
        </div>
      </Section>

      <Section id="kent-models" background="white">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-32 lg:order-2 lg:self-start">
            <SettleImage className="relative aspect-square overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/10">
              <Image
                src="/about/jag-f-pace-centred.png"
                alt="Grey Lamborghini Urus SUV"
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
                  THE JAGUARS WE BUY
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  Every model, in any condition
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  If yours is one of the older cars, you may have assumed nobody
                  but a yard would be interested by now. That is not the case.
                  Age on its own does not take a supercar out of the running.
                </p>
              </RevealItem>
              <RevealItem>
                <ul className="mt-6">
                  {MODELS.map((model) => (
                    <SpecRow
                      key={model.label}
                      label={model.label}
                      icon={model.icon}
                    />
                  ))}
                </ul>
              </RevealItem>
              <RevealItem>
                <Button href={VALUATION_HREF} showArrow className="mt-8">
                  Get your free valuation
                </Button>
              </RevealItem>
            </RevealGroup>
          </RevealFrom>
        </div>
      </Section>

      <Section id="kent-paperwork" background="offwhite">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <SettleImage className="relative aspect-[16/10] overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(10,10,10,0.18)] ring-1 ring-red-primary/10">
              <Image
                src="/how-it-works/enter-details-phone.jpg"
                alt="supercar keys, V5 logbook and service history on a wooden surface"
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
                  NO LOGBOOK, NO MOT
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  Has not moved in years? Still fine.
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  A V5C is not required. Neither is an MOT, and the car does not
                  need to be driveable. Cars that have been stood on a drive for
                  years on SORN, flat battery, seized brakes and all, are bought
                  exactly as they are, and a missing logbook is the single most
                  common reason people put this off far longer than they need
                  to.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary md:text-lg">
                  We complete and submit the change of keeper section as part of
                  every purchase. The duty to tell DVLA the car has been sold
                  stays with you as the registered keeper, so confirm it
                  yourself at{" "}
                  <a
                    href="https://www.gov.uk/sold-bought-vehicle"
                    className="font-medium text-red-primary underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    gov.uk/sold-bought-vehicle
                  </a>
                  . It takes about five minutes and confirms on screen.
                </p>
              </RevealItem>
            </RevealGroup>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-collection"
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
                  COLLECTION IN KENT
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  On our own trailer, not a third-party network
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-white/65 md:text-lg">
                  Collection is free wherever the supercar is in Kent, and it is
                  our own recovery that turns up. If the car cannot be driven it
                  goes on a trailer. Driveway, street, garage forecourt, lock-up
                  or exactly where it stopped, we come to it.
                </p>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-white/65 md:text-lg">
                  Collection is usually within 24 to 48 hours of an accepted
                  offer, often sooner. Payment is same day, by secure bank
                  transfer, cleared before we leave.
                </p>
              </RevealItem>
              <RevealItem>
                <Button
                  href={VALUATION_HREF}
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

      <Section id="kent-towns" background="white">
        <SectionHeading
          align="left"
          eyebrow="ACROSS KENT"
          title="Towns and villages we collect from"
          intro="Collection is free from every town in the county. These are the places we cover most often."
        />

        <RevealGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {KENT.towns.map((town) => (
            <RevealItem as="li" key={town.slug} className="list-none">
              <TownLink town={town} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="kent-options" background="offwhite">
        <SectionHeading
          align="left"
          eyebrow="THE OTHER OPTIONS"
          title="What you are weighing up"
        />

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {OTHER_OPTIONS.map((option) => (
            <RevealItem key={option.title}>
              <article className="h-full rounded-md border border-border-primary bg-white p-6 shadow-[0_10px_30px_-20px_rgba(10,10,10,0.28)] sm:p-8">
                <h3 className="text-lg font-bold tracking-tight text-bg-dark">
                  {option.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-[0.9375rem]">
                  {option.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        id="kent-home"
        background="green"
        className="relative overflow-hidden"
      >
        <GreenPanelBackdrop />
        <RevealGroup className="relative z-10 max-w-4xl">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              KENT IS OUR HOME COUNTY
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-[2rem] lg:text-[2.35rem] lg:leading-[1.15]">
              We are based in Medway, so a Kent seller is dealing with a
              Kent-based buyer rather than an enquiry passed on to whoever
              happens to be nearest.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Beyond the county, collection is free anywhere in mainland UK,
              from the south coast to the Scottish border, so if the supercar is
              in Kent but you are not, that changes nothing. Send the reg, the
              mileage and the postcode, tell us what the car is doing, and we
              will come back with a free offer and no obligation.
            </p>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Testimonials />

      <FAQ faqs={KENT_FAQS} valuationHref={VALUATION_HREF} />

      <CTAband id="valuation" />
    </>
  );
}
