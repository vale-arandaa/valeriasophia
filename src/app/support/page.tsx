import type { Metadata } from "next";
import SupportForm from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "Get Help",
  description: "Having a problem with VLOUXE? Tell us what's going on and we'll help you directly.",
};

export default function SupportPage() {
  return <SupportForm />;
}
