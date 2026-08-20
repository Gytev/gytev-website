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
    caption: string;
  };
  centralQuestion: {
    title: string;
    subtitle: string;
    cta: string;
    nodes: { first: string; second: string }[];
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
  search: {
    placeholder: string;
    close: string;
    empty: string;
    noResults: string;
  };
    home: {
      cases: {
        heading: string;
        badge: string;
        learnMore: string;
        viewAll: string;
        prev: string;
        next: string;
        items: { company: string; badge: string; title: string; image: string }[];
      };
    trusted: {
      title: string;
      subtitle: string;
      label: string;
      companies: { name: string; sector: string }[];
    };
    why: {
      eyebrow: string;
      heading: string;
      description: string;
      action: string;
      railLabel: string;
      switcherLabel: string;
      items: {
        title: string;
        tagline: string;
        description: string;
        tags: string[];
        panelType: "observe" | "understand" | "predict" | "act";
        panel: { label: string; lines: string[] };
      }[];
    };
    products: {
      eyebrow: string;
      title: string;
      description: string;
      tabs: {
        id: string;
        label: string;
        heading: string;
        description: string;
        features: { title: string; description: string }[];
        preview: { label: string; heading: string; alert: string; lines: string[] };
      }[];
    };
    journey: {
      eyebrow: string;
    };
  };
  pages: {
    products: { title: string; description: string; cta: string };
    solutions: { title: string; description: string; cta: string };
    research: { title: string; description: string };
    developers: { title: string; description: string };
    blog: { title: string; description: string };
    customers: { title: string; description: string };
    company: { title: string; description: string };
    rio: { contactSales: string; devDocs: string };
    redq: { contactUs: string; pillars: { title: string; description: string }[] };
    vision: {
      eyebrow: string;
      heading: string;
      subtitle: string;
      discover: string;
      loopHeading: string;
      loopDescription: string;
      thesis: { title: string; paragraphs: string[] };
      architectureHeading: string;
      architecture: {
        title: string;
        description: string;
        features: string[];
      }[];
      loop: { step: string; text: string }[];
    };
    companySections: {
      about: string;
      story: string;
      vision: string;
      newsroom: string;
      careers: string;
      contact: string;
    };
    companyDetail: {
      about: {
        kicker: string;
        title: string;
        heroTitle: string;
        body: string;
        timeline: { year: string; title: string; description: string; icon: string }[];
        teamHeading: string;
        teamDescription: string;
        team: { name: string; role: string; bio: string; image: string | null }[];
        partnersTitle: string;
        partners: string[];
        cta: { heading: string; description: string; primary: string; secondary: string };
      };
      careers: {
        kicker: string;
        title: string;
        body: string;
        heroTitle: string;
        valuesHeading: string;
        values: { title: string; description: string }[];
        rolesHeading: string;
        rolesEmpty: string;
        departments: {
          name: string;
          openings: { title: string; location: string; type: string }[];
        }[];
      };
      contact: {
        kicker: string;
        title: string;
        note: string;
        heroTitle: string;
        officesHeading: string;
        offices: { city: string; address: string; country: string }[];
        inquiriesHeading: string;
        inquiries: { title: string; email: string; description: string }[];
        form: {
          heading: string;
          name: string;
          email: string;
          message: string;
          submit: string;
        };
      };
      press: {
        kicker: string;
        title: string;
        heroTitle: string;
        body: string;
        articles: { title: string; source: string; date: string; excerpt: string; tag: string }[];
      };
      internships: {
        kicker: string;
        title: string;
        heroTitle: string;
        body: string;
        departments: {
          name: string;
          openings: { title: string; location: string; type: string; description: string }[];
        }[];
      };
      benefits: {
        kicker: string;
        title: string;
        heroTitle: string;
        body: string;
        benefits: { title: string; description: string }[];
      };
    };
  };
  footer: {
    tagline: string;
    rights: string;
    manageCookies: string;
    groups: {
      columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[];
    }[];
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Gytev | Intelligent systems that understand the real world.",
      description:
        "Gytev builds intelligent systems that observe, understand, predict and act on the real world. From farms to blood banks, we combine sensors, data, AI and domain knowledge to make complex systems understandable and actionable.",
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
              { label: "Research news", href: "/company/blog" },
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
              { label: "Rio", href: "/products/rio" },
              { label: "RedQ", href: "/solutions/redq" },
              { label: "Customers", href: "/company/customers" },
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
              { label: "RedQ", href: "/solutions/redq" },
              { label: "All products", href: "/products" },
            ],
          },
          {
            title: "Platform",
            links: [
              { label: "Web apps", href: "/products" },
              { label: "Mobile", href: "/products" },
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
              { label: "Agriculture", href: "/solutions" },
              { label: "Public health", href: "/solutions" },
              { label: "Customers", href: "/company/customers" },
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
              { label: "Farming", href: "/solutions" },
              { label: "Healthcare", href: "/solutions" },
              { label: "Civil service", href: "/solutions" },
              { label: "Customers", href: "/company/customers" },
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
              { label: "Blog", href: "/company/blog" },
              { label: "Customers", href: "/company/customers" },
              { label: "Press", href: "/company/press" },
            ],
          },
          {
            title: "Careers",
            links: [
              { label: "Open roles", href: "/company/careers" },
              { label: "Internships", href: "/company/internships" },
              { label: "Benefits", href: "/company/benefits" },
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
      eyebrow: "GYTEV · INTELLIGENCE SYSTEMS",
      title: "Intelligent systems that understand",
      highlight: "the real world.",
      description:
        "We combine sensors, data, artificial intelligence and domain knowledge to observe, understand, predict and act on the systems that surround us  farms, blood banks, cities, industries.",
      ctaPrimary: "Discover Rio",
      ctaSecondary: "Read the vision",
      caption: "Adaptive reasoning, in motion",
    },
    centralQuestion: {
      title: "How AI can break the global economy?",
      subtitle:
        "See how intelligent systems are rewiring every sector at once from the farm to the factory floor.",
      cta: "Read the vision",
      nodes: [
        { first: "How will AI", second: "feed the world?" },
        { first: "How will AI", second: "move the world?" },
        { first: "How will AI", second: "heal the world?" },
        { first: "How will AI", second: "move money?" },
        { first: "How will AI", second: "power the world?" },
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
    search: {
      placeholder: "Search the site…",
      close: "Close search",
      empty: "Type to search the site.",
      noResults: "No results for “{query}”.",
    },
    home: {
      cases: {
        heading: "Built with our customers",
        badge: "CUSTOMER STORY",
        learnMore: "Read the story",
        viewAll: "All customers",
        prev: "Previous story",
        next: "Next story",
        items: [
          { company: "Green Ground", badge: "AGRICULTURE", title: "Farmers boots productivity with Gytev.", image: "/images/figma/agri.jpg" },
          { company: "Hospitality Corp", badge: "PUBLIC HEALTH", title: "Hospitality Corp improves patient outcomes with Gytev.", image: "/images/figma/blood.jpg" },
          { company: "Corporates", badge: "ENTERPRISE", title: "Intelligence that moves critical teams forward.", image: "/images/figma/projecttrack.webp" },
        ],
      },
      trusted: {
        title: "Built for Africa.",
        subtitle: "Built for the world.",
        label: "Trusted by teams across the continent",
        companies: [
          { name: "Coopérative du Sahel", sector: "Agritech" },
          { name: "Banque de Sang de Dakar", sector: "Health" },
          { name: "Mwamba Telecom", sector: "Telecom" },
          { name: "Nyota Logistics", sector: "Logistics" },
          { name: "Umoja Bank", sector: "Banking" },
          { name: "Casamance Foods", sector: "Agro-food" },
          { name: "Kudu Energy", sector: "Energy" },
          { name: "Zahra Health", sector: "Telemedicine" },
        ],
      },
      why: {
        eyebrow: "Why Gytev",
        heading: "One intelligence loop.",
        description:
          "Every Gytev system follows the same loop: observe the field, understand it, predict what happens next, and act on a clear recommendation.",
        action: "Explore Rio",
        railLabel: "Capabilities",
        switcherLabel: "Switch capability",
        items: [
          {
            title: "Observe.",
            tagline: "Sense the field",
            description:
              "The Rio Box collects soil moisture, temperature, humidity, light and rainfall, continuously.",
            tags: ["SOIL MOISTURE", "TEMPERATURE", "AIR HUMIDITY", "RAINFALL", "LIGHT"],
            panelType: "observe",
            panel: {
              label: "Rio Box · live readout",
              lines: ["Soil moisture · 22%", "Air temperature · 31°C", "Rainfall today · 0 mm", "Light · 84 klx"],
            },
          },
          {
            title: "Understand.",
            tagline: "Turn data into insight",
            description:
              "AI combines field history, weather, satellite data and agronomic knowledge to explain what is happening and why.",
            tags: ["ANOMALY DETECTION", "CROP STAGES", "AGROCLIMATIC ANALYSIS"],
            panelType: "understand",
            panel: {
              label: "AI analysis",
              lines: ["Maize · flowering stage", "Soil moisture dropping 5 days", "Cause · no rain + heat", "Confidence · 91%"],
            },
          },
          {
            title: "Predict.",
            tagline: "Anticipate risks",
            description:
              "Water stress, diseases, yield loss. Rio forecasts risks days and weeks ahead, crop by crop.",
            tags: ["WATER-STRESS RISK", "YIELD PREDICTION", "WEATHER FUSION"],
            panelType: "predict",
            panel: {
              label: "7-day forecast",
              lines: ["Water stress · high", "Disease pressure · low", "Yield impact · ~18%", "Next rain · in 7 days"],
            },
          },
          {
            title: "Act.",
            tagline: "Recommend the right decision",
            description:
              "Irrigation within 24 hours, fertilizer adjustment, harvest timing. Clear recommendations, in your language.",
            tags: ["IRRIGATION ALERTS", "DECISION SUPPORT", "WEB & MOBILE"],
            panelType: "act",
            panel: {
              label: "Recommended action",
              lines: ["Irrigate within 24h", "Apply 20 mm over 2 passes", "Re-check soil in 3 days"],
            },
          },
        ],
      },
      products: {
        eyebrow: "Products & platform",
        title: "Intelligence that acts on the real world.",
        description:
          "From the Rio Box on the field to a national blood platform. Gytev turns complex real-world systems into systems you can understand, predict and act on.",
        tabs: [
          {
            id: "rio",
            label: "Rio",
            heading: "A digital twin of your farm.",
            description:
              "An IoT box senses the field, AI understands it, and the platform recommends the right decision — irrigation, fertilizer, harvest timing.",
            features: [
              { title: "Sense continuously", description: "Soil moisture, temperature, humidity, light and rainfall, sent automatically." },
              { title: "Understand with AI", description: "Field history, weather and satellite data, fused into one clear picture." },
              { title: "Act with confidence", description: "A clear recommendation for every question, in your language." },
            ],
            preview: {
              label: "Rio · Digital twin",
              heading: "Maize field — flowering stage",
              alert: "Irrigate within 24h",
              lines: ["Soil moisture dropping for 5 days", "No rain expected for 7 days", "Water-stress risk · high", "Yield impact if ignored · ~18%"],
            },
          },
          {
            id: "redq",
            label: "RedQ",
            heading: "A national blood network, in real time.",
            description:
              "From donor to hospital, every blood bag tracked type, group, status and expiry with shortages predicted, not endured.",
            features: [
              { title: "Trace every bag", description: "Donor, collection center, lab, bank and hospital in one system." },
              { title: "See the national stock", description: "Real-time visibility of available bags across the whole network." },
              { title: "Anticipate shortages", description: "Demand forecasting and redistribution before expiry." },
            ],
            preview: {
              label: "RedQ · National network",
              heading: "National stock overview",
              alert: "O+ shortage predicted in 12 days",
              lines: ["2 418 bags tracked", "14 hospitals connected", "3 short-expiry alerts"],
            },
          },
          {
            id: "platform",
            label: "Platform",
            heading: "Build intelligence for your world.",
            description:
              "The Gytev platform combines IoT, AI and domain knowledge so you can observe, understand, predict and act on any real-world system.",
            features: [
              { title: "Observe", description: "Connect sensors, machines, cameras, satellites and enterprise systems." },
              { title: "Reason", description: "Models trained to understand your context, in your language." },
              { title: "Act", description: "Alerts, dashboards and recommendations that reach the right people." },
            ],
            preview: {
              label: "Gytev platform",
              heading: "From sensing to action",
              alert: "Digital twin updated",
              lines: ["IoT + AI + domain knowledge", "Predict, optimize, decide", "Works in your language"],
            },
          },
        ],
      },
      journey: {
        eyebrow: "We are just getting started",
      },
    },
    pages: {
      products: {
        title: "Products",
        description: "Intelligent systems for the real world, starting with agriculture.",
        cta: "Explore",
      },
      solutions: {
        title: "Solutions",
        description: "Real-world systems that matter: agriculture and public health first.",
        cta: "Learn more",
      },
      research: {
        title: "Research",
        description: "The science behind Gytev. We publish openly and build for everyone.",
      },
      developers: {
        title: "Developers",
        description: "Build on Gytev with clean APIs, official SDKs and real documentation.",
      },
      blog: {
        title: "Blog",
        description: "News, engineering deep-dives and stories from the Gytev team.",
      },
      customers: {
        title: "Customers",
        description: "Organizations across Africa building on Gytev every day.",
      },
      company: {
        title: "Company",
        description: "Who we are, where we're going, and why.",
      },
      rio: {
        contactSales: "Contact sales",
        devDocs: "Developer docs",
      },
      redq: {
        contactUs: "Contact us",
        pillars: [
          { title: "Donors & donations", description: "Register donors, record every donation, from collection center to lab." },
          { title: "Traceability", description: "Every blood bag tracked: type, group, status, expiry, location." },
          { title: "National stock", description: "Real-time visibility of available bags across the whole network." },
          { title: "Demand & distribution", description: "Match hospital demand to supply, and redistribute before expiry." },
        ],
      },
      vision: {
        eyebrow: "The Technology Thesis",
        heading: "A nervous system for the physical world.",
        subtitle: "Software has eaten the digital world, but the physical world remains offline. We are building the infrastructure to make farms, blood banks, and industries readable by artificial intelligence.",
        discover: "Read the manifesto",
        loopHeading: "The Intelligence Loop",
        loopDescription: "Every Gytev system, whether an agricultural IoT box or a national healthcare platform, relies on a strict execution cycle.",
        thesis: {
          title: "The Thesis",
          paragraphs: [
            "For decades, the physical world has been a black box to software. We build dashboards based on manual inputs and delayed reports. When something fails—a crop dies, a blood supply runs out—we only know after the fact.",
            "Gytev believes the next major technological leap is not another digital app, but the deep integration of AI with physical reality. By deploying multimodal sensors directly in the field, we create a continuous stream of ground truth.",
            "But data alone is useless. Our models are trained to understand the specific physics, biology, and logistics of each environment. They fuse weather forecasts with soil moisture, or historical hospital demand with real-time blood inventory, to predict the future and prescribe the exact next action."
          ]
        },
        architectureHeading: "The Deeptech Stack",
        architecture: [
          {
            title: "1. Sensory Perception (Edge)",
            description: "Custom-designed IoT hardware running low-power models directly on the edge. Built to survive harsh environments, unstable power grids, and intermittent connectivity.",
            features: ["LoRaWAN & Cellular fallback", "Solar-powered autonomy", "On-device anomaly detection"]
          },
          {
            title: "2. Multimodal Synthesis",
            description: "Our backend ingests unstructured streams: time-series sensor data, satellite imagery, and human text inputs, aligning them into a single coherent 'Digital Twin'.",
            features: ["Spatiotemporal alignment", "Data imputation", "Real-time state graph"]
          },
          {
            title: "3. Prescriptive AI",
            description: "Beyond predicting risks, our domain-specific models evaluate thousands of possible interventions to recommend the optimal action with a calculated confidence score.",
            features: ["Causal inference models", "Reinforcement learning", "Explainable AI (XAI) outputs"]
          }
        ],
        loop: [
          { step: "Observe", text: "Sensors, IoT, cameras, satellites, machines, human inputs." },
          { step: "Understand", text: "Patterns, relationships, anomalies, trends, risks, context." },
          { step: "Predict", text: "What is likely to happen, when, and what could cause it." },
          { step: "Optimize", text: "Which action is most efficient, how to allocate resources." },
          { step: "Decide", text: "Given what we know, what should we do next?" },
          { step: "Act", text: "Recommendations, automation, alerts, resource allocation." },
          { step: "Learn", text: "Outcomes generate new data; new data improves the model." },
        ],
      },
      companySections: {
        about: "About",
        story: "Our story",
        vision: "Vision",
        newsroom: "Newsroom",
        careers: "Careers",
        contact: "Contact",
      },
      companyDetail: {
        about: {
          kicker: "Who we are",
          title: "About Gytev",
          heroTitle: "From observing to understanding the physical world.",
          body: "The story of a company building intelligence for the real world, from Africa.",
          timeline: [
            { year: "2023", title: "Founded in Dakar", description: "Gytev was created with the ambition to connect AI to the physical world.", icon: "⚪" },
            { year: "2024", title: "Rio Launch", description: "Deployment of the first digital twin for agriculture in Senegal and Burkina Faso.", icon: "🌾" },
            { year: "2025", title: "RedQ & Public Health", description: "Deployment of the blood donation management platform and strategic partnership with the state.", icon: "🩸" },
            { year: "2026", title: "Deeptech Expansion", description: "Integration of AI models on the edge for real-time perception with no latency.", icon: "⚡" }
          ],
          teamHeading: "Leadership team",
          teamDescription: "A combination of expertise in artificial intelligence, hardware engineering, and field operations.",
          team: [
            { name: "Amadou Fall", role: "Co-founder & CEO", bio: "Former engineering director, passionate about distributed systems infrastructure.", image: null },
            { name: "Sarah Ndiaye", role: "Co-founder & CTO", bio: "Expert in machine learning and digital twins for heavy industry.", image: null },
            { name: "Ousmane Diallo", role: "VP of Product", bio: "Focus on the raw utility of data in the real world. Leads the Rio suite.", image: null },
            { name: "Aïssatou Sow", role: "Head of Operations", bio: "Physical deployment of sensors, logistics, and government partnerships.", image: null }
          ],
          partnersTitle: "They rely on our intelligence",
          partners: ["Ministry of Agriculture", "World Bank", "Sahel Coop", "Dakar Tech Hub", "Health Initiative", "AgriData"],
          cta: {
            heading: "Ready to build with us?",
            description: "Whether you want to join the engineering team or deploy our solutions in your operations.",
            primary: "View careers",
            secondary: "Contact us"
          }
        },
        careers: {
          kicker: "Join us",
          title: "Careers at Gytev",
          heroTitle: "Build intelligence for the physical world.",
          body: "We're hiring engineers, researchers and operators who want to understand the real world. We are based in Dakar, but our problems are global.",
          valuesHeading: "How we build",
          values: [
            { title: "Field first", description: "Models fail when they haven't met reality. We build hardware to get ground truth, not just scrape the internet." },
            { title: "Radical clarity", description: "Complex systems require simple explanations. We communicate directly, without corporate jargon." },
            { title: "Built to last", description: "Our systems run in harsh environments: farms with no power grid, blood banks with failing infrastructure. We build for resilience." }
          ],
          rolesHeading: "Open roles",
          rolesEmpty: "No open roles at the moment, but we are always looking for exceptional talent. Reach out.",
          departments: [
            {
              name: "Engineering & AI",
              openings: [
                { title: "Senior ML Engineer, Time Series", location: "Dakar / Remote", type: "Full-time" },
                { title: "Embedded Systems Engineer (C/Rust)", location: "Dakar", type: "Full-time" },
                { title: "Frontend Engineer (React/WebGL)", location: "Remote (CET ±2)", type: "Full-time" }
              ]
            },
            {
              name: "Operations & Product",
              openings: [
                { title: "Deployment Lead (Agriculture)", location: "West Africa", type: "Full-time" },
                { title: "Product Manager (Data Platform)", location: "Dakar / Remote", type: "Full-time" }
              ]
            }
          ]
        },
        contact: {
          kicker: "Talk to us",
          title: "Contact Gytev",
          heroTitle: "Get in touch",
          note: "Tell us what you want to observe, understand or act on.",
          officesHeading: "Our Headquarters",
          offices: [
            { city: "Dakar", address: "Plateau, Dakar", country: "Senegal" }
          ],
          inquiriesHeading: "Direct Inquiries",
          inquiries: [
            { title: "Sales & Deployments", email: "sales@gytev.com", description: "To deploy Rio or RedQ in your organization." },
            { title: "Press & Media", email: "press@gytev.com", description: "For interviews, brand assets, and media inquiries." },
            { title: "General Support", email: "hello@gytev.com", description: "For anything else." }
          ],
          form: {
            heading: "Send us a message",
            name: "Your name",
            email: "Work email",
            message: "How can we help you?",
            submit: "Send message"
          }
        },
        press: {
          kicker: "Newsroom",
          title: "Press",
          heroTitle: "Gytev in the news.",
          body: "Press coverage, media mentions and company announcements.",
          articles: [
            { title: "Gytev raises $2M seed to build Africa's intelligence layer", source: "TechCrunch", date: "March 2025", excerpt: "The Dakar-based deeptech startup plans to scale its IoT platform for agriculture and healthcare across West Africa.", tag: "Funding" },
            { title: "Rio launches in the Sahel region", source: "African Business", date: "June 2025", excerpt: "Digital twins for agriculture reach smallholder farmers in Senegal and Burkina Faso, with real-time irrigation recommendations.", tag: "Product" },
            { title: "Senegal's blood bank goes digital with RedQ", source: "WHO News", date: "January 2026", excerpt: "A national platform for managing blood donations and blood bags brings full traceability from donor to hospital.", tag: "Impact" },
          ],
        },
        internships: {
          kicker: "Grow with us",
          title: "Internships",
          heroTitle: "Start your career in deeptech.",
          body: "Internships at Gytev are hands-on. You will ship real code, deploy real hardware, or solve real operational problems — not fetch coffee.",
          departments: [
            {
              name: "Engineering & AI",
              openings: [
                { title: "ML Engineer Intern", location: "Dakar / Remote", type: "6 months", description: "Work on time-series models for agricultural prediction. You will train, evaluate, and deploy models that run in production." },
                { title: "Embedded Systems Intern", location: "Dakar", type: "6 months", description: "Contribute to the firmware of our IoT boxes. C/Rust, low-power computing, sensor integration." },
              ],
            },
            {
              name: "Operations & Product",
              openings: [
                { title: "Product Design Intern", location: "Dakar", type: "4 months", description: "Help design the interfaces that farmers and hospital staff use every day. Research, prototyping, user testing." },
                { title: "Field Operations Intern", location: "West Africa", type: "4 months", description: "Join deployment teams in the field. Install sensors, collect feedback, and help us understand real-world constraints." },
              ],
            },
          ],
        },
        benefits: {
          kicker: "Why Gytev",
          title: "Benefits",
          heroTitle: "What we offer.",
          body: "We believe great work comes from people who are supported, trusted and fairly compensated.",
          benefits: [
            { title: "Real impact", description: "Your work reaches farmers and hospitals within months, not years." },
            { title: "Flexible work", description: "Remote-first with offices in Dakar. Work where you are most effective." },
            { title: "Learning budget", description: "Annual budget for conferences, courses, and books. We invest in your growth." },
            { title: "Equity", description: "All team members receive equity. When Gytev grows, everyone grows." },
            { title: "Health coverage", description: "Comprehensive health insurance for you and your family." },
            { title: "Relocation support", description: "We help you move to Dakar with a relocation package." },
          ],
        },
      },
    },
    footer: {
      tagline: "We build intelligence for the real world.",
      rights: "All rights reserved.",
      manageCookies: "Manage Cookies",
      groups: [
        {
          columns: [
            {
              title: "Research",
              links: [
                { label: "Research Overview", href: "/research" },
                { label: "Publications", href: "/research" },
                { label: "Open source", href: "/developers" },
                { label: "Research news", href: "/company/blog" },
              ],
            },
            {
              title: "Latest Advancements",
              links: [
                { label: "Rio", href: "/products/rio" },
                { label: "RedQ", href: "/solutions/redq" },
                { label: "Predictive Systems", href: "/research" },
                { label: "Digital Twins", href: "/research" },
              ],
            },
            {
              title: "Safety",
              links: [
                { label: "Safety Approach", href: "/research" },
                { label: "Deployment Safety", href: "/research" },
                { label: "Security & Privacy", href: "/company/vision" },
                { label: "Trust & Transparency", href: "/company/vision" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Products",
              links: [
                { label: "Rio", href: "/products/rio" },
                { label: "RedQ", href: "/solutions/redq" },
                { label: "All products", href: "/products" },
              ],
            },
            {
              title: "API Platform",
              links: [
                { label: "Overview", href: "/developers" },
                { label: "APIs & SDKs", href: "/developers" },
                { label: "API keys", href: "/developers" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Business",
              links: [
                { label: "Solutions", href: "/solutions" },
                { label: "Agriculture", href: "/solutions" },
                { label: "Public health", href: "/solutions" },
                { label: "Customer Stories", href: "/company/customers" },
                { label: "Contact Sales", href: "/company/contact" },
              ],
            },
            {
              title: "Developers",
              links: [
                { label: "Overview", href: "/developers" },
                { label: "SDKs", href: "/developers" },
                { label: "GitHub", href: "https://github.com/gytev", external: true },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Company",
              links: [
                { label: "About Us", href: "/company/about" },
                { label: "Our Vision", href: "/company/vision" },
                { label: "Careers", href: "/company/careers" },
                { label: "Blog", href: "/company/blog" },
                { label: "Press", href: "/company/press" },
                { label: "Contact", href: "/company/contact" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Help Center", href: "/developers" },
                { label: "Contact", href: "/company/contact" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "More",
              links: [
                { label: "Blog", href: "/company/blog" },
                { label: "Careers", href: "/company/careers" },
                { label: "Developers", href: "/developers" },
              ],
            },
            {
              title: "Terms & Policies",
              links: [
                { label: "Terms of Use", href: "/company/vision" },
                { label: "Privacy Policy", href: "/company/vision" },
              ],
            },
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
              { label: "Actualités recherche", href: "/company/blog" },
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
              { label: "IA Rio", href: "/products/rio" },
              { label: "RedQ", href: "/solutions/redq" },
              { label: "Clients", href: "/company/customers" },
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
              { label: "RedQ", href: "/solutions/redq" },
              { label: "Tous les produits", href: "/products" },
            ],
          },
          {
            title: "Plateforme",
            links: [
              { label: "Applications web", href: "/products" },
              { label: "Applications mobiles", href: "/products" },
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
              { label: "Agriculture", href: "/solutions" },
              { label: "Santé publique", href: "/solutions" },
              { label: "Clients", href: "/company/customers" },
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
              { label: "Agriculture", href: "/solutions" },
              { label: "Santé", href: "/solutions" },
              { label: "Services publics", href: "/solutions" },
              { label: "Clients", href: "/company/customers" },
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
              { label: "Blog", href: "/company/blog" },
              { label: "Clients", href: "/company/customers" },
              { label: "Presse", href: "/company/press" },
            ],
          },
          {
            title: "Carrières",
            links: [
              { label: "Postes ouverts", href: "/company/careers" },
              { label: "Stages", href: "/company/internships" },
              { label: "Avantages", href: "/company/benefits" },
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
      eyebrow: "GYTEV · SYSTÈMES D'INTELLIGENCE",
      title: "Des systèmes intelligents qui comprennent",
      highlight: "le monde réel.",
      description:
        "Nous combinons capteurs, données, intelligence artificielle et connaissance des métiers pour observer, comprendre, prédire et agir sur les systèmes qui nous entourent — exploitations, banques de sang, villes, industries.",
      ctaPrimary: "Découvrir Rio",
      ctaSecondary: "Lire la vision",
      caption: "Un raisonnement adaptatif, en mouvement",
    },
    centralQuestion: {
      title: "Comment l'IA peut bouleverser l'économie mondiale ?",
      subtitle:
        "Découvrez comment les systèmes intelligents transforment simultanément tous les secteurs, de la ferme à l'usine.",
      cta: "Lire la vision",
      nodes: [
        { first: "Comment l'IA", second: "nourrira le monde ?" },
        { first: "Comment l'IA", second: "déplacera le monde ?" },
        { first: "Comment l'IA", second: "soignera le monde ?" },
        { first: "Comment l'IA", second: "déplacera l'argent ?" },
        { first: "Comment l'IA", second: "alimentera le monde ?" },
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
    search: {
      placeholder: "Rechercher sur le site…",
      close: "Fermer la recherche",
      empty: "Saisissez du texte pour rechercher sur le site.",
      noResults: "Aucun résultat pour « {query} ».",
    },
    home: {
      cases: {
        heading: "Construit avec nos clients",
        badge: "RÉCIT CLIENT",
        learnMore: "Lire le récit",
        viewAll: "Tous les clients",
        prev: "Récit précédent",
        next: "Récit suivant",
        items: [
          { company: "Green Ground", badge: "AGRICULTURE", title: "Les agriculteurs augmentent leur productivité avec Gytev.", image: "/images/figma/agri.jpg" },
          { company: "Hospitality Corp", badge: "SANTÉ PUBLIQUE", title: "Hospitality Corp améliore les résultats patients avec Gytev.", image: "/images/figma/blood.jpg" },
          { company: "Corporates", badge: "ENTREPRISE", title: "L'intelligence qui fait avancer les équipes clés.", image: "/images/figma/projecttrack.webp" },
        ],
      },
      trusted: {
        title: "Conçu pour l'Afrique.",
        subtitle: "Conçu pour le monde.",
        label: "Ils nous font confiance sur tout le continent",
        companies: [
          { name: "Coopérative du Sahel", sector: "Agritech" },
          { name: "Banque de Sang de Dakar", sector: "Santé" },
          { name: "Mwamba Telecom", sector: "Télécom" },
          { name: "Nyota Logistics", sector: "Logistique" },
          { name: "Umoja Bank", sector: "Banque" },
          { name: "Casamance Foods", sector: "Agroalimentaire" },
          { name: "Kudu Energy", sector: "Énergie" },
          { name: "Zahra Health", sector: "Télémédecine" },
        ],
      },
      why: {
        eyebrow: "Pourquoi Gytev",
        heading: "Une seule boucle d'intelligence.",
        description:
          "Chaque système Gytev suit la même boucle : observer le terrain, le comprendre, prédire la suite, puis agir sur une recommandation claire.",
        action: "Explorer Rio",
        railLabel: "Capacités",
        switcherLabel: "Changer de capacité",
        items: [
          {
            title: "Observer.",
            tagline: "Capter le terrain",
            description:
              "Le Rio Box collecte en continu l'humidité du sol, la température, l'humidité de l'air, la lumière et les pluies.",
            tags: ["HUMIDITÉ DU SOL", "TEMPÉRATURE", "HUMIDITÉ DE L'AIR", "PLUIES", "LUMIÈRE"],
            panelType: "observe",
            panel: {
              label: "Rio Box · lecture en direct",
              lines: ["Humidité du sol · 22 %", "Température de l'air · 31 °C", "Pluie aujourd'hui · 0 mm", "Lumière · 84 klx"],
            },
          },
          {
            title: "Comprendre.",
            tagline: "Transformer les données en insights",
            description:
              "L'IA combine l'historique de la parcelle, la météo, les données satellite et la connaissance agronomique pour expliquer ce qui se passe et pourquoi.",
            tags: ["DÉTECTION D'ANOMALIES", "STADES DE CULTURE", "ANALYSE AGROCLIMATIQUE"],
            panelType: "understand",
            panel: {
              label: "Analyse IA",
              lines: ["Maïs · stade floraison", "Humidité du sol en baisse 5 jours", "Cause · pas de pluie + chaleur", "Confiance · 91 %"],
            },
          },
          {
            title: "Prédire.",
            tagline: "Anticiper les risques",
            description:
              "Stress hydrique, maladies, perte de rendement. Rio prévoit les risques des jours et des semaines à l'avance, culture par culture.",
            tags: ["RISQUE DE STRESS HYDRIQUE", "PRÉVISION DE RENDEMENT", "FUSION MÉTÉO"],
            panelType: "predict",
            panel: {
              label: "Prévision à 7 jours",
              lines: ["Stress hydrique · élevé", "Pression des maladies · faible", "Impact sur le rendement · ~18 %", "Prochaine pluie · dans 7 jours"],
            },
          },
          {
            title: "Agir.",
            tagline: "Recommander la bonne décision",
            description:
              "Irriguer sous 24 heures, ajuster l'engrais, choisir le moment de la récolte. Des recommandations claires, dans votre langue.",
            tags: ["ALERTES D'IRRIGATION", "AIDE À LA DÉCISION", "WEB & MOBILE"],
            panelType: "act",
            panel: {
              label: "Action recommandée",
              lines: ["Irriguer sous 24 h", "Apporter 20 mm en 2 passages", "Re-vérifier le sol dans 3 jours"],
            },
          },
        ],
      },
      products: {
        eyebrow: "Produits & plateforme",
        title: "Une intelligence qui agit sur le monde réel.",
        description:
          "Du Rio Box au champ jusqu'à une plateforme sanguine nationale — Gytev transforme les systèmes complexes du monde réel en systèmes que l'on peut comprendre, prédire et piloter.",
        tabs: [
          {
            id: "rio",
            label: "Rio",
            heading: "Un jumeau numérique de votre exploitation.",
            description:
              "Un boîtier IoT capte le champ, l'IA le comprend, et la plateforme recommande la bonne décision — irrigation, engrais, moment de la récolte.",
            features: [
              { title: "Capter en continu", description: "Humidité du sol, température, humidité de l'air, lumière et pluies, envoyées automatiquement." },
              { title: "Comprendre avec l'IA", description: "Historique de la parcelle, météo et données satellite, fusionnés en une image claire." },
              { title: "Agir avec confiance", description: "Une recommandation claire pour chaque question, dans votre langue." },
            ],
            preview: {
              label: "Rio · Jumeau numérique",
              heading: "Parcelle de maïs — stade floraison",
              alert: "Irriguer sous 24 h",
              lines: ["Humidité du sol en baisse depuis 5 jours", "Aucune pluie attendue dans 7 jours", "Risque de stress hydrique · élevé", "Impact sur le rendement si ignoré · ~18 %"],
            },
          },
          {
            id: "redq",
            label: "RedQ",
            heading: "Un réseau sanguin national, en temps réel.",
            description:
              "Du donneur à l'hôpital, chaque poche de sang est tracée — type, groupe, statut et péremption — avec des pénuries prédites, pas subies.",
            features: [
              { title: "Tracer chaque poche", description: "Donneur, centre de collecte, laboratoire, banque et hôpital dans un seul système." },
              { title: "Voir le stock national", description: "Visibilité en temps réel des poches disponibles sur tout le réseau." },
              { title: "Anticiper les pénuries", description: "Prévision de la demande et redistribution avant la péremption." },
            ],
            preview: {
              label: "RedQ · Réseau national",
              heading: "Vue du stock national",
              alert: "Pénurie O+ prévue dans 12 jours",
              lines: ["2 418 poches tracées", "14 hôpitaux connectés", "3 alertes de péremption proche"],
            },
          },
          {
            id: "platform",
            label: "Plateforme",
            heading: "Construisez l'intelligence de votre monde.",
            description:
              "La plateforme Gytev combine IoT, IA et connaissance des métiers pour observer, comprendre, prédire et agir sur n'importe quel système réel.",
            features: [
              { title: "Observer", description: "Connectez capteurs, machines, caméras, satellites et systèmes d'entreprise." },
              { title: "Raisonner", description: "Des modèles entraînés pour comprendre votre contexte, dans votre langue." },
              { title: "Agir", description: "Alertes, tableaux de bord et recommandations qui atteignent les bonnes personnes." },
            ],
            preview: {
              label: "Plateforme Gytev",
              heading: "De la détection à l'action",
              alert: "Jumeau numérique mis à jour",
              lines: ["IoT + IA + connaissance métier", "Prédire, optimiser, décider", "Fonctionne dans votre langue"],
            },
          },
        ],
      },
      journey: {
        eyebrow: "Nous ne faisons que commencer",
      },
    },
    pages: {
      products: {
        title: "Produits",
        description: "Des systèmes intelligents pour le monde réel, à commencer par l'agriculture.",
        cta: "Explorer",
      },
      solutions: {
        title: "Solutions",
        description: "Des systèmes réels qui comptent : l'agriculture et la santé publique d'abord.",
        cta: "En savoir plus",
      },
      research: {
        title: "Recherche",
        description: "La science derrière Gytev. Nous publions ouvertement et construisons pour tous.",
      },
      developers: {
        title: "Développeurs",
        description: "Construisez sur Gytev avec des API propres, des SDK officiels et une vraie documentation.",
      },
      blog: {
        title: "Blog",
        description: "Actualités, plongées techniques et récits de l'équipe Gytev.",
      },
      customers: {
        title: "Clients",
        description: "Des organisations à travers l'Afrique qui construisent chaque jour sur Gytev.",
      },
      company: {
        title: "Entreprise",
        description: "Qui nous sommes, où nous allons, et pourquoi.",
      },
      rio: {
        contactSales: "Contacter les ventes",
        devDocs: "Documentation développeurs",
      },
      redq: {
        contactUs: "Nous contacter",
        pillars: [
          { title: "Donneurs & dons", description: "Enregistrez les donneurs, tracez chaque don, du centre de collecte au laboratoire." },
          { title: "Traçabilité", description: "Chaque poche de sang est tracée : type, groupe, statut, péremption, lieu." },
          { title: "Stock national", description: "Visibilité en temps réel des poches disponibles sur tout le réseau." },
          { title: "Demande & distribution", description: "Faire correspondre la demande hospitalière à l'offre, et redistribuer avant péremption." },
        ],
      },
      vision: {
        eyebrow: "La Thèse Technologique",
        heading: "Un système nerveux pour le monde physique.",
        subtitle: "Le logiciel a dévoré le monde numérique, mais le monde physique reste déconnecté. Nous construisons l'infrastructure pour rendre l'agriculture, la santé et l'industrie lisibles par l'intelligence artificielle.",
        discover: "Lire le manifeste",
        loopHeading: "La Boucle d'Intelligence",
        loopDescription: "Chaque système Gytev, qu'il s'agisse d'un boîtier IoT ou d'une plateforme nationale, repose sur un cycle d'exécution strict.",
        thesis: {
          title: "La Thèse",
          paragraphs: [
            "Pendant des décennies, le monde physique a été une boîte noire pour les logiciels. Nous avons construit des tableaux de bord basés sur des saisies manuelles et des rapports différés. Lorsqu'une culture meurt ou qu'une réserve de sang s'épuise, nous ne le savons qu'après coup.",
            "Gytev est convaincu que le prochain grand saut technologique n'est pas une énième application, mais l'intégration profonde de l'IA à la réalité physique. En déployant des capteurs multimodaux directement sur le terrain, nous créons un flux continu de vérité terrain.",
            "Mais les données seules sont inutiles. Nos modèles sont entraînés pour comprendre la physique, la biologie et la logistique spécifiques de chaque environnement. Ils fusionnent les prévisions météo avec l'humidité du sol pour prédire l'avenir et prescrire l'action exacte à mener."
          ]
        },
        architectureHeading: "La Stack Deeptech",
        architecture: [
          {
            title: "1. Perception Sensorielle (Edge)",
            description: "Matériel IoT conçu sur mesure exécutant des modèles basse consommation directement à la périphérie. Conçu pour survivre aux environnements difficiles et aux réseaux électriques instables.",
            features: ["Réseau LoRaWAN & Cellulaire", "Autonomie solaire", "Détection d'anomalies embarquée"]
          },
          {
            title: "2. Synthèse Multimodale",
            description: "Notre backend ingère des flux non structurés : séries temporelles, imagerie satellite et textes, les alignant dans un 'Jumeau Numérique' cohérent.",
            features: ["Alignement spatio-temporel", "Imputation de données", "Graphe d'état en temps réel"]
          },
          {
            title: "3. IA Prescriptive",
            description: "Au-delà de la prédiction des risques, nos modèles évaluent des milliers d'interventions possibles pour recommander l'action optimale avec un score de confiance.",
            features: ["Modèles d'inférence causale", "Apprentissage par renforcement", "IA explicable (XAI)"]
          }
        ],
        loop: [
          { step: "Observer", text: "Capteurs, IoT, caméras, satellites, machines, saisies humaines." },
          { step: "Comprendre", text: "Motifs, relations, anomalies, tendances, risques, contexte." },
          { step: "Prédire", text: "Ce qui va probablement se passer, quand, et ce qui pourrait en être la cause." },
          { step: "Optimiser", text: "Quelle action est la plus efficace, comment allouer les ressources." },
          { step: "Décider", text: "Au vu de ce que nous savons, que devons-nous faire ensuite ?" },
          { step: "Agir", text: "Recommandations, automatisation, alertes, allocation des ressources." },
          { step: "Apprendre", text: "Les résultats génèrent des données ; les données améliorent le modèle." },
        ],
      },
      companySections: {
        about: "À propos",
        story: "Notre histoire",
        vision: "Vision",
        newsroom: "Salle de presse",
        careers: "Carrières",
        contact: "Contact",
      },
      companyDetail: {
        about: {
          kicker: "Qui nous sommes",
          title: "À propos de Gytev",
          heroTitle: "De l'observation à la compréhension du monde physique.",
          body: "L'histoire d'une entreprise qui construit l'intelligence pour le monde réel, depuis l'Afrique.",
          timeline: [
            { year: "2023", title: "Fondation à Dakar", description: "Création de Gytev avec l'ambition de connecter l'intelligence artificielle au monde physique.", icon: "⚪" },
            { year: "2024", title: "Lancement de Rio", description: "Déploiement du premier jumeau numérique pour l'agriculture au Sénégal et au Burkina Faso.", icon: "🌾" },
            { year: "2025", title: "RedQ & Santé Publique", description: "Déploiement de la plateforme de gestion des dons de sang et partenariat stratégique avec l'État.", icon: "🩸" },
            { year: "2026", title: "Expansion Deeptech", description: "Intégration de modèles d'IA sur le edge pour une perception en temps réel sans latence.", icon: "⚡" }
          ],
          teamHeading: "L'équipe dirigeante",
          teamDescription: "Une combinaison d'expertise en intelligence artificielle, ingénierie matérielle et opérations de terrain.",
          team: [
            { name: "Amadou Fall", role: "Co-fondateur & CEO", bio: "Ancien directeur d'ingénierie, passionné par l'infrastructure des systèmes distribués.", image: null },
            { name: "Sarah Ndiaye", role: "Co-fondatrice & CTO", bio: "Experte en apprentissage automatique et jumeaux numériques pour l'industrie lourde.", image: null },
            { name: "Ousmane Diallo", role: "VP of Product", bio: "Focus sur l'utilité brute des données dans le monde réel. Pilotage de la suite Rio.", image: null },
            { name: "Aïssatou Sow", role: "Head of Operations", bio: "Déploiement physique des capteurs, logistique et partenariats gouvernementaux.", image: null }
          ],
          partnersTitle: "Ils s'appuient sur notre intelligence",
          partners: ["Ministère de l'Agriculture", "Banque Mondiale", "Sahel Coop", "Dakar Tech Hub", "Initiative Santé", "AgriData"],
          cta: {
            heading: "Prêt à construire avec nous ?",
            description: "Que vous souhaitiez rejoindre l'équipe d'ingénierie ou déployer nos solutions dans vos opérations.",
            primary: "Voir les carrières",
            secondary: "Nous contacter"
          }
        },
        careers: {
          kicker: "Rejoignez-nous",
          title: "Carrières chez Gytev",
          heroTitle: "Construire l'intelligence du monde physique.",
          body: "Nous recrutons des ingénieurs, des chercheurs et des opérateurs qui veulent comprendre le monde réel. Nous sommes basés à Dakar, mais nos défis sont mondiaux.",
          valuesHeading: "Comment nous construisons",
          values: [
            { title: "Le terrain d'abord", description: "Les modèles échouent lorsqu'ils n'ont pas rencontré la réalité. Nous construisons du matériel pour obtenir la vérité terrain, pas seulement pour scrapper internet." },
            { title: "Clarté radicale", description: "Les systèmes complexes exigent des explications simples. Nous communiquons directement, sans jargon d'entreprise." },
            { title: "Conçu pour durer", description: "Nos systèmes fonctionnent dans des environnements difficiles : fermes sans réseau électrique, banques de sang aux infrastructures défaillantes. Nous construisons pour la résilience." }
          ],
          rolesHeading: "Postes ouverts",
          rolesEmpty: "Aucun poste ouvert pour le moment, mais nous recherchons toujours des talents exceptionnels. Contactez-nous.",
          departments: [
            {
              name: "Ingénierie & IA",
              openings: [
                { title: "Senior ML Engineer, Séries Temporelles", location: "Dakar / Remote", type: "Temps plein" },
                { title: "Ingénieur Systèmes Embarqués (C/Rust)", location: "Dakar", type: "Temps plein" },
                { title: "Ingénieur Frontend (React/WebGL)", location: "Remote (CET ±2)", type: "Temps plein" }
              ]
            },
            {
              name: "Opérations & Produit",
              openings: [
                { title: "Responsable Déploiement (Agriculture)", location: "Afrique de l'Ouest", type: "Temps plein" },
                { title: "Product Manager (Plateforme Data)", location: "Dakar / Remote", type: "Temps plein" }
              ]
            }
          ]
        },
        contact: {
          kicker: "Parlons-en",
          title: "Contacter Gytev",
          heroTitle: "Prendre contact",
          note: "Dites-nous ce que vous voulez observer, comprendre ou piloter.",
          officesHeading: "Notre Siège",
          offices: [
            { city: "Dakar", address: "Plateau, Dakar", country: "Sénégal" }
          ],
          inquiriesHeading: "Demandes directes",
          inquiries: [
            { title: "Ventes & Déploiements", email: "sales@gytev.com", description: "Pour déployer Rio ou RedQ dans votre organisation." },
            { title: "Presse & Médias", email: "press@gytev.com", description: "Pour les interviews, le kit de marque et les demandes médias." },
            { title: "Support général", email: "hello@gytev.com", description: "Pour toute autre question." }
          ],
          form: {
            heading: "Envoyez-nous un message",
            name: "Votre nom",
            email: "Email professionnel",
            message: "Comment pouvons-nous vous aider ?",
            submit: "Envoyer le message"
          }
        },
        press: {
          kicker: "Salle de presse",
          title: "Presse",
          heroTitle: "Gytev dans les médias.",
          body: "Couverture médiatique, mentions dans la presse et annonces de l'entreprise.",
          articles: [
            { title: "Gytev lève 2M$ pour construire la couche d'intelligence de l'Afrique", source: "TechCrunch", date: "Mars 2025", excerpt: "Le startup deeptech basé à Dakar prévoit de déployer sa plateforme IoT pour l'agriculture et la santé en Afrique de l'Ouest.", tag: "Financement" },
            { title: "Rio s'étend dans la région du Sahel", source: "African Business", date: "Juin 2025", excerpt: "Les jumeaux numériques pour l'agriculture arrivent chez les petits exploitants au Sénégal et au Burkina Faso.", tag: "Produit" },
            { title: "La banque du sang du Sénégal se digitalise avec RedQ", source: "OMS Info", date: "Janvier 2026", excerpt: "Une plateforme nationale de gestion des dons de sang apporte une traçabilité complète du donneur à l'hôpital.", tag: "Impact" },
          ],
        },
        internships: {
          kicker: "Grandissez avec nous",
          title: "Stages",
          heroTitle: "Commencez votre carrière en deeptech.",
          body: "Les stages chez Gytev sont concrets. Vous livrerez du vrai code, déployerez du vrai matériel ou résoudrez de vrais problèmes opérationnels — pas du café.",
          departments: [
            {
              name: "Ingénierie & IA",
              openings: [
                { title: "Stagiaire ML Engineer", location: "Dakar / Remote", type: "6 mois", description: "Travaillez sur des modèles de séries temporelles pour la prédiction agricole. Entraînement, évaluation et déploiement en production." },
                { title: "Stagiaire Systèmes Embarqués", location: "Dakar", type: "6 mois", description: "Contribuez au firmware de nos boîtiers IoT. C/Rust, informatique basse consommation, intégration de capteurs." },
              ],
            },
            {
              name: "Opérations & Produit",
              openings: [
                { title: "Stagiaire Design Produit", location: "Dakar", type: "4 mois", description: "Aidez à concevoir les interfaces que les agriculteurs et le personnel hospitalier utilisent au quotidien. Recherche, prototypage, tests utilisateurs." },
                { title: "Stagiaire Opérations Terrain", location: "Afrique de l'Ouest", type: "4 mois", description: "Rejoignez les équipes de déploiement sur le terrain. Installation de capteurs, collecte de retours, compréhension des contraintes réelles." },
              ],
            },
          ],
        },
        benefits: {
          kicker: "Pourquoi Gytev",
          title: "Avantages",
          heroTitle: "Ce que nous offrons.",
          body: "Nous croyons que le meilleur travail vient de personnes soutenues, en confiance et justement rémunérées.",
          benefits: [
            { title: "Impact réel", description: "Votre travail atteint des agriculteurs et des hôpitaux en quelques mois, pas en quelques années." },
            { title: "Flexibilité", description: "Télétravail par défaut, bureaux à Dakar. Travaillez là où vous êtes le plus efficace." },
            { title: "Budget formation", description: "Budget annuel pour conférences, formations et livres. Nous investissons dans votre croissance." },
            { title: "Equity", description: "Tous les membres de l'équipe reçoivent des actions. Quand Gytev grandit, tout le monde grandit." },
            { title: "Couverture santé", description: "Assurance santé complète pour vous et votre famille." },
            { title: "Aide à la relocation", description: "Nous vous aidons à vous installer à Dakar avec un package de relocation." },
          ],
        },
      },
    },
    footer: {
      tagline: "Nous construisons l'intelligence pour le monde réel.",
      rights: "Tous droits réservés.",
      manageCookies: "Gérer les cookies",
      groups: [
        {
          columns: [
            {
              title: "Recherche",
              links: [
                { label: "Vue d'ensemble", href: "/research" },
                { label: "Publications", href: "/research" },
                { label: "Open source", href: "/developers" },
                { label: "Actualités recherche", href: "/company/blog" },
              ],
            },
            {
              title: "Dernières avancées",
              links: [
                { label: "Rio", href: "/products/rio" },
                { label: "RedQ", href: "/solutions/redq" },
                { label: "Systèmes prédictifs", href: "/research" },
                { label: "Jumeaux numériques", href: "/research" },
              ],
            },
            {
              title: "Sécurité",
              links: [
                { label: "Approche sécurité", href: "/research" },
                { label: "Sécurité de déploiement", href: "/research" },
                { label: "Sécurité & confidentialité", href: "/company/vision" },
                { label: "Confiance & transparence", href: "/company/vision" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Produits",
              links: [
                { label: "Rio", href: "/products/rio" },
                { label: "RedQ", href: "/solutions/redq" },
                { label: "Tous les produits", href: "/products" },
              ],
            },
            {
              title: "Plateforme API",
              links: [
                { label: "Vue d'ensemble", href: "/developers" },
                { label: "APIs & SDK", href: "/developers" },
                { label: "Clés API", href: "/developers" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Business",
              links: [
                { label: "Solutions", href: "/solutions" },
                { label: "Agriculture", href: "/solutions" },
                { label: "Santé publique", href: "/solutions" },
                { label: "Témoignages clients", href: "/company/customers" },
                { label: "Contacter les ventes", href: "/company/contact" },
              ],
            },
            {
              title: "Développeurs",
              links: [
                { label: "Vue d'ensemble", href: "/developers" },
                { label: "SDK", href: "/developers" },
                { label: "GitHub", href: "https://github.com/gytev", external: true },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Entreprise",
              links: [
                { label: "À propos", href: "/company/about" },
                { label: "Notre vision", href: "/company/vision" },
                { label: "Carrières", href: "/company/careers" },
                { label: "Actualités", href: "/company/blog" },
                { label: "Contact", href: "/company/contact" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Centre d'aide", href: "/developers" },
                { label: "Contact", href: "/company/contact" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Plus",
              links: [
                { label: "Blog", href: "/company/blog" },
                { label: "Carrières", href: "/company/careers" },
                { label: "Développeurs", href: "/developers" },
              ],
            },
            {
              title: "Conditions & politiques",
              links: [
                { label: "Conditions d'utilisation", href: "/company/vision" },
                { label: "Politique de confidentialité", href: "/company/vision" },
              ],
            },
          ],
        },
      ],
    },
  },
};
