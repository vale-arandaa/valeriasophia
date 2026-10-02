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

// Datos estructurados para Google: quién es VLOUXE y qué ofrece.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vlouxe.com/#organization",
      name: "VLOUXE",
      url: "https://vlouxe.com",
      logo: "https://vlouxe.com/logo-mark.png",
      email: "hello@vlouxe.com",
      description: "VLOUXE builds AI agents that work as a digital workforce for businesses in the US and Latin America.",
    },
    {
      "@type": "WebSite",
      "@id": "https://vlouxe.com/#website",
      url: "https://vlouxe.com",
      name: "VLOUXE",
      inLanguage: ["en", "es"],
      publisher: { "@id": "https://vlouxe.com/#organization" },
    },
    {
      "@type": "Service",
      name: "VLOUXE AI Workforce",
      serviceType: "AI agents for business",
      provider: { "@id": "https://vlouxe.com/#organization" },
      areaServed: ["United States", "Latin America"],
      url: "https://vlouxe.com/comprar",
      description:
        "Eight coordinated AI agents that answer leads, follow up, support customers, create and post content, research the market and report on your numbers.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI agents included",
        itemListElement: [
          "Sales Agent",
          "Customer Support Agent",
          "Marketing Agent",
          "Content Agent",
          "Research Agent",
          "Analytics Agent",
          "Operations Agent",
          "Bookkeeper Agent",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
