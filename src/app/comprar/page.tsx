import type { Metadata } from "next";
import BuyPage from "@/components/BuyPage";

export const metadata: Metadata = {
  alternates: { canonical: "/comprar" },
  title: "Get Your AI Workforce: 8 AI Agents in One Plan",
  description:
    "All 8 VLOUXE AI agents (Sales, Support, Marketing, Content, Research, Analytics, Operations and Executive Assistant) in one plan with your own platform.",
};

export default function ComprarPage() {
  return <BuyPage />;
}
