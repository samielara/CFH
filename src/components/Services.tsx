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
                        <Link to={`/services#${slide.id}`} className="inline-flex items-center gap-2">
                          {isFr ? "En savoir plus" : "Learn More"}
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
                          aria-label={`Go to service ${i + 1}`}
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

export default Services;
