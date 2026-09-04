import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgePoundSterling,
  Car,
  ClipboardCheck,
  FileCheck,
  FileText,
  Gauge,
  Hourglass,
  Receipt,
  ShieldCheck,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import IconSquare from "@/components/IconSquare";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/Section";
import FAQ from "@/app/components/FAQ";
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
  RevealNumeral,
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

export const metadata = buildPageMetadata({
  title: "Sell My Broken Supercar in Kent",
  description: KENT.description,
  path: PATH,
});

const PRICE_MOVERS = ["Model", "Mileage", "Specification", "Which fault"];

const SEQUENCE = [
  {
    step: "01",
    title: "Offer from the form",
    body: "Submit your reg, mileage, postcode and a description of the fault. The offer is priced on what the whole car is worth, no obligation.",
  },
  {
    step: "02",
    title: "Collection within 24 to 48 hours",
    body: "Accept the offer and we arrange collection, usually within 24 to 48 hours and often sooner. Our own recovery turns up, on a trailer where the car will not drive.",
  },
  {
    step: "03",
    title: "Payment cleared before we leave",
    body: "Same-day payment by secure bank transfer, cleared before the driver leaves with the car. Not cash on the spot, not a transfer sent afterwards.",
  },
];

const KENT_REGIONS: { title: string; places: string[] }[] = [
  {
    title: "Medway & North Kent",
    places: [
      "Chatham",
      "Gillingham",
      "Rochester",
      "Dartford",
      "Gravesend",
      "Sittingbourne",
    ],
  },
  {
    title: "East Kent",
    places: [
      "Canterbury",
      "Whitstable",
      "Herne Bay",
      "Margate",
      "Ramsgate",
      "Broadstairs",
      "Deal",
      "Dover",
      "Folkestone",
      "Faversham",
      "Ashford",
    ],
  },
  {
    title: "West Kent",
    places: ["Maidstone", "Sevenoaks", "Tonbridge", "Tunbridge Wells"],
  },
];

const FAULTS: { title: string; body: string }[] = [
  {
    title: "PDK and dual-clutch gearbox faults",
    body: "Harsh shifts, limp mode or complete failure. Main dealers quote eye-watering figures, a specialist factors it into the price instead.",
  },
  {
    title: "ZF automatic limp mode",
    body: "Describe what the gearbox is doing on the form and the offer reflects it.",
  },
  {
    title: "Transfer box trouble on 4WD and AWD cars",
    body: "Common on all-wheel drive exotics, priced as a fault, not a write-off.",
  },
  {
    title: "Air suspension collapse",
    body: "Leaking struts or a failed compressor, where the car sits down on one corner, the point many owners are told it is finished.",
  },
  {
    title: "Turbo failure",
    body: "One expensive but self-contained failure leaves the rest of the car intact.",
  },
  {
    title: "Head gasket and coolant loss",
    body: "The engine may be written off in a garage quote, we price the car, not the repair estimate.",
  },
  {
    title: "Body control module and infotainment faults",
    body: "Black screens and electrical gremlins, which fault it is moves the offer.",
  },
];

const MODELS: { label: string; icon: LucideIcon }[] = [
  { label: "Ferrari and Lamborghini, including V8 and V10 models", icon: Car },
  { label: "Bentley and Aston Martin, air suspension faults and all", icon: Car },
  { label: "McLaren and Porsche, turbocharged cars welcome", icon: Gauge },
  {
    label: "Maserati and exotic SUVs, gearbox and transfer box included",
    icon: Truck,
  },
  { label: "Hybrid and electric exotics", icon: Zap },
  { label: "Lotus and niche marques, whatever their age and mileage", icon: Car },
  {
    label: "Classic and older supercars, running or long off the road",
    icon: Hourglass,
  },
];

