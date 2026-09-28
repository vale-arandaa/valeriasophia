import type { Metadata } from "next";
import ScheduleForm from "@/components/ScheduleForm";

export const metadata: Metadata = {
  alternates: { canonical: "/schedule" },
  title: "Book a Meeting About AI Agents for Your Business",
  description:
    "Pick an open time on our real calendar and see how VLOUXE AI agents can handle sales, support and marketing for your business.",
};

export default function SchedulePage() {
  return <ScheduleForm />;
}
