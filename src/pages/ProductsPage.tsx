import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Reuse existing, on-brand imagery (replace with generated photography later if needed)
import productsHeroImg from "@/assets/services/fire-extinguisher-maintenance.png";
import fireHosesImg from "@/assets/services/fire-hoses.png";
import novec1230Img from "@/assets/services/novec-1230.png";
import kitchenSuppressionImg from "@/assets/services/kitchen-suppression.png";
import hydrostaticTestingImg from "@/assets/services/hydrostatic-testing.png";
import designEngineeringImg from "@/assets/services/design-engineering.png";

type Localized<T> = { en: T; fr: T };

type ProductCategory = {
  id: string;
  group: "fire" | "alarm" | "accessories";
  title: Localized<string>;
  description: Localized<string>;
  highlights: Localized<string[]>;
  image: string;
  badges?: Localized<string[]>;
};

export default function ProductsPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const [activeTab, setActiveTab] = useState<"all" | "fire" | "alarm" | "accessories">("all");

  const categories = useMemo<ProductCategory[]>(
    () => [
      {
        id: "portable-extinguishers",
        group: "fire",
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
        badges: {
          en: ["Ansul", "Buckeye", "Strike First"],
          fr: ["Ansul", "Buckeye", "Strike First"],
        },
      },
      {
        id: "automatic-suppression",
        group: "fire",
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
        id: "kitchen-suppression",
        group: "fire",
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
        id: "fire-hoses",
        group: "accessories",
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
        group: "accessories",
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
        group: "alarm",
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
        group: "alarm",
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

  const filtered = useMemo(() => {
    if (activeTab === "all") return categories;
    return categories.filter((c) => c.group === activeTab);
  }, [activeTab, categories]);

  const pageTitle = isFr ? "Produits" : "Products";
  const pageSubtitle = isFr
    ? "Un catalogue clair, conçu pour faciliter la sélection, la conformité et l’entretien."
    : "A clear catalog designed for faster selection, compliance and ongoing maintenance.";

  return (
    <div className="min-h-screen bg-[hsl(222_47%_6%)] text-foreground">
      {/* Global glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-blue))]/25" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-red))]/25" />
      </div>

      <main>
        {/* HERO (match ServicesPage hero pattern) */}
        <section className="relative min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={productsHeroImg} alt={pageTitle} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, hsl(222 47% 6% / 0.70) 0%, hsl(222 47% 6% / 0.78) 45%, hsl(222 47% 6% / 0.92) 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-44 md:pt-52">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.3rem,4.6vw,4.25rem)]">
                {pageTitle}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {pageSubtitle}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-white/5 border border-white/10">
                  <span className="inline-flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[hsl(var(--cfh-blue))]" />
                    {isFr ? "Filtrer par catégorie" : "Filter by category"}
                  </span>
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="mx-auto grid w-full max-w-[680px] grid-cols-2 md:grid-cols-4 bg-white/5 border border-white/10 rounded-full p-1">
                  <TabsTrigger value="all" className="rounded-full">
                    {isFr ? "Tout" : "All"}
                  </TabsTrigger>
                  <TabsTrigger value="fire" className="rounded-full">
                    {isFr ? "Protection incendie" : "Fire Protection"}
                  </TabsTrigger>
                  <TabsTrigger value="alarm" className="rounded-full">
                    {isFr ? "Système d’alarme" : "Alarm"}
                  </TabsTrigger>
                  <TabsTrigger value="accessories" className="rounded-full">
                    {isFr ? "Accessoires" : "Accessories"}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((c) => {
                      const title = isFr ? c.title.fr : c.title.en;
                      const description = isFr ? c.description.fr : c.description.en;
                      const highlights = isFr ? c.highlights.fr : c.highlights.en;
                      const badges = c.badges ? (isFr ? c.badges.fr : c.badges.en) : [];

                      return (
                        <Card
                          key={c.id}
                          className={cn(
                            "overflow-hidden rounded-[1.75rem] border border-white/10",
                            "bg-white/5 backdrop-blur-xl",
                            "shadow-[0_30px_90px_rgba(0,0,0,0.30)]",
                            "hover-lift"
                          )}
                        >
                          <div className="relative h-44">
                            <img src={c.image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(180deg, hsl(222 47% 6% / 0.15) 0%, hsl(222 47% 6% / 0.85) 100%)",
                              }}
                            />
                            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                              {badges.map((b) => (
                                <Badge key={b} className="bg-black/35 border border-white/10 text-foreground">
                                  {b}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <CardContent className="p-7">
                            <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>

                            <ul className="mt-6 space-y-3">
                              {highlights.map((h) => (
                                <li key={h} className="flex items-start gap-3">
                                  <span className="mt-0.5 rounded-full bg-[hsl(var(--cfh-red))]/20 p-1">
                                    <Check className="h-4 w-4 text-[hsl(var(--cfh-red))]" />
                                  </span>
                                  <span className="text-sm text-foreground/85 leading-relaxed">{h}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-8 flex gap-3">
                              <Button
                                asChild
                                className={cn(
                                  "flex-1 bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                                  "font-semibold transition-colors",
                                  "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                                )}
                              >
                                <Link to="/#contact" className="inline-flex items-center justify-center gap-2">
                                  {isFr ? "Demander une soumission" : "Request a Quote"}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>

                              <Button asChild variant="secondary" className="btn-cfh px-5">
                                <Link to="/services">{isFr ? "Services" : "Services"}</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-14 rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
                    <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                      {isFr ? "Besoin d’aide pour choisir?" : "Not sure what you need?"}
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                      {isFr
                        ? "Décrivez votre bâtiment et vos besoins. Nous vous guiderons vers la solution la plus adaptée et conforme."
                        : "Tell us about your site and requirements. We’ll recommend the right, compliant solution—fast."}
                    </p>
                    <div className="mt-8 flex justify-center">
                      <Button
                        asChild
                        className={cn(
                          "group bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
                          "font-semibold px-10 py-6 text-lg transition-colors",
                          "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent"
                        )}
                      >
                        <Link to="/#contact" className="inline-flex items-center gap-2">
                          {isFr ? "Parler à un expert" : "Talk to an Expert"}
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
