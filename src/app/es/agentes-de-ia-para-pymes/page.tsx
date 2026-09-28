import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-pymes", "es");

export default function GuidePymesEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("pymes", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="pymes" />
    </>
  );
}
