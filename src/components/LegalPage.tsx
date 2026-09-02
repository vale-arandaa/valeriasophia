import Nav from "./Nav";
import Footer from "./Footer";
import LegalContent from "./LegalContent";

export default function LegalPage({ page }: { page: "privacy" | "terms" }) {
  return (
    <>
      <Nav />
      <main className="flex-1 pb-24 pt-40">
        <LegalContent page={page} />
      </main>
      <Footer />
    </>
  );
}
