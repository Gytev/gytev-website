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
    pages: {
      company: string;
      about: string;
      benefits: string;
      careers: string;
      contact: string;
      internships: string;
      press: string;
      vision: string;
      products: string;
      rio: string;
      solutions: string;
      quiisa: string;
      redq: string;
      research: string;
      developers: string;
      blog: string;
      customers: string;
    };
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
    quiisa: {
      description: string;
    };
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
    searchIn: string;
    domainsHeading: string;
    domainAll: string;
    resultsHeading: string;
    domains: {
      products: string;
      solutions: string;
      research: string;
      developers: string;
      blog: string;
      customers: string;
      company: string;
    };
  };
  cookies: {
    title: string;
    intro: string;
    requiredTitle: string;
    requiredDescription: string;
    analyticsTitle: string;
    analyticsDescription: string;
    marketingTitle: string;
    marketingDescription: string;
    thirdPartyTitle: string;
    thirdPartyDescription: string;
    alwaysOn: string;
    done: string;
  };
  aboutExperience: {
    missionEyebrow: string;
    missionLine: string;
    thesisEyebrow: string;
    thesisHeading: string;
    questions: string[];
    explanations: string[];
    loopEyebrow: string;
    loopHeading: string;
    loopSteps: { label: string; description: string }[];
    originEyebrow: string;
    originHeading: string;
    originBody: string;
    stats: { value: string; label: string }[];
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
        action: string;
        tags: string[];
        panelType: "observe" | "understand" | "predict" | "optimize" | "decide" | "act";
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
      quiisa: {
        startFree: string;
        watchDemo: string;
        featuresHeading: string;
        featuresDescription: string;
        features: { title: string; description: string }[];
        builtForAfrica: string;
        africaDescription: string;
        tags: string[];
      };
      vision: {
        eyebrow: string;
        heading: string;
        subtitle: string;
        discover: string;
        loopHeading: string;
        loopDescription: string;
        thesis: { title: string; paragraphs: string[] };
        architectureHeading: string;
        architecture: { title: string; description: string; features: string[] }[];
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
          timeline: { year: string; title: string; description: string; icon?: string | null }[];
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
          heroTitle: string;
          body: string;
          valuesHeading: string;
          values: { title: string; description: string }[];
          rolesHeading: string;
          rolesEmpty: string;
          departments: {
            name: string;
            openings: { title: string; location: string; type: string; description?: string }[];
          }[];
        };
        contact: {
          kicker: string;
          title: string;
          heroTitle: string;
          note: string;
          officesHeading: string;
          offices: { city: string; address: string; country: string }[];
          inquiriesHeading: string;
          inquiries: { title: string; email: string; description: string }[];
          form: { heading: string; name: string; email: string; message: string; submit: string };
        };
        benefits: {
          kicker: string;
          title: string;
          heroTitle: string;
          body: string;
          benefits: { title: string; description: string }[];
        };
        internships: {
          kicker: string;
          title: string;
          heroTitle: string;
          body: string;
          departments: {
            name: string;
            openings: { title: string; location: string; type: string; description?: string }[];
          }[];
        };
        press: {
          kicker: string;
          title: string;
          heroTitle: string;
          body: string;
          articles: { title: string; source: string; date: string; excerpt: string; tag: string }[];
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
      pages: {
        company: "Company",
        about: "About us",
        benefits: "Benefits",
        careers: "Careers",
        contact: "Contact",
        internships: "Internships",
        press: "Press",
        vision: "Our vision",
        products: "Products",
        rio: "Rio",
        solutions: "Solutions",
        quiisa: "Quiisa",
        redq: "RedQ",
        research: "Research",
        developers: "Developers",
        blog: "Blog",
        customers: "Customers",
      },
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
                { label: "Agricultural Intelligence", href: "/research" },
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
              { label: "Quiisa", href: "/solutions/quiisa" },
              { label: "All products", href: "/products" },
            ],
          },
          {
            title: "Rio Ecosystem",
            links: [
              { label: "Rio Access", href: "/products/rio" },
              { label: "Rio Box", href: "/products/rio" },
              { label: "Rio AI", href: "/products/rio" },
              { label: "Rio Connect", href: "/products/rio" },
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
          description: "The all-in-one agricultural ecosystem.",
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
              { label: "Quiisa", href: "/solutions/quiisa" },
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
            title: "Quiisa",
            links: [
              { label: "Project management", href: "/solutions/quiisa" },
              { label: "Team collaboration", href: "/solutions/quiisa" },
            ],
          },
        ],
        visual: {
          eyebrow: "Solution",
          title: "Quiisa",
          description: "Africa's #1 project management platform.",
          href: "/solutions/quiisa",
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
        "The all-in-one agricultural ecosystem. From financing to market access, Rio covers the entire production cycle with intelligent systems.",
      features: [
        {
          title: "Rio Access",
          tagline: "Pre-production financing",
          description:
            "Connect farmers to financing and agricultural inputs. Access credit, seeds, fertilizers and equipment before the season starts.",
          tags: ["FINANCING", "AGRICULTURAL INPUTS", "CREDIT ACCESS", "EQUIPMENT", "SEEDS & FERTILIZERS"],
        },
        {
          title: "Rio Box",
          tagline: "On-site production intelligence",
          description:
            "Deploy the IoT box on-site during production. Monitor soil, weather and crop conditions in real-time to protect against climate hazards.",
          tags: ["IOT SENSORS", "REAL-TIME MONITORING", "CLIMATE PROTECTION", "SOIL ANALYSIS", "WEATHER DATA"],
        },
        {
          title: "Rio AI",
          tagline: "The intelligence engine",
          description:
            "The most powerful agricultural database and AI engine. Research, analysis, prediction and recommendations for the entire ecosystem.",
          tags: ["AI ENGINE", "DATABASE", "RESEARCH", "ANALYSIS", "PREDICTION", "RECOMMENDATIONS"],
        },
        {
          title: "Rio Connect",
          tagline: "Post-production market access",
          description:
            "Connect farmers directly with consumers. Sell production, find buyers, and manage distribution from harvest to market.",
          tags: ["MARKET ACCESS", "CONSUMER CONNECTION", "DISTRIBUTION", "SALES", "LOGISTICS"],
        },
      ],
    },
    solution: {
      eyebrow: "Solution",
      title: "RedQ",
      description:
        "The national platform for managing blood donations and blood bags from donor to hospital, with full traceability.",
      quiisa: {
        description:
          "Africa's #1 project management platform. Track tasks, manage teams, and deliver projects on time built for the way African teams work.",
      },
    },
    cta: {
      eyebrow: "OWN YOUR AI",
      title: "Build, customize, and deploy intelligent systems with complete control.",
      ctaPrimary: "Start building",
      ctaSecondary: "Contact sales",
    },
    search: {
      placeholder: "Search the site…",
      close: "Close search",
      empty: "Type to search the site.",
      noResults: "No results for “{query}”.",
      searchIn: "Search in",
      domainsHeading: "Browse by domain",
      domainAll: "Everything",
      resultsHeading: "Results",
      domains: {
        products: "Products",
        solutions: "Solutions",
        research: "Research",
        developers: "Developers",
        blog: "Blog",
        customers: "Customers",
        company: "Company",
      },
    },
    cookies: {
      title: "Cookie Preferences",
      intro:
        "Websites and apps use cookies and other identifiers to store and retrieve information on your device. Some of this information may be shared with third parties for different purposes. Use the tool below to manage your preferences. You can change them anytime.",
      requiredTitle: "Strictly necessary cookies",
      requiredDescription:
        "These cookies are required for the site to work and can't be turned off. They support essential functions like security, user authentication, and customer support.",
      analyticsTitle: "Analytics cookies",
      analyticsDescription:
        "These cookies help us understand how visitors interact with our site. They allow us to measure traffic and improve site performance.",
      marketingTitle: "Marketing cookies",
      marketingDescription:
        "These cookies help us measure the effectiveness of our marketing campaigns.",
      thirdPartyTitle: "Third-party platforms",
      thirdPartyDescription:
        "This helps us personalize and measure Gytev's own marketing on third-party platforms.",
      alwaysOn: "Always on",
      done: "Done",
    },
    aboutExperience: {
      missionEyebrow: "Our mission",
      missionLine: "We build intelligent systems that understand the real world.",
      thesisEyebrow: "A 20-year thesis",
      thesisHeading: "Every intelligent system must learn to answer five questions.",
      questions: [
        "What is happening?",
        "Why is it happening?",
        "What could happen next?",
        "What are the possible outcomes?",
        "What should we do?",
      ],
      explanations: [
        "Sensors and systems give a live, truthful picture of any physical environment — no more guessing from scattered data.",
        "Models connect the signals to their causes: anomalies get explained, not just flagged.",
        "Prediction engines anticipate what happens next before it happens — from crop stress to supply shortages.",
        "Every decision path is simulated and ranked, so operators see scenarios instead of a single guess.",
        "Intelligence ends in action: clear recommendations that people and machines can execute in the field.",
      ],
      loopEyebrow: "The intelligence loop",
      loopHeading:
        "We move the world from data to action — one connected loop.",
      loopSteps: [
        { label: "Data", description: "Sensors and systems capture the pulse of physical environments." },
        { label: "Understanding", description: "Models turn raw signals into a living picture of reality." },
        { label: "Prediction", description: "The system anticipates what happens next, before it happens." },
        { label: "Decision", description: "Insight becomes a clear, ranked choice for operators." },
        { label: "Action", description: "People and machines act — and the loop learns from the result." },
      ],
      originEyebrow: "Our origin",
      originHeading: "Born in Dakar. Built for the world.",
      originBody:
        "Gytev was founded in 2023 with a simple conviction: the next generation of technology will not live only on screens. It will perceive farms, hospitals, cities and machines — and help people act on them. Starting from Senegal and Burkina Faso, we deploy digital twins and edge AI where connectivity is hardest, because intelligence that works there works everywhere.",
      stats: [
        { value: "2023", label: "Founded in Dakar" },
        { value: "$2M", label: "Seed to build Africa's intelligence layer" },
        { value: "2", label: "Countries deployed in production" },
        { value: "24/7", label: "Edge inference in the field" },
      ],
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
        heading: "Africa's #1 intelligent systems company.",
        description:
          "From agriculture to healthcare, Gytev builds intelligent systems that solve real-world problems across Africa and beyond. One platform, every sector, total control.",
        action: "Discover our solutions",
        railLabel: "Capabilities",
        switcherLabel: "Switch capability",
        items: [
          {
            title: "Observe.",
            tagline: "Sense any real-world system",
            description:
              "Sensors, IoT devices, satellites, mobile inputs and human data feed continuous intelligence streams into Gytev systems farms, hospitals, cities, industries.",
            action: "Discover Rio",
            tags: ["AGRICULTURE", "HEALTHCURE", "URBAN SYSTEMS", "SUPPLY CHAINS", "ENERGY"],
            panelType: "observe",
            panel: {
              label: "What would you like to observe?",
              lines: ["Farm conditions in real-time", "Hospital blood inventory", "City infrastructure status", "Supply chain movements"],
            },
          },
          {
            title: "Understand.",
            tagline: "Turn data into actionable insight",
            description:
              "AI combines domain knowledge, historical data, weather patterns and local context to explain what is happening and why in any sector.",
            action: "Discover our AI",
            tags: ["DOMAIN EXPERTISE", "CONTEXTUAL AI", "LOCAL KNOWLEDGE", "PATTERN RECOGNITION", "RISK ANALYSIS"],
            panelType: "understand",
            panel: {
              label: "Analyzing system data...",
              lines: ["Soil moisture dropping", "Blood type O+ shortage", "Traffic congestion building", "Energy demand rising"],
            },
          },
          {
            title: "Predict.",
            tagline: "Anticipate what comes next",
            description:
              "Droughts, disease outbreaks, supply shortages, equipment failures. Gytev forecasts risks days and weeks ahead, across every sector.",
            action: "Discover predictive systems",
            tags: ["CLIMATE RISKS", "HEALTH OUTBREAKS", "MARKET SHIFTS", "INFRASTRUCTURE FAILURES", "DEMAND SPIKES"],
            panelType: "predict",
            panel: {
              label: "7-day forecast",
              lines: ["Water stress · high in Sahel", "Disease outbreak · moderate risk", "Supply shortage · 12 days", "Energy peak · tomorrow"],
            },
          },
          {
            title: "Optimize.",
            tagline: "Find the best path forward",
            description:
              "Resources, timing, logistics, budgets. Optimization algorithms find the most efficient path given real-world constraints anywhere.",
            action: "Discover optimization",
            tags: ["RESOURCE ALLOCATION", "LOGISTICS", "BUDGET PLANNING", "WORKFORCE", "INFRASTRUCTURE"],
            panelType: "optimize",
            panel: {
              label: "Optimization results",
              lines: ["Irrigation efficiency · +23%", "Blood redistribution · 40% faster", "Transport routes · 15% shorter", "Cost reduction · ~$4,200/season"],
            },
          },
          {
            title: "Decide.",
            tagline: "Recommend the right action",
            description:
              "Clear, actionable recommendations delivered to the right people at the right time in local languages, on any device.",
            action: "Discover decision support",
            tags: ["ACTIONABLE ALERTS", "LOCAL LANGUAGES", "MULTI-DEVICE", "PRIORITY SCORING", "CONFIDENCE LEVELS"],
            panelType: "decide",
            panel: {
              label: "Decision recommendations",
              lines: ["Irrigate zone A · 18mm", "Redistribute O+ bags · 120 units", "Deploy maintenance crew · Priority 1", "Confidence · 94%"],
            },
          },
          {
            title: "Act.",
            tagline: "Execute with precision",
            description:
              "From alerts to automation. Gytev triggers actions across systems, teams and devices in real time on the ground, across networks.",
            action: "Discover applied AI",
            tags: ["REAL-TIME ACTIONS", "CROSS-SYSTEM", "MOBILE ALERTS", "AUTOMATION", "FIELD OPERATIONS"],
            panelType: "act",
            panel: {
              label: "Active workflows",
              lines: ["Irrigation system · triggered", "Hospital notified · WhatsApp + SMS", "Supply truck · dispatched", "Next review · in 72h"],
            },
          },
        ],
      },
      products: {
        eyebrow: "Rio Ecosystem",
        title: "The all-in-one agricultural platform.",
        description:
          "From pre-production financing to post-production market access. Rio covers the entire agricultural cycle with intelligent systems.",
        tabs: [
          {
            id: "rio-access",
            label: "Rio Access",
            heading: "Finance before the season starts.",
            description:
              "Connect farmers to financing and agricultural inputs. Access credit, seeds, fertilizers and equipment before the season begins.",
            features: [
              { title: "Micro-financing", description: "Quick access to credit for seeds, fertilizers and equipment." },
              { title: "Input marketplace", description: "Buy quality inputs at competitive prices from verified suppliers." },
              { title: "Risk assessment", description: "AI-powered credit scoring based on farm data and history." },
            ],
            preview: {
              label: "Rio Access · Financing",
              heading: "Pre-season credit application",
              alert: "Approved · $2,400",
              lines: ["Farm size · 2.5 hectares", "Crop history · Maize, Cotton", "Credit score · 87/100", "Inputs ready for delivery"],
            },
          },
          {
            id: "rio-box",
            label: "Rio Box",
            heading: "Intelligent monitoring on the field.",
            description:
              "Deploy the IoT box on-site during production. Real-time sensors protect crops from climate hazards and optimize irrigation.",
            features: [
              { title: "Multi-sensor array", description: "Soil moisture, temperature, humidity, light, rainfall and more." },
              { title: "Real-time alerts", description: "Instant notifications when conditions threaten your crops." },
              { title: "Weather integration", description: "Local weather data fused with field sensors for accurate forecasting." },
            ],
            preview: {
              label: "Rio Box · Field sensors",
              heading: "Maize field — flowering stage",
              alert: "Irrigate within 24h",
              lines: ["Soil moisture · 32% (dropping)", "Temperature · 34°C", "Humidity · 45%", "Next rain · in 7 days"],
            },
          },
          {
            id: "rio-ai",
            label: "Rio AI",
            heading: "The intelligence engine.",
            description:
              "The most powerful agricultural AI database. Research, analysis, prediction and recommendations for the entire ecosystem.",
            features: [
              { title: "Crop intelligence", description: "Deep knowledge of 50+ African crops with regional expertise." },
              { title: "Predictive analytics", description: "Forecast yields, diseases, droughts and market prices." },
              { title: "Natural language", description: "Ask questions in French, English or local languages." },
            ],
            preview: {
              label: "Rio AI · Intelligence",
              heading: "Crop analysis — Maize",
              alert: "Disease risk · moderate",
              lines: ["Region · Sahel", "Rainfall forecast · 12mm/week", "Pest pressure · low", "Yield prediction · +15%"],
            },
          },
          {
            id: "rio-connect",
            label: "Rio Connect",
            heading: "Sell directly to consumers.",
            description:
              "Connect farmers with buyers. Find markets, negotiate prices and manage distribution from harvest to consumer.",
            features: [
              { title: "Market matching", description: "AI connects your produce to the right buyers at the right price." },
              { title: "Logistics coordination", description: "Transport, storage and cold chain management." },
              { title: "Direct sales", description: "Sell to consumers, restaurants and retailers without middlemen." },
            ],
            preview: {
              label: "Rio Connect · Market",
              heading: "New buyer offer received",
              alert: "Price +22% above market",
              lines: ["Buyer · Restaurant Chain Dakar", "Volume · 500 kg maize", "Delivery · 3 days", "Profit margin · +34%"],
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
      quiisa: {
        startFree: "Start free",
        watchDemo: "Watch demo",
        featuresHeading: "Everything you need to manage projects",
        featuresDescription: "From task management to team collaboration, Quiisa has the tools to keep your projects on track.",
        features: [
          { title: "Kanban Boards", description: "Visualize your workflow with drag-and-drop boards. See at a glance what's in progress, what's done, and what's next." },
          { title: "Task Management", description: "Create, assign and track tasks with deadlines, priorities and dependencies. Never miss a deadline again." },
          { title: "Team Collaboration", description: "Comment on tasks, share files, and keep everyone aligned with real-time updates and notifications." },
          { title: "Gantt Charts", description: "Plan projects with interactive Gantt charts. Visualize timelines, dependencies and critical paths." },
          { title: "Time Tracking", description: "Track time spent on tasks and projects. Generate reports for clients or internal use." },
          { title: "Reporting & Analytics", description: "Get insights into project progress, team performance and resource allocation with powerful dashboards." },
        ],
        builtForAfrica: "Built for African teams",
        africaDescription: "Quiisa is designed to work the way African teams work with offline support, mobile-first design, and local language support.",
        tags: ["OFFLINE SUPPORT", "MOBILE-FIRST", "LOCAL LANGUAGES", "REAL-TIME SYNC", "MULTI-TEAM"],
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
              { label: "Agricultural Intelligence", href: "/research" },
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
              title: "Industries",
              links: [
                { label: "Agriculture", href: "/solutions" },
                { label: "Healthcare", href: "/solutions" },
                { label: "Public sector", href: "/solutions" },
                { label: "Customers", href: "/customers" },
              ],
            },
            {
              title: "Quiisa",
              links: [
                { label: "Project management", href: "/solutions/quiisa" },
                { label: "Team collaboration", href: "/solutions/quiisa" },
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
      title: "Gytev | Des systèmes intelligents qui comprennent le monde réel.",
      pages: {
        company: "Entreprise",
        about: "À propos",
        benefits: "Avantages",
        careers: "Carrières",
        contact: "Contact",
        internships: "Stages",
        press: "Presse",
        vision: "Notre vision",
        products: "Produits",
        rio: "Rio",
        solutions: "Solutions",
        quiisa: "Quiisa",
        redq: "RedQ",
        research: "Recherche",
        developers: "Développeurs",
        blog: "Blog",
        customers: "Clients",
      },
      description:
        "Gytev construit des systèmes intelligents qui observent, comprennent, prédisent et agissent sur le monde réel à commencer par l'agriculture et la santé publique en Afrique.",
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
                { label: "Intelligence Agricole", href: "/research" },
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
              { label: "Quiisa", href: "/solutions/quiisa" },
              { label: "Tous les produits", href: "/products" },
            ],
          },
          {
            title: "Écosystème Rio",
            links: [
              { label: "Rio Access", href: "/products/rio" },
              { label: "Rio Box", href: "/products/rio" },
              { label: "Rio AI", href: "/products/rio" },
              { label: "Rio Connect", href: "/products/rio" },
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
          description: "L'écosystème agricole tout-en-un.",
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
              { label: "Quiisa", href: "/solutions/quiisa" },
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
            title: "Quiisa",
            links: [
              { label: "Gestion de projets", href: "/solutions/quiisa" },
              { label: "Collaboration d'équipe", href: "/solutions/quiisa" },
            ],
          },
        ],
        visual: {
          eyebrow: "Solution",
          title: "Quiisa",
          description: "La plateforme de gestion de projets n°1 en Afrique.",
          href: "/solutions/quiisa",
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
        "Nous combinons capteurs, données, intelligence artificielle et connaissance des métiers pour observer, comprendre, prédire et agir sur les systèmes qui nous entourent exploitations, banques de sang, villes, industries.",
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
        "L'écosystème agricole tout-en-un. Du financement à l'accès au marché, Rio couvre tout le cycle de production avec des systèmes intelligents.",
      features: [
        {
          title: "Rio Access",
          tagline: "Financement pré-production",
          description:
            "Connecter les agriculteurs au financement et aux intrants agricoles. Accéder au crédit, aux semences, engrais et équipements avant le début de la saison.",
          tags: ["FINANCEMENT", "INTRANTS AGRICOLES", "ACCÈS AU CRÉDIT", "ÉQUIPEMENTS", "SEMENCES & ENGRAIS"],
        },
        {
          title: "Rio Box",
          tagline: "Intelligence de production sur site",
          description:
            "Déployer la box IoT sur site pendant la production. Surveiller le sol, la météo et l'état des cultures en temps réel pour se protéger des aléas climatiques.",
          tags: ["CAPEURS IOT", "SUIVI EN TEMPS RÉEL", "PROTECTION CLIMATIQUE", "ANALYSE DU SOL", "DONNÉES MÉTÉO"],
        },
        {
          title: "Rio AI",
          tagline: "Le moteur d'intelligence",
          description:
            "La base de données et le moteur IA agricoles les plus puissants. Recherche, analyse, prédiction et recommandations pour tout l'écosystème.",
          tags: ["MOTEUR IA", "BASE DE DONNÉES", "RECHERCHE", "ANALYSE", "PRÉDICTION", "RECOMMANDATIONS"],
        },
        {
          title: "Rio Connect",
          tagline: "Accès au marché post-production",
          description:
            "Connecter directement les agriculteurs aux consommateurs. Vendre la production, trouver des acheteurs et gérer la distribution de la récolte au marché.",
          tags: ["ACCÈS AU MARCHÉ", "CONNECTION CONSOMMATEURS", "DISTRIBUTION", "VENTES", "LOGISTIQUE"],
        },
      ],
    },
    solution: {
      eyebrow: "Solution",
      title: "RedQ",
      description:
        "La plateforme nationale de gestion des dons et des poches de sang  du donneur à l'hôpital, avec traçabilité complète.",
      quiisa: {
        description:
          "La plateforme de gestion de projets n°1 en Afrique. Suivez les tâches, gérez les équipes et livrez les projets à temps conçu pour la façon de travailler des équipes africaines.",
      },
    },
    cta: {
      eyebrow: "OWN YOUR AI",
      title: "Construisez, personnalisez et déployez des systèmes intelligents avec un contrôle total.",
      ctaPrimary: "Commencer",
      ctaSecondary: "Contacter les ventes",
    },
    search: {
      placeholder: "Rechercher sur le site…",
      close: "Fermer la recherche",
      empty: "Saisissez du texte pour rechercher sur le site.",
      noResults: "Aucun résultat pour « {query} ».",
      searchIn: "Rechercher dans",
      domainsHeading: "Parcourir par domaine",
      domainAll: "Tout",
      resultsHeading: "Résultats",
      domains: {
        products: "Produits",
        solutions: "Solutions",
        research: "Recherche",
        developers: "Développeurs",
        blog: "Blog",
        customers: "Clients",
        company: "Entreprise",
      },
    },
    cookies: {
      title: "Préférences de cookies",
      intro:
        "Les sites web et les applications utilisent des cookies et d'autres identifiants pour stocker et récupérer des informations sur votre appareil. Certaines de ces informations peuvent être partagées avec des tiers à diverses fins. Utilisez l'outil ci-dessous pour gérer vos préférences. Vous pouvez les modifier à tout moment.",
      requiredTitle: "Cookies strictement nécessaires",
      requiredDescription:
        "Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Ils prennent en charge des fonctions essentielles comme la sécurité, l'authentification et le service client.",
      analyticsTitle: "Cookies analytiques",
      analyticsDescription:
        "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site. Ils nous permettent de mesurer le trafic et d'améliorer les performances du site.",
      marketingTitle: "Cookies marketing",
      marketingDescription:
        "Ces cookies nous aident à mesurer l'efficacité de nos campagnes marketing.",
      thirdPartyTitle: "Plateformes tierces",
      thirdPartyDescription:
        "Cela nous aide à personnaliser et mesurer le marketing propre à Gytev sur les plateformes tierces.",
      alwaysOn: "Toujours actifs",
      done: "Terminé",
    },
    aboutExperience: {
      missionEyebrow: "Notre mission",
      missionLine:
        "Nous construisons des systèmes intelligents qui comprennent le monde réel.",
      thesisEyebrow: "Une thèse sur 20 ans",
      thesisHeading:
        "Chaque système intelligent doit apprendre à répondre à cinq questions.",
      questions: [
        "Que se passe-t-il ?",
        "Pourquoi cela se produit-il ?",
        "Que pourrait-il se passer ensuite ?",
        "Quels sont les scénarios possibles ?",
        "Que devons-nous faire ?",
      ],
      explanations: [
        "Des capteurs et des systèmes donnent une image en direct et fidèle de n'importe quel environnement physique — fini les devinettes à partir de données dispersées.",
        "Nos modèles relient les signaux à leurs causes : les anomalies sont expliquées, pas seulement signalées.",
        "Nos moteurs de prédiction anticipent ce qui va se produire avant que cela n'arrive — du stress des cultures aux pénuries d'approvisionnement.",
        "Chaque trajectoire de décision est simulée et hiérarchisée : les opérateurs voient des scénarios, pas une seule devinette.",
        "L'intelligence se termine en action : des recommandations claires que les humains et les machines peuvent exécuter sur le terrain.",
      ],
      loopEyebrow: "La boucle d'intelligence",
      loopHeading:
        "Nous faisons passer le monde des données à l'action — en une seule boucle connectée.",
      loopSteps: [
        { label: "Données", description: "Capteurs et systèmes captent le pouls des environnements physiques." },
        { label: "Compréhension", description: "Nos modèles transforment les signaux bruts en image vivante du réel." },
        { label: "Prédiction", description: "Le système anticipe ce qui va se produire, avant que cela n'arrive." },
        { label: "Décision", description: "L'analyse devient un choix clair, hiérarchisé pour les opérateurs." },
        { label: "Action", description: "Humains et machines agissent — et la boucle apprend du résultat." },
      ],
      originEyebrow: "Nos origines",
      originHeading: "Née à Dakar. Construite pour le monde.",
      originBody:
        "Gytev a été fondée en 2023 avec une conviction simple : la prochaine génération de technologie ne vivra pas seulement sur les écrans. Elle percevra les fermes, les hôpitaux, les villes et les machines — et aidera les gens à agir. En partant du Sénégal et du Burkina Faso, nous déployons des jumeaux numériques et de l'IA embarquée là où la connectivité est la plus difficile, parce que l'intelligence qui fonctionne là-bas fonctionne partout.",
      stats: [
        { value: "2023", label: "Fondation à Dakar" },
        { value: "2 M$", label: "Seed pour bâtir la couche d'intelligence de l'Afrique" },
        { value: "2", label: "Pays déployés en production" },
        { value: "24/7", label: "Inférence embarquée sur le terrain" },
      ],
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
        heading: "N°1 des systèmes intelligents en Afrique.",
        description:
          "De l'agriculture à la santé, Gytev construit des systèmes intelligents qui résolvent des problèmes réels en Afrique et au-delà. Une plateforme, tous les secteurs, contrôle total.",
        action: "Découvrir nos solutions",
        railLabel: "Capacités",
        switcherLabel: "Changer de capacité",
        items: [
          {
            title: "Observer.",
            tagline: "Capter tout système réel",
            description:
              "Capteurs, objets connectés, satellites, entrées mobiles et données humaines alimentent des flux d'intelligence continus dans les systèmes Gytev fermes, hôpitaux, villes, industries.",
            action: "Découvrir Rio",
            tags: ["AGRICULTURE", "SANTÉ", "SYSTÈMES URBAINS", "CHAÎNES D'APPROVISIONNEMENT", "ÉNERGIE"],
            panelType: "observe",
            panel: {
              label: "Que souhaitez-vous observer ?",
              lines: ["Conditions agricoles en temps réel", "Inventaire sanguin hospitalier", "État des infrastructures urbaines", "Mouvements de la chaîne d'approvisionnement"],
            },
          },
          {
            title: "Comprendre.",
            tagline: "Transformer les données en insights exploitables",
            description:
              "L'IA combine les connaissances métier, les données historiques, les schémas météo et le contexte local pour expliquer ce qui se passe et pourquoi dans chaque secteur.",
            action: "Découvrir notre IA",
            tags: ["EXPERTISE DOMAINE", "IA CONTEXTUELLE", "CONNAISSANCES LOCALES", "RECONNAISSANCE DE MOTIFS", "ANALYSE DE RISQUES"],
            panelType: "understand",
            panel: {
              label: "Analyse des données système...",
              lines: ["Humidité du sol en baisse", "Pénurie de sang O+", "Embouteillage en construction", "Demande énergétique en hausse"],
            },
          },
          {
            title: "Prédire.",
            tagline: "Anticiper ce qui vient",
            description:
              "Sécheresses, épidémies, pénuries, pannes d'équipement. Gytev prévoit les risques des jours et semaines à l'avance, dans tous les secteurs.",
            action: "Découvrir les systèmes prédictifs",
            tags: ["RISQUES CLIMATIQUES", "ÉPIDÉMIES", "FLUCTUATIONS MARCHÉ", "PANNES INFRASTRUCTURE", "PIC DE DEMANDE"],
            panelType: "predict",
            panel: {
              label: "Prévision à 7 jours",
              lines: ["Stress hydrique · élevé au Sahel", "Épidémie · risque modéré", "Pénurie · 12 jours", "Pic énergétique · demain"],
            },
          },
          {
            title: "Optimiser.",
            tagline: "Trouver le meilleur chemin",
            description:
              "Ressources, timing, logistique, budgets. Les algorithmes d'optimisation trouvent le chemin le plus efficace compte tenu des contraintes réelles partout.",
            action: "Découvrir l'optimisation",
            tags: ["ALLOCATION RESSOURCES", "LOGISTIQUE", "PLANIFICATION BUDGÉTAIRE", "MAIN-D'ŒUVRE", "INFRASTRUCTURES"],
            panelType: "optimize",
            panel: {
              label: "Résultats d'optimisation",
              lines: ["Efficacité irrigation · +23%", "Redistribution sang · 40% plus rapide", "Itinéraires transport · 15% plus courts", "Réduction coûts · ~4 200 $/saison"],
            },
          },
          {
            title: "Décider.",
            tagline: "Recommander la bonne action",
            description:
              "Des recommandations claires et exploitables livrées aux bonnes personnes au bon moment dans les langues locales, sur tous les appareils.",
            action: "Découvrir l'aide à la décision",
            tags: ["ALERTES EXPLOITABLES", "LANGUES LOCALES", "MULTI-APPAREILS", "SCORE DE PRIORITÉ", "NIVEAUX DE CONFIANCE"],
            panelType: "decide",
            panel: {
              label: "Recommandations décisionnelles",
              lines: ["Irriguer zone A · 18 mm", "Redistribuer poches O+ · 120 unités", "Déployer maintenance · Priorité 1", "Confiance · 94 %"],
            },
          },
          {
            title: "Agir.",
            tagline: "Exécuter avec précision",
            description:
              "Des alertes à l'automatisation. Gytev déclenche des actions entre les systèmes, équipes et appareils en temps réel sur le terrain, à travers les réseaux.",
            action: "Découvrir l'IA appliquée",
            tags: ["ACTIONS TEMPS RÉEL", "INTER-SYSTÈMES", "ALERTES MOBILE", "AUTOMATISATION", "OPÉRATIONS TERRAIN"],
            panelType: "act",
            panel: {
              label: "Workflows actifs",
              lines: ["Système d'irrigation · déclenché", "Hôpital notifié · WhatsApp + SMS", "Camion livraison · envoyé", "Prochaine revue · dans 72 h"],
            },
          },
        ],
      },
      products: {
        eyebrow: "Écosystème Rio",
        title: "La plateforme agricole tout-en-un.",
        description:
          "Du financement pré-production à l'accès au marché post-production. Rio couvre tout le cycle agricole avec des systèmes intelligents.",
        tabs: [
          {
            id: "rio-access",
            label: "Rio Access",
            heading: "Financez avant la saison.",
            description:
              "Connectez les agriculteurs au financement et aux intrants agricoles. Accédez au crédit, aux semences, engrais et équipements avant le début de la saison.",
            features: [
              { title: "Micro-financement", description: "Accès rapide au crédit pour semences, engrais et équipements." },
              { title: "Marché d'intrants", description: "Achetez des intrants de qualité à prix compétitifs chez des fournisseurs vérifiés." },
              { title: "Évaluation des risques", description: "Score de crédit par IA basé sur les données et l'historique de la ferme." },
            ],
            preview: {
              label: "Rio Access · Financement",
              heading: "Demande de crédit pré-saison",
              alert: "Approuvé · 2 400 $",
              lines: ["Superficie · 2,5 hectares", "Historique cultures · Maïs, Coton", "Score crédit · 87/100", "Intrants prêts à la livraison"],
            },
          },
          {
            id: "rio-box",
            label: "Rio Box",
            heading: "Surveillance intelligente sur le terrain.",
            description:
              "Déployez la box IoT sur site pendant la production. Des capteurs en temps réel protègent les cultures des aléas climatiques et optimisent l'irrigation.",
            features: [
              { title: "Réseau multi-capteurs", description: "Humidité du sol, température, humidité, luminosité, pluie et plus." },
              { title: "Alertes en temps réel", description: "Notifications instantanées lorsque les conditions menacent vos cultures." },
              { title: "Intégration météo", description: "Données météo locales fusionnées avec les capteurs du champ pour des prévisions précises." },
            ],
            preview: {
              label: "Rio Box · Capteurs terrain",
              heading: "Parcelle de maïs — stade floraison",
              alert: "Irriguer sous 24h",
              lines: ["Humidité sol · 32% (en baisse)", "Température · 34°C", "Humidité · 45%", "Prochaine pluie · dans 7 jours"],
            },
          },
          {
            id: "rio-ai",
            label: "Rio AI",
            heading: "Le moteur d'intelligence.",
            description:
              "La base de données agricoles IA les plus puissante. Recherche, analyse, prédiction et recommandations pour tout l'écosystème.",
            features: [
              { title: "Intelligence cultures", description: "Connaissance approfondie de 50+ cultures africaines avec expertise régionale." },
              { title: "Analyses prédictives", description: "Prévoyez rendements, maladies, sécheresses et prix du marché." },
              { title: "Langage naturel", description: "Posez des questions en français, anglais ou langues locales." },
            ],
            preview: {
              label: "Rio AI · Intelligence",
              heading: "Analyse culture — Maïs",
              alert: "Risque maladie · modéré",
              lines: ["Région · Sahel", "Prévision pluie · 12mm/semaine", "Pression nuisibles · faible", "Prédiction rendement · +15%"],
            },
          },
          {
            id: "rio-connect",
            label: "Rio Connect",
            heading: "Vendez directement aux consommateurs.",
            description:
              "Connectez les agriculteurs aux acheteurs. Trouvez des marchés, négociez les prix et gérez la distribution de la récolte au consommateur.",
            features: [
              { title: "Mise en relation", description: "L'IA connecte votre production aux bons acheteurs au bon prix." },
              { title: "Coordination logistique", description: "Transport, stockage et chaîne du froid." },
              { title: "Ventes directes", description: "Vendez aux consommateurs, restaurants et détaillants sans intermédiaires." },
            ],
            preview: {
              label: "Rio Connect · Marché",
              heading: "Nouvelle offre d'acheteur reçue",
              alert: "Prix +22% au-dessus du marché",
              lines: ["Acheteur · Chaîne restaurants Dakar", "Volume · 500 kg maïs", "Livraison · 3 jours", "Marge bénéficiaire · +34%"],
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
          { title: "Donneurs et dons", description: "Enregistrer les donneurs, enregistrer chaque don, du centre de collecte au laboratoire." },
          { title: "Traçabilité", description: "Chaque poche de sang tracée : type, groupe, statut, péremption, localisation." },
          { title: "Stock national", description: "Visibilité en temps réel des poches disponibles sur tout le réseau." },
          { title: "Demande et distribution", description: "Adapter l'offre à la demande hospitalière et redistribuer avant la péremption." },
        ],
      },
      quiisa: {
        startFree: "Commencer gratuitement",
        watchDemo: "Voir la démo",
        featuresHeading: "Tout ce dont vous avez besoin pour gérer vos projets",
        featuresDescription: "De la gestion des tâches à la collaboration en équipe, Quiisa a les outils pour garder vos projets sur la bonne voie.",
        features: [
          { title: "Tableaux Kanban", description: "Visualisez votre flux de travail avec des tableaux glisser-déposer. Voyez d'un coup d'œil ce qui est en cours, ce qui est terminé et ce qui vient ensuite." },
          { title: "Gestion des tâches", description: "Créez, assignez et suivez les tâches avec des délais, priorités et dépendances. Ne manquez plus jamais une échéance." },
          { title: "Collaboration d'équipe", description: "Commentez les tâches, partagez des fichiers et gardez tout le monde aligné avec des mises à jour et notifications en temps réel." },
          { title: "Diagrammes de Gantt", description: "Planifiez les projets avec des diagrammes de Gantt interactifs. Visualisez les calendriers, dépendances et chemins critiques." },
          { title: "Suivi du temps", description: "Suivez le temps passé sur les tâches et projets. Générez des rapports pour les clients ou un usage interne." },
          { title: "Rapports et analyses", description: "Obtenez des informations sur l'avancement des projets, la performance des équipes et l'allocation des ressources avec des tableaux de bord puissants." },
        ],
        builtForAfrica: "Conçu pour les équipes africaines",
        africaDescription: "Quiisa est conçu pour fonctionner comme les équipes africaines travaillent avec support hors ligne, conception mobile-first et support des langues locales.",
        tags: ["HORS LIGNE", "MOBILE-FIRST", "LANGUES LOCALES", "SYNCHRO TEMPS RÉEL", "MULTI-ÉQUIPES"],
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
              { label: "Intelligence Agricole", href: "/research" },
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
                { label: "Quiisa", href: "/solutions/quiisa" },
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
                { label: "Gestion de projets", href: "/solutions/quiisa" },
                { label: "Témoignages clients", href: "/customers" },
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
