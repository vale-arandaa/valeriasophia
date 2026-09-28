import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-whatsapp", "en");

export default function GuideWhatsapp() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("whatsapp", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="whatsapp" />
    </>
  );
}
