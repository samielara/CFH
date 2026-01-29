import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/videos/Fire_Extinguisher_Animation.mp4";
import heroVideo2 from "@/assets/videos/Fire_Extinguisher_Animation-2.mp4";
import heroVideo3 from "@/assets/videos/Fire_Extinguisher_Animation-3.mp4";

const Hero = () => {
  const { t } = useLanguage();

  const videos = useMemo(() => [heroVideo2, heroVideo, heroVideo3 ], []);
  const [index, setIndex] = useState(0);

  const handleEnded = () => {
    setIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end justify-center overflow-hidden"
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          key={videos[index]} // reload when switching videos
          className="w-full h-full object-cover"
          src={videos[index]}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(222 47% 6% / 0.65) 0%, hsl(222 47% 6% / 0.45) 50%, hsl(222 47% 6% / 0.8) 100%)",
          }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-34 pb-38">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1
            className="text-foreground font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.5rem,5vw,5rem)] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: "0.1s" }}
          >
            {t.hero.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  word === "Fire" ||
                  word === "Security" ||
                  word === "Incendie" ||
                  word === "Sécurité"
                    ? "text-gradient drop-shadow-none filter brightness-110" // Remove drop shadow from gradient text to keep it clean, or keep it? Gradient usually needs shadow less or specific one. Let's try regular shadow for all.
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Button */}
          <div
            className="flex items-center justify-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              className="
                group
                bg-transparent text-[hsl(var(--cfh-red))]
                border border-[hsl(var(--cfh-red))]
                font-semibold px-10 py-6 text-lg
                transition-colors
                hover:bg-[hsl(var(--cfh-red))]
                hover:text-primary-foreground
                hover:border-transparent
              "
            >
              <Link to="/quote">
              {t.hero.cta}
              </Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-border/30 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "31+", label: t.stats.years },
              { value: "500+", label: t.stats.clients },
              { value: "50+", label: t.stats.agents },
              { value: "100%", label: t.stats.coverage },
            ].map((stat, statIndex) => (
              <div key={statIndex} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-[48%] -translate-x-1/2 animate-bounce">
          <a
            href="#services"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
