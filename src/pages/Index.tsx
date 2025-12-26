import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Services />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
