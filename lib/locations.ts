import { REGIONAL_PAGES } from "@/lib/regional-pages";
import { TOWN_LOCATIONS } from "@/lib/town-locations";

export type LocationTown = {
  name: string;
  slug: string;
  published: boolean;
};

export type LocationCounty = {
  name: string;
  slug: string;
  title: string;
  description: string;
  areaServed: string[];
  towns: LocationTown[];
};

function town(name: string, slug?: string): LocationTown {
  return {
    name,
    slug: slug ?? name.toLowerCase().replace(/[']/g, "").replace(/\s+/g, "-"),
    published: false,
  };
}

/**
 * County hubs live at /{county.slug}.
 * Town pages sit underneath at /{county.slug}/{town.slug}.
 */
export const COUNTIES: LocationCounty[] = [
  {
    name: "Kent",
    slug: "sell-my-broken-supercar-kent",
    title: "Sell Your Broken Supercar in Kent",
    description:
      "Sell your broken, damaged or non-running supercar in Kent. Based in Medway, we offer specialist valuations and free collection. Request a valuation today.",
    areaServed: ["Kent", "Medway", "Mainland UK"],
    towns: [
      town("Ashford"),
      town("Broadstairs"),
      town("Canterbury"),
      town("Chatham"),
      town("Dartford"),
      town("Deal"),
      town("Dover"),
      town("Faversham"),
      town("Folkestone"),
      town("Gillingham"),
      town("Gravesend"),
      town("Herne Bay"),
      town("Maidstone"),
      town("Margate"),
      town("Ramsgate"),
      town("Rochester"),
      town("Sevenoaks"),
      town("Sittingbourne"),
      town("Tonbridge"),
      town("Tunbridge Wells"),
      town("Whitstable"),
    ],
  },
  ...REGIONAL_PAGES.map((page) => ({
    name: page.name,
    slug: page.slug,
    title: `Sell Your Broken Supercar in ${page.name}`,
    description: page.description,
    areaServed: [page.name, "Mainland UK"],
    towns:
      page.name === "Essex"
        ? [
            town("Basildon"),
            town("Billericay"),
            town("Braintree"),
            town("Brentwood"),
            town("Canvey Island"),
            town("Chelmsford"),
            town("Clacton-on-Sea"),
            town("Colchester"),
            town("Epping"),
            town("Grays"),
            town("Great Dunmow"),
            town("Halstead"),
            town("Harlow"),
            town("Harwich"),
            town("Ingatestone"),
            town("Leigh-on-Sea"),
            town("Maldon"),
            town("Manningtree"),
            town("Rayleigh"),
            town("Rochford"),
            town("Saffron Walden"),
            town("Southend-on-Sea"),
            town("Stanford-le-Hope"),
            town("Thaxted"),
            town("Tilbury"),
            town("Walton-on-the-Naze"),
            town("Westcliff-on-Sea"),
            town("Wickford"),
            town("Witham"),
          ]
        : [],
  })),
];

for (const location of TOWN_LOCATIONS) {
  const parent = COUNTIES.find((county) => county.slug === location.parentSlug);
  if (!parent) throw new Error(`Missing parent area for ${location.name}`);
  const existing = parent.towns.find((item) => item.slug === location.slug);
  if (existing) existing.published = true;
  else parent.towns.push({ name: location.name, slug: location.slug, published: true });
}

export function getCountyBySlug(slug: string): LocationCounty | undefined {
  return COUNTIES.find((county) => county.slug === slug);
}

export function getCountyPath(county: LocationCounty): string {
  return `/${county.slug}`;
}

export function getTownPath(
  county: LocationCounty,
  locationTown: LocationTown,
): string {
  return `/${county.slug}/${locationTown.slug}`;
}

export function getPublishedTowns(county: LocationCounty): LocationTown[] {
  return county.towns.filter((locationTown) => locationTown.published);
}

export function getAllPublishedLocationPaths(): string[] {
  return COUNTIES.flatMap((county) => [
    getCountyPath(county),
    ...getPublishedTowns(county).map((locationTown) =>
      getTownPath(county, locationTown),
    ),
  ]);
}
