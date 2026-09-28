import CallRequestForm from "@/components/CallRequestForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("call", "es");

export default function CallPageEs() {
  return <CallRequestForm />;
}
