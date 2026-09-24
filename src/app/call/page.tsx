import type { Metadata } from "next";
import CallRequestForm from "@/components/CallRequestForm";

export const metadata: Metadata = {
  title: "Request a Call",
  description: "Leave your number and we'll call you to schedule a time.",
};

export default function CallPage() {
  return <CallRequestForm />;
}
