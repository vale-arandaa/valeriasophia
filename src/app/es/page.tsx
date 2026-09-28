import HomePage from "@/components/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home", "es");

export default function HomeEs() {
  return <HomePage />;
}
