import GuidePage from "@/components/GuidePage";
import { faqJsonLd } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("guide-support", "es");

export default function GuideSupportEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd("support", "es")).replace(/</g, "\\u003c") }}
      />
      <GuidePage guide="support" />
    </>
  );
}
