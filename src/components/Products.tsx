import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Product imagery (reuse until you generate real product photos)
import productsHeroImg from "@/assets/services/fire-extinguisher-maintenance.png";
import fireHosesImg from "@/assets/services/fire-hoses.png";
import novec1230Img from "@/assets/services/novec-1230.png";
import kitchenSuppressionImg from "@/assets/services/kitchen-suppression.png";
import hydrostaticTestingImg from "@/assets/services/hydrostatic-testing.png";
import designEngineeringImg from "@/assets/services/design-engineering.png";

type Slide = {
  id: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
  image: string;
};

const Products = () => {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const slides = useMemo<Slide[]>(
    () => [
       {
        id: "kitchen-suppression",
        title: { en: "Kitchen Fire Suppression", fr: "Extinction pour cuisines" },
        description: {
          en: "Commercial kitchen protection—designed, installed and serviced for fast response and minimal downtime.",
          fr: "Protection des cuisines commerciales—conception, installation et entretien pour une intervention rapide.",
        },
        highlights: {
          en: ["ANSUL (R-102 / PIRANHA)", "PYRO-CHEM", "RANGE-GUARD"],
          fr: ["ANSUL (R-102 / PIRANHA)", "PYRO-CHEM", "RANGE-GUARD"],
        },
        image: kitchenSuppressionImg,
      },
      {
        id: "portable-extinguishers",
        title: { en: "Portable Fire Extinguishers", fr: "Extincteurs portatifs" },
        description: {
          en: "Certified equipment for commercial and industrial environments—selected to match your risk profile and code requirements.",
          fr: "Équipements certifiés pour milieux commerciaux et industriels—sélectionnés selon vos risques et exigences de conformité.",
        },
        highlights: {
          en: ["ABC / BC / CO₂ / Water", "Wall brackets & signage", "Inspection-ready"],
          fr: ["ABC / BC / CO₂ / Eau", "Supports muraux & enseignes", "Prêts pour l’inspection"],
        },
        image: productsHeroImg,
      },
      {
        id: "automatic-suppression",
        title: { en: "Automatic Suppression Systems", fr: "Systèmes d’extinction automatique" },
        description: {
          en: "System solutions for critical rooms and industrial hazards—clean agents, CO₂ and specialty suppression.",
          fr: "Solutions pour salles critiques et risques industriels—agents propres, CO₂ et systèmes spécialisés.",
        },
        highlights: {
          en: ["Clean agents (FK-5-1-12)", "CO₂ systems", "Special hazards"],
          fr: ["Agents propres (FK-5-1-12)", "Systèmes CO₂", "Risques spéciaux"],
        },
        image: novec1230Img,
      },
      {
        id: "fire-hoses",
        title: { en: "Fire Hoses & Storage", fr: "Boyaux d’incendie & rangement" },
        description: {
          en: "Durable hoses and storage hardware for indoor applications—configured to your building layout.",
          fr: "Boyaux durables et accessoires de rangement pour usage intérieur—configurés selon votre bâtiment.",
        },
        highlights: {
          en: ['Hoses (1½" + 2½")', "Reels, racks & supports", "Valves & fittings"],
          fr: ['Boyaux (1½" + 2½")', "Dévidoirs, supports", "Valves & raccords"],
        },
        image: fireHosesImg,
      },
      {
        id: "cabinets-signage",
        title: { en: "Cabinets, Signage & Accessories", fr: "Cabinets, enseignes & accessoires" },
        description: {
          en: "Professional-grade cabinets, labels and accessories to keep equipment visible, protected and compliant.",
          fr: "Cabinets, étiquettes et accessoires professionnels pour garder l’équipement visible, protégé et conforme.",
        },
        highlights: {
          en: ["Recessed & surface cabinets", "Nozzles and hose reels", "Adapters, caps & valves"],
          fr: ["Cabinets encastrés et en surface", "Lances et dévidoirs", "Adaptateurs, bouchons & valves"],
        },
        image: designEngineeringImg,
      },
      {
        id: "alarm-panels-detection",
        title: { en: "Fire Alarm Components", fr: "Composantes d’alarme incendie" },
        description: {
          en: "Detection, notification and control components selected for your site’s coverage and code requirements.",
          fr: "Détection, avertisseurs et composantes de contrôle sélectionnés selon la couverture et la conformité.",
        },
        highlights: {
          en: ["Panels", "Manual stations", "Sirens / horns"],
          fr: ["Panneaux", "Stations manuelles", "Sirènes / klaxons"],
        },
        image: hydrostaticTestingImg,
      },
      {
        id: "emergency-lighting",
        title: { en: "Emergency Lighting", fr: "Éclairage d’urgence" },
        description: {
          en: "Reliable emergency lighting and accessories—built for visibility and safe egress.",
          fr: "Éclairage d’urgence fiable et accessoires—conçus pour la visibilité et l’évacuation sécuritaire.",
        },
        highlights: {
          en: ["Exit signage", "Battery units", "Accessories"],
          fr: ["Enseignes de sortie", "Blocs-batteries", "Accessoires"],
        },
        image: hydrostaticTestingImg,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const sectionTitle = isFr ? "Nos produits" : "Our Products";
  const sectionSubtitle = isFr
    ? "Un catalogue clair, conçu pour faciliter la sélection, la conformité et l’entretien."
    : "A clear catalog designed for faster selection, compliance and ongoing maintenance.";

  const title = isFr ? slide.title.fr : slide.title.en;
  const description = isFr ? slide.description.fr : slide.description.en;
  const highlights = isFr ? slide.highlights.fr : slide.highlights.en;

  return (
    <section id="products" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {sectionSubtitle}
          </p>
        </div>

        <div className="relative max-w-6xl xl:max-w-7xl mx-auto">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous product"
            className={cn(
              "absolute -left-3 md:-left-16 top-1/2 -translate-y-1/2 z-20",
              "h-16 w-16 rounded-full",
              "bg-background/15 backdrop-blur-md border border-border/40",
              "text-foreground/80 hover:text-foreground",
              "hover:border-[hsl(var(--cfh-red))]/40 hover:bg-background/25",
              "transition-all duration-200"
            )}
          >
            <ChevronLeft className="h-8 w-8 mx-auto" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className={cn(
              "absolute -right-3 md:-right-16 top-1/2 -translate-y-1/2 z-20",
              "h-16 w-16 rounded-full",
              "bg-background/15 backdrop-blur-md border border-border/40",
              "text-foreground/80 hover:text-foreground",
              "hover:border-[hsl(var(--cfh-red))]/40 hover:bg-background/25",
              "transition-all duration-200"
            )}
          >
            <ChevronRight className="h-8 w-8 mx-auto" />
          </button>

          {/* Glow wrapper */}
          <div className="relative overflow-visible rounded-3xl">
            <div
              className={cn(
                "pointer-events-none absolute -inset-10 md:-inset-14 rounded-[2rem] blur-3xl opacity-20",
                "bg-[radial-gradient(95%_75%_at_18%_18%,hsl(var(--cfh-red))_0%,transparent_62%),radial-gradient(90%_70%_at_88%_30%,hsl(var(--cfh-blue))_0%,transparent_68%),radial-gradient(80%_65%_at_25%_92%,hsl(var(--cfh-blue))_0%,transparent_70%)]"
              )}
            />

            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl border border-border/40 shadow-2xl bg-background flex flex-col lg:flex-row min-h-[500px]">
              
              {/* Text Section - Left/Bottom */}
              <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 lg:p-12 bg-card relative order-2 lg:order-1">
                 <div className="flex flex-col items-start text-left space-y-6">
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 leading-tight">{title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
                    </div>

                    <ul className="flex flex-col gap-3 w-full">
                      {highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-[hsl(var(--cfh-red))] shrink-0" />
                          <span className="text-sm md:text-base text-foreground/80 font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="
                          bg-[hsl(var(--cfh-red))] text-white
                          font-semibold px-8 h-12
                          hover:bg-[hsl(var(--cfh-red))]/90
                          shadow-lg shadow-[hsl(var(--cfh-red))]/20
                          group
                        "
                      >
                        <Link to="/products" className="inline-flex items-center gap-2">
                          {isFr ? "Voir tous les produits" : "Browse Products"}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </Button>
                    </div>

                    {/* Navigation Dots within Text Panel */}
                    <div className="flex gap-2 mt-4">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`Go to product ${i + 1}`}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            i === index ? "w-8 bg-[hsl(var(--cfh-red))]" : "w-2 bg-muted-foreground/30 hover:bg-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                 </div>
              </div>

              {/* Image Section - Right/Top */}
              <div className="relative w-full lg:w-[60%] h-64 lg:h-auto order-1 lg:order-2 overflow-hidden bg-muted">
                <img 
                  src={slide.image} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>

            </div>
          </div>
          {/* /Glow wrapper */}
        </div>
      </div>
    </section>
  );
};

export default Products;
