import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-sales", "en");

export default function GuideSales() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("sales", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="sales" />
    </>
  );
}
