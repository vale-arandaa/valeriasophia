import ScheduleForm from "@/components/ScheduleForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("schedule", "es");

export default function SchedulePageEs() {
  return <ScheduleForm />;
}