const PAPERWORK = [
  {
    title: "Receipt",
    body: "Proof of sale on collection day.",
    icon: Receipt,
  },
  {
    title: "Sale confirmation",
    body: "Written confirmation of the agreed figure.",
    icon: FileCheck,
  },
  {
    title: "DVLA acknowledgement",
    body: "We file the change-of-keeper notification as part of every purchase.",
    icon: FileText,
  },
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

const ACTIVE_STEP_CLASS =
  "border border-red-primary/40 bg-[linear-gradient(90deg,rgba(226,27,22,0.75),rgba(120,0,0,0.45))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_22px_40px_-24px_rgba(157,13,10,0.45)]";

const SURFACE_STEP_CLASS =
  "border border-border-primary bg-bg-surface text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

function SectionGlow({
  position = "right",
}: {
  position?: "left" | "right";
}) {
  const positionClass =
    position === "left"
      ? "-left-32 top-1/2 -translate-y-1/2"
      : "-right-32 top-1/2 -translate-y-1/2";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${positionClass} h-[24rem] w-[24rem] rounded-full opacity-50 blur-3xl`}
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 9%, transparent) 0%, transparent 68%)",
      }}
    />
  );
}

function SectionImage({
  src,
  alt,
  aspect = "video",
  className = "",
  overlay = "none",
}: {
  src: string;
  alt: string;
  aspect?: "video" | "square";
  className?: string;
  overlay?: "none" | "dark";
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" : "aspect-[16/10]";

  return (
    <SettleImage
      className={`relative overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/20 ${aspectClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={90}
        className="object-cover object-center"
      />
      {overlay === "dark" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/30 to-bg-dark/10"
        />
      ) : null}
    </SettleImage>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 13%, transparent) 0%, transparent 68%)",
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

function TownChip({
  town,
  theme = "light",
}: {
  town: LocationTown;
  theme?: "light" | "dark";
}) {
  const className =
    theme === "dark"
      ? "inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-red-primary/40 hover:text-white"
      : "inline-flex items-center rounded-full border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-bg-dark transition-colors hover:border-red-primary/30 hover:text-red-primary";

  if (town.published) {
    return (
      <Link href={getTownPath(KENT, town)} className={className}>
        {town.name}
      </Link>
    );
  }

  return <span className={className}>{town.name}</span>;
}

function SequenceStep({
  step,
  title,
  body,
  index,
}: {
  step: string;
  title: string;
  body: string;
  index: number;
}) {
  const isFirst = index === 0;

  return (
    <RevealItem as="li" className="list-none">
      <article
        className={`motion-card-hover relative overflow-hidden rounded-md px-5 py-5 sm:px-6 sm:py-5 ${
          isFirst ? ACTIVE_STEP_CLASS : SURFACE_STEP_CLASS
        }`}
      >
        {isFirst ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_-10%,rgba(255,255,255,0.12),transparent_48%)]"
          />
        ) : null}

        <div className="relative flex items-center justify-between gap-5">
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {title}
            </h3>
            <p
              className={`mt-1.5 max-w-[42ch] text-sm leading-snug ${
                isFirst ? "text-white/80" : "text-text-secondary"
              }`}
            >
              {body}
            </p>
          </div>
          <RevealNumeral
            className="shrink-0 font-numeral text-[2.5rem] font-medium italic leading-none tracking-tight text-white/30 sm:text-[3.125rem]"
          >
            {step}
          </RevealNumeral>
        </div>
      </article>
    </RevealItem>
  );
}

function FaultRow({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="flex gap-4 py-5 sm:gap-5 sm:py-6">
      <RevealNumeral className="shrink-0 font-numeral text-[1.75rem] font-medium italic leading-none text-red-primary sm:text-[2rem]">
        {String(index + 1).padStart(2, "0")}
      </RevealNumeral>
      <div className="min-w-0 border-l-2 border-red-primary/35 pl-4 sm:pl-5">
        <h3 className="text-base font-bold tracking-tight text-white md:text-lg">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/72 md:text-[0.9375rem]">
          {body}
        </p>
      </div>
    </div>
  );
}

