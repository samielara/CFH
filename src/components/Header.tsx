import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Flame, Siren, Droplets, BellRing } from "lucide-react";
import type { LucideIcon } from "lucide-react";


import cfhLogo from "@/assets/CFH-Securite-Logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const [isProductsMobileOpen, setIsProductsMobileOpen] = useState(false);
  const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on ESC and outside click
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProductsOpen(false);
        setIsServicesOpen(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("[data-products-dropdown]")) setIsProductsOpen(false);
      if (!target.closest("[data-services-dropdown]")) setIsServicesOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const navItems = [
    { label: t.nav.services, href: "#services", hasDropdown: true },
    { label: "Products", href: "#products", hasDropdown: true }, // add to translations later
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.careers, href: "#careers" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const productItems = [
    { label: "Fire Extinguisher", href: "#products-fire-extinguisher" },
    { label: "Fire Alarm Panel", href: "#products-fire-alarm-panel" },
    { label: "Smoke Detectors", href: "#products-smoke-detectors" },
    { label: "Fire Sprinkler", href: "#products-fire-sprinkler" },
    { label: "Fire Hydrant Valve", href: "#products-fire-hydrant-valve" },
    { label: "Fire Bucket with Stand", href: "#products-fire-bucket-stand" },
    { label: "RRL Hose Pipe", href: "#products-rrl-hose-pipe" },
    { label: "Fire Ball", href: "#products-fire-ball" },
    { label: "Electrical Siren", href: "#products-electrical-siren" },
    { label: "Hand Operated Siren", href: "#products-hand-operated-siren" },
    { label: "Branch Pipe", href: "#products-branch-pipe" },
    { label: "2 Way Connector", href: "#products-2-way-connector" },
    { label: "Hose Reel Set", href: "#products-hose-reel-set" },
  ];

const serviceItems: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "Fire Extinguisher Refilling", href: "#service-fire-extinguisher-refilling", icon: Flame },
  { label: "Smoke Detector Installation", href: "#service-smoke-detector-installation", icon: BellRing },
  { label: "Warning Siren Installation", href: "#service-warning-siren-installation", icon: Siren },
  { label: "Fire Sprinkler System Installation", href: "#service-fire-sprinkler-installation", icon: Droplets },
];

  const handleOpenProducts = (open: boolean) => {
    setIsProductsOpen(open);
    if (open) setIsServicesOpen(false);
  };

  const handleOpenServices = (open: boolean) => {
    setIsServicesOpen(open);
    if (open) setIsProductsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "glass py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo = Home */}
          <a href="#home" className="flex items-center group">
            <img
              src={cfhLogo}
              alt="CFH Sécurité - Prévention Incendie"
              className="h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              // SERVICES dropdown
              if (item.href === "#services") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    data-services-dropdown
                    onMouseEnter={() => handleOpenServices(true)}
                    onMouseLeave={() => handleOpenServices(false)}
                  >
                      <button
                        type="button"
                        onClick={() => handleOpenServices(!isServicesOpen)}
                        className={cn(
                          "text-base font-semibold transition-colors duration-300 relative flex items-center gap-1",
                          "text-foreground",
                          (isServicesOpen ? "text-[hsl(var(--cfh-red))]" : "hover:text-[hsl(var(--cfh-red))]")
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 opacity-70" />

                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-[3px] bg-[hsl(var(--cfh-blue))] transition-all duration-300 ease-out",
                          isServicesOpen ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                      </button>


                      {isServicesOpen && (
                        <div className="absolute left-0 top-full pt-3">
                          <div className="w-80 rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-lg overflow-hidden">
                            <div className="py-2">
                              {serviceItems.map((s) => (
                                <a
                                  key={s.href}
                                  href={s.href}
                                  onClick={() => setIsServicesOpen(false)}
                                  className="block px-4 py-3 text-sm text-foreground/90 hover:bg-secondary/40 hover:text-[hsl(var(--cfh-red))] transition-colors"
                                >
                                  {s.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                );
              }

              // PRODUCTS dropdown
              if (item.href === "#products") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    data-products-dropdown
                    onMouseEnter={() => handleOpenProducts(true)}
                    onMouseLeave={() => handleOpenProducts(false)}
                  >
                      <button
                        type="button"
                        onClick={() => handleOpenProducts(!isProductsOpen)}
                        className={cn(
                          "group text-base font-semibold transition-colors duration-300 relative flex items-center gap-1",
                          "text-foreground",
                          isProductsOpen ? "text-[hsl(var(--cfh-red))]" : "hover:text-[hsl(var(--cfh-red))]"
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 opacity-70" />
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 h-[3px] bg-[hsl(var(--cfh-blue))] transition-all duration-300 ease-out",
                            isProductsOpen ? "w-full" : "w-0 group-hover:w-full"
                          )}
                        />
                      </button>


                      {isProductsOpen && (
                        <div className="absolute left-0 top-full pt-3">
                          <div className="w-72 rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl shadow-lg overflow-hidden">
                            <div className="py-2">
                              {productItems.map((p) => (
                                <a
                                  key={p.href}
                                  href={p.href}
                                  onClick={() => setIsProductsOpen(false)}
                                  className="block px-4 py-3 text-sm text-foreground/90 hover:bg-secondary/40 hover:text-[hsl(var(--cfh-red))] transition-colors"
                                >
                                  {p.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                );
              }

              // default items
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-semibold text-foreground transition-colors duration-300 relative group hover:text-[hsl(var(--cfh-red))] flex items-center gap-1"
                  >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[hsl(var(--cfh-blue))] transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:5143333389"
              className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--cfh-red))] transition-colors"
              >
              <Phone className="h-4 w-4" />
              <span>(514) 333-3389</span>
            </a>

              <Button
                className="
                  bg-transparent text-[hsl(var(--cfh-red))]
                  border border-[hsl(var(--cfh-red))]
                  font-semibold px-6
                  transition-colors
                  hover:bg-[hsl(var(--cfh-red))]
                  hover:text-primary-foreground
                  hover:border-transparent
                "
              >
                {t.hero.cta}
              </Button>


            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500",
            isMobileMenuOpen ? "max-h-[720px] opacity-100 mt-6" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-4 py-4 border-t border-border/30">
            {navItems.map((item) => {
              // SERVICES mobile dropdown
              if (item.href === "#services") {
                return (
                  <div key={item.href} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        setIsServicesMobileOpen((v) => !v);
                        setIsProductsMobileOpen(false);
                      }}
                      className="text-foreground font-medium py-2 transition-colors hover:text-[hsl(var(--cfh-red))] flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 opacity-70 transition-transform",
                          isServicesMobileOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "pl-4 overflow-hidden transition-all",
                        isServicesMobileOpen ? "max-h-[400px] mt-1" : "max-h-0"
                      )}
                    >
                      {serviceItems.map((s) => {
                        const Icon = s.icon;

                        return (
                          <a
                            key={s.href}
                            href={s.href}
                            onClick={() => {
                              setIsServicesMobileOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/90 hover:bg-secondary/40 hover:text-[hsl(var(--cfh-red))] transition-colors"
                          >
                            <Icon className="h-4 w-4 opacity-80" />
                            <span className="truncate">{s.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // PRODUCTS mobile dropdown
              if (item.href === "#products") {
                return (
                  <div key={item.href} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProductsMobileOpen((v) => !v);
                        setIsServicesMobileOpen(false);
                      }}
                      className="text-foreground font-medium py-2 transition-colors hover:text-[hsl(var(--cfh-red))] flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 opacity-70 transition-transform",
                          isProductsMobileOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "pl-4 overflow-hidden transition-all",
                        isProductsMobileOpen ? "max-h-[600px] mt-1" : "max-h-0"
                      )}
                    >
                      {productItems.map((p) => (
                        <a
                          key={p.href}
                          href={p.href}
                          onClick={() => {
                            setIsProductsMobileOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block py-2 text-sm text-muted-foreground hover:text-[hsl(var(--cfh-red))] transition-colors"
                        >
                          {p.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              // default mobile items
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground font-medium py-2 transition-colors hover:text-[hsl(var(--cfh-red))] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            <a
              href="tel:5143333389"
              className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--cfh-red))] transition-colors"
              >
              <Phone className="h-4 w-4 text-foreground" />
              <span className="text-foreground">(514) 333-3389</span>
            </a>

            <Button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {t.hero.cta}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
