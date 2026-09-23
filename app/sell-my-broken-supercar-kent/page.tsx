import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Check } from "lucide-react";
import Button from "@/components/Button";
import IconSquare from "@/components/IconSquare";
import JsonLd from "@/components/JsonLd";
import Section from "@/components/Section";
import FAQ from "@/app/components/FAQ";
import { KENT_FAQS } from "@/lib/faq";
import { getCountyBySlug, getCountyPath } from "@/lib/locations";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
  RevealNumeral,
  SettleImage,
} from "@/components/motion";
import { buildPageMetadata, locationPageJsonLd } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site";

const county = getCountyBySlug("sell-my-broken-supercar-kent");
if (!county) throw new Error("Missing Kent county configuration");
const KENT = county;
const PATH = getCountyPath(KENT);
const VALUATION_HREF = "/#valuation";
const SEO_TITLE = "Sell Your Broken Supercar in Kent | Free Collection";
const SOCIAL_TITLE = "Sell Your Broken Supercar in Kent";
const SOCIAL_DESCRIPTION =
  "Engine trouble, accident damage or a supercar that won’t start? Request a specialist valuation from our Medway-based team, with free collection across Kent.";
const baseMetadata = buildPageMetadata({
  title: SEO_TITLE,
  description: KENT.description,
  path: PATH,
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: SEO_TITLE },
  openGraph: {
    ...baseMetadata.openGraph,
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  twitter: {
    ...baseMetadata.twitter,
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
};

const FAULTS = [
  {
    title: "Engine faults and non-runners",
    body: "Cars that won’t start, have suffered engine failure, overheat or have developed a mechanical problem that makes them difficult to use.",
  },
  {
    title: "Gearbox, clutch and transmission problems",
    body: "Supercars with gearbox faults, clutch problems, difficulty selecting gears or other transmission issues.",
  },
  {
    title: "Accident and body damage",
    body: "Vehicles with collision damage, damaged panels or outstanding body repairs. If your car has a recorded insurance write-off category, include that information with your enquiry.",
  },
  {
    title: "Electrical and diagnostic faults",
    body: "Cars with warning lights, electrical problems, ECU faults or intermittent issues. If you have a diagnostic report, it can help us understand the problem.",
  },
  {
    title: "Stored cars and unfinished repairs",
    body: "Supercars that have been off the road, failed an MOT or reached the point where the owner no longer wants to continue paying for repairs.",
  },
];
const MARQUES = [
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Porsche",
  "Aston Martin",
  "Bentley",
  "Maserati",
  "Audi R8",
  "Lotus",
];
const SEQUENCE = [
  {
    title: "Tell us about your car",
    body: "Use our valuation form to share your vehicle details, location and a description of the problem. Include the mileage, known faults and any relevant repair history. Photographs and diagnostic information can help with the assessment.",
  },
  {
    title: "Discuss the valuation",
    body: "We review the information and contact you to discuss your car. We’ll explain the proposed offer, who the buyer would be and any details that need confirming before you decide whether to proceed.",
  },
  {
    title: "Arrange collection",
    body: "Once an offer is accepted and the arrangements are confirmed, we organise free collection from your agreed Kent location. Payment must be cleared before the vehicle leaves.",
  },
];
const REGIONS = [
  {
    title: "North Kent",
    body: "Dartford, Gravesend, Sittingbourne and surrounding areas.",
  },
  {
    title: "West Kent",
    body: "Maidstone, Sevenoaks, Tonbridge and Tunbridge Wells.",
  },
  { title: "East Kent", body: "Canterbury, Ashford and Faversham." },
  {
    title: "Coastal Kent",
    body: "Whitstable, Herne Bay, Margate, Ramsgate, Broadstairs, Deal, Dover and Folkestone.",
  },
];
const VALUE_FACTORS = [
  {
    title: "Make, model and specification",
    body: "Including the particular version and relevant options.",
  },
  {
    title: "Mileage and history",
    body: "Service records, previous repairs and supporting paperwork.",
  },
  {
    title: "The fault or damage",
    body: "What is known, what has been diagnosed and what remains uncertain.",
  },
  {
    title: "Overall condition",
    body: "Bodywork, interior and the condition of other major components.",
  },
  {
    title: "Completeness",
    body: "Whether parts have been removed or repairs have been started.",
  },
];

const EYEBROW =
  "text-xs font-semibold uppercase tracking-[0.22em] text-red-primary";
const HEADING = "mt-3 text-3xl font-bold tracking-tight md:text-4xl";
const BODY = "mt-4 text-base leading-relaxed text-white/70";
const LIGHT_BODY = "mt-4 text-base leading-relaxed text-bg-dark/70";

function ValuationButton({
  children = "Get My Supercar Valuation",
}: {
  children?: ReactNode;
}) {
  return (
    <Button
      href={VALUATION_HREF}
      primaryTone="accent"
      showArrow
      className="h-auto min-h-12 max-w-full px-5 py-4 text-center text-sm sm:px-6"
    >
      {children}
    </Button>
  );
}

function SectionImage({
  src,
  alt,
  square = false,
}: {
  src: string;
  alt: string;
  square?: boolean;
}) {
  return (
    <SettleImage
      className={`relative overflow-hidden rounded-md shadow-[0_22px_40px_-24px_rgba(157,13,10,0.35)] ring-1 ring-red-primary/20 ${square ? "aspect-square" : "aspect-[16/10]"}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={90}
        className="object-cover object-center"
      />
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

export default function KentHubPage() {
  return (
    <>
      <JsonLd
        data={locationPageJsonLd({
          title: SOCIAL_TITLE,
          description: KENT.description,
          path: PATH,
          serviceType:
            "Broken, damaged and non-running supercar buying in Kent",
          areaServed: [
            KENT.name,
            "Medway",
            ...KENT.towns.map((town) => town.name),
          ],
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
              <p className={EYEBROW}>Kent · Supercar specialists</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Sell Your Broken Supercar in Kent
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                Engine trouble, accident damage or a supercar that won’t start?
                We Buy Broken Supercars helps owners across Kent sell specialist
                cars with mechanical faults, damage and other problems.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8">
                <ValuationButton />
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/80">
                {[
                  "Free collection across Kent",
                  "Specialist valuations",
                  "Non-runners considered",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Check
                      size={16}
                      className="shrink-0 text-red-primary"
                      aria-hidden
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Prefer to discuss the problem first?{" "}
                <a
                  href={`tel:${SITE_CONTACT.phoneTel}`}
                  className="font-semibold text-white underline-offset-4 hover:underline"
                >
                  Call {SITE_CONTACT.phoneDisplay}
                </a>
                .
              </p>
              <p className={BODY}>
                Based in Medway, we consider broken and non-running Ferrari,
                Lamborghini, McLaren, Porsche, Aston Martin and other prestige
                models. Tell us about your car for a no-obligation valuation,
                with free collection across Kent if you accept an offer.
              </p>
            </RevealItem>
          </RevealGroup>
          <RevealFrom direction="right" className="min-w-0">
            <SettleImage className="relative aspect-square w-full">
              <Image
                src="/about/crashed-bentayga.webp"
                alt="Damaged red Bentley Bentayga with front-end collision damage"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={90}
                preload
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
            <p className={EYEBROW}>A specialist assessment</p>
            <h2 className={`${HEADING} text-bg-dark`}>
              A specialist valuation for a car with specialist problems
            </h2>
            <p className={LIGHT_BODY}>
              A serious fault can leave you weighing up an expensive repair
              against selling your car as it stands. Finding a buyer can be
              harder when the car cannot be driven or needs work that a general
              dealer is reluctant to take on.
            </p>
            <p className={LIGHT_BODY}>
              We consider the whole car: its make, model, specification, mileage
              and condition, alongside the reported fault or damage. Whether you
              have a diagnosis from a specialist or simply know that something
              is wrong, explain what has happened and we can assess the enquiry.
            </p>
            <p className="mt-5 border-l-2 border-red-primary pl-4 text-base leading-relaxed text-bg-dark/80">
              We buy vehicles directly and also work with specialist buyers.
              Before you agree to proceed, we’ll explain who would buy your car
              and how the sale would work.
            </p>
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-faults"
        background="black"
        className="border-t border-border-primary"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className={EYEBROW}>Supercar faults we consider</p>
            <h2 className={`${HEADING} text-white`}>
              What’s wrong with your supercar?
            </h2>
            <p className={BODY}>
              You don’t need a perfectly running car to request a valuation. We
              consider enquiries involving:
            </p>
            <div className="mt-8 hidden lg:block">
              <SectionImage
                src="/Smashed_Aston.png"
                alt="Damaged Aston Martin supercar"
                square
              />
            </div>
          </div>
          <div className="min-w-0">
            <RevealGroup
              as="ol"
              className="overflow-hidden rounded-md border border-white/12 bg-bg-surface-light"
            >
              {FAULTS.map((fault, index) => (
                <RevealItem
                  as="li"
                  key={fault.title}
                  className="list-none border-t border-white/10 px-5 first:border-t-0 sm:px-7"
                >
                  <div className="flex gap-4 py-5 sm:gap-5 sm:py-6">
                    <RevealNumeral className="shrink-0 font-numeral text-[1.75rem] font-medium italic leading-none text-red-primary sm:text-[2rem]">
                      {String(index + 1).padStart(2, "0")}
                    </RevealNumeral>
                    <div className="min-w-0 border-l-2 border-red-primary/35 pl-4 sm:pl-5">
                      <h3 className="text-lg font-bold tracking-tight text-white">
                        {fault.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-white/70">
                        {fault.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className={BODY}>
              <strong className="text-white">
                Not sure what the fault is?
              </strong>{" "}
              Describe the symptoms and any work already carried out. You can
              still make an enquiry without a confirmed diagnosis.
            </p>
          </div>
        </div>
      </Section>

      <Section id="kent-models" background="offwhite">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <RevealFrom direction="left" className="min-w-0">
            <p className={EYEBROW}>Specialist cars</p>
            <h2 className={`${HEADING} text-bg-dark`}>
              Supercar and prestige marques we consider
            </h2>
            <p className={LIGHT_BODY}>We welcome enquiries for:</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-5 min-[380px]:grid-cols-2">
              {MARQUES.map((marque) => (
                <li
                  key={marque}
                  className="flex items-center gap-3 border-b border-black/10 py-4"
                >
                  <IconSquare
                    icon={Car}
                    variant="solid"
                    size="sm"
                    iconSize={16}
                    strokeWidth={2.5}
                  />
                  <span className="text-sm font-semibold text-bg-dark sm:text-base">
                    {marque}
                  </span>
                </li>
              ))}
            </ul>
            <p className={LIGHT_BODY}>
              From a non-running Ferrari to a damaged McLaren or a Porsche with
              engine trouble, the model and its individual condition matter.
              Send us the details so we can assess your car on its own merits.
            </p>
            <div className="mt-8">
              <ValuationButton>Request a Valuation for My Car</ValuationButton>
            </div>
          </RevealFrom>
          <RevealFrom direction="right" className="min-w-0">
            <SectionImage
              src="/models/lamborghini-supercar.webp"
              alt="White Lamborghini Urus SUV"
              square
            />
          </RevealFrom>
        </div>
      </Section>

      <Section
        id="kent-sequence"
        background="black"
        className="border-t border-border-primary"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="min-w-0">
            <p className={EYEBROW}>Three clear steps</p>
            <h2 className={`${HEADING} text-white`}>
              How selling your broken supercar works
            </h2>
            <div className="mt-8 hidden lg:block">
              <SectionImage
                src="/how-it-works/enter-details-phone.webp"
                alt="Person entering their supercar details on the We Buy Broken Supercars website on a phone"
              />
            </div>
          </div>
          <div className="min-w-0">
            <RevealGroup as="ol" className="flex flex-col gap-3">
              {SEQUENCE.map((step, index) => (
                <RevealItem as="li" key={step.title} className="list-none">
                  <article
                    className={`motion-card-hover relative overflow-hidden rounded-md border p-5 sm:p-6 ${index === 0 ? "border-red-primary/40 bg-[linear-gradient(90deg,rgba(226,27,22,0.75),rgba(120,0,0,0.45))]" : "border-border-primary bg-bg-surface"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p
                          className={`mt-2 text-base leading-relaxed ${index === 0 ? "text-white/85" : "text-text-secondary"}`}
                        >
                          {step.body}
                        </p>
                      </div>
                      <RevealNumeral className="shrink-0 font-numeral text-[2.5rem] font-medium italic leading-none text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </RevealNumeral>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-8">
              <ValuationButton>Get Started With My Valuation</ValuationButton>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="kent-regions"
        background="black"
        className="border-t border-border-primary"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className={EYEBROW}>Kent is our home county</p>
          <h2 className={`${HEADING} text-white`}>
            Based in Medway, collecting across Kent
          </h2>
          <p className={BODY}>
            Our Medway base puts us close to owners in{" "}
            <strong className="font-semibold text-white">
              Rochester, Chatham and Gillingham
            </strong>
            , with collection available throughout Kent.
          </p>
          <p className={BODY}>We also cover:</p>
        </div>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          {REGIONS.map((region) => (
            <RevealItem key={region.title}>
              <article className="motion-card-hover h-full rounded-md border border-border-primary bg-bg-surface p-6 hover:border-red-primary/50 sm:p-7">
                <h3 className="text-lg font-bold tracking-tight text-white">
                  {region.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {region.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className={BODY}>
            Your car may be at home, in storage or waiting at a garage. Tell us
            its location, whether it rolls and steers, and about any access
            restrictions so we can plan collection.
          </p>
          <p className={BODY}>
            If your town or village isn’t listed, include your postcode when you
            enquire.
          </p>
        </div>
      </Section>

      <Section
        id="kent-worth"
        background="black"
        className="border-t border-border-primary"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-14">
          <div>
            <p className={EYEBROW}>Your car, assessed individually</p>
            <h2 className={`${HEADING} text-white`}>
              What affects the value of a broken supercar?
            </h2>
            <p className={BODY}>
              Two cars with a similar fault can have very different values. The
              assessment can depend on:
            </p>
          </div>
          <div>
            <RevealGroup
              as="ul"
              className="divide-y divide-border-primary rounded-md border border-border-primary bg-bg-surface px-5 sm:px-7"
            >
              {VALUE_FACTORS.map((factor) => (
                <RevealItem
                  as="li"
                  key={factor.title}
                  className="flex gap-4 py-5"
                >
                  <IconSquare
                    icon={Check}
                    variant="solid"
                    size="sm"
                    iconSize={18}
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white">
                      {factor.title}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-text-secondary">
                      {factor.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className={BODY}>
              Providing accurate information helps the buyer assess the car and
              reduces the chance of surprises later in the process.
            </p>
          </div>
        </div>
      </Section>

      <FAQ faqs={KENT_FAQS} valuationHref={VALUATION_HREF} />

      <Section id="valuation" background="black" className="cta-banner-section">
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <RevealItem>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Get a valuation for your broken supercar in Kent
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
              Tell us what you own, what’s wrong with it and where it’s located.
              Our Medway-based team can review the details and discuss the next
              step, whether your car has engine trouble, accident damage or
              simply won’t run.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-8">
              <ValuationButton />
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 text-base">
              <a
                href={`tel:${SITE_CONTACT.phoneTel}`}
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                Call {SITE_CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="max-w-full break-all text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                Email {SITE_CONTACT.email}
              </a>
            </div>
            <p className="mt-8 text-base leading-relaxed text-white/65">
              Want to understand the process first? Read{" "}
              <Link
                href="/how-it-works"
                className="text-white underline decoration-red-primary underline-offset-4 hover:text-red-bright"
              >
                how selling your supercar works
              </Link>{" "}
              or our{" "}
              <Link
                href="/blog/how-to-sell-a-broken-supercar"
                className="text-white underline decoration-red-primary underline-offset-4 hover:text-red-bright"
              >
                guide to selling a broken supercar
              </Link>
              .
            </p>
          </RevealItem>
        </RevealGroup>
      </Section>
    </>
  );
}
