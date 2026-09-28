import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-agents", "es");

export default function GuideAgentsEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("agents", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="agents" />
    </>
  );
}
