import Link from "next/link";
import Button from "@/components/Button";
import Section from "@/components/Section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Page not found | We Buy Broken Jaguars",
  description:
    "The page you are looking for could not be found. Return to We Buy Broken Jaguars for a free valuation on your broken or non-running Jaguar.",
  path: "/404",
  robots: {
    index: false,
    follow: true,
  },
});

export default function NotFound() {
  return (
    <Section id="not-found" background="offwhite">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-bg-dark md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
          That page does not exist or may have moved. You can head back to the
          homepage or get a free valuation for your Jaguar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" showArrow>
            Back to homepage
          </Button>
          <Link
            href="/#valuation"
            className="text-sm font-semibold text-red-primary underline-offset-2 hover:underline"
          >
            Get a free valuation
          </Link>
        </div>
      </div>
    </Section>
  );
}
