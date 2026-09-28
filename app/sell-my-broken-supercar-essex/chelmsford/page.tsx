import RegionalLandingPage, { regionalMetadata } from "@/components/RegionalLandingPage";
import { buildTownPage, type TownEditorial } from "@/lib/town-page";
import data from "@/content/towns/chelmsford.json";

const page = buildTownPage(data as TownEditorial);
export const metadata = regionalMetadata(page);

export default function Page() {
  return <RegionalLandingPage page={page} />;
}
