import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Filter } from "lucide-react";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import servicesLandingBg from "@/assets/services/CFH-Service-LandingPage.png";

// images
import designEngineeringImg from "@/assets/services/design-engineering.png";
import inspectionMaintenanceImg from "@/assets/services/inspection-maintenance.png";
import evacuationPlansImg from "@/assets/services/evacuation-plans.png";

import airTightnessImg from "@/assets/services/air-tightness-test.png";
import fireExtinguisherMaintenanceImg from "@/assets/services/fire-extinguisher-maintenance.png";
import novec1230Img from "@/assets/services/novec-1230.png";
import hydrostaticTestingImg from "@/assets/services/hydrostatic-testing.png";
import fireHosesImg from "@/assets/services/fire-hoses.png";
import respiratorsImg from "@/assets/services/respirators.png";
import cylinderStrippingPaintingImg from "@/assets/services/cylinder-stripping-painting.png";

type Localized<T> = { en: T; fr: T };

type ServiceGroup = "engineering" | "testing" | "maintenance" | "equipment";

type ServiceCard = {
  id: string;
  group: ServiceGroup;
  title: Localized<string>;
  subtitle: Localized<string>;
  image: string;
  items: Localized<string[]>;
  quoteCategory?: string;
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const [activeTab, setActiveTab] = useState<"all" | ServiceGroup>("all");

  const tabTriggerClassName = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold",
    "bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
    "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent",
    "hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:brightness-95",
    "transition-all duration-200",
    "data-[state=active]:bg-[hsl(var(--cfh-blue))] data-[state=active]:text-white data-[state=active]:border-transparent"
  );

  const services = useMemo<ServiceCard[]>(
    () => [
      {
        id: "design-engineering",
        group: "engineering",
        title: { en: "Design & Engineering", fr: "Conception & ingénierie" },
        subtitle: {
          en: "Engineer-certified plans and system design for all types of fire protection environments.",
          fr: "Plans certifiés par ingénieur et conception pour tous types d’environnements de protection incendie.",
        },
        image: designEngineeringImg,
        quoteCategory: "Plan et ingénérie",
        items: {
          en: [
            "Engineer-certified plans for all types of fire protection systems",
            "Kitchen fire suppression design: multi-zone restaurants with multiple systems",
            "Clean agent suppression: IT rooms, archives, telecommunications equipment",
            "Carbon dioxide (CO₂) systems for manufacturing environments",
            "Chemical powder systems: paint booths, automotive, chemical product storage",
            "Small industrial machine suppression: CNC lathes, server cabinets, electrical substations, dust collectors…",
            "Automatic sprinkler systems",
            "System modifications",
            "Tightness test (integrity testing)",
          ],
          fr: [
            "Plan certifié par ingénieur pour tous types de systèmes incendie",
            "Système d’extinction pour cuisine : restaurant à pièces avec multiples systèmes",
            "Système d’extinction à agent propre : salles informatiques, salles d’archives, équipement de télécommunications",
            "Système à dioxyde de carbone (CO₂) : entreprise manufacturière",
            "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage de produits chimiques",
            "Systèmes d’extinction pour petites machines industrielles : tour CNC, cabine de serveur, poste électrique, dépoussiéreur…",
            "Systèmes de gicleurs",
            "Modifications de systèmes",
            "Test d’étanchéité",
          ],
        },
      },
      {
        id: "air-tightness-test",
        group: "testing",
        title: { en: "Air Tightness Test", fr: "Test d’étanchéité à l’air" },
        subtitle: {
          en: "Room integrity testing for spaces protected by clean agent and special hazard systems.",
          fr: "Test d’intégrité des locaux protégés par des systèmes à agent propre et risques spéciaux.",
        },
        image: airTightnessImg,
        items: {
          en: ["Air tightness testing for rooms protected by suppression systems (NOVEC 1230, CO₂, etc.)"],
          fr: [
            "CFH Sécurité assure le test d’étanchéité à l’air pour les salles à protéger par un système d’extinction (NOVEC 1230, CO₂, etc.)",
          ],
        },
      },
      {
        id: "evacuation-plans",
        group: "engineering",
        title: { en: "Evacuation Plans", fr: "Plans d’évacuation" },
        subtitle: {
          en: "Custom fire emergency evacuation plans designed for your building and workflows.",
          fr: "Plans d’évacuation d’urgence en cas d’incendie sur mesure, adaptés à votre bâtiment.",
        },
        image: evacuationPlansImg,
        quoteCategory: "Plan d'évacuation",
        items: {
          en: ["Custom fire emergency evacuation plans."],
          fr: ["Plans d’évacuation d’urgence en cas d’incendie sur mesure."],
        },
      },
      {
        id: "inspection-maintenance",
        group: "maintenance",
        title: { en: "Inspection & Maintenance", fr: "Inspection & entretien" },
        subtitle: {
          en: "Regular inspection and maintenance to keep your fire protection equipment compliant with local codes.",
          fr: "Inspection et maintenance régulières pour assurer la conformité de vos équipements selon les codes locaux.",
        },
        image: inspectionMaintenanceImg,
        quoteCategory: "Inspection",
        items: {
          en: [
            "Kitchen fire suppression systems",
            "Fire extinguishers",
            "Fire alarm systems",
            "Emergency lighting",
            "Automatic sprinkler systems",
            "DAr inspection (backflow prevention device)",
            "Fire hydrants",
            "Special hazard systems (Sapphire): CO₂, Novec, FM-200",
            "Special hazard systems (FireTrace): CO₂, Novec, FM-200, chemical powder",
            "Chemical powder systems: paint booths, automotive, chemical product storage…",
            "Vehicle and marine systems",
            "Custom workshop services: verification, repair, maintenance and installation of fire protection equipment",
          ],
          fr: [
            "Systèmes d’extinction incendie pour cuisines",
            "Extincteurs",
            "Systèmes d’alarme incendie",
            "Éclairage d’urgence",
            "Systèmes de gicleurs automatique",
            "Inspection DAr (dispositif anti-refoulement)",
            "Bornes fontaines",
            "Systèmes pour risques spéciaux (Sapphire) : CO₂, Novec, FM-200",
            "Systèmes pour risques spéciaux (FireTrace) : CO₂, Novec, FM-200, poudre chimique",
            "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage de produits chimiques…",
            "Systèmes pour véhicules, marin",
            "Notre atelier fournit des services sur mesure : vérification, réparation, entretien et installation d’équipements de protection incendie",
          ],
        },
      },
      {
        id: "fire-extinguisher-maintenance",
        group: "maintenance",
        title: { en: "Fire Extinguisher Maintenance", fr: "Entretien d’extincteurs" },
        subtitle: {
          en: "Inspection, repair, refilling and maintenance of portable, mobile or fixed powder extinguishers (NFPA 10).",
          fr: "Inspection, réparation, remplissage et entretien des extincteurs à poudre portatifs, mobiles ou fixes (NFPA 10).",
        },
        image: fireExtinguisherMaintenanceImg,
        quoteCategory: "Extincteur portatif",
        items: {
          en: ["Inspection, repair, refilling and maintenance of all types of powder extinguishers in compliance with NFPA 10."],
          fr: ["Inspection, réparation, remplissage et entretien de tous types d’extincteurs à poudre en conformité avec la norme NFPA 10."],
        },
      },
      {
        id: "novec-1230",
        group: "maintenance",
        title: { en: "Novec 1230", fr: "Novec 1230" },
        subtitle: {
          en: "Hydrostatic testing, refilling and maintenance for Novec 1230 systems.",
          fr: "Essai hydrostatique, remplissage et entretien des systèmes Novec 1230.",
        },
        image: novec1230Img,
        quoteCategory: "Système d'extinction automatique",
        items: {
          en: ["Hydrostatic testing, refilling and maintenance of Novec 1230 systems."],
          fr: ["Test hydrostatique, remplissage et entretien du système Novec 1230."],
        },
      },
      {
        id: "hydrostatic-testing",
        group: "testing",
        title: { en: "Hydrostatic Testing", fr: "Essais hydrostatiques" },
        subtitle: {
          en: "Computer-controlled hydrostatic testing for high-pressure cylinders up to 10,000 PSI.",
          fr: "Essais hydrostatiques sur bonbonnes haute pression jusqu’à 10 000 PSI avec équipement contrôlé par ordinateur.",
        },
        image: hydrostaticTestingImg,
        items: {
          en: [
            "Hydrostatic testing on high-pressure cylinders up to 10,000 PSI with computer-controlled equipment.",
            "Approved: Transport Canada",
          ],
          fr: [
            "Essais hydrostatiques sur des bonbonnes à haute pression jusqu’à 10 000 PSI avec équipement contrôlé par ordinateur.",
            "Approuvé : Transport Canada",
          ],
        },
      },
      {
        id: "fire-hoses",
        group: "testing",
        title: { en: "Fire Hoses", fr: "Boyaux d’incendie" },
        subtitle: {
          en: "Fire hose testing performed in accordance with NFPA 1962.",
          fr: "Essais de boyaux effectués conformément à la norme NFPA 1962.",
        },
        image: fireHosesImg,
        quoteCategory: "Boyau d'incendie",
        items: {
          en: ["Fire hose testing in accordance with NFPA 1962."],
          fr: ["Essais sur les boyaux conformément à la norme NFPA 1962."],
        },
      },
      {
        id: "respirators",
        group: "equipment",
        title: { en: "Respirator Cylinders", fr: "Bonbonnes respirateurs" },
        subtitle: {
          en: "Breathing air cylinder filling up to 4,500 PSI for firefighters, divers and more.",
          fr: "Remplissage de bonbonnes à air respirable jusqu’à 4 500 PSI (pompiers, plongeurs, etc.).",
        },
        image: respiratorsImg,
        items: {
          en: [
            "Breathing air cylinder filling up to 4,500 PSI (firefighters, divers, etc.).",
            "Equipment tested and certified by Canadian MAXXAM laboratory every six months.",
          ],
          fr: [
            "Remplissage des bonbonnes à air respirable (pompiers, plongeurs, etc.) jusqu’à 4 500 PSI.",
            "Équipement testé et certifié par le laboratoire canadien MAXXAM tous les six mois.",
          ],
        },
      },
      {
        id: "cylinder-stripping-painting",
        group: "equipment",
        title: { en: "Cylinder Stripping & Painting", fr: "Décapage et peinture de cylindres" },
        subtitle: {
          en: "Stripping and painting with high-quality workmanship while meeting Environment Canada requirements.",
          fr: "Décapage et peinture avec une qualité remarquable tout en respectant les exigences d’Environnement Canada.",
        },
        image: cylinderStrippingPaintingImg,
        items: {
          en: ["Cylinder stripping and painting with high-quality workmanship and Environment Canada compliance."],
          fr: [
            "Décapage et peinture des cylindres avec une qualité de service remarquable, en respectant les exigences d’Environnement Canada.",
          ],
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (activeTab === "all") return services;
    return services.filter((s) => s.group === activeTab);
  }, [activeTab, services]);

  const pageTitle = isFr ? "Nos Services" : "Our Services";
  const pageSubtitle = isFr
    ? "Choisissez une catégorie pour explorer nos services."
    : "Select a category to explore our services.";

  const tabLabel = (g: "all" | ServiceGroup) => {
    if (g === "all") return isFr ? "Tout" : "All";
    if (g === "engineering") return isFr ? "Conception" : "Engineering";
    if (g === "testing") return isFr ? "Essais" : "Testing";
    if (g === "maintenance") return isFr ? "Entretien" : "Maintenance";
    return isFr ? "Équipement" : "Equipment";
  };

  return (
    <div className="min-h-screen bg-[hsl(222_47%_6%)] text-foreground">
      {/* Global glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-blue))]/25" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-red))]/25" />
      </div>

      <main>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          {/* HERO */}
          <section className="relative min-h-[85vh] overflow-hidden pb-10 md:pb-14">
            <div className="absolute inset-0">
              <img src={servicesLandingBg} alt={pageTitle} className="w-full h-full object-cover" />
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
                <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">{pageSubtitle}</p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4">
                  <Badge variant="secondary" className="px-4 py-2 text-sm bg-white/5 border border-white/10">
                    <span className="inline-flex items-center gap-2">
                      <Filter className="h-4 w-4 text-[hsl(var(--cfh-blue))]" />
                      {isFr ? "Filtrer par catégorie" : "Filter by category"}
                    </span>
                  </Badge>

                  <TabsList className="mx-auto flex w-fit flex-wrap items-center justify-center gap-3 bg-transparent border-0 p-0">
                    <TabsTrigger value="all" className={tabTriggerClassName}>
                      {tabLabel("all")}
                    </TabsTrigger>
                    <TabsTrigger value="engineering" className={tabTriggerClassName}>
                      {tabLabel("engineering")}
                    </TabsTrigger>
                    <TabsTrigger value="testing" className={tabTriggerClassName}>
                      {tabLabel("testing")}
                    </TabsTrigger>
                    <TabsTrigger value="maintenance" className={tabTriggerClassName}>
                      {tabLabel("maintenance")}
                    </TabsTrigger>
                    <TabsTrigger value="equipment" className={tabTriggerClassName}>
                      {tabLabel("equipment")}
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
            </div>
          </section>

          {/* LIST (one card per row) */}
          <section className="pt-10 pb-16 md:pt-12 md:pb-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mx-auto max-w-6xl">
                <TabsContent value={activeTab} className="mt-0">
                  <div className="space-y-6">
                    {filtered.map((s) => {
                      const title = isFr ? s.title.fr : s.title.en;
                      const subtitle = isFr ? s.subtitle.fr : s.subtitle.en;
                      const items = isFr ? s.items.fr : s.items.en;

                      const quoteUrl = s.quoteCategory
                        ? `/quote?category=${encodeURIComponent(s.quoteCategory)}`
                        : "/quote";

                      return (
                        <Card
                          key={s.id}
                          className={cn(
                            "overflow-hidden rounded-[2.25rem] border border-white/10",
                            "bg-white/5 backdrop-blur-xl",
                            "shadow-[0_30px_90px_rgba(0,0,0,0.30)]",
                            "hover-lift"
                          )}
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr]">
                            {/* IMAGE */}
                            <div className="relative min-h-[260px] md:min-h-[320px] lg:min-h-full">
                              <img src={s.image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                              <div
                                className="absolute inset-0"
                                style={{
                                  background:
                                    "linear-gradient(180deg, hsl(222 47% 6% / 0.08) 0%, hsl(222 47% 6% / 0.88) 100%)",
                                }}
                              />
                            </div>

                            {/* CONTENT */}
                            <CardContent className="p-8 md:p-10 lg:p-12">
                              <h3 className="text-center font-display text-3xl md:text-[34px] font-semibold tracking-tight">
                                {title}
                              </h3>
                              <p className="mt-4 text-center text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                                {subtitle}
                              </p>

                              <div className="mt-8 rounded-2xl bg-black/25 border border-white/10 p-6 md:p-7">
                                <ul className="space-y-3">
                                  {items.map((h) => (
                                    <li key={h} className="flex items-start gap-3">
                                      <span className="mt-0.5 rounded-full bg-[hsl(var(--cfh-red))]/20 p-1">
                                        <Check className="h-4 w-4 text-[hsl(var(--cfh-red))]" />
                                      </span>
                                      <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">
                                        {h}
                                      </span>
                                    </li>
                                  ))}
                                </ul>

                                <div className="mt-8">
                                  <Button
                                    asChild
                                    className={cn(
                                      "w-full bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                                      "font-semibold transition-colors",
                                      "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                                    )}
                                  >
                                    <Link to={quoteUrl} className="inline-flex items-center justify-center gap-2">
                                      {isFr ? "Obtenir une soumission" : "Get a Quote"}
                                      <ArrowRight className="h-4 w-4" />
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </div>
            </div>
          </section>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
