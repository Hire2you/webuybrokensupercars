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
    title: "Sell My Broken Supercar in Kent",
    description:
      "Broken, damaged and non-running supercars bought across Kent, any model. Priced on the whole car, not scrap weight. Free collection, same-day payment, no V5C.",
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
  {
    name: "Essex",
    slug: "sell-my-broken-supercar-essex",
    title: "Sell My Broken Supercar in Essex",
    description:
      "Broken, damaged, non-running and write-off supercars bought across Essex. Priced on the whole car by Supercar specialists, with free collection on our own recovery and same-day payment.",
    areaServed: ["Essex", "Medway", "Mainland UK"],
    towns: [
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
    ],
  },
];

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
