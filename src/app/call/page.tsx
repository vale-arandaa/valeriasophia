import type { Metadata } from "next";
import CallRequestForm from "@/components/CallRequestForm";

export const metadata: Metadata = {
  alternates: { canonical: "/call" },
  title: "Request a Call About AI Agents for Your Business",
  description:
    "Leave your number and we'll call you to show how VLOUXE AI agents can work for your business. No back-and-forth emails.",
};

export default function CallPage() {
  return <CallRequestForm />;
}
