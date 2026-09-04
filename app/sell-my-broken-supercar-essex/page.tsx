import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgePoundSterling,
  ClipboardCheck,
  FileCheck,
  FileText,
  MapPin,
  Receipt,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import IconSquare from "@/components/IconSquare";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/Section";
import FAQ from "@/app/components/FAQ";
import { ESSEX_FAQS } from "@/lib/faq";
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
} from "@/components/motion";
import { buildPageMetadata, locationPageJsonLd } from "@/lib/seo";

const COUNTY_SLUG = "sell-my-broken-supercar-essex";
const county = getCountyBySlug(COUNTY_SLUG);

if (!county) {
  throw new Error(`Missing county config for ${COUNTY_SLUG}`);
}

const ESSEX: LocationCounty = county;
const PATH = getCountyPath(ESSEX);
const VALUATION_HREF = "#valuation";

export const metadata = buildPageMetadata({
  title: "Sell My Broken Supercar in Essex",
  description: ESSEX.description,
  path: PATH,
});

const PRICE_MOVERS = ["Model", "Mileage", "Specification", "Which fault"];

const SEQUENCE = [
  {
    step: "01",
    title: "Offer from the form",
    body: "Submit your reg, mileage, postcode and a description of the fault. The offer is priced on what the whole car is worth — no obligation.",
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

const ESSEX_REGIONS: { title: string; places: string[] }[] = [
  {
    title: "Thames-side",
    places: ["Grays", "Tilbury", "Stanford-le-Hope", "Basildon", "Canvey Island"],
  },
  {
    title: "Commuter towns",
    places: [
      "Brentwood",
      "Billericay",
      "Ingatestone",
      "Witham",
      "Braintree",
      "Wickford",
      "Rayleigh",
    ],
  },
  {
    title: "Estuary and coast",
    places: [
      "Southend-on-Sea",
      "Leigh-on-Sea",
      "Westcliff-on-Sea",
      "Clacton-on-Sea",
      "Harwich",
      "Maldon",
    ],
  },
  {
    title: "Rural north",
    places: [
      "Great Dunmow",
      "Halstead",
      "Saffron Walden",
      "Thaxted",
      "Manningtree",
    ],
  },
];

const FAULTS: { title: string; body: string }[] = [
  {
    title: "clutch or gearbox rattle",
    body: "On the 2.0-litre petrol and diesel engines — the repair bill is what ends the car on paper, but a car with one expensive fault is still a whole supercar being priced.",
  },
  {
    title: "Head gasket failure and coolant loss",
    body: "The engine may be written off in a garage quote; we price the car, not the repair estimate.",
  },
  {
    title: "ZF six- and eight-speed automatics",
    body: "Harsh shifts and limp mode — describe what the gearbox is doing on the form and the offer reflects it.",
  },
  {
    title: "Air suspension collapse",
    body: "Leaking struts or a failed compressor, where the car sits down on one corner — the point many owners are told it is finished.",
  },
  {
    title: "Turbo failure",
    body: "One expensive but self-contained failure leaves the rest of the car intact.",
  },
  {
    title: "Electrical and ECU faults",
    body: "Body control module problems, infotainment black screens — which fault it is moves the offer.",
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

function TownChip({ town }: { town: LocationTown }) {
  const className =
    "inline-flex items-center rounded-full border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-bg-dark transition-colors hover:border-red-primary/30 hover:text-red-primary";

  if (town.published) {
    return (
      <Link href={getTownPath(ESSEX, town)} className={className}>
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
  isLast,
}: {
  step: string;
  title: string;
  body: string;
  isLast: boolean;
}) {
  return (
    <RevealItem as="li" className="relative list-none pl-12 sm:pl-16">
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-[1.125rem] top-12 bottom-0 w-px bg-red-primary/25 sm:left-[1.375rem]"
        />
      ) : null}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-red-primary text-xs font-bold text-white sm:h-10 sm:w-10"
      >
        {step}
      </span>
      <h3 className="text-lg font-bold tracking-tight text-bg-dark sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-text-secondary sm:text-base">
        {body}
      </p>
    </RevealItem>
  );
}

function DocCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border-primary bg-white p-6 shadow-[0_10px_30px_-20px_rgba(10,10,10,0.2)]">
      <IconSquare icon={Icon} variant="light" iconSize={24} strokeWidth={2.25} />
      <h3 className="mt-4 text-base font-bold tracking-tight text-bg-dark">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{body}</p>
    </article>
  );
}

export default function EssexHubPage() {
  return (
    <>
      <JsonLd
        data={locationPageJsonLd({
          title: "Sell My Broken Supercar in Essex | Any Model, Non-Runners",
          description: ESSEX.description,
          path: PATH,
          serviceType: "sell my broken supercar essex",
          areaServed: ESSEX.areaServed,
          faqs: ESSEX_FAQS,
          breadcrumbName: ESSEX.name,
        })}
      />

      {/* Light editorial hero — Kent uses a dark hero */}
      <Section
        id="essex-hero"
        background="offwhite"
        className="border-b border-border-primary !pb-14 !pt-16 md:!pb-20 md:!pt-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <RevealGroup trigger="mount">
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                Essex · Supercar specialists
              </p>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-bg-dark sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Sell my broken supercar in Essex
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
                If your supercar will not start, drives but has failed on something
                expensive, or you have been quoted scrap money for a car that still
                is a supercar — the offer here is priced on what the whole car
                is worth, not what its metal weighs.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={VALUATION_HREF} showArrow size="lg">
                  Get your free valuation
                </Button>
                <Link
                  href="/blog/non-runner-supercar-value"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-primary underline-offset-2 hover:underline"
                >
                  How we value non-runners
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      {/* Opening editorial — no side image */}
      <Section id="essex-opening" background="white" compact>
        <RevealFrom direction="right" className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            You searched Essex because the car is sitting somewhere in the county
            — on a drive in Brentwood, in a lock-up near Colchester, on a
            terraced street in Southend where it stopped — and every quote you
            have had treats it as disposal. We only buy supercars, and Essex is
            covered by our own recovery from Medway in Kent. There is no Essex
            yard, no local driver matched from a platform, and no figure worked
            out by the tonne.
          </p>
          <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
            Submit your reg, mileage, postcode and what the fault is through the
            form below. The valuation is free, there is no obligation, and
            nothing on this page is a standing offer — the number comes from
            looking at your car.
          </p>
        </RevealFrom>
      </Section>

      {/* Horizontal price band — Kent uses a green gradient panel */}
      <Section id="essex-worth" background="black" compact>
        <RevealGroup className="text-center">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              What a broken supercar has actually been worth
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 font-numeral text-5xl font-medium italic tracking-tight text-white sm:text-6xl lg:text-7xl">
              £1,200 – £10,000
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 md:text-base">
              Money actually paid. No figure on a page is a valuation — where a
              car sits in the range depends on:
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

      {/* Worked example — unique to Essex */}
      <Section id="essex-example" background="green" className="relative overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14">
          <RevealFrom direction="left">
            <div className="rounded-md border border-white/15 bg-white/[0.06] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Worked example
              </p>
              <p className="mt-4 font-numeral text-5xl font-medium italic tracking-tight text-white sm:text-6xl">
                ~£2,500
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                68-plate Ferrari California
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                A real car, a real figure — bought as a car for a four-figure
                sum, not weighed in. That is the honest answer to &ldquo;what is
                a broken Ferrari California worth?&rdquo; for at least one car of that age.
              </p>
            </div>
          </RevealFrom>

          <RevealFrom direction="right">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-[1.12]">
              One fault does not make a supercar scrap
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75 md:text-lg">
              Competitor pages anchor at £50 to £400 and price by metal weight.
              None name a single supercar fault. This page does, because which
              fault it is moves the offer — and describing it accurately on the
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
        </div>
      </Section>

      {/* Vertical timeline — Kent uses side-by-side comparison cards */}
      <Section id="essex-sequence" background="offwhite">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Offer, collection, payment
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
              In that order, with no gap
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-text-secondary">
              Four out of seven competitor pages leave the seller exposed between
              handover and money. This sequence does not.
            </p>
          </div>

          <RevealGroup as="ol" className="flex flex-col gap-10 sm:gap-12">
            {SEQUENCE.map((item, index) => (
              <SequenceStep
                key={item.step}
                step={item.step}
                title={item.title}
                body={item.body}
                isLast={index === SEQUENCE.length - 1}
              />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Coverage editorial — no circular UK map */}
      <Section id="essex-coverage" background="white">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealFrom direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Essex, and who turns up
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
              Our recovery, not a local yard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              We are based in Medway, Kent. Essex is covered because our own
              recovery goes there — the distance is the buyer&apos;s cost and it
              comes off nothing. The people who quoted are the people who
              collect and the people who pay.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              If the car will not drive, it goes on a trailer from wherever it
              is standing — a farm track, a lock-up, a yard where it has not
              moved since 2022. A car stood for years is normal, not awkward.
            </p>
          </RevealFrom>

          <RevealFrom direction="right">
            <div className="rounded-md border-2 border-red-primary/20 bg-text-primary p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <IconSquare icon={Truck} variant="light" iconSize={26} />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-red-primary">
                    What we do not claim
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary md:text-[0.9375rem]">
                    <li>No Essex yard or office</li>
                    <li>No local driver matched from a platform</li>
                    <li>No figure worked out by weight alone</li>
                    <li>No payment sent after the car has left</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-md bg-bg-dark p-6 text-white">
              <IconSquare icon={MapPin} variant="solid" size="sm" iconSize={18} />
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                <span className="font-semibold text-white">Based in Medway.</span>{" "}
                Free collection anywhere in Essex on our own recovery.
              </p>
            </div>
          </RevealFrom>
        </div>
      </Section>

      {/* Bento regions — Kent uses a flat town grid */}
      <Section id="essex-regions" background="offwhite">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
            Where the car is standing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
            Essex, by area
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            You searched a county because your town felt too small to be covered.
            These are the places we collect from — on a trailer, at no cost to
            you.
          </p>
        </div>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {ESSEX_REGIONS.map((region) => (
            <RevealItem key={region.title}>
              <article className="h-full rounded-md border border-border-primary bg-white p-6 sm:p-7">
                <h3 className="text-lg font-bold tracking-tight text-bg-dark">
                  {region.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {region.places.join(" · ")}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10">
          <RevealItem>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              All Essex towns
            </p>
          </RevealItem>
          <RevealItem>
            <div className="flex flex-wrap justify-center gap-2">
              {ESSEX.towns.map((town) => (
                <TownChip key={town.slug} town={town} />
              ))}
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Numbered fault list — Kent uses a dark icon grid */}
      <Section id="essex-faults" background="white">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
              Supercar faults we buy
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
              We ask what&apos;s actually wrong, not just how bad it looks
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              A PDK glitch, a ZF limp mode, a collapsed air suspension strut,
              each one prices differently. Tell us the specific fault rather than
              just &ldquo;damaged&rdquo; or &ldquo;non-runner,&rdquo; and the
              offer reflects it.{" "}
              <Link
                href="/blog/common-supercar-faults"
                className="font-medium text-red-primary underline-offset-2 hover:underline"
              >
                Read our common faults guide
              </Link>
              .
            </p>
          </div>

          <RevealGroup as="ol" className="flex flex-col gap-0 divide-y divide-line">
            {FAULTS.map((fault, index) => (
              <RevealItem as="li" key={fault.title} className="list-none py-6 first:pt-0">
                <div className="flex gap-5">
                  <RevealNumeral className="shrink-0 font-numeral text-3xl font-medium italic leading-none text-red-primary/35">
                    {String(index + 1).padStart(2, "0")}
                  </RevealNumeral>
                  <div className="min-w-0 border-l-[3px] border-red-primary/25 pl-5">
                    <h3 className="text-base font-bold tracking-tight text-bg-dark md:text-lg">
                      {fault.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-[0.9375rem]">
                      {fault.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Cat S / Cat N definitions — unique section */}
      <Section id="essex-salvage" background="black" compact>
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
                has been done on the form — it is expected information, not a
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
                Same principle — a write-off is its own valuation, not folded
                into scrap arithmetic. We buy all salvage categories.
              </p>
            </article>
          </RevealFrom>
        </div>
      </Section>

      {/* Paperwork trio — Kent folds this into a single image section */}
      <Section id="essex-paperwork" background="offwhite">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
            What you need, what you get
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
            No V5, no MOT, no problem
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Missing documents are normal, not an exception.{" "}
            <Link
              href="/blog/dvla-paperwork-selling-broken-car"
              className="font-medium text-red-primary underline-offset-2 hover:underline"
            >
              DVLA paperwork explained
            </Link>
            .
          </p>
        </div>

        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {PAPERWORK.map((doc) => (
            <RevealItem key={doc.title}>
              <DocCard title={doc.title} body={doc.body} icon={doc.icon} />
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-8">
          <RevealItem>
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-text-secondary md:text-base">
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
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Scrapping warning — unique caution section */}
      <Section id="essex-scrapping" background="white" compact>
        <RevealFrom direction="left">
          <div className="flex flex-col gap-6 rounded-md border border-amber-200/80 bg-amber-50/80 p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
            <IconSquare
              icon={AlertTriangle}
              variant="light"
              iconSize={26}
              className="shrink-0 !bg-amber-100"
            />
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-bg-dark sm:text-2xl">
                Scrapping is a one-way door
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                Once a car is scrapped it is issued a Certificate of Destruction
                and cannot go back on the road, whatever was wrong with it. Find
                out what your supercar is worth as a car before you take a decision
                that cannot be undone.
              </p>
            </div>
          </div>
        </RevealFrom>
      </Section>

      {/* Credibility strip — no full testimonials carousel */}
      <Section id="essex-credibility" background="black" compact>
        <RevealGroup className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          <RevealItem className="text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <IconSquare icon={ShieldCheck} variant="solid" size="sm" iconSize={18} />
              <div>
                <p className="text-sm font-bold text-white">20 years in the trade</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  Backed by two decades in the motor trade.
                </p>
              </div>
            </div>
          </RevealItem>
          <RevealItem className="text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <IconSquare icon={BadgePoundSterling} variant="solid" size="sm" iconSize={18} />
              <div>
                <p className="text-sm font-bold text-white">Supercar specialists</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  One marque, fair offers from knowing the cars.
                </p>
              </div>
            </div>
          </RevealItem>
          <RevealItem className="text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <IconSquare icon={ClipboardCheck} variant="solid" size="sm" iconSize={18} />
              <div>
                <p className="text-sm font-bold text-white">Paid upon collection</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  Cleared before we leave — same day, every time.
                </p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>

        <RevealFrom direction="right" className="mt-10">
          <blockquote className="mx-auto max-w-2xl border-l-[3px] border-red-primary pl-6">
            <p className="text-base italic leading-relaxed text-white/85 md:text-lg">
              &ldquo;I was surprised at how much they ended up offering — I&apos;d
              got quotes from non-specialist buyers that were nowhere near what
              these guys offered. Same-day payment as well.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/50">
              Sharron, Essex seller
            </footer>
          </blockquote>
        </RevealFrom>
      </Section>

      <FAQ faqs={ESSEX_FAQS} valuationHref={VALUATION_HREF} />

      <CTAband id="valuation" />
    </>
  );
}
