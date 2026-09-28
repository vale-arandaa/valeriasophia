import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-pillar", "en");

export default function GuidePillar() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("pillar", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="pillar" />
    </>
  );
}
