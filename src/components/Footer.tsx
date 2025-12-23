import { Shield, Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.careers, href: '#careers' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const serviceAreas = [
    'Montréal',
    'Laval',
    'Longueuil',
    'Québec City',
    'Gatineau',
    'Trois-Rivières',
  ];

  return (
    <footer className="bg-card border-t border-border/30 py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <Shield className="h-10 w-10 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground tracking-tight">
                  CFH <span className="text-primary">Sécurité</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Prévention Incendie
                </span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg bg-secondary/50 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {t.footer.serviceArea}
            </h3>
            <ul className="space-y-3">
              {serviceAreas.map((area, index) => (
                <li key={index} className="text-muted-foreground">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:5143333389"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>(514) 333-3389</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:cfhsecurite@cfhsecurite.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>cfhsecurite@cfhsecurite.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <span>Montréal, Québec<br />Canada</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CFH Sécurité Inc. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
