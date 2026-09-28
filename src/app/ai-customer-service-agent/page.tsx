import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-support", "en");

export default function GuideSupport() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("support", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="support" />
    </>
  );
}
