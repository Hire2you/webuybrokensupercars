import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import CTAband from "@/components/CTAband";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/app/components/FAQ";
import { RevealFrom, RevealGroup, RevealItem, SettleImage } from "@/components/motion";
import { buildPageMetadata, locationPageJsonLd } from "@/lib/seo";
import { BRAND_PAGES } from "@/lib/brands";
import type { FaqItem } from "@/lib/faq";

export type BrandPage = {
  name: string;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: { id: string; title: string; paragraphs: string[] }[];
  faqs: FaqItem[];
};

function richText(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    parts.push(text.slice(last, start));
    parts.push(<Link key={start} href={match[2]} className="font-semibold text-red-primary underline underline-offset-4 hover:text-red-hover">{match[1]}</Link>);
    last = start + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

export function brandMetadata(page: BrandPage) {
  return {
    ...buildPageMetadata({ title: page.metaTitle, description: page.description, path: `/${page.slug}`, ogImage: page.image }),
    title: { absolute: page.metaTitle },
  };
}

export default function BrandLandingPage({ page }: { page: BrandPage }) {
  const otherBrands = BRAND_PAGES.filter((item) => item.slug !== page.slug);
  return <>
    <JsonLd data={locationPageJsonLd({ title: page.title, description: page.description, path: `/${page.slug}`, serviceType: `Buying broken, damaged and non-running ${page.name} cars`, areaServed: ["England", "Scotland", "Wales"], faqs: page.faqs, breadcrumbName: page.name })} />
    <Section id="brand-hero" background="black" className="relative overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14">
        <RevealGroup trigger="mount">
          <RevealItem><p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">{page.name} · Faulty cars and non-runners</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">{page.title}</h1></RevealItem>
          {page.intro.map((text) => <RevealItem key={text}><p className="mt-6 text-lg leading-relaxed text-white/70">{text}</p></RevealItem>)}
          <RevealItem><div className="mt-8"><Button href="#valuation" primaryTone="accent" showArrow className="h-auto min-h-12 max-w-full px-5 py-4 text-center text-sm sm:px-6">Get My {page.name} Valuation</Button></div><p className="mt-5 text-sm text-white/70">Free valuation · No obligation · Collection arranged</p></RevealItem>
        </RevealGroup>
        <RevealFrom direction="right" className="min-w-0"><SettleImage trigger="mount" className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/15"><Image src={page.image} alt={page.imageAlt} fill preload sizes="(max-width: 1024px) 100vw, 45vw" quality={90} className="object-cover object-center" /></SettleImage></RevealFrom>
      </div>
    </Section>
    {page.sections.map((section, index) => <Section key={section.id} id={section.id} background={index % 2 === 0 ? "white" : "offwhite"}>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14"><h2 className="text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">{section.title}</h2><div>{section.paragraphs.map((text) => <p key={text.slice(0,60)} className="mb-5 text-base leading-relaxed text-bg-dark/80 last:mb-0 md:text-lg">{richText(text)}</p>)}</div></div>
    </Section>)}
    <Section id="related-selling-pages" background="black" compact><h2 className="text-2xl font-bold text-white">Explore your selling options</h2><div className="mt-5 flex flex-wrap gap-4"><Link href="/#models" className="font-semibold text-white underline underline-offset-4">All makes we buy</Link>{otherBrands.map((item) => <Link key={item.slug} href={`/${item.slug}`} className="font-semibold text-white underline underline-offset-4">{item.title}</Link>)}<Link href="/how-it-works" className="font-semibold text-white underline underline-offset-4">How the sale works</Link></div></Section>
    <FAQ faqs={page.faqs} valuationHref="#valuation" />
    <CTAband id="valuation" />
  </>;
}
