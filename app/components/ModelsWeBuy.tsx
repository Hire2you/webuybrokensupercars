import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ModelsCtaPanel from "./ModelsCtaPanel";
import ModelsWeBuyGrid, { ModelsSectionHairline } from "./ModelsWeBuyGrid";

type Model = {
  name: string;
  bodyStyle: string;
  src: string;
};

const models: Model[] = [
  { name: "Ferrari", bodyStyle: "Sports & GT", src: "/models/f-type.webp" },
  { name: "Lamborghini", bodyStyle: "Sports & SUV", src: "/models/f-pace.webp" },
  { name: "McLaren", bodyStyle: "Sports", src: "/models/i-pace.webp" },
  { name: "Porsche", bodyStyle: "Sports & GT", src: "/models/xf.webp" },
  { name: "Aston Martin", bodyStyle: "Grand Tourer", src: "/models/xj.webp" },
  { name: "Bentley", bodyStyle: "GT & SUV", src: "/models/xk.webp" },
  { name: "Maserati", bodyStyle: "GT & SUV", src: "/models/s-type.webp" },
  { name: "Audi R8", bodyStyle: "Sports", src: "/models/xe.webp" },
  { name: "Lotus", bodyStyle: "Sports", src: "/models/e-pace.webp" },
  {
    name: "Classic & Exotic",
    bodyStyle: "All Years",
    src: "/models/classics.webp",
  },
];

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".webp", ".png"] as const;

function publicFile(src: string): string {
  return join(process.cwd(), "public", src.replace(/^\//, ""));
}

function resolveModelSrc(src: string): string | null {
  if (existsSync(publicFile(src))) {
    return src;
  }

  const stem = src.replace(/\.[a-z0-9]+$/i, "");
  const stems =
    stem.endsWith("classic") && !stem.endsWith("classics")
      ? [stem, `${stem}s`]
      : [stem];

  for (const candidateStem of stems) {
    for (const ext of IMAGE_EXTENSIONS) {
      const candidate = `${candidateStem}${ext}`;
      if (candidate !== src && existsSync(publicFile(candidate))) {
        return candidate;
      }
    }
  }

  return null;
}

function modelAlt(name: string): string {
  return name === "Classic & Exotic" ? "Classic exotic supercar" : name;
}

const catalog = models.map((model) => ({
  name: model.name,
  bodyStyle: model.bodyStyle,
  imageSrc: resolveModelSrc(model.src),
  alt: modelAlt(model.name),
}));

export default function ModelsWeBuy() {
  return (
    <Section
      id="models"
      background="black"
      className="relative overflow-hidden border-t border-border-primary"
    >
      <ModelsSectionHairline />

      <SectionHeading
        theme="dark"
        eyebrow="EVERY MODEL"
        title="The supercars we buy"
        intro="We purchase every marque, from Italian sports cars to British GTs and exotic SUVs."
      />

      <div className="relative mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(157,13,10,0.05)_0%,transparent_68%)]"
        />

        <ModelsWeBuyGrid catalog={catalog} />
      </div>

      <ModelsCtaPanel />
    </Section>
  );
}
