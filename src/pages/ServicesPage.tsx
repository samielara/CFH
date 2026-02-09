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
import { serviceCatalog, type ServiceGroup } from "@/data/servicesCatalog";
import servicesLandingBg from "@/assets/services/CFH-Service-LandingPage.png";

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


const services = useMemo(() => serviceCatalog, []);


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
                    "linear-gradient(180deg, hsl(222 47% 6% / 0.45) 0%, hsl(222 47% 6% / 0.25) 50%, hsl(222 47% 6%) 100%)",
                }}
              />
              {/* Extended Fade to Bottom */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(222_47%_6%)] to-transparent z-10"
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
                        <div key={s.id} id={s.id} className="scroll-mt-28">
                          <Card
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
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                        </div>
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
