import Link from "next/link";
import Section from "@/components/Section";
import { getCountyBySlug, getPublishedTowns, getTownPath } from "@/lib/locations";

export default function TownLinks({ countySlug }: { countySlug: string }) {
  const county = getCountyBySlug(countySlug);
  if (!county) return null;
  const towns = getPublishedTowns(county);
  if (!towns.length) return null;
  return <Section id="local-collection-guides" background="black" compact className="border-t border-border-primary">
    <nav aria-label={`${county.name} local collection guides`}>
      <h2 className="text-2xl font-bold tracking-tight text-white">Explore collection in {county.name}</h2>
      <p className="mt-3 text-base leading-relaxed text-text-secondary">Local information for selling a damaged or non-running supercar.</p>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-4">{towns.map((town) => <li key={town.slug}><Link href={getTownPath(county, town)} className="text-white/85 underline decoration-red-primary underline-offset-4 hover:text-white">{town.name}</Link></li>)}</ul>
    </nav>
  </Section>;
}
