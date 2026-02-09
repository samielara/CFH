import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAiChat } from "@/contexts/AiChatContext";
import { cn } from "@/lib/utils";
import cfhLogo from "@/assets/CFH-Securite-Logo.png";
import aiIcon from "@/assets/ai-assistant.png";

type NavItem = {
  label: string;
  to: string;
};

const SCROLL_TRIGGER_PX = 20;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useLanguage();
  const { toggleOpen, isOpen } = useAiChat();
  const location = useLocation();

const navItems: NavItem[] = useMemo(
  () => [
    { label: t.nav.home, to: "/#home" },
    { label: t.nav.services, to: "/services" },
    { label: t.nav.products, to: "/products" },
    { label: t.nav.projects, to: "/projects" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.contact, to: "/contact" },
  ],
  [t]
);

  const isItemActive = (item: NavItem) => {
    if (item.to === "/services") 
      return location.pathname.startsWith("/services");
    if (item.to === "/products") 
      return location.pathname.startsWith("/products");
    if (item.to === "/projects") 
      return location.pathname.startsWith("/projects");
    if (item.to === "/about") 
      return location.pathname.startsWith("/about");
    if (item.to === "/contact") 
      return location.pathname.startsWith("/contact");

    // For "/#section" items, consider active only when you're on "/" and hash matches.
    if (item.to.startsWith("/#")) {
      const itemHash = item.to.substring(1); // "#home"
      // If we are on the root path "/" with empty hash, consider it the home section
      if (itemHash === "#home" && location.pathname === "/" && location.hash === "") {
        return true;
      }
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
        <div className="flex items-center justify-between relative h-16 lg:h-auto">
          {/* Mobile Menu Button - Left Side */}
          <div className="lg:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-foreground -ml-2"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[60%] sm:max-w-[320px] p-0 border-r-border/30 bg-background/95 backdrop-blur-xl [&>button]:hidden">
                 <SheetHeader className="h-24 flex items-center justify-center px-6 border-b border-border/10">
                   <SheetTitle className="sr-only">Menu</SheetTitle>
                   <div className="flex items-center gap-3">
                      <img src={cfhLogo} alt="CFH Logo" className="h-10 w-auto" />
                   </div>
                 </SheetHeader>
                 
                 <div className="flex flex-col py-6 px-4 space-y-2 overflow-y-auto h-[calc(100vh-6rem)]">
                    {navItems.map((item) => {
                      const active = isItemActive(item);
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
                          className={cn(
                            "flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-muted/50",
                            active ? "bg-muted/30 text-[hsl(var(--cfh-red))]" : "text-foreground"
                          )}
                        >
                           <span className={cn("text-lg font-medium tracking-wide", active ? "font-bold" : "")}>
                             {item.label}
                           </span>
                        </Link>
                      );
                    })}

                    <div className="mt-6 pt-6 border-t border-border/10 px-2 space-y-4">
                        <a
                           href="tel:5143333389"
                           className="flex items-center gap-3 text-foreground hover:text-[hsl(var(--cfh-red))] transition-colors p-2"
                         >
                           <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                              <Phone className="h-4 w-4" />
                           </div>
                           <span className="font-medium">(514) 333-3389</span>
                         </a>

                        <Button className="w-full bg-[hsl(var(--cfh-red))] hover:bg-[hsl(var(--cfh-red))]/90 text-white font-bold h-12 rounded-xl" asChild>
                           <Link to="/quote" onClick={closeMobileMenu}>{t.hero.cta}</Link>
                        </Button>
                    </div>
                 </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Center on Mobile, Left on Desktop */}
          <Link 
            to="/#home" 
            className="flex items-center group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none lg:mr-auto" 
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })} 
          >
            <img
              src={cfhLogo}
              alt="CFH Sécurité - Prévention Incendie"
              className="h-16 md:h-20 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {navItems.map((item) => {
              const active = isItemActive(item);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-lg font-semibold transition-colors duration-300 relative group flex items-center gap-1",
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
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop Only Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:5143333389"
                className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--cfh-red))] transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>(514) 333-3389</span>
              </a>

              <Button
                asChild
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
                <Link to="/quote">{t.hero.cta}</Link>
              </Button>
            </div>
            
             <LanguageToggle />
             
             {/* AI Chat Toggle Button */}
             <button
                onClick={toggleOpen}
                className="relative flex items-center justify-center p-2 rounded-full hover:bg-[hsl(var(--cfh-red))] hover:scale-110 active:scale-95 transition-all duration-300 group ai-toggle-btn"
                aria-label="Toggle AI Assistant"
             >
                <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center relative">
                    <img src={aiIcon} alt="AI" className="w-full h-full object-contain invert brightness-200" />
                    {!isOpen && (
                         <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--cfh-red))] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(var(--cfh-red))]"></span>
                         </span>
                    )}
                </div>
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
