import CTAband from "@/components/CTAband";
import JsonLd from "@/components/JsonLd";
import ThankYouCard from "@/components/ThankYouCard";
import { SITE_FAQS } from "@/lib/faq";
import { buildPageMetadata, faqPageJsonLd } from "@/lib/seo";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ModelsWeBuy from "../components/ModelsWeBuy";
import Testimonials from "../components/Testimonials";
import TrustBar from "../components/TrustBar";
import WhatWeBuy from "../components/WhatWeBuy";
import WhyUs from "../components/WhyUs";

export const metadata = buildPageMetadata({
  title: "Thank You",
  description:
    "Thanks for your supercar valuation request. We will be in touch shortly with a no-obligation offer.",
  path: "/thank-you",
  robots: {
    index: false,
    follow: false,
  },
});

export default function ThankYouPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(SITE_FAQS)} />
      <Hero>
        <ThankYouCard />
      </Hero>
      <TrustBar />
      <HowItWorks />
      <WhatWeBuy />
      <WhyUs />
      <ModelsWeBuy />
      <Testimonials />
      <FAQ />
      <CTAband />
    </>
  );
}
