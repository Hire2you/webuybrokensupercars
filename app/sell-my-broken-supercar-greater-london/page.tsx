import RegionalLandingPage, {
  regionalMetadata,
} from "@/components/RegionalLandingPage";
import { getRegionalPage } from "@/lib/regional-pages";

const page = getRegionalPage("sell-my-broken-supercar-greater-london");
export const metadata = regionalMetadata(page);

export default function Page() {
  return <RegionalLandingPage page={page} />;
}
