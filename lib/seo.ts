import type { Metadata } from "next";
import type { FaqItem } from "@/lib/faq";
import {
  SITE_CONTACT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  robots?: Metadata["robots"];
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  ogImage = SITE_OG_IMAGE,
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors,
  robots,
}: PageMetadataOptions): Metadata {
  const resolvedTitle = title ?? `${SITE_NAME} | ${SITE_TAGLINE}`;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: canonicalPath,
    },
    ...(robots ? { robots } : {}),
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: ogType,
      images: [
        {
          url: ogImage,
          alt: SITE_NAME,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/logo.webp"),
        email: SITE_CONTACT.email,
        telephone: SITE_CONTACT.phoneTel,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE_CONTACT.phoneTel,
          contactType: "sales",
          email: SITE_CONTACT.email,
          areaServed: "GB",
          availableLanguage: "English",
        },
      },
      {
        "@type": "AutoDealer",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        image: absoluteUrl(SITE_OG_IMAGE),
        telephone: SITE_CONTACT.phoneTel,
        email: SITE_CONTACT.email,
        openingHours: SITE_CONTACT.openingHours,
        areaServed: {
          "@type": "Country",
          name: "United Kingdom",
        },
        priceRange: "££",
        description: SITE_DESCRIPTION,
        parentOrganization: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

type LocationPageJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed: string[];
  faqs: FaqItem[];
  breadcrumbName?: string;
};

export function locationPageJsonLd({
  title,
  description,
  path,
  serviceType,
  areaServed,
  faqs,
  breadcrumbName,
}: LocationPageJsonLdOptions) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        url,
      },
      {
        "@type": "Service",
        name: title,
        serviceType,
        description,
        url,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: SITE_CONTACT.phoneTel,
          email: SITE_CONTACT.email,
        },
        areaServed: areaServed.map((name) => ({
          "@type": "Place",
          name,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbName ?? title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

type ArticleJsonLdOptions = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  coverImage: string;
};

export function articleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  coverImage,
}: ArticleJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: absoluteUrl(coverImage),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.webp"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${slug}`),
    },
  };
}
