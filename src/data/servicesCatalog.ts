// src/data/servicesCatalog.ts
export type Localized<T> = { en: T; fr: T };

export type ServiceGroup = "engineering" | "testing" | "maintenance" | "equipment";

export type ServiceDefinition = {
    id: string;
    group: ServiceGroup;
    title: Localized<string>;
    subtitle: Localized<string>;
    items: Localized<string[]>;
    image: string;

    // optional: keep for later if your QuotePage supports it
    quoteCategory?: string;
};

// Existing images (placeholders for now — you’ll swap later)
import designEngineeringImg from "@/assets/services/design-engineering.png";
import kitchenSuppressionImg from "@/assets/services/kitchen-suppression.png";
import fireExtinguisherHosesImg from "@/assets/services/fire-extinguishers-hoses.png";
import inspectionMaintenanceImg from "@/assets/services/inspection-maintenance.png";
import emergencyLightingImg from "@/assets/services/emergency-lighting.png";
import sprinklersImg from "@/assets/services/sprinklers.png";
import backflowBpdImg from "@/assets/services/backflow-bpd.png";
import hydrantsPumpsImg from "@/assets/services/hydrants-pumps.png";
import specialHazardsImg from "@/assets/services/special-hazards.png";
import dryChemicalImg from "@/assets/services/dry-chemical.png";


