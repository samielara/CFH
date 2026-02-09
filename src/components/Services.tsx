import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { serviceCatalog } from "@/data/servicesCatalog";
import cardTextureUtil from "@/assets/card-texture.jpg";

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
                  "h-16 w-16 rounded-full",
              "bg-background/15 backdrop-blur-md border border-border/40",
              "text-foreground/80 hover:text-foreground",
              "hover:border-[hsl(var(--cfh-red))]/40 hover:bg-background/25",
              "transition-all duration-200"
            )}
          >
            <ChevronLeft className="h-8 w-8 mx-auto" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next service"
            className={cn(
              "absolute -right-3 md:-right-16 top-1/2 -translate-y-1/2 z-20",
                  "h-16 w-16 rounded-full",

              "bg-background/15 backdrop-blur-md border border-border/40",
              "text-foreground/80 hover:text-foreground",
              "hover:border-[hsl(var(--cfh-red))]/40 hover:bg-background/25",
              "transition-all duration-200"
            )}
          >
            <ChevronRight className="h-8 w-8 mx-auto" />
          </button>

          <div className="relative overflow-visible rounded-[2.5rem]">
            <div
              className={cn(
                "pointer-events-none absolute -inset-10 md:-inset-14 rounded-[3rem] blur-3xl opacity-20",
                "bg-[radial-gradient(95%_75%_at_18%_18%,hsl(var(--cfh-red))_0%,transparent_62%),radial-gradient(90%_70%_at_88%_30%,hsl(var(--cfh-blue))_0%,transparent_68%),radial-gradient(80%_65%_at_25%_92%,hsl(var(--cfh-blue))_0%,transparent_70%)]"
              )}
            />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#0f111a] flex flex-col lg:flex-row min-h-[500px]">
              
              {/* Image Section - Left */}
              <div className="relative w-full lg:w-[45%] h-64 lg:h-auto overflow-hidden">
                <img 
                  src={slide.image} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
                 {/* Dark overlay slightly on image to blend */}
                 <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content Section - Right */}
              <div 
                className="w-full lg:w-[55%] flex flex-col justify-center p-8 lg:p-14 bg-[#0f111a] relative bg-cover bg-center"
                style={{ backgroundImage: `url(${cardTextureUtil})` }}
              >
                 {/* Dark overlay to ensure text readability on texture */}
                 <div className="absolute inset-0 bg-[#0f111a]/80" />
                 
                 <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{description}</p>
                    </div>

                    <ul className="flex flex-col gap-4 w-fit mx-auto text-left">
                      {highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1 h-5 w-5 rounded-full bg-[hsl(var(--cfh-red))]/20 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-[hsl(var(--cfh-red))]" strokeWidth={3} />
                          </div>
                          <span className="text-base text-gray-200 font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 w-full sm:w-auto">
                      <Button
                        asChild
                        size="lg"
                        className="
                          w-full sm:w-auto
                          bg-transparent text-[hsl(var(--cfh-red))]
                          border border-[hsl(var(--cfh-red))]
                          font-semibold px-8 h-14 text-base
                          hover:bg-[hsl(var(--cfh-red))] hover:text-white hover:border-transparent
                          transition-all duration-300
                          group
                        "
                      >
                        <Link to={`/services#${slide.id}`} className="inline-flex items-center justify-center gap-2">
                          {isFr ? "En savoir plus" : "Learn More"}
                          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </Button>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`Go to service ${i + 1}`}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === index ? "w-8 bg-[hsl(var(--cfh-red))]" : "w-1.5 bg-white/20 hover:bg-white/40"
                          )}
                        />
                      ))}
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
