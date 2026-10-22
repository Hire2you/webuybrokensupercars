import BrandLandingPage, { brandMetadata } from "@/components/BrandLandingPage";
import { FERRARI_PAGE } from "@/lib/brand-pages/ferrari";

export const metadata = brandMetadata(FERRARI_PAGE);
export default function FerrariPage() { return <BrandLandingPage page={FERRARI_PAGE} />; }
