import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How VLOUXE collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return <LegalPage page="privacy" />;
}
