import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import cfhLogo from "@/assets/CFH-Securite-Logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Footer = () => {
  const { t } = useLanguage();

  const serviceAreas = [
    "Montréal",
    "Laval",
    "Longueuil",
    "Québec City",
    "Gatineau",
    "Trois-Rivières",
  ];

  return (
    <footer className="bg-card border-t border-border/30 py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
          {/* Brand Column (Always Visible) */}
          <div className="md:col-span-1 flex flex-col items-center text-center md:items-start md:text-left">
            <a href="#home" className="inline-block mb-6">
               <img
                  src={cfhLogo}
                  alt="CFH Sécurité"
                  className="h-16 md:h-20 w-auto drop-shadow-sm"
               />
            </a>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="#"
                className="p-2 rounded-lg bg-[#1877F2] text-white border border-transparent hover:opacity-90 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg shadow-blue-900/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 fill-current" />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 rounded-lg bg-[#0A66C2] text-white border border-transparent hover:opacity-90 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg shadow-blue-900/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 fill-current" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="p-2 rounded-lg bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white border border-transparent hover:opacity-90 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg shadow-orange-900/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Desktop Columns (Hidden on Mobile) */}
          <div className="hidden md:grid md:grid-cols-2 gap-10 md:col-span-2">
            {/* Service Areas */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t.footer.serviceArea}
              </h3>
              <ul className="space-y-3">
                {serviceAreas.map((area) => (
                  <li key={area} className="text-muted-foreground">
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
                    <span>
                      Montréal, Québec
                      <br />
                      Canada
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Accordion (Hidden on Desktop) */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services">
                <AccordionTrigger className="text-foreground font-semibold justify-center">
                   <span className="flex-1 text-center pl-4">{t.footer.serviceArea}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pt-2 text-center flex flex-col items-center">
                    {serviceAreas.map((area) => (
                      <li key={area} className="text-muted-foreground">
                        {area}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="contact">
                <AccordionTrigger className="text-foreground font-semibold justify-center">
                   <span className="flex-1 text-center pl-4">{t.footer.contact}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-2 text-center flex flex-col items-center">
                    <li>
                      <a
                        href="tel:5143333389"
                        className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                        <span>(514) 333-3389</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:cfhsecurite@cfhsecurite.com"
                        className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span>cfhsecurite@cfhsecurite.com</span>
                      </a>
                    </li>
                    <li>
                      <div className="flex items-start justify-center gap-3 text-muted-foreground text-left">
                        <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                        <span>
                          Montréal, Québec
                          <br />
                          Canada
                        </span>
                      </div>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
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
