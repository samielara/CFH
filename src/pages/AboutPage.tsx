import { useMemo, type ElementType } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BadgeCheck, HeartHandshake, Lightbulb, Users } from "lucide-react";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import aboutHeroImg from "@/assets/services/design-engineering.png";
import workshopImg from "@/assets/services/hydrostatic-testing.png";

type Localized<T> = { en: T; fr: T };

type ValueCard = {
  title: Localized<string>;
  description: Localized<string>;
  icon: ElementType;
};

export default function AboutPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const values = useMemo<ValueCard[]>(
    () => [
      {
        title: { en: "Innovation", fr: "Innovation" },
        description: {
          en: "We continually modernize methods, tooling and standards to keep your sites safer and more reliable.",
          fr: "Nous modernisons continuellement nos méthodes, outils et standards pour des sites plus sûrs et plus fiables.",
        },
        icon: Lightbulb,
      },
      {
        title: { en: "Courtesy & Professionalism", fr: "Courtoisie & professionnalisme" },
        description: {
          en: "Clear communication, clean work, and teams that respect your operations from start to finish.",
          fr: "Communication claire, travail soigné, et équipes respectueuses de vos opérations du début à la fin.",
        },
        icon: HeartHandshake,
      },
      {
        title: { en: "Quality Products", fr: "Produits de qualité" },
        description: {
          en: "We select proven equipment and reputable manufacturers—built for compliance, longevity and performance.",
          fr: "Nous sélectionnons des équipements éprouvés et des manufacturiers reconnus—pour la conformité, la durabilité et la performance.",
        },
        icon: Award,
      },
      {
        title: { en: "Availability", fr: "Disponibilité" },
        description: {
          en: "Fast scheduling and responsive follow-ups—because safety work can’t wait.",
          fr: "Planification rapide et suivis réactifs—car la sécurité ne peut pas attendre.",
        },
        icon: Users,
      },
    ],
    []
  );

  const capabilityBullets = useMemo<Localized<string[]>>(
    () => ({
      en: [
        "CO₂ systems",
        "Fire extinguisher maintenance",
        "Novec 1230",
        "Hydrostatic testing",
        "Fire hoses",
        "Breathing air cylinders",
        "Cylinder stripping & painting",
      ],
      fr: [
        "Systèmes CO₂",
        "Entretien d’extincteurs",
        "Novec 1230",
        "Essais hydrostatiques",
        "Boyaux d’incendie",
        "Bonbonnes respiratoires",
        "Décapage & peinture de cylindres",
      ],
    }),
    []
  );

  const pageSubtitle = isFr
    ? "Une équipe québécoise dédiée à la prévention incendie—de la conception à l’entretien, avec une obsession pour la conformité et la qualité."
    : "A Quebec-based team focused on end-to-end fire prevention—design through maintenance—with an obsession for compliance and quality.";

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
            <img src={aboutHeroImg} alt="About" className="w-full h-full object-cover" />
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
                CFH Sécurité Inc.
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">{pageSubtitle}</p>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <div
                  className={cn(
                    "relative rounded-[2.25rem] overflow-hidden border border-white/10",
                    "bg-white/5 backdrop-blur-xl",
                    "shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(90%_70%_at_15%_15%,hsl(var(--cfh-blue))_0%,transparent_60%),radial-gradient(80%_65%_at_85%_25%,hsl(var(--cfh-red))_0%,transparent_62%)]" />
                  <div className="relative z-10 p-8 md:p-10">
                    <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
                      {isFr ? "Qui nous sommes" : "Who We Are"}
                    </h2>
                    <p className="mt-5 text-muted-foreground leading-relaxed">
                      {isFr
                        ? "CFH Sécurité inc. accompagne les organisations à travers le Québec avec une approche complète : vente, inspection, réparation, entretien et installation d’équipements de prévention et de lutte contre l’incendie."
                        : "CFH Sécurité supports organizations across Quebec with an end-to-end approach: sales, inspection, repair, maintenance and installation of fire-prevention and fire-fighting equipment."}
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {isFr
                        ? "Nous proposons des solutions intégrées de détection, d’alarme et d’extinction—des agents propres et respectueux de l’environnement aux systèmes d’alarme intelligents, adaptés à votre application."
                        : "We deliver integrated detection, alarm and suppression solutions—from clean, environmentally responsible agents to advanced intelligent alarm systems—tailored to your application."}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {(isFr ? ["Conformité", "Ingénierie", "Entretien"] : ["Compliance", "Engineering", "Maintenance"]).map(
                        (tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 rounded-full bg-black/25 border border-white/10 px-4 py-2 text-sm text-foreground/85"
                          >
                            <BadgeCheck className="h-4 w-4 text-[hsl(var(--cfh-red))]" />
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className={cn(
                    "relative rounded-[2.25rem] overflow-hidden border border-white/10",
                    "bg-white/5 backdrop-blur-xl",
                    "shadow-[0_30px_90px_rgba(0,0,0,0.35)]",
                    "h-full"
                  )}
                >
                  <div className="relative h-56 md:h-72">
                    <img src={workshopImg} alt="Workshop" className="absolute inset-0 w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(222 47% 6% / 0.10) 0%, hsl(222 47% 6% / 0.88) 100%)",
                      }}
                    />
                  </div>

                  <div className="p-8 md:p-10">
                    <h3 className="font-display font-semibold text-2xl">
                      {isFr ? "Pourquoi nous choisir" : "Why Choose CFH"}
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {isFr
                        ? "Un atelier équipé à la fine pointe, des services sur mesure et une culture centrée sur la satisfaction client."
                        : "A modern workshop, tailored services, and a client-first mindset—focused on measurable safety outcomes."}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {(isFr ? capabilityBullets.fr : capabilityBullets.en).map((b) => (
                        <li key={b} className="grid grid-cols-[14px_1fr] gap-x-3 items-start">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[hsl(var(--cfh-red))]" />
                          <span className="text-sm text-foreground/85 leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
                  {isFr ? "Nos valeurs" : "Our Values"}
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  {isFr
                    ? "La qualité d’exécution et l’expérience client guident chaque intervention—de la première visite à l’entretien continu."
                    : "Execution quality and client experience guide every engagement—from the first walkthrough to ongoing maintenance."}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v) => {
                  const title = isFr ? v.title.fr : v.title.en;
                  const description = isFr ? v.description.fr : v.description.en;
                  const Icon = v.icon;

                  return (
                    <Card
                      key={title}
                      className={cn(
                        "rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl",
                        "shadow-[0_30px_90px_rgba(0,0,0,0.30)]",
                        "hover-lift"
                      )}
                    >
                      <CardContent className="p-7">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                          <Icon className="h-6 w-6 text-[hsl(var(--cfh-blue))]" />
                        </div>
                        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM CTA */}
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
                <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                  {isFr ? "Une équipe d’ingénierie à votre service" : "An Engineering Team You Can Rely On"}
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  {isFr
                    ? "De la conception à la mise en service, nous vous aidons à bâtir une protection incendie robuste, documentée et prête pour l’inspection."
                    : "From design to commissioning, we help you build robust, documented fire protection that’s inspection-ready."}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    asChild
                    className={cn(
                      "group bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                      "font-semibold px-10 py-6 text-lg transition-colors",
                      "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                    )}
                  >
                    <Link to="/#contact" className="inline-flex items-center gap-2">
                      {isFr ? "Obtenir une soumission" : "Get a Quote"}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button asChild variant="secondary" className="btn-cfh px-10 py-6 text-lg">
                    <Link to="/products">{isFr ? "Voir les produits" : "Browse Products"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
