import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import cfhLogo from "@/assets/CFH-Securite-Logo.png";

type NavItem = {
  label: string;
  to: string;
};

const SCROLL_TRIGGER_PX = 20;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useLanguage();
  const location = useLocation();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: t.nav.services, to: "/services" },
      { label: "Products", to: "/#products" },
      { label: t.nav.projects, to: "/#projects" },
      { label: t.nav.about, to: "/#about" },
      { label: t.nav.contact, to: "/#contact" },
    ],
    [t]
  );

  const isItemActive = (item: NavItem) => {
    if (item.to === "/services") {
      return location.pathname.startsWith("/services");
    }

    // For "/#section" items, consider active only when you're on "/" and hash matches.
    if (item.to.startsWith("/#")) {
      const itemHash = item.to.substring(1); // "#products"
      return location.pathname === "/" && location.hash === itemHash;
    }

    return location.pathname === item.to;
  };

  useEffect(() => {
    // If a page uses an internal scroll container, mark it with: data-scroll-container="true"
    const container = document.querySelector<HTMLElement>('[data-scroll-container="true"]');

    const readScrollTop = () => (container ? container.scrollTop : window.scrollY);

    const handleScroll = () => {
      setIsScrolled(readScrollTop() > SCROLL_TRIGGER_PX);
    };

    // initialize state
    handleScroll();

    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll as any);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll as any);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
          <Link to="/" className="flex items-center group" onClick={closeMobileMenu}>
            <img
              src={cfhLogo}
              alt="CFH Sécurité - Prévention Incendie"
              className="h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isItemActive(item);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-base font-semibold transition-colors duration-300 relative group flex items-center gap-1",
                    active ? "text-[hsl(var(--cfh-red))]" : "text-foreground hover:text-[hsl(var(--cfh-red))]"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[3px] bg-[hsl(var(--cfh-blue))] transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
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
              onClick={() => setIsMobileMenuOpen((v) => !v)}
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
              const active = isItemActive(item);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-medium py-2 transition-colors flex items-center justify-between",
                    active ? "text-[hsl(var(--cfh-red))]" : "text-foreground hover:text-[hsl(var(--cfh-red))]"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
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
