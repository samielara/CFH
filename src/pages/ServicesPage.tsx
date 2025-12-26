import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

import designEngineeringImg from "@/assets/services/design-engineering.png";
import kitchenSuppressionImg from "@/assets/services/kitchen-suppression.png";
import inspectionMaintenanceImg from "@/assets/services/inspection-maintenance.png";
import specialHazardsImg from "@/assets/services/special-hazards.png";
import evacuationPlansImg from "@/assets/services/evacuation-plans.png";
import servicesLandingBg from "@/assets/services/CFH-Service-LandingPage.png";

type ServiceBlock = {
  title: { en: string; fr: string };
  items: { en: string[]; fr: string[] };
};

type ServiceSection = {
  id: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  image: string;
  blocks: ServiceBlock[];
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
    () => [
      {
        id: "design-engineering",
        title: { en: "Design & Engineering", fr: "Conception & ingénierie" },
        subtitle: {
          en: "Engineer-certified planning, testing, and system design for fire protection solutions.",
          fr: "Planification, tests et conception certifiés par ingénieur pour des solutions de protection incendie.",
        },
        image: designEngineeringImg,
        blocks: [
          {
            title: { en: "Engineer-Certified Planning", fr: "Plans certifiés par ingénieur" },
            items: {
              en: [
                "Engineer-certified plan for all types of fire systems",
                "Sprinkler systems",
                "Clean agent fire suppression system: computer rooms, archive rooms, telecommunications equipment",
                "Carbon dioxide (CO₂) system: manufacturing company",
                "Powder chemical systems: paint booth, automotive, chemical storage",
                "Fire extinguishing systems for small industrial machines: CNC lathe machine, server cabin, electrical substation, dust collector…",
              ],
              fr: [
                "Plans certifiés par ingénieur pour tous types de systèmes incendie",
                "Systèmes de gicleurs",
                "Systèmes d’extinction à agent propre : salles informatiques, archives, équipements télécom",
                "Systèmes au dioxyde de carbone (CO₂) : milieux industriels/manufacturiers",
                "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage chimique",
                "Extinction pour petites machines industrielles : tour CNC, cabine serveur, poste électrique, dépoussiéreur…",
              ],
            },
          },
          {
            title: { en: "Kitchen & System Changes", fr: "Cuisine & modifications" },
            items: {
              en: [
                "Fire extinguishing system for kitchen: room-based restaurant with multiple systems",
                "System changes",
              ],
              fr: [
                "Système d’extinction pour cuisine : restaurant en zones avec plusieurs systèmes",
                "Modifications de systèmes",
              ],
            },
          },
          {
            title: { en: "Testing & Verification", fr: "Essais & vérification" },
            items: {
              en: [
                "Leak test",
                "Air tightness test",
                "CFH Safety provides airtightness testing for rooms to be protected by an extinguishing system such as NOVEC 1230, CO₂, etc.",
              ],
              fr: [
                "Test d’étanchéité (fuite)",
                "Test d’étanchéité à l’air",
                "CFH Sécurité effectue des tests d’étanchéité à l’air pour les pièces protégées par NOVEC 1230, CO₂, etc.",
              ],
            },
          },
        ],
      },
      {
        id: "kitchen-suppression",
        title: { en: "Kitchen Fire Suppression", fr: "Extinction cuisine" },
        subtitle: {
          en: "Commercial kitchen suppression coverage and ongoing upgrades to stay compliant and safe.",
          fr: "Protection des cuisines commerciales et mises à niveau continues pour conformité et sécurité.",
        },
        image: kitchenSuppressionImg,
        blocks: [
          {
            title: { en: "Kitchen Systems", fr: "Systèmes de cuisine" },
            items: {
              en: [
                "Fire extinguishing system for kitchen: room-based restaurant with multiple systems",
                "System changes / upgrades",
                "Compliance readiness and maintenance planning",
              ],
              fr: [
                "Système d’extinction pour cuisine : restaurant en zones avec plusieurs systèmes",
                "Modifications / mises à niveau",
                "Préparation à la conformité et planification d’entretien",
              ],
            },
          },
        ],
      },
      {
        id: "inspection-maintenance",
        title: { en: "Inspection & Maintenance", fr: "Inspection & entretien" },
        subtitle: {
          en: "Regular inspections and maintenance to stay compliant with local fire codes and keep systems ready.",
          fr: "Inspections et entretien réguliers pour rester conforme aux codes incendie et garder les systèmes prêts.",
        },
        image: inspectionMaintenanceImg,
        blocks: [
          {
            title: { en: "Equipment We Inspect & Maintain", fr: "Équipements inspectés & entretenus" },
            items: {
              en: [
                "Fire suppression systems for kitchens",
                "Fire extinguishers",
                "Fire alarm systems",
                "Emergency lighting",
                "Automatic sprinkler systems",
                "DAr inspection (backflow prevention device)",
                "Fire hydrants",
              ],
              fr: [
                "Systèmes d’extinction pour cuisines",
                "Extincteurs",
                "Systèmes d’alarme incendie",
                "Éclairage d’urgence",
                "Systèmes de gicleurs automatiques",
                "Inspection DAr (dispositif anti-refoulement)",
                "Bornes d’incendie",
              ],
            },
          },
          {
            title: { en: "Specialized Suppression Coverage", fr: "Extinction spécialisée" },
            items: {
              en: [
                "Special hazard systems (Sapphire): CO₂, NOVEC, FM-200",
                "Special hazard systems (FireTrace): CO₂, NOVEC, FM-200, chemical powder",
                "Powder chemical systems: paint booth, automotive, chemical storage, etc.",
                "Vehicle systems, marine",
              ],
              fr: [
                "Systèmes à risques spéciaux (Sapphire) : CO₂, NOVEC, FM-200",
                "Systèmes à risques spéciaux (FireTrace) : CO₂, NOVEC, FM-200, poudre chimique",
                "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage chimique, etc.",
                "Systèmes véhicules et marins",
              ],
            },
          },
          {
            title: { en: "Workshop Services", fr: "Services d’atelier" },
            items: {
              en: [
                "Tailor-made services for verification, repair, maintenance and installation",
                "Portable fire extinguishers",
                "Breathing air tanks",
                "Fire hoses",
                "Fire alarm systems",
                "Automatic extinguishing systems (NOVEC 1230, foam, kitchen systems, chemical powder, etc.)",
              ],
              fr: [
                "Services sur mesure : vérification, réparation, entretien et installation",
                "Extincteurs portatifs",
                "Bouteilles d’air respirable",
                "Boyaux d’incendie",
                "Systèmes d’alarme incendie",
                "Systèmes d’extinction automatique (NOVEC 1230, mousse, cuisine, poudre chimique, etc.)",
              ],
            },
          },
          {
            title: { en: "Maintenance & Testing (Legacy Services)", fr: "Entretien & tests (services hérités)" },
            items: {
              en: [
                "Fire extinguisher maintenance (NFPA 10): inspection, repair, filling, and maintenance of portable/mobile/fixed powder extinguishers",
                "NOVEC 1230: hydrostatic testing, filling and maintenance",
                "Hydrostatic testing up to 10,000 PSI (Transport Canada approved)",
                "Fire hose testing (NFPA 1962)",
                "Respirators: breathing air cylinder filling up to 4500 PSI; equipment tested/certified by Canadian MAXXAM laboratory every six months",
                "Stripping and painting of cylinders in compliance with Environment Canada requirements",
              ],
              fr: [
                "Entretien d’extincteurs (NFPA 10) : inspection, réparation, remplissage et entretien (poudre portatifs/mobiles/fixes)",
                "NOVEC 1230 : essais hydrostatiques, remplissage et entretien",
                "Essais hydrostatiques jusqu’à 10 000 PSI (approuvé Transport Canada)",
                "Essais de boyaux (NFPA 1962)",
                "Appareils respiratoires : remplissage jusqu’à 4500 PSI; équipement testé/certifié par le laboratoire canadien MAXXAM tous les six mois",
                "Décapage et peinture de cylindres selon les exigences d’Environnement Canada",
              ],
            },
          },
        ],
      },
      {
        id: "special-hazards",
        title: { en: "Special Hazard Systems", fr: "Risques spéciaux" },
        subtitle: {
          en: "High-performance suppression for critical environments and sensitive equipment.",
          fr: "Extinction haute performance pour environnements critiques et équipements sensibles.",
        },
        image: specialHazardsImg,
        blocks: [
          {
            title: { en: "Systems Covered", fr: "Systèmes pris en charge" },
            items: {
              en: [
                "Sapphire systems: CO₂, NOVEC, FM-200",
                "FireTrace systems: CO₂, NOVEC, FM-200, chemical powder",
                "Powder chemical systems: paint booth, automotive, chemical storage, etc.",
                "Vehicle systems, marine",
              ],
              fr: [
                "Systèmes Sapphire : CO₂, NOVEC, FM-200",
                "Systèmes FireTrace : CO₂, NOVEC, FM-200, poudre chimique",
                "Systèmes à poudre chimique : cabine de peinture, automobile, entreposage chimique, etc.",
                "Systèmes véhicules et marins",
              ],
            },
          },
        ],
      },
      {
        id: "evacuation-plans",
        title: { en: "Evacuation Plans", fr: "Plans d’évacuation" },
        subtitle: {
          en: "Clear, customized planning to help teams evacuate fast and safely.",
          fr: "Plans clairs et personnalisés pour aider les équipes à évacuer rapidement et en sécurité.",
        },
        image: evacuationPlansImg,
        blocks: [
          {
            title: { en: "Customized Plans", fr: "Plans personnalisés" },
            items: {
              en: ["Customized Fire Emergency Evacuation Plans"],
              fr: ["Plans d’évacuation d’urgence incendie personnalisés"],
            },
          },
        ],
      },
    ],
    []
  );

  const pageTitle = isFr ? "Nos Services" : "Our Services";
  const pageSubtitle = isFr
    ? "Faites défiler pour découvrir nos principales catégories de services."
    : "Scroll to explore our main service categories.";

  return (
    <main className="min-h-screen">
      <div ref={scrollRef} className="h-screen overflow-y-auto snap-y snap-mandatory">
        {/* Hero (NO Get a Quote here) */}
        <section className="snap-start min-h-screen relative overflow-hidden">
          {/* Background image + overlay */}
          <div className="absolute inset-0">
            <img
              src={servicesLandingBg}
              alt={isFr ? "Nos Services" : "Our Services"}
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

              {/* Landing chips: black background + modern hover */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={cn(
                    "inline-flex items-center justify-center",
                    "rounded-full px-5 py-2 text-sm font-semibold",
                    // default: transparent with blue text + border
                    "bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
                    // hover: filled blue + white text
                    "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent",
                    // polish
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

        {/* Sections */}
        {sections.map((s) => {
          const title = isFr ? s.title.fr : s.title.en;
          const subtitle = isFr ? s.subtitle.fr : s.subtitle.en;

          return (
            <section
              key={s.id}
              id={s.id}
              className="snap-start min-h-screen relative overflow-hidden scroll-mt-28"
            >
              <div className="absolute inset-0">
                <img src={s.image} alt={title} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(222 47% 6% / 0.92) 0%, hsl(222 47% 6% / 0.78) 45%, hsl(222 47% 6% / 0.30) 100%)",
                  }}
                />
              </div>

              <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-28">
                {/* Center everything */}
                <div className="mx-auto max-w-5xl text-center">
                  <h2 className="text-foreground font-display font-bold tracking-tight leading-[1.05] text-[clamp(2rem,4vw,3.25rem)]">
                    {title}
                  </h2>
                  <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {subtitle}
                  </p>

                  {/* Legacy details as grouped blocks */}
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.blocks.map((b, i) => {
                      const blockTitle = isFr ? b.title.fr : b.title.en;
                      const items = isFr ? b.items.fr : b.items.en;

                      return (
                        <div
                          key={i}
                          className={cn(
                            "rounded-2xl px-5 py-5",
                            "bg-black/35 backdrop-blur-md",
                            "border border-white/10",
                            "shadow-sm"
                          )}
                        >
                          <div className="text-base md:text-lg font-semibold text-foreground mb-3">
                            {blockTitle}
                          </div>

                            <ul className="mt-2 space-y-2 mx-auto w-full max-w-2xl text-left">
                            {items.map((item, idx) => (
                                <li
                                key={idx}
                                className="text-sm md:text-[15px] text-foreground/85 grid grid-cols-[14px_1fr] gap-x-3 items-start"
                                >
                                <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--cfh-red))]" />
                                <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                            </ul>

                        </div>
                      );
                    })}
                  </div>

                  {/* Keep Get a Quote ONLY in the sections */}
                  <div className="mt-10 flex items-center justify-center">
                    <Button
                      asChild
                      className={cn(
                        "group bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                        "font-semibold px-10 py-6 text-lg transition-colors",
                        "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                      )}
                    >
                      {/* Go to home contact from /services */}
                      <Link to="/#contact" className="inline-flex items-center gap-2">
                        {isFr ? "Obtenir une soumission" : "Get a Quote"}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
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
