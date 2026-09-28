import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("terms", "es");

export default function TermsPageEs() {
  return <LegalPage page="terms" />;
}
