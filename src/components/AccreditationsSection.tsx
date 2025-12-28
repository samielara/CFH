import { useMemo, type ReactNode } from "react";
import { BadgeCheck, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import TransportCanadaImg from "@/assets/accreditations/TransportCanada.jpg";
import NFPAImg from "@/assets/accreditations/NFPA.jpg";
import CFAAImg from "@/assets/accreditations/CFAA.jpg";
import ANSULImg from "@/assets/accreditations/ANSUL.jpg";
import RangeGuardImg from "@/assets/accreditations/RangeGuard.jpg";
import CMEQImg from "@/assets/accreditations/CorporationdesmaitresélectriciensduQuébec.jpg";

type LogoItem = {
  id: string;
  name: string;
  image?: string;
  href?: string;
};

const AccreditationsSection = () => {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const title = isFr ? "Accréditations" : "Accreditations";
  const subtitle = isFr
    ? "CFH Sécurité Inc. possède les qualifications nécessaires pour effectuer le service sur les systèmes des manufacturiers ci-dessous."
    : "CFH Sécurité Inc. holds the required qualifications to service the systems of the manufacturers below.";

  const certifyingBodies = useMemo<LogoItem[]>(
    () => [
      { id: "transport-canada", name: "Transport Canada", image: TransportCanadaImg },
      { id: "nfpa", name: "NFPA", image: NFPAImg },
      {
        id: "cmeq",
        name: "Corporation des maîtres électriciens du Québec (CMEQ)",
        image: CMEQImg,
      },
      { id: "cfaa", name: "CFAA (Canadian Fire Alarm Association)", image: CFAAImg },
      { id: "ansul", name: "ANSUL", image: ANSULImg },
      { id: "range-guard", name: "Range Guard", image: RangeGuardImg },
    ],
    []
  );

  const manufacturers = useMemo<LogoItem[]>(
    () => [
      { id: "mircom", name: "Mircom" },
      { id: "strike-first", name: "Strike First" },
      { id: "firetrace", name: "FireTrace" },
      { id: "mercedes-textiles", name: "Mercedes Textiles" },
      { id: "buckeye", name: "Buckeye" },
      { id: "williams-brothers", name: "Williams Brothers" },
      { id: "pyro-chem", name: "Pyro-Chem" },
    ],
    []
  );

const renderLogoGrid = (items: LogoItem[], variant: "bodies" | "manufacturers") => {
  const gridClass =
    variant === "bodies"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5"
      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5";

  // pick a consistent tile height so the fill looks clean
 const tileHeightClass = "h-[90px] md:h-[110px] lg:h-[130px]";


  return (
    <div className={gridClass}>
      {items.map((item) => {
        const inner = (
          <div
            className={cn(
              "group relative overflow-hidden rounded-3xl",
              "border border-border/40 bg-background/10 backdrop-blur-sm",
              tileHeightClass,
              "hover:border-[hsl(var(--cfh-red))]/35 hover:bg-background/15",
              "transition-all duration-200"
            )}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className={cn(
                  "absolute inset-0 h-full w-full",
                  // OPTION A (recommended): fill tile while preserving aspect ratio (may crop)
                  "object-cover",
                  // If your logos sit on white backgrounds and you want no crop,
                  // switch to "object-contain" and keep the gap (by design).
                  "opacity-100 grayscale-0"
                )}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <span
                  className={cn(
                    "text-sm md:text-base text-foreground/90 text-center leading-snug",
                    "px-4 py-3 rounded-full",
                    "bg-black/25 border border-white/10"
                  )}
                >
                  {item.name}
                </span>
              </div>
            )}
          </div>
        );

        return item.href ? (
          <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
            {inner}
          </a>
        ) : (
          <div key={item.id}>{inner}</div>
        );
      })}
    </div>
  );
};


  // POLISHED CARD SHELL (this is the “screenshot #1” style applied to these 2 cards)
  const CardShell = ({ children }: { children: ReactNode }) => (
    <div className="relative overflow-visible rounded-[2.25rem]">
      {/* outer glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-10 md:-inset-14 rounded-[2.25rem] blur-3xl opacity-25",
          "bg-[radial-gradient(95%_75%_at_18%_18%,hsl(var(--cfh-red))_0%,transparent_62%),radial-gradient(90%_70%_at_88%_30%,hsl(var(--cfh-blue))_0%,transparent_68%)]"
        )}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-[2.25rem]",
          "border border-[hsl(var(--cfh-red))]/20",
          "bg-white/5 backdrop-blur-xl",
          "shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        )}
      >
        {/* inner polish */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(255,255,255,0.10)_0%,rgba(0,0,0,0.0)_45%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 opacity-35 bg-[radial-gradient(90%_75%_at_15%_20%,hsl(var(--cfh-red))_0%,transparent_60%),radial-gradient(85%_70%_at_85%_35%,hsl(var(--cfh-blue))_0%,transparent_62%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        </div>

        <div className="relative z-10 p-8 md:p-10 lg:p-12">{children}</div>
      </div>
    </div>
  );

  const SectionHeader = ({
    icon,
    iconColorClass,
    heading,
    subheading,
  }: {
    icon: ReactNode;
    iconColorClass: string;
    heading: string;
    subheading: string;
  }) => (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex items-center gap-4">
        <span className="h-11 w-11 shrink-0 rounded-2xl bg-background/15 border border-border/40 flex items-center justify-center">
          <span className={iconColorClass}>{icon}</span>
        </span>

        {/* centered text, icon stays on the left */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">{heading}</h3>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">{subheading}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="accreditations" className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* TWO SEPARATE CARDS */}
          <div className="space-y-10">
            {/* Bodies & Standards */}
            <CardShell>
              <SectionHeader
                icon={<BadgeCheck className="h-5 w-5" />}
                iconColorClass="text-[hsl(var(--cfh-blue))]"
                heading={isFr ? "Organismes & normes" : "Bodies & Standards"}
                subheading={isFr ? "Qualifications et conformité." : "Qualifications and compliance."}
              />
              {renderLogoGrid(certifyingBodies, "bodies")}
            </CardShell>

            {/* Supported Manufacturers */}
            <CardShell>
              <SectionHeader
                icon={<Award className="h-5 w-5" />}
                iconColorClass="text-[hsl(var(--cfh-red))]"
                heading={isFr ? "Manufacturiers supportés" : "Supported Manufacturers"}
                subheading={isFr ? "Service sur les marques ci-dessous." : "Service coverage for the brands below."}
              />
              {renderLogoGrid(manufacturers, "manufacturers")}

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {isFr
                    ? "Vous ne voyez pas votre marque? Contactez-nous — nous confirmerons la compatibilité et la conformité."
                    : "Don’t see your brand? Contact us—we’ll confirm compatibility and compliance."}
                </p>
              </div>
            </CardShell>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationsSection;
