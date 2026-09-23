import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/app/components/FAQ";
import {
  RevealFrom,
  RevealGroup,
  RevealItem,
  SettleImage,
} from "@/components/motion";
import { buildPageMetadata, locationPageJsonLd } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site";
import { COUNTIES } from "@/lib/locations";
import type { RegionalPage } from "@/lib/regional-pages";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.22em] text-red-primary";
const heading = "mt-3 text-3xl font-bold tracking-tight md:text-4xl";
const body = "mt-4 text-base leading-relaxed text-white/70";
const valuationHref = "/#valuation";

export function regionalMetadata(page: RegionalPage): Metadata {
  const title = `Sell Your Broken Supercar in ${page.name}`;
  const base = buildPageMetadata({
    title,
    description: page.description,
    path: `/${page.slug}`,
    ogImage: page.image,
  });
  return { ...base, title: { absolute: `${title} | Free Collection` } };
}

function ValuationButton() {
  return (
    <Button
      href={valuationHref}
      primaryTone="accent"
      showArrow
      className="h-auto min-h-12 max-w-full px-5 py-4 text-center text-sm sm:px-6"
    >
      Get My Supercar Valuation
    </Button>
  );
}

const faults = [
  {
    title: "Engine faults and non-runners",
    body: "Engine failure, overheating, starting problems or a car that has been off the road. Tell us what happens when you try to start it and what has been checked.",
  },
  {
    title: "Gearbox and drivetrain problems",
    body: "Clutch faults, transmission warnings, difficulty selecting gears and drivetrain issues. Include any specialist diagnosis or repair estimate you already have.",
  },
  {
    title: "Accident damage and unfinished repairs",
    body: "Damaged bodywork, recorded Cat S or Cat N vehicles and incomplete repair projects. Describe the damage, insurance category and any missing components.",
  },
  {
    title: "Electrical and suspension faults",
    body: "Warning lights, ECU problems, electrical failures and suspension issues. Explain whether the fault also affects loading, steering or ground clearance.",
  },
];

