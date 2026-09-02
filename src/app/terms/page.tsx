import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of VLOUXE products and services.",
};

export default function TermsPage() {
  return <LegalPage page="terms" />;
}
