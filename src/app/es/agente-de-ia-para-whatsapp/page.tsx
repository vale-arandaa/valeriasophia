import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-whatsapp", "es");

export default function GuideWhatsappEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("whatsapp", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="whatsapp" />
    </>
  );
}
