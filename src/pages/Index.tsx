import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Team from "@/components/Team";
import News from "@/components/News";
import Calculators from "@/components/Calculators";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Küheylan Hukuk Bürosu | İstanbul Avukat"
        description="İstanbul merkezli hukuk bürosu. Ceza, gayrimenkul, şirketler, iş ve aile hukuku başta olmak üzere uzman avukat kadrosuyla danışmanlık ve dava takibi."
        path="/"
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        
        <News />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
