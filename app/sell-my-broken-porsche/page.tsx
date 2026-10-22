import BrandLandingPage, { brandMetadata } from "@/components/BrandLandingPage";
import { PORSCHE_PAGE } from "@/lib/brand-pages/porsche";

export const metadata = brandMetadata(PORSCHE_PAGE);
export default function PorschePage() { return <BrandLandingPage page={PORSCHE_PAGE} />; }
