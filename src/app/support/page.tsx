import type { Metadata } from "next";
import SupportForm from "@/components/SupportForm";

export const metadata: Metadata = {
  alternates: { canonical: "/support" },
  title: "Get Help with Your VLOUXE AI Agents",
  description:
    "Having a problem with your VLOUXE AI agents? Tell us what's going on and our team will help you directly.",
};

export default function SupportPage() {
  return <SupportForm />;
}
