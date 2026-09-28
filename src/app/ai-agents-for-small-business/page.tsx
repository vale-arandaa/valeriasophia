import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-pymes", "en");

export default function GuidePymes() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("pymes", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="pymes" />
    </>
  );
}
