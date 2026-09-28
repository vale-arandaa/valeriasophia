import SupportForm from "@/components/SupportForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("support", "es");

export default function SupportPageEs() {
  return <SupportForm />;
}
