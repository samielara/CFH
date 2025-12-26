import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import cfhLogo from "@/assets/CFH-Securite-Logo.png";
import { Link } from "react-router-dom";

type NavItem =
  | { label: string; kind: "route"; to: string }
  | { label: string; kind: "hash"; href: string };

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Services -> real route
  // Other nav items -> go to Home page + hash (works even when you’re on /services)
  const navItems: NavItem[] = [
    { label: t.nav.services, kind: "route", to: "/services" },
    { label: "Products", kind: "hash", href: "/#products" },
    { label: t.nav.projects, kind: "hash", href: "/#projects" },
    { label: t.nav.about, kind: "hash", href: "/#about" },
    { label: t.nav.contact, kind: "hash", href: "/#contact" },
  ];

  const closeMobile = () => setIsMobileMenuOpen(false);

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
          <Link to="/" className="flex items-center group" onClick={closeMobile}>
            <img
              src={cfhLogo}
              alt="CFH Sécurité - Prévention Incendie"
              className="h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.kind === "route" ? (
                <Link
                  key={`route:${item.to}`}
                  to={item.to}
                  className="text-base font-semibold text-foreground transition-colors duration-300 relative group hover:text-[hsl(var(--cfh-red))] flex items-center gap-1"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[hsl(var(--cfh-blue))] transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={`hash:${item.href}`}
                  href={item.href}
                  className="text-base font-semibold text-foreground transition-colors duration-300 relative group hover:text-[hsl(var(--cfh-red))] flex items-center gap-1"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[hsl(var(--cfh-blue))] transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              )
            )}
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
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
            {navItems.map((item) =>
              item.kind === "route" ? (
                <Link
                  key={`m:route:${item.to}`}
                  to={item.to}
                  onClick={closeMobile}
                  className="text-foreground font-medium py-2 transition-colors hover:text-[hsl(var(--cfh-red))] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                </Link>
              ) : (
                <a
                  key={`m:hash:${item.href}`}
                  href={item.href}
                  onClick={closeMobile}
                  className="text-foreground font-medium py-2 transition-colors hover:text-[hsl(var(--cfh-red))] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                </a>
              )
            )}

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
