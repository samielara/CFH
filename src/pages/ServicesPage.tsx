import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import designEngineeringImg from "@/assets/services/design-engineering.png";
import inspectionMaintenanceImg from "@/assets/services/inspection-maintenance.png";
import specialHazardsImg from "@/assets/services/special-hazards.png";
import evacuationPlansImg from "@/assets/services/evacuation-plans.png";
import servicesLandingBg from "@/assets/services/CFH-Service-LandingPage.png";

// TODO: add these when you generate them (recommended)
/// import airtightnessTestingImg from "@/assets/services/airtightness-testing.png";
/// import fireExtinguisherMaintenanceImg from "@/assets/services/fire-extinguisher-maintenance.png";
/// import novec1230Img from "@/assets/services/novec-1230.png";
/// import hydrostaticTestingImg from "@/assets/services/hydrostatic-testing.png";
/// import fireHoseTestingImg from "@/assets/services/fire-hose-testing.png";
/// import respiratorAirFillingImg from "@/assets/services/respirator-air-filling.png";
/// import cylinderPaintingImg from "@/assets/services/cylinder-stripping-painting.png";

type ServiceSection = {
  id: string;
  title: { en: string; fr: string };
  subtitle?: { en: string; fr: string };
  bullets: { en: string[]; fr: string[] };
  image: string;
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const location = useLocation();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = location.hash?.replace("#", "");
    if (!id) return;

    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      const container = scrollRef.current;
      if (!el || !container) return;

      container.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    });
  }, [location.hash]);

  const sections = useMemo<ServiceSection[]>(
    () => {
      // Fallbacks so this compiles before you generate new images.
      // Swap these to the new images when ready.
      const airtightnessImg = specialHazardsImg; // swap to airtightnessTestingImg
      const extinguisherImg = inspectionMaintenanceImg; // swap to fireExtinguisherMaintenanceImg
      const novecImg = specialHazardsImg; // swap to novec1230Img
      const hydroImg = inspectionMaintenanceImg; // swap to hydrostaticTestingImg
      const hoseImg = inspectionMaintenanceImg; // swap to fireHoseTestingImg
      const respiratorImg = inspectionMaintenanceImg; // swap to respiratorAirFillingImg
      const paintingImg = inspectionMaintenanceImg; // swap to cylinderPaintingImg

      return [
        // 1) Design and engineering
        {
          id: "design-engineering",
          title: { en: "Design & Engineering", fr: "Conception & ingénierie" },
          subtitle: {
            en: "Engineer-certified plan and system design for a wide range of fire protection solutions.",
            fr: "Plans et conception certifiés par ingénieur pour une vaste gamme de solutions de protection incendie.",
          },
          image: designEngineeringImg,
          bullets: {
            en: [
              "Engineer-certified plan for all types of fire systems",
              "Fire extinguishing system for kitchen: room-based restaurant with multiple systems",
              "Clean agent fire suppression system: computer rooms, archive rooms, telecommunications equipment",
              "Carbon dioxide system: manufacturing company",
              "Powder chemical systems: paint booth, automotive, chemical storage",
              "Fire extinguishing systems for small industrial machines: CNC lathe machine, server cabin, electrical substation, dust collector…",
              "Sprinkler systems",
              "System changes",
              "Leak test",
            ],
            fr: [
              "Plans certifiés par ingénieur pour tous types de systèmes incendie",
              "Système d’extinction pour cuisine : restaurant en zones avec plusieurs systèmes",
              "Extinction à agent propre : salles informatiques, archives, équipements télécom",
              "Système au dioxyde de carbone (CO₂) : entreprise manufacturière",
              "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage chimique",
              "Extinction pour petites machines industrielles : tour CNC, cabine serveur, poste électrique, dépoussiéreur…",
              "Systèmes de gicleurs",
              "Modifications de systèmes",
              "Test de fuite",
            ],
          },
        },

        // 2) Air tightness test
        {
          id: "air-tightness-test",
          title: { en: "Air Tightness Test", fr: "Test d’étanchéité à l’air" },
          subtitle: {
            en: "Room integrity / airtightness testing to ensure protected spaces meet suppression requirements.",
            fr: "Tests d’intégrité des locaux (étanchéité à l’air) pour assurer la conformité des zones protégées.",
          },
          image: airtightnessImg,
          bullets: {
            en: [
              "Air tightness test",
              "CFH Safety provides airtightness testing for rooms to be protected by an extinguishing system such as NOVEC 1230, CO₂, etc.",
            ],
            fr: [
              "Test d’étanchéité à l’air",
              "CFH Sécurité effectue des tests d’étanchéité à l’air pour les pièces protégées par NOVEC 1230, CO₂, etc.",
            ],
          },
        },

        // 3) Evacuation plans
        {
          id: "evacuation-plans",
          title: { en: "Evacuation Plans", fr: "Plans d’évacuation" },
          subtitle: {
            en: "Customized emergency evacuation plans designed for clarity and speed.",
            fr: "Plans d’évacuation d’urgence personnalisés, conçus pour être clairs et efficaces.",
          },
          image: evacuationPlansImg,
          bullets: {
            en: ["Customized Fire Emergency Evacuation Plans"],
            fr: ["Plans d’évacuation d’urgence incendie personnalisés"],
          },
        },

        // 4) Inspection and maintenance
        {
          id: "inspection-maintenance",
          title: { en: "Inspection & Maintenance", fr: "Inspection & entretien" },
          subtitle: {
            en: "Regular inspections and maintenance to remain compliant with local fire codes.",
            fr: "Inspections et entretien réguliers pour assurer la conformité aux codes incendie locaux.",
          },
          image: inspectionMaintenanceImg,
          bullets: {
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

        // 5) Fire extinguisher maintenance
        {
          id: "fire-extinguisher-maintenance",
          title: { en: "Fire Extinguisher Maintenance", fr: "Entretien d’extincteurs" },
          subtitle: {
            en: "Inspection, repair, filling, and maintenance in compliance with NFPA 10.",
            fr: "Inspection, réparation, remplissage et entretien conformément à la norme NFPA 10.",
          },
          image: extinguisherImg,
          bullets: {
            en: [
              "Inspection, repair, filling and maintenance of portable, mobile or fixed powder fire extinguishers (NFPA 10).",
            ],
            fr: [
              "Inspection, réparation, remplissage et entretien d’extincteurs à poudre portatifs, mobiles ou fixes (NFPA 10).",
            ],
          },
        },

        // 6) Novec 1230
        {
          id: "novec-1230",
          title: { en: "Novec 1230", fr: "Novec 1230" },
          subtitle: {
            en: "Hydrostatic testing, filling and maintenance for Novec 1230 systems.",
            fr: "Essais hydrostatiques, remplissage et entretien des systèmes Novec 1230.",
          },
          image: novecImg,
          bullets: {
            en: ["Hydrostatic testing, filling and maintenance of the Novec 1230 system."],
            fr: ["Essais hydrostatiques, remplissage et entretien du système Novec 1230."],
          },
        },

        // 7) Hydrostatic testing
        {
          id: "hydrostatic-testing",
          title: { en: "Hydrostatic Testing", fr: "Essais hydrostatiques" },
          subtitle: {
            en: "Computer-controlled hydrostatic testing up to 10,000 PSI (Transport Canada approved).",
            fr: "Essais hydrostatiques contrôlés par ordinateur jusqu’à 10 000 PSI (approuvé Transport Canada).",
          },
          image: hydroImg,
          bullets: {
            en: [
              "Hydrostatic tests on high-pressure cylinders (up to 10,000 PSI).",
              "Approved: Transport Canada.",
            ],
            fr: [
              "Essais hydrostatiques sur cylindres haute pression (jusqu’à 10 000 PSI).",
              "Approuvé : Transport Canada.",
            ],
          },
        },

        // 8) Fire hoses
        {
          id: "fire-hoses",
          title: { en: "Fire Hoses", fr: "Boyaux d’incendie" },
          subtitle: {
            en: "Hose testing services in accordance with NFPA 1962.",
            fr: "Services d’essai de boyaux conformément à la norme NFPA 1962.",
          },
          image: hoseImg,
          bullets: {
            en: ["Hose testing services (in accordance with NFPA 1962)."],
            fr: ["Essais de boyaux (conformément à la norme NFPA 1962)."],
          },
        },

        // 9) Respirators
        {
          id: "respirators",
          title: { en: "Respirators", fr: "Appareils respiratoires" },
          subtitle: {
            en: "Breathing air cylinder filling up to 4500 PSI; equipment certified every six months.",
            fr: "Remplissage de cylindres d’air respirable jusqu’à 4500 PSI; équipement certifié tous les six mois.",
          },
          image: respiratorImg,
          bullets: {
            en: [
              "Breathing air cylinder filling for firefighters, divers, etc. (up to 4500 PSI).",
              "Equipment tested and certified by the Canadian MAXXAM laboratory every six months.",
            ],
            fr: [
              "Remplissage de cylindres d’air respirable pour pompiers, plongeurs, etc. (jusqu’à 4500 PSI).",
              "Équipement testé et certifié par le laboratoire canadien MAXXAM tous les six mois.",
            ],
          },
        },

        // 10) Stripping and painting of cylinders
        {
          id: "cylinder-stripping-painting",
          title: { en: "Cylinder Stripping & Painting", fr: "Décapage & peinture de cylindres" },
          subtitle: {
            en: "Stripping and painting performed with quality workmanship and environmental compliance.",
            fr: "Décapage et peinture réalisés avec un haut niveau de qualité et conformité environnementale.",
          },
          image: paintingImg,
          bullets: {
            en: ["Cylinder stripping and painting in compliance with Environment Canada requirements."],
            fr: ["Décapage et peinture de cylindres selon les exigences d’Environnement Canada."],
          },
        },
      ];
    },
    []
  );

  const pageTitle = isFr ? "Nos Services" : "Our Services";
  const pageSubtitle = isFr
    ? "Faites défiler pour découvrir nos principales catégories de services."
    : "Scroll to explore our main service categories.";

  return (
    <main className="min-h-screen">
      <div
        ref={scrollRef}
        data-scroll-container="true"
        className="h-screen overflow-y-auto snap-y snap-mandatory"
      >
        {/* HERO */}
        <section className="snap-start min-h-screen relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={servicesLandingBg}
              alt={pageTitle}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, hsl(222 47% 6% / 0.78) 0%, hsl(222 47% 6% / 0.72) 55%, hsl(222 47% 6% / 0.85) 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-60">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-foreground font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.3rem,4.6vw,4.25rem)]">
                {pageTitle}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {pageSubtitle}
              </p>

              {/* Chips */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(
                      "inline-flex items-center justify-center",
                      "rounded-full px-5 py-2 text-sm font-semibold",
                      "bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
                      "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent",
                      "transition-colors duration-200"
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
        {sections.map((s, idx) => {
          const title = isFr ? s.title.fr : s.title.en;
          const subtitle = s.subtitle ? (isFr ? s.subtitle.fr : s.subtitle.en) : undefined;
          const bullets = isFr ? s.bullets.fr : s.bullets.en;

          const isReversed = idx % 2 === 1;

          return (
            <section
              key={s.id}
              id={s.id}
              className="snap-start min-h-screen relative overflow-hidden scroll-mt-28"
            >
              {/* Subtle background wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

              <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-28 pb-16">
                <div
                  className={cn(
                    "mx-auto max-w-6xl grid items-center gap-10",
                    "md:grid-cols-2",
                    isReversed ? "md:[&>*:first-child]:order-2" : ""
                  )}
                >
                  {/* TEXT */}
                  <div className={cn("text-center md:text-left")}>
                    <h2 className="text-foreground font-display font-bold tracking-tight leading-[1.1] text-[clamp(2rem,3.8vw,3.1rem)]">
                      {title}
                    </h2>

                    {subtitle && (
                      <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {subtitle}
                      </p>
                    )}

                    <div className={cn("mt-8 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6")}>
                      <ul className="space-y-3">
                        {bullets.map((item, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[14px_1fr] gap-x-3 items-start text-foreground/85"
                          >
                            <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--cfh-red))]" />
                            <span className="leading-relaxed text-sm md:text-[15px]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex justify-center md:justify-start">
                        <Button
                          asChild
                          className={cn(
                            "group bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                            "font-semibold px-8 py-6 transition-colors",
                            "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                          )}
                        >
                          <Link to="/#contact" className="inline-flex items-center gap-2">
                            {isFr ? "Obtenir une soumission" : "Get a Quote"}
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="relative">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-3xl border border-white/10",
                        "shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                      )}
                    >
                      <img
                        src={s.image}
                        alt={title}
                        className="w-full h-[420px] md:h-[520px] object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, hsl(222 47% 6% / 0.15) 0%, hsl(222 47% 6% / 0.55) 100%)",
                        }}
                      />
                    </div>

                    {/* subtle glow */}
                    <div
                      className={cn(
                        "pointer-events-none absolute -inset-10 rounded-[2.5rem] blur-3xl opacity-15",
                        "bg-[radial-gradient(85%_65%_at_20%_20%,hsl(var(--cfh-blue))_0%,transparent_60%),radial-gradient(80%_65%_at_85%_35%,hsl(var(--cfh-red))_0%,transparent_65%)]"
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
