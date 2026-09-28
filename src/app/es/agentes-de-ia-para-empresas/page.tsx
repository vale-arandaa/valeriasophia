import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-pillar", "es");

export default function GuidePillarEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("pillar", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="pillar" />
    </>
  );
}