function DocCard({
  title,
  body,
  icon: Icon,
  index,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
  index: number;
}) {
  const isFirst = index === 0;

  return (
    <article
      className={`motion-card-hover relative overflow-hidden rounded-md px-5 py-5 sm:px-6 sm:py-5 ${
        isFirst ? ACTIVE_STEP_CLASS : SURFACE_STEP_CLASS
      }`}
    >
      {isFirst ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_-10%,rgba(255,255,255,0.12),transparent_48%)]"
        />
      ) : null}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <IconSquare
            icon={Icon}
            variant="solid"
            size="sm"
            iconSize={20}
            strokeWidth={2.25}
          />
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {title}
            </h3>
            <p
              className={`mt-1.5 text-sm leading-snug ${
                isFirst ? "text-white/80" : "text-text-secondary"
              }`}
            >
              {body}
            </p>
          </div>
        </div>
        <RevealNumeral
          className="shrink-0 font-numeral text-[2.5rem] font-medium italic leading-none tracking-tight text-white/30 sm:text-[3.125rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </RevealNumeral>
      </div>
    </article>
  );
}

function ModelRow({
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

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 xl:gap-16">
          <RevealGroup trigger="mount">
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                Kent · Supercar specialists
              </p>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Sell my broken supercar in Kent
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
                If your supercar will not start, drives but has failed on
                something expensive, or you have been quoted scrap money for a
                car that still is a supercar, the offer here is priced on what
                the whole car is worth, not what its metal weighs.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-col items-start gap-3">
                <Button
                  href={VALUATION_HREF}
                  variant="primary"
                  primaryTone="accent"
                  showArrow
                  size="lg"
                  className="shrink-0 whitespace-nowrap"
                >
                  Get your free valuation
                </Button>
                <Link
                  href="/blog/non-runner-supercar-value"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
                >
                  How we value non-runners
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>

          <RevealFrom direction="right" className="min-w-0">
            <SettleImage className="relative aspect-square w-full">
              <Image
                src="/Crashed_Bentley.png"
                alt="Damaged red Bentley Bentayga with front-end collision damage"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={90}
                priority
                className="object-contain object-center"
              />
            </SettleImage>
          </RevealFrom>
        </div>
      </Section>

      <Section id="kent-opening" background="white">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <SectionImage
              src="/about/crashed-bentley.webp"
              alt="Damaged Bentley Continental GT with front-end collision damage"
            />
          </RevealFrom>

          <RevealFrom direction="right" className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Anywhere in Kent
            </p>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              You searched Kent because the car is sitting somewhere in the
              county, on a drive in Maidstone, in a lock-up near Ashford, on a
              terraced street in Chatham where it stopped, and every quote you have
              had treats it as disposal. We only buy supercars, and Kent is our
              home patch, we are based in Medway. There is no third-party
              network, no local driver matched from a platform, and no figure
              worked out by the tonne.
            </p>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              Submit your reg, mileage, postcode and what the fault is through
              the form below. The valuation is free, there is no obligation, and
              nothing on this page is a standing offer, the number comes from
              looking at your car.
            </p>
          </RevealFrom>
        </div>
      </Section>

      <Section id="kent-worth" background="black" compact>
        <RevealGroup className="text-center">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              What a broken supercar has actually been worth
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 font-numeral text-4xl font-medium italic tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              £10,000 – £100,000+
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/55 md:text-base">
              Money actually paid. The right car can go higher still depending on
              model, mileage and specification. No figure on a page is a
              valuation, where a car sits in the range depends on:
            </p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {PRICE_MOVERS.map((mover) => (
                <li
                  key={mover}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80"
                >
                  {mover}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section id="kent-scrap-message" background="green" compact>
        <RevealFrom direction="right" className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-[1.12]">
            One fault does not make a supercar scrap
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
            Competitor pages anchor at £50 to £400 and price by metal weight.
            None name a single supercar fault. This page does, because which
            fault it is moves the offer, and describing it accurately on the
            form is what makes the number accurate.
          </p>
          <Button
            href={VALUATION_HREF}
            variant="inverse"
            showArrow
            className="mt-8"
          >
            Get your figure
          </Button>
        </RevealFrom>
      </Section>

      <Section
        id="kent-sequence"
        background="black"
        className="relative overflow-hidden border-t border-border-primary"
      >
        <SectionGlow position="right" />

        <div className="relative z-10 grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="flex min-w-0 flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Offer, collection, payment
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              In that order, with no gap
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-white/65">
              Four out of seven competitor pages leave the seller exposed between
              handover and money. This sequence does not.
            </p>

            <RevealGroup as="ol" className="mt-8 flex flex-col gap-2.5 lg:hidden">
              {SEQUENCE.map((item, index) => (
                <SequenceStep
                  key={item.step}
                  step={item.step}
                  title={item.title}
                  body={item.body}
                  index={index}
                />
              ))}
            </RevealGroup>

            <div className="mt-10 hidden lg:mt-auto lg:block lg:pt-8">
              <SectionImage
                src="/how-it-works/enter-details-phone.webp"
                alt="Person entering their supercar details on the We Buy Broken Supercars website on a phone"
              />
            </div>
          </div>

          <RevealGroup
            as="ol"
            className="hidden flex-col gap-2.5 lg:flex"
          >
            {SEQUENCE.map((item, index) => (
              <SequenceStep
                key={item.step}
                step={item.step}
                title={item.title}
                body={item.body}
                index={index}
              />
            ))}
          </RevealGroup>

          <RevealFrom direction="left" className="min-w-0 lg:hidden">
            <SectionImage
              src="/how-it-works/enter-details-phone.webp"
              alt="Person entering their supercar details on the We Buy Broken Supercars website on a phone"
            />
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-home"
        background="green"
        className="relative overflow-hidden"
      >
        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <RevealGroup className="min-w-0">
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                Kent is our home county
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Based in Medway
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75 md:text-lg">
                A Kent seller is dealing with a Kent-based buyer rather than an
                enquiry passed on to whoever happens to be nearest. There is no
                third-party network and no local driver matched from a platform,
                the people who quote are the people who collect and the people
                who pay.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-white/75 md:text-lg">
                Beyond the county, collection is free anywhere in mainland UK,
                from the south coast to the Scottish border, so if the supercar
                is in Kent but you are not, that changes nothing.
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealFrom direction="right" className="min-w-0">
            <SectionImage
              src="/about/red-rolls-royce.webp"
              alt="Red Rolls-Royce supercar"
              aspect="square"
            />
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-regions"
        background="black"
        className="relative overflow-hidden border-t border-border-primary"
      >
        <SectionGlow position="left" />

        <div className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Where the car is standing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Kent, by area
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              You searched a county because your town felt too small to be covered.
              These are the places we collect from, on a trailer, at no cost to
              you.
            </p>
          </div>

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KENT_REGIONS.map((region) => (
              <RevealItem key={region.title}>
                <article className="motion-card-hover h-full rounded-md border border-border-primary bg-bg-surface p-6 transition duration-200 hover:border-red-primary/50 sm:p-7">
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {region.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {region.places.join(" · ")}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-10 rounded-md border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <RevealItem>
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                All Kent towns
              </p>
            </RevealItem>
            <RevealItem>
              <div className="flex flex-wrap justify-center gap-2">
                {KENT.towns.map((town) => (
                  <TownChip key={town.slug} town={town} theme="dark" />
                ))}
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section
        id="kent-faults"
        background="black"
        className="relative overflow-hidden border-t border-white/[0.06]"
      >
        <SectionGlow position="right" />

        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Supercar faults we buy
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              We ask what&apos;s actually wrong, not just how bad it looks
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-white/75">
              A PDK glitch, a ZF limp mode, a collapsed air suspension strut,
              each one prices differently. Tell us the specific fault rather than
              just &ldquo;damaged&rdquo; or &ldquo;non-runner,&rdquo; and the
              offer reflects it.{" "}
              <Link
                href="/blog/common-supercar-faults"
                className="font-medium text-red-bright underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                Read our common faults guide
              </Link>
              .
            </p>
            <div className="mt-8 hidden lg:block">
              <SectionImage
                src="/Smashed_Aston.png"
                alt="Damaged Aston Martin supercar"
                aspect="square"
                overlay="dark"
              />
            </div>
          </div>

          <RevealGroup
            as="ol"
            className="overflow-hidden rounded-md border border-white/12 bg-bg-surface-light shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            {FAULTS.map((fault, index) => (
              <RevealItem
                as="li"
                key={fault.title}
                className="list-none border-t border-white/10 px-5 transition-colors first:border-t-0 hover:bg-white/[0.025] sm:px-7"
              >
                <FaultRow
                  title={fault.title}
                  body={fault.body}
                  index={index}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealFrom direction="left" className="min-w-0 lg:hidden">
            <SectionImage
              src="/Smashed_Aston.png"
              alt="Damaged Aston Martin supercar"
              aspect="square"
              overlay="dark"
            />
          </RevealFrom>
        </div>
      </Section>

      <Section id="kent-models" background="offwhite">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Every model, any condition
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
              Every marque, in any condition
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              If yours is one of the older cars, you may have assumed nobody but a
              yard would be interested by now. That is not the case. Age on its own
              does not take a supercar out of the running.
            </p>
            <ul className="mt-6">
              {MODELS.map((model) => (
                <ModelRow key={model.label} label={model.label} icon={model.icon} />
              ))}
            </ul>
            <Button href={VALUATION_HREF} showArrow className="mt-8">
              Get your free valuation
            </Button>
          </div>

          <RevealFrom direction="right" className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <SectionImage
              src="/models/lamborghini-supercar.webp"
              alt="White Lamborghini Urus SUV"
              aspect="square"
            />
          </RevealFrom>
        </div>
      </Section>

      <Section id="kent-salvage" background="black" compact>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
            Cat S, Cat N and salvage
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            A valuation case, not end-of-life stock
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <RevealFrom direction="left">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-primary">
                Cat S
              </p>
              <h3 className="mt-3 text-lg font-bold text-white">
                Recorded structural damage
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Priced as a recorded-damage car. Give the category and what work
                has been done on the form, it is expected information, not a
                problem.
              </p>
            </article>
          </RevealFrom>
          <RevealFrom direction="right">
            <article className="rounded-md border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-primary">
                Cat N
              </p>
              <h3 className="mt-3 text-lg font-bold text-white">
                Recorded non-structural damage
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Same principle, a write-off is its own valuation, not folded into
                scrap arithmetic. We buy all salvage categories.
              </p>
            </article>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-paperwork"
        background="black"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--red-primary) 9%, transparent) 0%, transparent 68%)",
          }}
        />

        <div className="relative z-10 grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <RevealFrom direction="left" className="min-w-0">
            <SettleImage
              className="relative aspect-[16/10] rounded-md bg-bg-dark ring-1 ring-red-primary/20 lg:aspect-auto lg:h-full"
            >
              <figure className="relative h-full w-full min-h-[16rem]">
                <Image
                  src="/how-it-works/keys-and-logbook.webp"
                  alt="Supercar keys, V5 logbook and service history on a wooden surface"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-bg-dark/20"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Missing paperwork
                  </p>
                  <p className="mt-1 font-sans text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Logbook optional, sale still goes through.
                  </p>
                </figcaption>
              </figure>
            </SettleImage>
          </RevealFrom>

          <RevealFrom direction="right" className="flex min-w-0 flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              What you need, what you get
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              <span className="text-red-primary">No V5, no MOT,</span> no problem
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Missing documents are normal, not an exception.{" "}
              <Link
                href="/blog/dvla-paperwork-selling-broken-car"
                className="font-medium text-red-primary underline-offset-2 hover:underline"
              >
                DVLA paperwork explained
              </Link>
              .
            </p>

            <RevealGroup className="mt-8 flex flex-col gap-2.5">
              {PAPERWORK.map((doc, index) => (
                <RevealItem key={doc.title}>
                  <DocCard
                    title={doc.title}
                    body={doc.body}
                    icon={doc.icon}
                    index={index}
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-6 text-sm leading-relaxed text-white/55 md:text-base">
              You do not need a logbook or an MOT, and the car does not need to
              drive. You will still need to confirm the sale to DVLA yourself at{" "}
              <a
                href="https://www.gov.uk/sold-bought-vehicle"
                className="font-medium text-red-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                gov.uk/sold-bought-vehicle
              </a>
              .
            </p>
          </RevealFrom>
        </div>

        <RevealFrom direction="left" className="relative z-10 mt-14">
          <div
            id="kent-scrapping"
            className="flex flex-col gap-5 rounded-md border border-red-primary/35 bg-red-primary/[0.06] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:flex-row sm:items-start sm:gap-6 sm:p-8"
          >
            <IconSquare
              icon={AlertTriangle}
              variant="solid"
              size="sm"
              iconSize={20}
              className="shrink-0"
            />
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Scrapping is a one-way door
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                Once a car is scrapped it is issued a Certificate of Destruction
                and cannot go back on the road, whatever was wrong with it. Find
                out what your supercar is worth as a car before you take a
                decision that cannot be undone.
              </p>
            </div>
          </div>
        </RevealFrom>
      </Section>

      <Section
        id="kent-options"
        background="black"
        className="relative overflow-hidden border-t border-white/[0.06]"
      >
        <SectionGlow position="right" />

        <div className="relative z-10">
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            <RevealItem>
              <article className="motion-card-hover h-full rounded-md border border-border-primary bg-bg-surface p-6 transition duration-200 hover:border-red-primary/50 sm:p-7">
                <div className="flex items-start gap-4">
                  <IconSquare
                    icon={ShieldCheck}
                    variant="solid"
                    size="sm"
                    iconSize={20}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-white">
                      20 years in the trade
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      Backed by two decades in the motor trade.
                    </p>
                  </div>
                </div>
              </article>
            </RevealItem>
            <RevealItem>
              <article className="motion-card-hover h-full rounded-md border border-border-primary bg-bg-surface p-6 transition duration-200 hover:border-red-primary/50 sm:p-7">
                <div className="flex items-start gap-4">
                  <IconSquare
                    icon={BadgePoundSterling}
                    variant="solid"
                    size="sm"
                    iconSize={20}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-white">
                      Supercar specialists
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      One marque, fair offers from knowing the cars.
                    </p>
                  </div>
                </div>
              </article>
            </RevealItem>
            <RevealItem>
              <article className="motion-card-hover h-full rounded-md border border-border-primary bg-bg-surface p-6 transition duration-200 hover:border-red-primary/50 sm:p-7">
                <div className="flex items-start gap-4">
                  <IconSquare
                    icon={ClipboardCheck}
                    variant="solid"
                    size="sm"
                    iconSize={20}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-white">
                      Paid upon collection
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      Cleared before we leave, same day, every time.
                    </p>
                  </div>
                </div>
              </article>
            </RevealItem>
          </RevealGroup>

          <div className="mt-16 lg:mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              The other options
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              What you are weighing up
            </h2>
          </div>

          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3">
            {OTHER_OPTIONS.map((option, index) => (
              <RevealItem key={option.title}>
                <article className="motion-card-hover h-full rounded-md border border-white/10 bg-bg-surface-light p-6 transition duration-200 hover:border-red-primary/40 sm:p-7">
                  <RevealNumeral className="font-numeral text-2xl font-medium italic leading-none text-red-primary/70">
                    {String(index + 1).padStart(2, "0")}
                  </RevealNumeral>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-white">
                    {option.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-[0.9375rem]">
                    {option.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <FAQ faqs={KENT_FAQS} valuationHref={VALUATION_HREF} />

      <CTAband id="valuation" />
    </>
  );
}
