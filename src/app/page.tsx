import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import WorkforceSection from "@/components/WorkforceSection";
import UseCases from "@/components/UseCases";
import BusinessImpact from "@/components/BusinessImpact";
import FutureVision from "@/components/FutureVision";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <WorkforceSection />
        <UseCases />
        <BusinessImpact />
        <FutureVision />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
