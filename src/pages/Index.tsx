import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AccreditationsSection from "@/components/AccreditationsSection";
import Products from "@/components/Products";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Services />
        <Products />
        <AccreditationsSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
