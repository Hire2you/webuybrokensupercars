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
  { name: "XE", bodyStyle: "Saloon", src: "/models/xe.jpg" },
  { name: "XF", bodyStyle: "Saloon", src: "/models/xf.jpg" },
  { name: "XJ", bodyStyle: "Saloon", src: "/models/xj.jpg" },
  { name: "XK", bodyStyle: "Grand Tourer", src: "/models/xk.jpg" },
  { name: "F-Type", bodyStyle: "Sports Car", src: "/models/f-type.jpg" },
  { name: "F-Pace", bodyStyle: "SUV", src: "/models/f-pace.jpg" },
  { name: "E-Pace", bodyStyle: "SUV", src: "/models/e-pace.jpg" },
  { name: "I-Pace", bodyStyle: "Electric SUV", src: "/models/i-pace.jpg" },
  { name: "S-Type", bodyStyle: "Saloon", src: "/models/s-type.jpg" },
  { name: "X-Type", bodyStyle: "Saloon", src: "/models/x-type.jpg" },
  {
    name: "Classic & Older",
    bodyStyle: "All Years",
    src: "/models/classic.jpg",
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
  return name === "Classic & Older" ? "Classic Jaguar" : `Jaguar ${name}`;
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
        title="The Jaguars we buy"
        intro="We purchase every model, from saloons to sports cars and SUVs."
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