export default function RegionalLandingPage({ page }: { page: RegionalPage }) {
  const related = page.related
    .map((slug) => COUNTIES.find((area) => area.slug === slug))
    .filter((area) => area !== undefined);
  return (
    <>
      <JsonLd
        data={locationPageJsonLd({
          title: `Sell Your Broken Supercar in ${page.name}`,
          description: page.description,
          path: `/${page.slug}`,
          serviceType: `Broken, damaged and non-running supercar buying in ${page.name}`,
          areaServed: [page.name],
          faqs: page.faqs,
          breadcrumbName: page.name,
        })}
      />

      <Section
        id="location-hero"
        background="black"
        className="relative overflow-hidden"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14">
          <RevealGroup trigger="mount">
            <RevealItem>
              <p className={eyebrow}>{page.name} · Supercar specialists</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Sell Your Broken Supercar in {page.name}
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl">
                {page.hero}
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8">
                <ValuationButton />
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/80">
                {[
                  "Free collection",
                  "No-obligation valuation",
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
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                Prefer to talk about the fault?{" "}
                <a
                  href={`tel:${SITE_CONTACT.phoneTel}`}
                  className="font-semibold text-white underline-offset-4 hover:underline"
                >
                  Call {SITE_CONTACT.phoneDisplay}
                </a>
                .
              </p>
            </RevealItem>
          </RevealGroup>
          <RevealFrom direction="right" className="min-w-0">
            <SettleImage className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/15">
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={90}
                preload
                className="object-cover object-center"
              />
            </SettleImage>
          </RevealFrom>
        </div>
      </Section>

      <Section id="specialist-valuation" background="white">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <p className={eyebrow}>Your car, assessed individually</p>
            <h2 className={`${heading} text-bg-dark`}>{page.introTitle}</h2>
          </div>
          <div>
            {page.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-5 text-base leading-relaxed text-bg-dark/75"
              >
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-red-primary pl-4 text-base leading-relaxed text-bg-dark/85">
              We buy vehicles directly and also work with specialist buyers.
              Before you agree to proceed, we’ll explain who would buy your car
              and how the sale would work.
            </p>
          </div>
        </div>
      </Section>

      <Section id="cars-and-faults" background="black">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <p className={eyebrow}>Mechanical faults · Damage · Non-runners</p>
            <h2 className={`${heading} text-white`}>
              Supercars we consider in {page.name}
            </h2>
            <p className={body}>
              We welcome enquiries for Ferrari, Lamborghini, McLaren, Porsche,
              Aston Martin, Bentley, Maserati, Audi R8 and Lotus models. The
              model and its individual condition matter more than a broad
              description of “broken”.
            </p>
            <SettleImage className="relative mt-8 aspect-[4/3] overflow-hidden rounded-md border border-white/15">
              <Image
                src={page.secondaryImage}
                alt={page.secondaryAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={90}
                className="object-cover"
              />
            </SettleImage>
          </div>
          <div className="divide-y divide-border-primary rounded-md border border-border-primary bg-bg-surface px-5 sm:px-7">
            {faults.map((fault, index) => (
              <article key={fault.title} className="flex gap-4 py-6">
                <span
                  aria-hidden
                  className="shrink-0 font-numeral text-3xl italic text-red-primary"
                >
                  0{index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">
                    {fault.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    {fault.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="collection" background="offwhite">
        <div className="max-w-3xl">
          <p className={eyebrow}>Collection, planned around your car</p>
          <h2 className={`${heading} text-bg-dark`}>{page.collectionTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-bg-dark/70">
            {page.collectionIntro}
          </p>
        </div>
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {page.collection.map((item, index) => (
            <RevealItem
              key={item.title}
              className="min-w-0 border-t-2 border-red-primary pt-5"
            >
              <p
                aria-hidden
                className="font-numeral text-4xl italic text-red-primary"
              >
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-bg-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-bg-dark/70">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        id="coverage"
        background="black"
        className="border-t border-border-primary"
      >
        <div className="max-w-3xl">
          <p className={eyebrow}>Areas we cover</p>
          <h2 className={`${heading} text-white`}>
            Broken supercar collection in {page.name}
          </h2>
          <p className={body}>{page.coverageIntro}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {page.areas.map((area) => (
            <article
              key={area.title}
              className="rounded-md border border-border-primary bg-bg-surface p-6"
            >
              <h3 className="text-lg font-bold text-white">{area.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {area.body}
              </p>
            </article>
          ))}
        </div>
        <p className={body}>
          Your area not listed? Include the collection postcode with your
          enquiry and we’ll discuss the location.
        </p>
      </Section>

      <Section
        id="valuation-details"
        background="black"
        className="border-t border-border-primary"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <p className={eyebrow}>Before you enquire</p>
            <h2 className={`${heading} text-white`}>{page.preparationTitle}</h2>
            <p className={body}>
              The more accurately you describe the vehicle, the easier it is to
              assess it. You can start with the information you have and discuss
              anything uncertain with us.
            </p>
          </div>
          <ul className="divide-y divide-border-primary">
            {page.preparation.map((item) => (
              <li key={item.title} className="flex gap-4 py-5 first:pt-0">
                <Check
                  className="mt-1 shrink-0 text-red-primary"
                  size={20}
                  aria-hidden
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="selling-process"
        background="black"
        className="border-t border-border-primary"
      >
        <p className={eyebrow}>Three clear steps</p>
        <h2 className={`${heading} text-white`}>From enquiry to collection</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Send the vehicle details",
              body: "Use our valuation form to share the registration, mileage, postcode and condition. The enquiry is free and without obligation.",
            },
            {
              title: "Discuss the offer",
              body: "We review the information and explain any proposed offer, the buyer and any details that need confirming. You decide whether to accept.",
            },
            {
              title: "Confirm the handover",
              body: "Once the sale and access details are agreed, we arrange free collection. The agreed payment must be cleared before the vehicle leaves.",
            },
          ].map((step, index) => (
            <li
              key={step.title}
              className={`rounded-md border p-6 ${index === 0 ? "border-red-primary/40 bg-red-dark/20" : "border-border-primary bg-bg-surface"}`}
            >
              <span
                aria-hidden
                className="font-numeral text-4xl italic text-red-primary"
              >
                0{index + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ValuationButton />
        </div>
      </Section>

      <FAQ faqs={page.faqs} valuationHref={valuationHref} />

      <Section id="valuation" background="black" className="cta-banner-section">
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Start with your car’s details</p>
          <h2 className={`${heading} text-white`}>
            Get a supercar valuation in {page.name}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            {page.closing}
          </p>
          <div className="mt-8">
            <ValuationButton />
          </div>
          <p className="mt-6 text-base text-white/80">
            Or call{" "}
            <a
              href={`tel:${SITE_CONTACT.phoneTel}`}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {SITE_CONTACT.phoneDisplay}
            </a>
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            <Link
              href="/how-it-works"
              className="text-white underline decoration-red-primary underline-offset-4"
            >
              Read how the sale works
            </Link>{" "}
            or explore our{" "}
            <Link
              href="/blog/how-to-sell-a-broken-supercar"
              className="text-white underline decoration-red-primary underline-offset-4"
            >
              guide to selling a broken supercar
            </Link>
            .
          </p>
        </div>
      </Section>
      <Section
        id="related-locations"
        background="black"
        compact
        className="border-t border-border-primary"
      >
        <nav aria-label="Related collection areas">
          <h2 className="text-lg font-bold text-white">
            More collection areas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {related.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/${area.slug}`}
                  className="text-white/80 underline decoration-red-primary underline-offset-4 hover:text-white"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
    </>
  );
}
