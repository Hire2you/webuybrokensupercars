import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import GoogleAds from "@/components/GoogleAds";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import ScrollRestoration from "@/components/ScrollRestoration";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  ...buildPageMetadata({
    path: "/",
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${inter.variable} ${bodoni.variable} h-full`}
    >
      <head>
        <GoogleAds />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd data={organizationJsonLd()} />
        <ScrollRestoration />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
