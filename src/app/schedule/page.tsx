import type { Metadata } from "next";
import ScheduleForm from "@/components/ScheduleForm";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description: "Pick an open time on our real calendar — no back-and-forth emails.",
};

export default function SchedulePage() {
  return <ScheduleForm />;
}
