import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("privacy", "es");

export default function PrivacyPageEs() {
  return <LegalPage page="privacy" />;
}
