import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, ChefHat, Factory, Hospital, ShieldCheck, Wrench } from "lucide-react";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import projectsHeroImg from "@/assets/services/design-engineering.png";
import kitchenSuppressionImg from "@/assets/services/kitchen-suppression.png";
import novec1230Img from "@/assets/services/novec-1230.png";
import hydrostaticTestingImg from "@/assets/services/hydrostatic-testing.png";
import fireHosesImg from "@/assets/services/fire-hoses.png";

type Localized<T> = { en: T; fr: T };

type ProjectShowcase = {
  title: Localized<string>;
  description: Localized<string>;
  image: string;
  tags: Localized<string[]>;
  icon: React.ElementType;
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const showcases = useMemo<ProjectShowcase[]>(
    () => [
      {
        title: { en: "Commercial Kitchen Protection", fr: "Protection des cuisines commerciales" },
        description: {
          en: "Design + service-ready suppression for high-heat cooking lines—built for compliance and rapid restoration.",
          fr: "Conception + entretien de systèmes d’extinction pour lignes de cuisson—conformes et prêts à remettre en service rapidement.",
        },
        image: kitchenSuppressionImg,
        tags: {
          en: ["Restaurants", "Hotels", "Institutions"],
          fr: ["Restaurants", "Hôtels", "Institutions"],
        },
        icon: ChefHat,
      },
      {
        title: { en: "Special Hazard Suppression", fr: "Extinction pour risques spéciaux" },
        description: {
          en: "Clean-agent and gas-based solutions for sensitive environments where uptime and asset protection matter.",
          fr: "Solutions à agents propres et systèmes gazeux pour environnements sensibles où la continuité est critique.",
        },
        image: novec1230Img,
        tags: {
          en: ["Server rooms", "Industrial", "Critical assets"],
          fr: ["Salles serveurs", "Industriel", "Actifs critiques"],
        },
        icon: ShieldCheck,
      },
      {
        title: { en: "Inspection & Maintenance Programs", fr: "Programmes d’inspection et d’entretien" },
        description: {
          en: "Scheduled inspections with clear documentation—built to keep sites compliant and audit-ready.",
          fr: "Inspections planifiées avec documentation claire—pour rester conforme et prêt pour les audits.",
        },
        image: hydrostaticTestingImg,
        tags: {
          en: ["Documentation", "Compliance", "Preventive"],
          fr: ["Documentation", "Conformité", "Préventif"],
        },
        icon: Wrench,
      },
      {
        title: { en: "Fire Hose & Equipment Readiness", fr: "Boyaux et équipements prêts à l’intervention" },
        description: {
          en: "Hoses, storage and equipment readiness aligned to building layout and operational needs.",
          fr: "Boyaux, rangement et disponibilité des équipements selon l’aménagement et vos opérations.",
        },
        image: fireHosesImg,
        tags: {
          en: ["Warehouses", "Commercial", "Facilities"],
          fr: ["Entrepôts", "Commercial", "Bâtiments"],
        },
        icon: Factory,
      },
    ],
    []
  );

  const sectors = useMemo(
    () =>
      [
        { icon: Building2, label: { en: "Commercial Buildings", fr: "Immeubles commerciaux" } },
        { icon: Hospital, label: { en: "Healthcare & Institutions", fr: "Santé & institutions" } },
        { icon: Factory, label: { en: "Industrial Sites", fr: "Sites industriels" } },
        { icon: ChefHat, label: { en: "Food Service", fr: "Restauration" } },
      ] as const,
    []
  );

  return (
    <div className="min-h-screen bg-[hsl(222_47%_6%)] text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-blue))]/25" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-red))]/25" />
      </div>

      <main>
        {/* HERO */}
        <section className="relative min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={projectsHeroImg} alt="Projects" className="w-full h-full object-cover" />
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
                {isFr ? "Projets" : "Projects"}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {isFr
                  ? "Un aperçu de notre savoir-faire : conception, installation et entretien pour des sites prêts pour l’inspection."
                  : "A snapshot of our work: design, installation and maintenance that keeps sites inspection-ready."}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {sectors.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Badge
                      key={isFr ? s.label.fr : s.label.en}
                      variant="secondary"
                      className="px-4 py-2 text-sm bg-white/5 border border-white/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[hsl(var(--cfh-blue))]" />
                        {isFr ? s.label.fr : s.label.en}
                      </span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {showcases.map((p) => {
                const title = isFr ? p.title.fr : p.title.en;
                const description = isFr ? p.description.fr : p.description.en;
                const tags = isFr ? p.tags.fr : p.tags.en;
                const Icon = p.icon;

                return (
                  <Card
                    key={title}
                    className={cn(
                      "overflow-hidden rounded-[1.75rem] border border-white/10",
                      "bg-white/5 backdrop-blur-xl",
                      "shadow-[0_30px_90px_rgba(0,0,0,0.30)]",
                      "hover-lift"
                    )}
                  >
                    <div className="relative h-56">
                      <img src={p.image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, hsl(222 47% 6% / 0.10) 0%, hsl(222 47% 6% / 0.90) 100%)",
                        }}
                      />
                      <div className="absolute left-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <Icon className="h-6 w-6 text-[hsl(var(--cfh-red))]" />
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {tags.map((t) => (
                          <Badge key={t} className="bg-black/25 border border-white/10 text-foreground">
                            {t}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-8 flex gap-3">
                        <Button
                          asChild
                          className={cn(
                            "flex-1 bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
                            "font-semibold transition-colors",
                            "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent"
                          )}
                        >
                          <Link to="/contact" className="inline-flex items-center justify-center gap-2">
                            {isFr ? "Discuter du projet" : "Discuss a Project"}
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
                {isFr ? "Planifions votre prochaine mise en conformité" : "Plan Your Next Compliance Upgrade"}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {isFr
                  ? "Nous évaluons vos besoins, proposons une solution claire, puis livrons une exécution propre — avec une documentation prête pour l’inspection."
                  : "We assess requirements, propose a clear solution, then deliver clean execution—with inspection-ready documentation."}
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  asChild
                  className={cn(
                    "group bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                    "font-semibold px-10 py-6 text-lg transition-colors",
                    "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                  )}
                >
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    {isFr ? "Demander une soumission" : "Request a Quote"}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
