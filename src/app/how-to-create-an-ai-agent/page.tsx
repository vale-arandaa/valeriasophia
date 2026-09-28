import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-create", "en");

export default function GuideCreate() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("create", "en")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="create" />
    </>
  );
}
