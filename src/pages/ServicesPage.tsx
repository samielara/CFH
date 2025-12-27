import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

type ServiceSection = {
  id: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  image: string;
  items: { en: string[]; fr: string[] };
};

const HEADER_OFFSET_PX = 96;

export default function ServicesPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const location = useLocation();

  const sections = useMemo<ServiceSection[]>(
    () => [
      {
        id: "design-engineering",
        title: { en: "Design & Engineering", fr: "Conception & ingénierie" },
        subtitle: {
          en: "Engineer-certified design and planning for all types of fire protection systems.",
          fr: "Conception et planification certifiées par ingénieur pour tous types de systèmes incendie.",
        },
        image: designEngineeringImg,
        items: {
          en: [
            "Engineer-certified plan for all types of fire systems",
            "Fire extinguishing system for kitchen: room-based restaurant with multiple systems",
            "Clean agent fire suppression: computer rooms, archive rooms, telecommunications equipment",
            "Carbon dioxide (CO₂) system: manufacturing environments",
            "Powder chemical systems: paint booth, automotive, chemical storage",
            "Fire extinguishing systems for small industrial machines: CNC lathe, server cabin, electrical substation, dust collector…",
            "Sprinkler systems",
            "System changes",
            "Leak test",
          ],
          fr: [
            "Plans certifiés par ingénieur pour tous types de systèmes incendie",
            "Système d’extinction pour cuisine : restaurant en zones avec plusieurs systèmes",
            "Extinction à agent propre : salles informatiques, archives, équipements télécom",
            "Systèmes au CO₂ : environnements manufacturiers",
            "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage chimique",
            "Extinction pour petites machines industrielles : tour CNC, cabine serveur, poste électrique, dépoussiéreur…",
            "Systèmes de gicleurs",
            "Modifications de systèmes",
            "Test d’étanchéité (fuite)",
          ],
        },
      },
      {
        id: "air-tightness-test",
        title: { en: "Air Tightness Test", fr: "Test d’étanchéité à l’air" },
        subtitle: {
          en: "Airtightness verification for rooms protected by extinguishing systems.",
          fr: "Vérification de l’étanchéité pour les pièces protégées par systèmes d’extinction.",
        },
        image: airTightnessImg,
        items: {
          en: [
            "Air tightness test",
            "CFH provides airtightness testing for rooms protected by NOVEC 1230, CO₂, etc.",
          ],
          fr: [
            "Test d’étanchéité à l’air",
            "CFH effectue des tests d’étanchéité pour les pièces protégées par NOVEC 1230, CO₂, etc.",
          ],
        },
      },
      {
        id: "evacuation-plans",
        title: { en: "Evacuation Plans", fr: "Plans d’évacuation" },
        subtitle: {
          en: "Clear, customized emergency evacuation planning for your facility.",
          fr: "Plans d’évacuation d’urgence clairs et personnalisés pour votre établissement.",
        },
        image: evacuationPlansImg,
        items: {
          en: ["Customized Fire Emergency Evacuation Plans"],
          fr: ["Plans d’évacuation d’urgence incendie personnalisés"],
        },
      },
      {
        id: "inspection-maintenance",
        title: { en: "Inspection & Maintenance", fr: "Inspection & entretien" },
        subtitle: {
          en: "Regular inspections and maintenance to remain compliant with local fire codes.",
          fr: "Inspections et entretien réguliers pour rester conforme aux codes incendie locaux.",
        },
        image: inspectionMaintenanceImg,
        items: {
          en: [
            "Fire suppression systems for kitchens",
            "Fire extinguishers",
            "Fire alarm systems",
            "Emergency lighting",
            "Automatic sprinkler systems",
            "DAr inspection (backflow prevention device)",
            "Fire hydrants",
            "Special hazard systems (Sapphire): CO₂, Novec, FM-200",
            "Special hazard systems (FireTrace): CO₂, Novec, FM-200, chemical powder",
            "Powder chemical systems: paint booth, automotive, chemical storage, etc.",
            "Vehicle systems, marine",
          ],
          fr: [
            "Systèmes d’extinction pour cuisines",
            "Extincteurs",
            "Systèmes d’alarme incendie",
            "Éclairage d’urgence",
            "Systèmes de gicleurs automatiques",
            "Inspection DAr (dispositif anti-refoulement)",
            "Bornes d’incendie",
            "Systèmes à risques spéciaux (Sapphire) : CO₂, Novec, FM-200",
            "Systèmes à risques spéciaux (FireTrace) : CO₂, Novec, FM-200, poudre chimique",
            "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage chimique, etc.",
            "Systèmes véhicules et marins",
          ],
        },
      },
      {
        id: "fire-extinguisher-maintenance",
        title: { en: "Fire Extinguisher Maintenance", fr: "Entretien d’extincteurs" },
        subtitle: {
          en: "Inspection, repair, filling and maintenance in compliance with NFPA 10.",
          fr: "Inspection, réparation, remplissage et entretien conformément à la norme NFPA 10.",
        },
        image: fireExtinguisherMaintenanceImg,
        items: {
          en: [
            "Inspection, repair, filling and maintenance of portable, mobile or fixed powder extinguishers (NFPA 10).",
          ],
          fr: [
            "Inspection, réparation, remplissage et entretien des extincteurs à poudre portatifs, mobiles ou fixes (NFPA 10).",
          ],
        },
      },
      {
        id: "novec-1230",
        title: { en: "Novec 1230", fr: "Novec 1230" },
        subtitle: {
          en: "Hydrostatic testing, filling and maintenance of Novec 1230 systems.",
          fr: "Essais hydrostatiques, remplissage et entretien des systèmes Novec 1230.",
        },
        image: novec1230Img,
        items: {
          en: ["Hydrostatic testing, filling and maintenance of the Novec 1230 system."],
          fr: ["Essais hydrostatiques, remplissage et entretien du système Novec 1230."],
        },
      },
      {
        id: "hydrostatic-testing",
        title: { en: "Hydrostatic Testing", fr: "Essais hydrostatiques" },
        subtitle: {
          en: "High-pressure cylinder testing up to 10,000 PSI (Transport Canada approved).",
          fr: "Tests de cylindres haute pression jusqu’à 10 000 PSI (approuvé Transport Canada).",
        },
        image: hydrostaticTestingImg,
        items: {
          en: [
            "Hydrostatic tests on high-pressure cylinders using computer-controlled equipment (up to 10,000 PSI).",
            "Approved: Transport Canada",
          ],
          fr: [
            "Essais hydrostatiques sur cylindres haute pression avec équipement contrôlé par ordinateur (jusqu’à 10 000 PSI).",
            "Approuvé : Transport Canada",
          ],
        },
      },
      {
        id: "fire-hoses",
        title: { en: "Fire Hoses", fr: "Boyaux d’incendie" },
        subtitle: {
          en: "Fire hose testing in accordance with NFPA 1962.",
          fr: "Essais de boyaux conformément à la norme NFPA 1962.",
        },
        image: fireHosesImg,
        items: {
          en: ["Hose testing performed in accordance with NFPA 1962."],
          fr: ["Essais de boyaux effectués conformément à la norme NFPA 1962."],
        },
      },
      {
        id: "respirators",
        title: { en: "Respirators", fr: "Appareils respiratoires" },
        subtitle: {
          en: "Breathing air cylinder filling up to 4500 PSI with certified equipment.",
          fr: "Remplissage de cylindres d’air respirable jusqu’à 4500 PSI avec équipement certifié.",
        },
        image: respiratorsImg,
        items: {
          en: [
            "Breathing air cylinder filling for firefighters, divers, etc. up to 4500 PSI.",
            "Equipment tested/certified by Canadian MAXXAM laboratory every six months.",
          ],
          fr: [
            "Remplissage de cylindres d’air respirable (pompiers, plongeurs, etc.) jusqu’à 4500 PSI.",
            "Équipement testé/certifié par le laboratoire canadien MAXXAM tous les six mois.",
          ],
        },
      },
      {
        id: "cylinder-stripping-painting",
        title: { en: "Cylinder Stripping & Painting", fr: "Décapage & peinture de cylindres" },
        subtitle: {
          en: "Stripping and painting performed with quality workmanship and environmental compliance.",
          fr: "Décapage et peinture avec une qualité remarquable et conformité environnementale.",
        },
        image: cylinderStrippingPaintingImg,
        items: {
          en: ["Cylinder stripping and painting in compliance with Environment Canada requirements."],
          fr: ["Décapage et peinture de cylindres conformément aux exigences d’Environnement Canada."],
        },
      },
    ],
    []
  );

  // Smooth-scroll on /services#hash with fixed-header offset
  useEffect(() => {
    const id = location.hash?.replace("#", "");
    if (!id) return;

    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }, [location.hash]);

  const pageTitle = isFr ? "Nos Services" : "Our Services";
  const pageSubtitle = isFr
    ? "Faites défiler pour découvrir nos services."
    : "Scroll to explore our services.";

  return (
    <main className="min-h-screen bg-[hsl(222_47%_6%)] text-foreground">
      {/* Global glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-blue))]/25" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-red))]/25" />
      </div>

      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
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
            <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {pageSubtitle}
            </p>

            {/* Landing chips */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold",
                    "bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
                    "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent",
                    "hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:brightness-95",
                    "transition-all duration-200"
                  )}
                >
                  {isFr ? s.title.fr : s.title.en}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10 SECTIONS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {sections.map((s, idx) => {
              const title = isFr ? s.title.fr : s.title.en;
              const subtitle = isFr ? s.subtitle.fr : s.subtitle.en;
              const items = isFr ? s.items.fr : s.items.en;

              const reversed = idx % 2 === 1;

              return (
                <div
                  key={s.id}
                  id={s.id}
                  className={cn(
                    "scroll-mt-28",
                    "relative rounded-[2.25rem] overflow-hidden border border-white/10",
                    "bg-white/5 backdrop-blur-xl",
                    "shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
                  )}
                >
                  {/* section glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(90%_70%_at_15%_15%,hsl(var(--cfh-blue))_0%,transparent_60%),radial-gradient(80%_65%_at_85%_25%,hsl(var(--cfh-red))_0%,transparent_62%)]" />

                  <div
                    className={cn(
                      "relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0",
                      reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    )}
                  >
                    {/* IMAGE */}
                    <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-full">
                      <img src={s.image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, hsl(222 47% 6% / 0.20) 0%, hsl(222 47% 6% / 0.75) 100%)",
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 md:p-10 lg:p-12">
                      <div className="text-center">
                        <h2 className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2rem,3.2vw,3rem)]">
                          {title}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                          {subtitle}
                        </p>
                      </div>

                      {/* bullets (aligned) */}
                      <div className="mt-8 rounded-2xl bg-black/25 border border-white/10 p-6 md:p-7">
                        <ul className="space-y-3 max-w-2xl mx-auto">
                          {items.map((item, i) => (
                            <li key={i} className="grid grid-cols-[14px_1fr] gap-x-3 items-start">
                              <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--cfh-red))]" />
                              <span className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex justify-center">
                          <Button
                            asChild
                            className={cn(
                              "group bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                              "font-semibold px-10 py-6 text-lg transition-colors",
                              "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                            )}
                          >
                          <Link to="/quote" className="inline-flex items-center gap-2">
                            {isFr ? "Obtenir une soumission" : "Get a Quote"}
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
