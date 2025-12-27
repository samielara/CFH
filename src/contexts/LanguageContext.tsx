import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface Translations {
  nav: {
    home: string;
    services: string;
    products: string;
    projects: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    security: {
      title: string;
      description: string;
    };
    fire: {
      title: string;
      description: string;
    };
    surveillance: {
      title: string;
      description: string;
    };
    consulting: {
      title: string;
      description: string;
    };
    events: {
      title: string;
      description: string;
    };
    training: {
      title: string;
      description: string;
    };
  };
  stats: {
    years: string;
    clients: string;
    agents: string;
    coverage: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    serviceArea: string;
    rights: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'Complete Fire & Security Solutions',
      subtitle: 'Montreal\'s trusted security partner since 1995. We protect what matters most with cutting-edge technology and elite security professionals.',
      cta: 'Get a Quote',
      ctaSecondary: 'Our Services',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive security solutions tailored to your needs',
      security: {
        title: 'Security Guards',
        description: 'Elite trained professionals providing 24/7 protection for commercial, industrial, and residential properties.',
      },
      fire: {
        title: 'Fire Prevention',
        description: 'Advanced fire detection, suppression systems, and safety protocols to protect your assets and personnel.',
      },
      surveillance: {
        title: 'Video Surveillance',
        description: 'State-of-the-art CCTV systems with remote monitoring and AI-powered threat detection.',
      },
      consulting: {
        title: 'Security Consulting',
        description: 'Expert risk assessment and security planning to identify vulnerabilities and optimize protection.',
      },
      events: {
        title: 'Event Security',
        description: 'Professional crowd management and VIP protection for corporate events and public gatherings.',
      },
      training: {
        title: 'Security Training',
        description: 'Comprehensive training programs for security personnel and emergency response protocols.',
      },
    },
    stats: {
      years: 'Years Experience',
      clients: 'Active Clients',
      agents: 'Security Agents',
      coverage: '24/7 Coverage',
    },
    cta: {
      title: 'Ready to Secure Your Future?',
      subtitle: 'Contact our team today for a free security assessment and customized protection plan.',
      button: 'Request a Quote',
    },
    footer: {
      description: 'Your trusted partner for comprehensive fire and security solutions in Montreal and across Quebec.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      serviceArea: 'Service Area',
      rights: 'All rights reserved.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      products: 'Produits',
      projects: 'Projets',
      about: 'À Propos',
      contact: 'Contact',
    },
    hero: {
      title: 'Solutions Complètes Incendie & Sécurité',
      subtitle: 'Partenaire de sécurité de confiance à Montréal depuis 1995. Nous protégeons ce qui compte le plus avec une technologie de pointe et des professionnels d\'élite.',
      cta: 'Obtenir une Soumission',
      ctaSecondary: 'Nos Services',
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Solutions de sécurité complètes adaptées à vos besoins',
      security: {
        title: 'Agents de Sécurité',
        description: 'Professionnels d\'élite assurant une protection 24/7 pour les propriétés commerciales, industrielles et résidentielles.',
      },
      fire: {
        title: 'Prévention Incendie',
        description: 'Systèmes avancés de détection et d\'extinction d\'incendie pour protéger vos actifs et votre personnel.',
      },
      surveillance: {
        title: 'Vidéosurveillance',
        description: 'Systèmes de CCTV à la fine pointe avec surveillance à distance et détection des menaces par IA.',
      },
      consulting: {
        title: 'Consultation Sécurité',
        description: 'Évaluation des risques et planification de sécurité pour identifier les vulnérabilités et optimiser la protection.',
      },
      events: {
        title: 'Sécurité Événementielle',
        description: 'Gestion professionnelle des foules et protection VIP pour événements corporatifs et rassemblements publics.',
      },
      training: {
        title: 'Formation Sécurité',
        description: 'Programmes de formation complets pour le personnel de sécurité et les protocoles d\'intervention d\'urgence.',
      },
    },
    stats: {
      years: 'Années d\'Expérience',
      clients: 'Clients Actifs',
      agents: 'Agents de Sécurité',
      coverage: 'Couverture 24/7',
    },
    cta: {
      title: 'Prêt à Sécuriser Votre Avenir?',
      subtitle: 'Contactez notre équipe aujourd\'hui pour une évaluation de sécurité gratuite et un plan de protection personnalisé.',
      button: 'Demander une Soumission',
    },
    footer: {
      description: 'Votre partenaire de confiance pour des solutions complètes de sécurité et d\'incendie à Montréal et partout au Québec.',
      quickLinks: 'Liens Rapides',
      contact: 'Nous Contacter',
      serviceArea: 'Zone de Service',
      rights: 'Tous droits réservés.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "cfh_language";

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "fr" ? saved : "fr";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};