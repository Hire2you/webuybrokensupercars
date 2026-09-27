import type { RegionalPage } from "@/lib/regional-pages";

export type TownEditorial = Pick<RegionalPage, "description" | "hero" | "introTitle" | "intro" | "collectionTitle" | "collectionIntro" | "collection" | "coverageIntro" | "areas" | "preparationTitle" | "preparation" | "closing" | "faqs"> & {
  name: string;
  slug: string;
  parentName: string;
  parentSlug: string;
  image: "red" | "front" | "lineup" | "evening";
};

const photos = {
  red: ["red-lamborghini", "Red Lamborghini parked on a residential street"],
  front: ["orange-lamborghini-front", "Front view of an orange Lamborghini on a paved forecourt"],
  lineup: ["prestige-car-lineup", "Range Rover, Bentley convertible, Mercedes and Lamborghini on a forecourt"],
  evening: ["orange-lamborghini-evening", "Orange Lamborghini on a forecourt at dusk"],
};

export function buildTownPage(data: TownEditorial): RegionalPage {
  const image = photos[data.image];
  const secondary = data.image === "lineup" ? photos.red : photos.lineup;
  return {
    ...data,
    slug: `${data.parentSlug}/${data.slug}`,
    parent: { name: data.parentName, path: `/${data.parentSlug}` },
    image: `/locations/${image[0]}.webp`,
    imageAlt: image[1],
    secondaryImage: `/locations/${secondary[0]}.webp`,
    secondaryAlt: secondary[1],
    related: [data.parentSlug],
    faqs: [...data.faqs,
      { question: `Is collection free in ${data.name}?`, answer: `Free collection is available from your agreed ${data.name} location once an offer is accepted and access and recovery requirements are confirmed. The valuation enquiry is free and without obligation.` },
      { question: "Who buys the car, and when is payment made?", answer: "We buy directly and also work with specialist buyers. We explain the proposed buyer and sale arrangements before you proceed. The agreed payment must be cleared before the vehicle leaves." },
      { question: `Do you have a branch in ${data.name}?`, answer: `Our team is based in Medway, Kent, and arranges collection in ${data.name} as part of our mainland UK service. This page describes the collection area, not a separate local branch. Timing is agreed after the car and access have been assessed.` },
    ],
  };
}
