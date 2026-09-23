import RegionalLandingPage, {
  regionalMetadata,
} from "@/components/RegionalLandingPage";
import { getRegionalPage } from "@/lib/regional-pages";

const page = getRegionalPage("sell-my-broken-supercar-glasgow");
export const metadata = regionalMetadata(page);

export default function Page() {
  return <RegionalLandingPage page={page} />;
}
