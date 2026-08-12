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
  nav: Record<
    string,
    {
      label: string;
      columns: { title: string; links: { label: string; href: string }[] }[];
      visual: { eyebrow: string; title: string; description: string; href: string };
    }
  >;
  header: {
    login: string;
    cta: string;
    menu: string;
    close: string;
    search: string;
  };
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
    manageCookies: string;
    big: string;
    bigAccent: string;
    columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[];
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
        columns: [
          {
            title: "Explore research",
            links: [
              { label: "Publications", href: "/research" },
              { label: "Open source", href: "/developers" },
              { label: "Research news", href: "/blog" },
            ],
          },
          {
            title: "Focus areas",
            links: [
              { label: "Language & AI", href: "/research" },
              { label: "Digital Twins", href: "/research" },
              { label: "Predictive Systems", href: "/research" },
            ],
          },
          {
            title: "Featured",
            links: [
              { label: "Rio AI", href: "/products/rio/ai" },
              { label: "RedQ", href: "/solutions/redq" },
              { label: "Customers", href: "/customers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Research",
          title: "Language & AI",
          description: "Models and systems that understand context.",
          href: "/research",
        },
      },
      products: {
        label: "Products",
        columns: [
          {
            title: "Explore products",
            links: [
              { label: "Rio", href: "/products/rio" },
              { label: "Rio Box", href: "/products/rio/box" },
              { label: "Rio AI", href: "/products/rio/ai" },
              { label: "Platform", href: "/products/rio/platform" },
            ],
          },
          {
            title: "Platform",
            links: [
              { label: "Web apps", href: "/products/rio/platform" },
              { label: "Mobile", href: "/products/rio/platform" },
              { label: "APIs & SDKs", href: "/developers" },
            ],
          },
          {
            title: "Get started",
            links: [
              { label: "Install SDK", href: "/developers" },
              { label: "API keys", href: "/developers" },
              { label: "Support", href: "/developers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Product",
          title: "Rio",
          description: "Digital twin of farms. IoT + AI for agriculture.",
          href: "/products/rio",
        },
      },
      solutions: {
        label: "Solutions",
        columns: [
          {
            title: "Explore solutions",
            links: [
              { label: "RedQ", href: "/solutions/redq" },
              { label: "For Agriculture", href: "/solutions/agriculture" },
              { label: "For Public Health", href: "/solutions/public-health" },
              { label: "For Government", href: "/solutions/government" },
            ],
          },
          {
            title: "RedQ",
            links: [
              { label: "Donor management", href: "/solutions/redq" },
              { label: "Hospital network", href: "/solutions/redq" },
            ],
          },
          {
            title: "Industries",
            links: [
              { label: "Farming", href: "/solutions/agriculture" },
              { label: "Healthcare", href: "/solutions/public-health" },
              { label: "Civil service", href: "/solutions/government" },
              { label: "Customers", href: "/customers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Solution",
          title: "RedQ",
          description: "National blood donation and blood bag management.",
          href: "/solutions/redq",
        },
      },
      developers: {
        label: "Developers",
        columns: [
          {
            title: "Explore developers",
            links: [
              { label: "API reference", href: "/developers" },
              { label: "SDKs", href: "/developers" },
              { label: "Status", href: "/developers/status" },
              { label: "Open source", href: "/developers" },
            ],
          },
          {
            title: "Documentation",
            links: [
              { label: "REST API", href: "/developers" },
              { label: "GraphQL", href: "/developers" },
              { label: "Changelog", href: "/developers" },
            ],
          },
          {
            title: "Tools",
            links: [
              { label: "CLI", href: "/developers" },
              { label: "Webhooks", href: "/developers" },
              { label: "Sandbox", href: "/developers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Developers",
          title: "Build on Gytev",
          description: "REST and GraphQL APIs for your stack.",
          href: "/developers",
        },
      },
      company: {
        label: "Company",
        columns: [
          {
            title: "Explore company",
            links: [
              { label: "About", href: "/company/about" },
              { label: "Vision", href: "/company/vision" },
              { label: "Careers", href: "/company/careers" },
              { label: "Contact", href: "/company/contact" },
            ],
          },
          {
            title: "Newsroom",
            links: [
              { label: "Blog", href: "/blog" },
              { label: "Customers", href: "/customers" },
              { label: "Press", href: "/blog" },
            ],
          },
          {
            title: "Careers",
            links: [
              { label: "Open roles", href: "/company/careers" },
              { label: "Internships", href: "/company/careers" },
              { label: "Benefits", href: "/company/careers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Company",
          title: "Our vision",
          description: "The 20-year technology thesis.",
          href: "/company/vision",
        },
      },
    },
    header: {
      login: "Log in",
      cta: "Get started",
      menu: "Open menu",
      close: "Close menu",
      search: "Search",
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
      manageCookies: "Manage Cookies",
      big: "Gytev",
      bigAccent: "Home",
      columns: [
        {
          title: "Research",
          links: [
            { label: "Research Index", href: "/research" },
            { label: "Research Overview", href: "/research" },
            { label: "Economic Research", href: "/research" },
            { label: "Latest Advancements", href: "/research" },
            { label: "Open Models", href: "/research" },
          ],
        },
        {
          title: "Safety",
          links: [
            { label: "Safety Approach", href: "/research" },
            { label: "Deployment Safety", href: "/research", external: true },
            { label: "Security & Privacy", href: "/research" },
            { label: "Trust & Transparency", href: "/research" },
          ],
        },
        {
          title: "Products",
          links: [
            { label: "Rio", href: "/products/rio" },
            { label: "Release Notes", href: "/products/rio" },
          ],
        },
        {
          title: "API Platform",
          links: [
            { label: "Overview", href: "/developers" },
            { label: "API Log In", href: "/developers", external: true },
            { label: "Docs", href: "/developers", external: true },
            { label: "SDKs", href: "/developers" },
          ],
        },
        {
          title: "Business",
          links: [
            { label: "Overview", href: "/solutions" },
            { label: "Solutions", href: "/solutions" },
            { label: "Resources", href: "/solutions" },
            { label: "Customer Stories", href: "/customers" },
            { label: "Partner Network", href: "/company" },
            { label: "Contact Sales", href: "/company/contact" },
          ],
        },
        {
          title: "Developers",
          links: [
            { label: "Apps SDK", href: "/developers" },
            { label: "Open Models", href: "/developers" },
            { label: "Docs", href: "/developers", external: true },
            { label: "Resources", href: "/developers", external: true },
            { label: "Developer Forum", href: "https://github.com/gytev", external: true },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About Us", href: "/company/about" },
            { label: "Our Charter", href: "/company/vision" },
            { label: "Careers", href: "/company/careers" },
            { label: "News", href: "/blog" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "/developers" },
            { label: "Status", href: "/developers/status" },
          ],
        },
        {
          title: "More",
          links: [
            { label: "Stories", href: "/blog" },
            { label: "Academy", href: "/blog" },
            { label: "Podcast", href: "https://youtube.com/@gytev", external: true },
            { label: "RSS", href: "https://x.com/gytev", external: true },
          ],
        },
        {
          title: "Terms & Policies",
          links: [
            { label: "Terms of Use", href: "/legal/terms" },
            { label: "Privacy Policy", href: "/legal/privacy" },
            { label: "Other Policies", href: "/legal/privacy" },
          ],
        },
      ],
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
        columns: [
          {
            title: "Explorer la recherche",
            links: [
              { label: "Publications", href: "/research" },
              { label: "Open source", href: "/developers" },
              { label: "Actualités recherche", href: "/blog" },
            ],
          },
          {
            title: "Domaines",
            links: [
              { label: "Langage & IA", href: "/research" },
              { label: "Jumeaux numériques", href: "/research" },
              { label: "Systèmes prédictifs", href: "/research" },
            ],
          },
          {
            title: "À la une",
            links: [
              { label: "IA Rio", href: "/products/rio/ai" },
              { label: "RedQ", href: "/solutions/redq" },
              { label: "Clients", href: "/customers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Recherche",
          title: "Langage & IA",
          description: "Modèles et systèmes qui comprennent le contexte.",
          href: "/research",
        },
      },
      products: {
        label: "Produits",
        columns: [
          {
            title: "Explorer les produits",
            links: [
              { label: "Rio", href: "/products/rio" },
              { label: "Box Rio", href: "/products/rio/box" },
              { label: "IA Rio", href: "/products/rio/ai" },
              { label: "Plateforme", href: "/products/rio/platform" },
            ],
          },
          {
            title: "Plateforme",
            links: [
              { label: "Applications web", href: "/products/rio/platform" },
              { label: "Applications mobiles", href: "/products/rio/platform" },
              { label: "API & SDK", href: "/developers" },
            ],
          },
          {
            title: "Commencer",
            links: [
              { label: "Installer le SDK", href: "/developers" },
              { label: "Clés API", href: "/developers" },
              { label: "Support", href: "/developers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Produit",
          title: "Rio",
          description: "Jumeau numérique des exploitations. IoT + IA.",
          href: "/products/rio",
        },
      },
      solutions: {
        label: "Solutions",
        columns: [
          {
            title: "Explorer les solutions",
            links: [
              { label: "RedQ", href: "/solutions/redq" },
              { label: "Pour l'agriculture", href: "/solutions/agriculture" },
              { label: "Pour la santé publique", href: "/solutions/public-health" },
              { label: "Pour les gouvernements", href: "/solutions/government" },
            ],
          },
          {
            title: "RedQ",
            links: [
              { label: "Gestion des donneurs", href: "/solutions/redq" },
              { label: "Réseau hospitalier", href: "/solutions/redq" },
            ],
          },
          {
            title: "Secteurs",
            links: [
              { label: "Agriculture", href: "/solutions/agriculture" },
              { label: "Santé", href: "/solutions/public-health" },
              { label: "Services publics", href: "/solutions/government" },
              { label: "Clients", href: "/customers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Solution",
          title: "RedQ",
          description: "Gestion nationale des dons et des poches de sang.",
          href: "/solutions/redq",
        },
      },
      developers: {
        label: "Développeurs",
        columns: [
          {
            title: "Explorer",
            links: [
              { label: "Référence API", href: "/developers" },
              { label: "SDK", href: "/developers" },
              { label: "Statut", href: "/developers/status" },
              { label: "Open source", href: "/developers" },
            ],
          },
          {
            title: "Documentation",
            links: [
              { label: "API REST", href: "/developers" },
              { label: "GraphQL", href: "/developers" },
              { label: "Journal des modifications", href: "/developers" },
            ],
          },
          {
            title: "Outils",
            links: [
              { label: "CLI", href: "/developers" },
              { label: "Webhooks", href: "/developers" },
              { label: "Sandbox", href: "/developers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Développeurs",
          title: "Construire sur Gytev",
          description: "API REST et GraphQL pour votre stack.",
          href: "/developers",
        },
      },
      company: {
        label: "Entreprise",
        columns: [
          {
            title: "Explorer l'entreprise",
            links: [
              { label: "À propos", href: "/company/about" },
              { label: "Vision", href: "/company/vision" },
              { label: "Carrières", href: "/company/careers" },
              { label: "Contact", href: "/company/contact" },
            ],
          },
          {
            title: "Actualités",
            links: [
              { label: "Blog", href: "/blog" },
              { label: "Clients", href: "/customers" },
              { label: "Presse", href: "/blog" },
            ],
          },
          {
            title: "Carrières",
            links: [
              { label: "Postes ouverts", href: "/company/careers" },
              { label: "Stages", href: "/company/careers" },
              { label: "Avantages", href: "/company/careers" },
            ],
          },
        ],
        visual: {
          eyebrow: "Entreprise",
          title: "Notre vision",
          description: "La thèse technologique sur 20 ans.",
          href: "/company/vision",
        },
      },
    },
    header: {
      login: "Se connecter",
      cta: "Commencer",
      menu: "Ouvrir le menu",
      close: "Fermer le menu",
      search: "Rechercher",
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
      manageCookies: "Gérer les cookies",
      big: "Gytev",
      bigAccent: "Home",
      columns: [
        {
          title: "Recherche",
          links: [
            { label: "Index de la recherche", href: "/research" },
            { label: "Vue d'ensemble", href: "/research" },
            { label: "Recherche économique", href: "/research" },
            { label: "Dernières avancées", href: "/research" },
            { label: "Modèles ouverts", href: "/research" },
          ],
        },
        {
          title: "Sécurité",
          links: [
            { label: "Approche de la sécurité", href: "/research" },
            { label: "Sécurité du déploiement", href: "/research", external: true },
            { label: "Sécurité & confidentialité", href: "/research" },
            { label: "Confiance & transparence", href: "/research" },
          ],
        },
        {
          title: "Produits",
          links: [
            { label: "Rio", href: "/products/rio" },
            { label: "Notes de version", href: "/products/rio" },
          ],
        },
        {
          title: "Plateforme API",
          links: [
            { label: "Vue d'ensemble", href: "/developers" },
            { label: "Connexion API", href: "/developers", external: true },
            { label: "Docs", href: "/developers", external: true },
            { label: "SDK", href: "/developers" },
          ],
        },
        {
          title: "Entreprises",
          links: [
            { label: "Vue d'ensemble", href: "/solutions" },
            { label: "Solutions", href: "/solutions" },
            { label: "Ressources", href: "/solutions" },
            { label: "Témoignages clients", href: "/customers" },
            { label: "Réseau de partenaires", href: "/company" },
            { label: "Contacter les ventes", href: "/company/contact" },
          ],
        },
        {
          title: "Développeurs",
          links: [
            { label: "SDK applicatifs", href: "/developers" },
            { label: "Modèles ouverts", href: "/developers" },
            { label: "Docs", href: "/developers", external: true },
            { label: "Ressources", href: "/developers", external: true },
            { label: "Forum développeurs", href: "https://github.com/gytev", external: true },
          ],
        },
        {
          title: "Entreprise",
          links: [
            { label: "À propos", href: "/company/about" },
            { label: "Notre charte", href: "/company/vision" },
            { label: "Carrières", href: "/company/careers" },
            { label: "Actualités", href: "/blog" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Centre d'aide", href: "/developers" },
            { label: "Statut", href: "/developers/status" },
          ],
        },
        {
          title: "Plus",
          links: [
            { label: "Histoires", href: "/blog" },
            { label: "Académie", href: "/blog" },
            { label: "Podcast", href: "https://youtube.com/@gytev", external: true },
            { label: "RSS", href: "https://x.com/gytev", external: true },
          ],
        },
        {
          title: "Conditions & politiques",
          links: [
            { label: "Conditions d'utilisation", href: "/legal/terms" },
            { label: "Politique de confidentialité", href: "/legal/privacy" },
            { label: "Autres politiques", href: "/legal/privacy" },
          ],
        },
      ],
    },
  },
};
