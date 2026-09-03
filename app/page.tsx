import CTAband from "@/components/CTAband";
import JsonLd from "@/components/JsonLd";
import { SITE_FAQS } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/seo";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ModelsWeBuy from "./components/ModelsWeBuy";
import Testimonials from "./components/Testimonials";
import TrustBar from "./components/TrustBar";
import WhatWeBuy from "./components/WhatWeBuy";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(SITE_FAQS)} />
      <Hero />
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
