import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-sales", "es");

export default function GuideSalesEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("sales", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="sales" />
    </>
  );
}
