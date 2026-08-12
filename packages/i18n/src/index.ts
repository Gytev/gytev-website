import type { Locale } from "@gytev/types";

export type { Locale } from "@gytev/types";

export const locales = ["en", "fr"] as const;
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocale(pathname: string): Locale {
  const first = pathname.split("/")[1] ?? "";
  return isLocale(first) ? first : defaultLocale;
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts.splice(1, 1);
  }
  return parts.join("/") || "/";
}

export function localizedHref(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale ? normalized : `/${locale}${normalized}`;
}

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: Record<string, { label: string; items: { title: string; description: string }[] }>;
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  centralQuestion: {
    title: string;
    description: string;
    cta: string;
    nodes: { title: string }[];
  };
  product: {
    eyebrow: string;
    title: string;
    description: string;
    features: {
      title: string;
      tagline: string;
      description: string;
      tags: string[];
    }[];
  };
  solution: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Gytev — Intelligent systems that understand the real world.",
      description:
        "Gytev builds intelligent systems that observe, understand, predict and act on the real world — starting with agriculture and public health in Africa.",
    },
    nav: {
      research: {
        label: "Research",
        items: [
          { title: "Language & AI", description: "Models and systems that understand context." },
          { title: "Digital Twins", description: "Virtual representations of real-world systems." },
          { title: "Predictive Systems", description: "Forecasting risks, yields and outcomes." },
          { title: "Publications", description: "Papers and findings from our labs." },
        ],
      },
      products: {
        label: "Products",
        items: [
          { title: "Rio", description: "Digital twin of farms. IoT + AI for agriculture." },
          { title: "Rio Box", description: "IoT sensor box installed directly on the field." },
          { title: "Rio AI", description: "Predictions, alerts and recommendations." },
          { title: "Platform", description: "Web and mobile applications for farmers." },
        ],
      },
      solutions: {
        label: "Solutions",
        items: [
          { title: "RedQ", description: "National blood donation and blood bag management." },
          { title: "For Agriculture", description: "Crops, irrigation and risk management." },
          { title: "For Public Health", description: "Supply chain and traceability." },
          { title: "For Government", description: "Sovereign digital infrastructure." },
        ],
      },
      developers: {
        label: "Developers",
        items: [
          { title: "API Reference", description: "REST and GraphQL APIs." },
          { title: "SDKs", description: "Libraries for your favorite languages." },
          { title: "Status", description: "Platform uptime and incidents." },
          { title: "Open Source", description: "Projects and contributions." },
        ],
      },
      company: {
        label: "Company",
        items: [
          { title: "About", description: "Our mission and story." },
          { title: "Vision", description: "The 20-year technology thesis." },
          { title: "Careers", description: "Join the team." },
          { title: "Contact", description: "Get in touch." },
        ],
      },
    },
    hero: {
      eyebrow: "Gytev",
      title: "Intelligent systems that understand",
      highlight: "the real world.",
      description:
        "We combine sensors, data, artificial intelligence and domain knowledge to observe, understand, predict and act on the systems that surround us — farms, blood banks, cities, industries.",
      ctaPrimary: "Discover Rio",
      ctaSecondary: "Read the vision",
    },
    centralQuestion: {
      title: "Gytev is built on hard questions.",
      description:
        "What parts of the real world remain poorly understood by software? That question guides our research, our products and our people.",
      cta: "Read the vision",
      nodes: [
        { title: "What is happening?" },
        { title: "Why is it happening?" },
        { title: "What could happen next?" },
        { title: "What should we do?" },
      ],
    },
    product: {
      eyebrow: "Product",
      title: "Rio",
      description:
        "A digital twin of your farm. An IoT box senses the field, AI understands it, and the platform tells you what to do next.",
      features: [
        {
          title: "Observe.",
          tagline: "Sense the field",
          description:
            "The Rio Box collects soil moisture, temperature, humidity, light, rainfall and more, continuously.",
          tags: ["SOIL MOISTURE", "TEMPERATURE", "AIR HUMIDITY", "RAINFALL", "LIGHT", "SOIL PH", "WATER LEVEL"],
        },
        {
          title: "Understand.",
          tagline: "Turn data into insight",
          description:
            "AI combines field history, weather, satellite data and agronomic knowledge to explain what is happening and why.",
          tags: ["ANOMALY DETECTION", "CROP STAGES", "AGROCLIMATIC ANALYSIS", "FIELD HISTORY"],
        },
        {
          title: "Predict.",
          tagline: "Anticipate risks",
          description:
            "Water stress, diseases, yield loss. Rio forecasts risks days and weeks ahead, crop by crop.",
          tags: ["WATER-STRESS RISK", "DISEASE FORECASTING", "YIELD PREDICTION", "WEATHER FUSION"],
        },
        {
          title: "Act.",
          tagline: "Recommend the right decision",
          description:
            "Irrigation within 24 hours, fertilizer adjustment, harvest timing. Clear recommendations, in your language.",
          tags: ["IRRIGATION ALERTS", "DECISION SUPPORT", "DASHBOARD", "WEB & MOBILE"],
        },
      ],
    },
    solution: {
      eyebrow: "Solution",
      title: "RedQ",
      description:
        "The national platform for managing blood donations and blood bags — from donor to hospital, with full traceability.",
    },
    cta: {
      eyebrow: "Solutions enterprise",
      title: "Build, customize, and deploy intelligent systems with complete control.",
      ctaPrimary: "Start building",
      ctaSecondary: "Contact sales",
    },
    footer: {
      tagline: "We build intelligence for the real world.",
      rights: "All rights reserved.",
    },
  },
  fr: {
    meta: {
      title: "Gytev — Des systèmes intelligents qui comprennent le monde réel.",
      description:
        "Gytev construit des systèmes intelligents qui observent, comprennent, prédisent et agissent sur le monde réel — à commencer par l'agriculture et la santé publique en Afrique.",
    },
    nav: {
      research: {
        label: "Recherche",
        items: [
          { title: "Langage & IA", description: "Modèles et systèmes qui comprennent le contexte." },
          { title: "Jumeaux numériques", description: "Représentations virtuelles de systèmes réels." },
          { title: "Systèmes prédictifs", description: "Prévision des risques, rendements et résultats." },
          { title: "Publications", description: "Articles et résultats de nos laboratoires." },
        ],
      },
      products: {
        label: "Produits",
        items: [
          { title: "Rio", description: "Jumeau numérique des exploitations. IoT + IA." },
          { title: "Box Rio", description: "Box de capteurs IoT installée sur le terrain." },
          { title: "IA Rio", description: "Prédictions, alertes et recommandations." },
          { title: "Plateforme", description: "Applications web et mobile pour les agriculteurs." },
        ],
      },
      solutions: {
        label: "Solutions",
        items: [
          { title: "RedQ", description: "Gestion nationale des dons et des poches de sang." },
          { title: "Pour l'agriculture", description: "Cultures, irrigation et gestion des risques." },
          { title: "Pour la santé publique", description: "Chaîne d'approvisionnement et traçabilité." },
          { title: "Pour les gouvernements", description: "Infrastructure numérique souveraine." },
        ],
      },
      developers: {
        label: "Développeurs",
        items: [
          { title: "Référence API", description: "API REST et GraphQL." },
          { title: "SDK", description: "Bibliothèques pour vos langages favoris." },
          { title: "Statut", description: "Disponibilité de la plateforme." },
          { title: "Open Source", description: "Projets et contributions." },
        ],
      },
      company: {
        label: "Entreprise",
        items: [
          { title: "À propos", description: "Notre mission et notre histoire." },
          { title: "Vision", description: "La thèse technologique sur 20 ans." },
          { title: "Carrières", description: "Rejoignez l'équipe." },
          { title: "Contact", description: "Contactez-nous." },
        ],
      },
    },
    hero: {
      eyebrow: "Gytev",
      title: "Des systèmes intelligents qui comprennent",
      highlight: "le monde réel.",
      description:
        "Nous combinons capteurs, données, intelligence artificielle et connaissance des métiers pour observer, comprendre, prédire et agir sur les systèmes qui nous entourent — exploitations, banques de sang, villes, industries.",
      ctaPrimary: "Découvrir Rio",
      ctaSecondary: "Lire la vision",
    },
    centralQuestion: {
      title: "Gytev est fondé sur des questions difficiles.",
      description:
        "Quelles parties du monde réel restent mal comprises par les logiciels ? Cette question guide notre recherche, nos produits et nos équipes.",
      cta: "Lire la vision",
      nodes: [
        { title: "Que se passe-t-il ?" },
        { title: "Pourquoi cela se produit-il ?" },
        { title: "Que risque-t-il de se passer ?" },
        { title: "Que devons-nous faire ?" },
      ],
    },
    product: {
      eyebrow: "Produit",
      title: "Rio",
      description:
        "Un jumeau numérique de votre exploitation. Une box IoT perçoit la parcelle, l'IA la comprend, et la plateforme vous dit quoi faire.",
      features: [
        {
          title: "Observer.",
          tagline: "Percevoir la parcelle",
          description:
            "La Box Rio collecte en continu humidité du sol, température, humidité, luminosité, pluviométrie et plus.",
          tags: ["HUMIDITÉ DU SOL", "TEMPÉRATURE", "HUMIDITÉ DE L'AIR", "PLUVIOMÉTRIE", "LUMINOSITÉ", "PH DU SOL", "NIVEAU D'EAU"],
        },
        {
          title: "Comprendre.",
          tagline: "Transformer les données en connaissances",
          description:
            "L'IA combine l'historique, la météo, les données satellites et les connaissances agronomiques pour expliquer ce qui se passe et pourquoi.",
          tags: ["DÉTECTION D'ANOMALIES", "STADES DE CULTURE", "ANALYSE AGROCLIMATIQUE", "HISTORIQUE DE LA PARCELLE"],
        },
        {
          title: "Prédire.",
          tagline: "Anticiper les risques",
          description:
            "Stress hydrique, maladies, baisse de rendement. Rio prévoit les risques des jours et semaines à l'avance, culture par culture.",
          tags: ["RISQUE DE STRESS HYDRIQUE", "PRÉVISION DES MALADIES", "PRÉDICTION DES RENDEMENTS", "FUSION MÉTÉO"],
        },
        {
          title: "Agir.",
          tagline: "Recommander la bonne décision",
          description:
            "Irrigation dans les 24 heures, ajustement des engrais, moment de la récolte. Des recommandations claires, dans votre langue.",
          tags: ["ALERTES D'IRRIGATION", "AIDE À LA DÉCISION", "TABLEAU DE BORD", "WEB & MOBILE"],
        },
      ],
    },
    solution: {
      eyebrow: "Solution",
      title: "RedQ",
      description:
        "La plateforme nationale de gestion des dons et des poches de sang — du donneur à l'hôpital, avec traçabilité complète.",
    },
    cta: {
      eyebrow: "Solutions entreprise",
      title: "Construisez, personnalisez et déployez des systèmes intelligents avec un contrôle total.",
      ctaPrimary: "Commencer",
      ctaSecondary: "Contacter les ventes",
    },
    footer: {
      tagline: "Nous construisons l'intelligence pour le monde réel.",
      rights: "Tous droits réservés.",
    },
  },
};
