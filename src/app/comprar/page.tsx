import type { Metadata } from "next";
import BuyPage from "@/components/BuyPage";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Subscribe to VLOUXE's full AI workforce — implementation plus low monthly maintenance.",
};

export default function ComprarPage() {
  return <BuyPage />;
}
