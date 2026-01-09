import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { serviceCatalog } from "@/data/servicesCatalog";

const Services = () => {
  const { t, language } = useLanguage();
  const isFr = language === "fr";

  const slides = useMemo(() => serviceCatalog, []);

  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const title = isFr ? slide.title.fr : slide.title.en;
  const description = isFr ? slide.subtitle.fr : slide.subtitle.en;

  // Use first 3 bullets as highlights in the slider
  const highlightsAll = isFr ? slide.items.fr : slide.items.en;
  const highlights = highlightsAll.slice(0, 3);

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="relative max-w-6xl xl:max-w-7xl mx-auto">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous service"
            className={cn(
              "absolute -left-3 md:-left-16 top-1/2 -translate-y-1/2 z-20",
                  "h-16 w-16 rounded-full", // was h-11 w-11
              "bg-background/15 backdrop-blur-md border border-border/40",
              "text-foreground/80 hover:text-foreground",
              "hover:border-[hsl(var(--cfh-red))]/40 hover:bg-background/25",
              "transition-all duration-200"
            )}
          >
            <ChevronLeft className="h-8 w-8 mx-auto" /> {/* was h-5 w-5 */}
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next service"
            className={cn(
              "absolute -right-3 md:-right-16 top-1/2 -translate-y-1/2 z-20",
                  "h-16 w-16 rounded-full", // was h-11 w-11

              "bg-background/15 backdrop-blur-md border border-border/40",
              "text-foreground/80 hover:text-foreground",
              "hover:border-[hsl(var(--cfh-red))]/40 hover:bg-background/25",
              "transition-all duration-200"
            )}
          >
            <ChevronRight className="h-8 w-8 mx-auto" /> {/* was h-5 w-5 */}
          </button>

          <div className="relative overflow-visible rounded-3xl">
            <div
              className={cn(
                "pointer-events-none absolute -inset-10 md:-inset-14 rounded-[2rem] blur-3xl opacity-20",
                "bg-[radial-gradient(95%_75%_at_18%_18%,hsl(var(--cfh-red))_0%,transparent_62%),radial-gradient(90%_70%_at_88%_30%,hsl(var(--cfh-blue))_0%,transparent_68%),radial-gradient(80%_65%_at_25%_92%,hsl(var(--cfh-blue))_0%,transparent_70%)]"
              )}
            />

            <div className="relative overflow-hidden rounded-3xl border border-border/40 shadow-lg min-h-[440px] md:min-h-[500px] bg-background/5 backdrop-blur-sm">
              <div className="absolute inset-0">
                <img src={slide.image} alt={title} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(222 47% 6% / 0.78) 0%, hsl(222 47% 6% / 0.72) 55%, hsl(222 47% 6% / 0.82) 100%)",
                  }}
                />
              </div>

              <div className="relative z-10 h-full px-6 py-10 md:px-12 md:py-12">
                <div className="mx-auto w-full max-w-3xl text-center flex flex-col min-h-[340px] md:min-h-[400px]">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed md:text-lg">{description}</p>
                  </div>

                  <div className="mt-10 mx-auto w-fit">
                    <ul className="flex flex-col gap-3 items-start">
                      {highlights.map((h, i) => (
                        <li key={i} className="grid grid-cols-[12px_auto] items-center gap-x-3">
                          <span className="h-2 w-2 rounded-full bg-[hsl(var(--cfh-red))]" />
                          <span className="text-sm md:text-[15px] text-foreground/85 whitespace-nowrap">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <Button
                      asChild
                      className="
                        bg-transparent text-[hsl(var(--cfh-red))]
                        border border-[hsl(var(--cfh-red))]
                        font-semibold px-8
                        transition-colors
                        hover:bg-[hsl(var(--cfh-red))]
                        hover:text-primary-foreground
                        hover:border-transparent
                      "
                    >
                      <Link to={`/services#${slide.id}`} className="inline-flex items-center gap-2">
                        {isFr ? "En savoir plus" : "Learn More"}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex items-center justify-center gap-2">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`Go to service ${i + 1}`}
                          className={cn(
                            "h-2.5 rounded-full transition-all duration-200",
                            i === index ? "w-10 bg-[hsl(var(--cfh-red))]" : "w-2.5 bg-foreground/20 hover:bg-foreground/35"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Glow wrapper */}
        </div>
      </div>
    </section>
  );
};

export default Services;