export const serviceCatalog: ServiceDefinition[] = [
    // 1) Design & Engineering (customer list includes it)
    {
        id: "design-engineering",
        group: "engineering",
        title: { en: "Design & Engineering", fr: "Design et ingénierie" },
        subtitle: {
            en: "Engineer-supported planning and system design to meet code and site requirements.",
            fr: "Planification et conception appuyées par l’ingénierie, selon les exigences et la conformité.",
        },
        items: {
            en: ["Engineer-stamped plans", "Code-compliant documentation", "Design support for fire protection systems"],
            fr: ["Plans certifiés", "Documentation conforme", "Support de conception pour systèmes de protection incendie"],
        },
        image: designEngineeringImg,
    },

    // 2) Kitchen fire suppression
    {
        id: "kitchen-suppression",
        group: "maintenance",
        title: {
            en: "Fire Suppression for Commercial Kitchens",
            fr: "Systèmes d’extinction incendie pour cuisines",
        },
        subtitle: {
            en: "Protection for commercial kitchens designed for fast response and compliance.",
            fr: "Protection des cuisines commerciales conçue pour une intervention rapide et conforme.",
        },
        items: {
            en: ["System inspection & service", "Repairs and upgrades", "Compliance readiness"],
            fr: ["Inspection & entretien", "Réparations et mises à niveau", "Préparation à l’inspection"],
        },
        image: kitchenSuppressionImg,
    },

    // 3) Fire extinguishers and fire hoses (combined, per customer requirement)
    {
        id: "extinguishers-hoses",
        group: "equipment",
        title: { en: "Fire Extinguishers & Fire Hoses", fr: "Extincteurs et boyaux d’incendie" },
        subtitle: {
            en: "Equipment supply, inspections and service to keep your site ready and compliant.",
            fr: "Fourniture, inspection et service pour garder votre site prêt et conforme.",
        },
        items: {
            en: ["Portable extinguishers", "Fire hoses and hose accessories", "Inspection and maintenance support"],
            fr: ["Extincteurs portatifs", "Boyaux et accessoires", "Support inspection et entretien"],
        },
        // placeholder: you can swap to a better combined image later
        image: fireExtinguisherHosesImg,
    },

    // 4) Fire alarm systems
    {
        id: "fire-alarm",
        group: "maintenance",
        title: { en: "Fire Alarm Systems", fr: "Alarme incendie" },
        subtitle: {
            en: "Detection, notification and system support for reliable fire alarm coverage.",
            fr: "Détection, avertisseurs et support système pour une couverture d’alarme fiable.",
        },
        items: {
            en: ["Panels, devices and signaling", "Inspection and verification", "Troubleshooting and repairs"],
            fr: ["Panneaux, dispositifs et signalisation", "Inspection et vérification", "Dépannage et réparations"],
        },
        // placeholder
        image: inspectionMaintenanceImg,
    },

    // 5) Emergency lighting
    {
        id: "emergency-lighting",
        group: "maintenance",
        title: { en: "Emergency Lighting", fr: "Éclairage d’urgence" },
        subtitle: {
            en: "Emergency units and exit signage support for safe egress and compliance.",
            fr: "Blocs d’urgence et enseignes de sortie pour une évacuation sécuritaire et conforme.",
        },
        items: {
            en: ["Exit signs & emergency units", "Testing & battery checks", "Repairs and replacements"],
            fr: ["Enseignes de sortie & blocs d’urgence", "Tests & batteries", "Réparations et remplacements"],
        },
        // placeholder
        image: emergencyLightingImg,
    },

    // 6) Sprinkler systems
    {
        id: "sprinklers",
        group: "maintenance",
        title: { en: "Sprinkler Systems", fr: "Gicleurs" },
        subtitle: {
            en: "Sprinkler system service and support designed to keep protection reliable and compliant.",
            fr: "Service et support de systèmes de gicleurs pour une protection fiable et conforme.",
        },
        items: {
            en: ["System inspection & service", "Repairs and modifications", "Compliance support"],
            fr: ["Inspection & entretien", "Réparations et modifications", "Support conformité"],
        },
        // placeholder
        image: sprinklersImg,
    },

    // 7) Backflow prevention devices (BPD / DAR)
    {
        id: "backflow-bpd",
        group: "testing",
        title: { en: "Backflow Prevention Devices (BPD)", fr: "DAR (dispositif anti-refoulement)" },
        subtitle: {
            en: "Testing and servicing to help maintain compliance for backflow prevention devices.",
            fr: "Essais et service pour aider à maintenir la conformité des dispositifs anti-refoulement.",
        },
        items: {
            en: ["Testing and verification", "Service and repairs", "Compliance documentation"],
            fr: ["Essais et vérification", "Service et réparations", "Documentation de conformité"],
        },
        // placeholder
        image: backflowBpdImg,
    },

    // 8) Fire hydrants and pumps
    {
        id: "hydrants-pumps",
        group: "testing",
        title: { en: "Fire Hydrants & Pumps", fr: "Bornes fontaines et pompes" },
        subtitle: {
            en: "Inspection and support for hydrants and pumps to keep water supply ready when needed.",
            fr: "Inspection et support des bornes fontaines et pompes pour assurer une alimentation prête en tout temps.",
        },
        items: {
            en: ["Inspection and testing", "Service and repairs", "Compliance support"],
            fr: ["Inspection et essais", "Service et réparations", "Support conformité"],
        },
        // placeholder
        image: hydrantsPumpsImg,
    },

    // 9) Special hazard systems (Gas / CO₂)
    {
        id: "special-hazards-gas-co2",
        group: "maintenance",
        title: {
            en: "Special Hazard Systems (Gas/CO₂)",
            fr: "Systèmes pour risques spéciaux (Gaz/CO₂)",
        },
        subtitle: {
            en: "Suppression solutions for critical environments where specialized agents are required.",
            fr: "Solutions d’extinction pour environnements critiques nécessitant des agents spécialisés.",
        },
        items: {
            en: ["Gas / CO₂ systems", "Inspection and servicing", "System readiness support"],
            fr: ["Systèmes Gaz / CO₂", "Inspection et entretien", "Support de préparation système"],
        },
        image: specialHazardsImg,
    },


    // 10) Dry chemical suppression systems
    {
        id: "dry-chemical",
        group: "maintenance",
        title: { en: "Dry Chemical Suppression Systems", fr: "Systèmes à poudre chimique" },
        subtitle: {
            en: "Dry chemical suppression for special hazards requiring fast knockdown and reliable coverage.",
            fr: "Extinction à poudre chimique pour risques spéciaux nécessitant une action rapide et une couverture fiable.",
        },
        items: {
            en: ["System inspection & service", "Recharge / refilling support", "Repairs and upgrades"],
            fr: ["Inspection & entretien", "Support recharge / remplissage", "Réparations et mises à niveau"],
        },
        // placeholder (swap later)
        image: dryChemicalImg,
    },
];
