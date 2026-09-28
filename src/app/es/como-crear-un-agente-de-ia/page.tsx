import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-create", "es");

export default function GuideCreateEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("create", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="create" />
    </>
  );
}
