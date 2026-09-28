import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-agents", "en");

export default function GuideAgents() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("agents", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="agents" />
    </>
  );
}
