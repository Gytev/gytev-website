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
    keyDatesHeading: string;
    eventTypes: { launch: string; funding: string; leadership: string; milestone: string };
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
          timeline: { date: string; title: string; description?: string; type?: string }[];
          teamHeading: string;
          teamDescription: string;
          partnersTitle: string;
          cta: { heading: string; description: string; primary: string; secondary: string };
        };
        careers: {
          kicker: string;
          title: string;
          heroTitle: string;
          body: string;
          ctaLabel: string;
          teamsHeading: string;
          teamsDescription: string;
          teams: { name: string; description: string }[];
          stats: { value: string; label: string }[];
          cultureHeading: string;
          cultureDescription: string;
          cultureImage: string;
          valuesHeading: string;
          values: { title: string; description: string }[];
          benefitsHeading: string;
          benefitsDescription: string;
          benefitTabs: { id: string; label: string; items: { title: string; description: string }[] }[];
          interviewHeading: string;
          interviewDescription: string;
          interviewTabs: { id: string; label: string; steps: { title: string; description: string }[]; image: string }[];
          lookForHeading: string;
          lookFor: { title: string; description: string; image: string }[];
          rolesHeading: string;
          rolesEmpty: string;
          rolesDescription: string;
          departments?: {
            name: string;
            description: string;
            openings: { title: string; location: string; type: string; description: string; requirements: string[] }[];
          }[];
          applyForm: {
            modalTitle: string;
            nameLabel: string;
            namePlaceholder: string;
            emailLabel: string;
            emailPlaceholder: string;
            phoneLabel: string;
            phonePlaceholder: string;
            linkedinLabel: string;
            linkedinPlaceholder: string;
            cvLabel: string;
            messageLabel: string;
            messagePlaceholder: string;
            submitLabel: string;
            sendingLabel: string;
            successLabel: string;
            errorLabel: string;
            closeLabel: string;
          };
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
        contactPage: {
          eyebrow: string;
          heroTitle: string;
          heroSub: string;
          helpHeading: string;
          cards: {
            titles: { team: string; support: string; press: string; privacy: string; vulnerability: string };
            support: { helpPrefix: string; helpLink: string; loginLink: string; loginSuffix: string; discordPrefix: string; discordLabel: string; discordSuffix: string; cta: string };
            press: { prefix: string; email: string };
            privacy: { text: string; cta: string };
            vulnerability: { text: string; smallPrint: string; cta: string };
          };
          forms: {
            thanks: string;
            sending: string;
            legal: string;
            updates: string;
            submit: string;
            error: string;
            team: {
              firstname: { label: string; placeholder: string };
              lastname: { label: string; placeholder: string };
              email: { label: string; placeholder: string };
              role: { label: string; placeholder: string };
              message: { label: string; placeholder: string };
            };
            support: {
              email: { label: string; placeholder: string };
              issue: { label: string; placeholder: string };
            };
            press: {
              name: { label: string; placeholder: string };
              email: { label: string; placeholder: string };
              outlet: { label: string; placeholder: string };
              request: { label: string; placeholder: string };
            };
            privacy: {
              email: { label: string; placeholder: string };
              typeLabel: string;
              typePlaceholder: string;
              details: { label: string; placeholder: string };
            };
            vulnerability: {
              email: { label: string; placeholder: string };
              product: { label: string; placeholder: string };
              report: { label: string; placeholder: string };
            };
          };
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
            title: "Teams",
            links: [
              { label: "Finance", href: "/solutions/teams/finance" },
              { label: "Data Analytics", href: "/solutions/teams/data-analytics" },
              { label: "Sales", href: "/solutions/teams/sales" },
              { label: "Marketing", href: "/solutions/teams/marketing" },
              { label: "Operations", href: "/solutions/teams/operations" },
              { label: "Engineering", href: "/solutions/teams/engineering" },
              { label: "Design", href: "/solutions/teams/design" },
            ],
          },
          {
            title: "Industries",
            links: [
              { label: "Cybersecurity", href: "/solutions/industries/cybersecurity" },
              { label: "Financial Services", href: "/solutions/industries/financial-services" },
              { label: "Life Sciences", href: "/solutions/industries/life-sciences" },
              { label: "Healthcare", href: "/solutions/industries/healthcare" },
              { label: "Retail", href: "/solutions/industries/retail" },
              { label: "Government", href: "/solutions/industries/government" },
              { label: "Education", href: "/solutions/industries/education" },
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
              { label: "Open roles", href: "/company/careers#roles" },
              { label: "Internships", href: "/company/careers?type=Intern#roles" },
              { label: "Benefits", href: "/company/careers#benefits" },
            ],
          },
        ],
        visual: {
          eyebrow: "Company",
          title: "Our vision",
          description: "The 20-year technology thesis.",
          href: "/company/about",
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
      title: "Gytev addresses critical global challenges that reshape the world economy.",
      subtitle: "",
      cta: "Read the vision",
      nodes: [
        { first: "AI will", second: "feed the world" },
        { first: "AI will", second: "move the world" },
        { first: "AI will", second: "heal the world" },
        { first: "AI will", second: "move money" },
        { first: "AI will", second: "power the world" },
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
        "Sensors and systems give a live, truthful picture of any physical environment. No more guessing from scattered data.",
        "Models connect the signals to their causes: anomalies get explained, not just flagged.",
        "Prediction engines anticipate what happens next before it happens, from crop stress to supply shortages.",
        "Every decision path is simulated and ranked, so operators see scenarios instead of a single guess.",
        "Intelligence ends in action: clear recommendations that people and machines can execute in the field.",
      ],
      loopEyebrow: "The intelligence loop",
      loopHeading: "Loop with Gytev.",
      loopSteps: [
        { label: "Data", description: "Sensors and systems capture the pulse of physical environments." },
        { label: "Understanding", description: "Models turn raw signals into a living picture of reality." },
        { label: "Prediction", description: "The system anticipates what happens next, before it happens." },
        { label: "Decision", description: "Insight becomes a clear, ranked choice for operators." },
        { label: "Action", description: "People and machines act, and the loop learns from the result." },
      ],
      keyDatesHeading: "Key dates for Gytev.",
      eventTypes: {
        launch: "Product launch",
        funding: "Funding",
        leadership: "Leadership",
        milestone: "Company",
      },
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
          { name: "Coopérative de l'Alibori", sector: "Agritech" },
          { name: "National Blood Bank of Benin", sector: "Health" },
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
              heading: "Flowering maize field",
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
              heading: "Maize crop analysis",
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
              lines: ["Buyer · Restaurant Chain Cotonou", "Volume · 500 kg maize", "Delivery · 3 days", "Profit margin · +34%"],
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
            "For decades, the physical world has been a black box to software. We build dashboards based on manual inputs and delayed reports. When something fails, a crop dies or a blood supply runs out, we only know after the fact.",
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
            { date: "Jan 12, 2026", title: "First lines of code", description: "Gytev starts as a small engineering team obsessed with connecting AI to the physical world.", type: "milestone" },
            { date: "Mar 3, 2026", title: "Gytev launches", description: "The company is officially launched, with digital twins and edge AI at its core.", type: "milestone" },
            { date: "Apr 21, 2026", title: "Rio, first twin", description: "First deployment of the Rio agricultural digital twin in the fields of Benin.", type: "launch" },
            { date: "Jun 30, 2026", title: "RedQ & public health", description: "RedQ extends the mission to public health, managing blood donations end to end.", type: "launch" }
          ],
          teamHeading: "Gytev's Founder.",
          teamDescription: "A combination of bright, prepared and trained minds, both business profiles and young senior technical talent. We rely on a strong leadership spirit for a clear mission, a dedicated R&D team, security and governance.",
          partnersTitle: "Who we work with.",
          cta: {
            heading: "Ready to build with us?",
            description: "Whether you want to join the engineering team or deploy our solutions in your operations.",
            primary: "View careers",
            secondary: "Contact us"
          }
        },
        careers: {
          kicker: "Careers",
          title: "Careers at Gytev",
          heroTitle: "Build intelligence for the real world.",
          body: "We hire engineers, researchers and operators who connect AI to the real world. We address global issues in agriculture, healthcare, and critical infrastructure that demand rigorous thinking and high-impact solutions.",
          ctaLabel: "Apply open roles",
          teamsHeading: "Discover our teams.",
          teamsDescription: "We are building one of the most ambitious intelligent systems platforms in Africa. We combine sensors, AI, and domain expertise to solve real-world problems across agriculture, healthcare, and industries.",
          teams: [
            { name: "AI & Research", description: "Pioneering machine learning models and digital twins that understand the physical world." },
            { name: "Engineering", description: "Shipping the platforms, hardware, and infrastructure that bring intelligent systems to life." },
            { name: "GTM", description: "Empowering customers to solve real business challenges with our solutions." },
            { name: "Corporate", description: "Building the operational foundations for long-term success." },
            { name: "Operations", description: "Deploying sensors, managing logistics, and ensuring real-world impact on the ground." },
            { name: "Product", description: "Designing the platforms and experiences that make complex systems understandable." }
          ],
          stats: [
            { value: "+150", label: "team members" },
            { value: "+3", label: "countries" },
            { value: "+5", label: "sectors" },
            { value: "50%", label: "women" }
          ],
          cultureHeading: "Our culture.",
          cultureDescription: "At Gytev, every individual has the power to shape our trajectory. We foster transparency and ownership, where your goals and ideas are visible and valued company-wide. With flat structures and open collaboration, you'll take the lead, drive impact, and work to bring your vision to life.",
          cultureImage: "/images/careers/culture.jpg",
          valuesHeading: "Our values.",
          values: [
            { title: "Field first", description: "Models fail when they haven't met reality. We build hardware to get ground truth, not just scrape the internet." },
            { title: "Radical clarity", description: "Complex systems require simple explanations. We communicate directly, without corporate jargon." },
            { title: "Built to last", description: "Our systems run in harsh environments: farms with no power grid, blood banks with failing infrastructure. We build for resilience." },
            { title: "Speed", description: "We experiment, iterate and ship fast. When we make mistakes, we strive to detect them early." },
            { title: "Low-ego", description: "We're all collectively responsible for the company's success. We get our hands dirty as needed, wherever needed." }
          ],
          benefitsHeading: "Benefits.",
          benefitsDescription: "We support our employees' well-being, growth, and work-life balance, with a range of benefits designed to meet the diverse needs of our team members.",
          benefitTabs: [
            {
              id: "health",
              label: "Health & family",
              items: [
                { title: "Healthcare coverage", description: "100% employer-sponsored premium plans for medical, dental, and vision care for you and your dependents." },
                { title: "Parental leave", description: "Paid leave for all birthing parents." },
                { title: "Childcare support", description: "Reserved daycare seats or financial assistance for working parents." }
              ]
            },
            {
              id: "financial",
              label: "Financial & career",
              items: [
                { title: "Retirement plans", description: "Competitive employer-matched contributions to secure your financial future." },
                { title: "Relocation support", description: "Financial assistance for moving expenses, visa sponsorship, and settling-in services." },
                { title: "Learning budget", description: "Annual budget for conferences, courses, and professional development." }
              ]
            },
            {
              id: "daily",
              label: "Daily life & wellness",
              items: [
                { title: "Meal allowances", description: "Monthly stipends or catered in-office meals." },
                { title: "Transportation support", description: "Monthly allowances for public transport, parking, or sustainable mobility." },
                { title: "Fitness and wellness", description: "Subsidies or memberships for gyms, wellness programs, or fitness activities." }
              ]
            }
          ],
          interviewHeading: "Steps in the process.",
          interviewDescription: "We are intentional about how we build our team. We look for people with authenticity who are willing to roll up their sleeves, embrace discomfort, and turn ideas into outcomes that can scale.",
          interviewTabs: [
            {
              id: "technical",
              label: "AI, Research & Engineering roles",
              steps: [
                { title: "Intro conversation", description: "A first conversation with a recruiter or hiring manager to understand your experience and interests." },
                { title: "Technical assessments", description: "You'll complete a series of technical exercises designed to reflect real challenges you'd work on here." },
                { title: "Values conversation", description: "A final discussion to explore alignment with our values and ways of working." }
              ],
              image: "/images/careers/interview-technical.jpg"
            },
            {
              id: "operations",
              label: "Operations, GTM & Corporate roles",
              steps: [
                { title: "Intro conversation", description: "You'll start with a conversation with a recruiter or hiring manager to understand your background and expectations." },
                { title: "Interviews", description: "You'll meet with the hiring manager and potential teammates focused on your functional expertise and how you approach problems." },
                { title: "Case study or exercise", description: "Depending on the role, you may complete a business case or practical exercise aligned with day-to-day responsibilities." },
                { title: "Values conversation", description: "A final discussion to explore alignment with our values and ways of working." }
              ],
              image: "/images/careers/interview-operations.jpg"
            }
          ],
          lookForHeading: "What we look for.",
          lookFor: [
            { title: "People who raise the bar.", description: "Beyond experience, we value people with intellectual rigor who challenge thinking, sharpen the way we work, and bring informed perspectives. We want system improvers, not people pleasers.", image: "/images/careers/lookfor-1.jpg" },
            { title: "Builders, not order takers.", description: "We want people who like to get their hands dirty and take ownership from day one. People who are comfortable operating in ambiguity and who are not satisfied until they've solved the problem.", image: "/images/careers/lookfor-2.jpg" },
            { title: "Directness and authenticity.", description: "We look for people who care more about content than tone, and who are structured and to the point in their communication. We separate ideas from individuals.", image: "/images/careers/lookfor-3.jpg" }
          ],
          rolesHeading: "Open roles",
          rolesEmpty: "No open roles at the moment, but we are always looking for exceptional talent. Reach out.",
          rolesDescription: "We're building the future of intelligent systems. Find a role where you can make a real impact.",
          departments: [],
          applyForm: {
            modalTitle: "Apply for this role",
            nameLabel: "Full name",
            namePlaceholder: "John Doe",
            emailLabel: "Email",
            emailPlaceholder: "john@example.com",
            phoneLabel: "Phone",
            phonePlaceholder: "+1 234 567 890",
            linkedinLabel: "LinkedIn profile",
            linkedinPlaceholder: "https://linkedin.com/in/your-profile",
            cvLabel: "Upload CV (PDF)",
            messageLabel: "Why are you interested?",
            messagePlaceholder: "Tell us why you'd be a great fit for this role...",
            submitLabel: "Submit application",
            sendingLabel: "Sending...",
            successLabel: "Application sent! We'll get back to you soon.",
            errorLabel: "Something went wrong. Please try again.",
            closeLabel: "Close"
          }
        },
        contact: {
          kicker: "Talk to us",
          title: "Contact Gytev",
          heroTitle: "Get in touch",
          note: "Tell us what you want to observe, understand or act on.",
          officesHeading: "Our Headquarters",
          offices: [
            { city: "Cotonou", address: "Ganhi, Cotonou", country: "Benin" }
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
            { title: "Gytev raises $2M seed to build Africa's intelligence layer", source: "TechCrunch", date: "March 2025", excerpt: "The Cotonou-based deeptech startup plans to scale its IoT platform for agriculture and healthcare across West Africa.", tag: "Funding" },
            { title: "Rio launches in West Africa", source: "African Business", date: "June 2025", excerpt: "Digital twins for agriculture reach smallholder farmers in Benin, with real-time irrigation recommendations.", tag: "Product" },
            { title: "Benin's blood bank goes digital with RedQ", source: "WHO News", date: "January 2026", excerpt: "A national platform for managing blood donations and blood bags brings full traceability from donor to hospital.", tag: "Impact" },
          ],
        },
        contactPage: {
          eyebrow: "Contact",
          heroTitle: "Get in touch with the team.",
          heroSub: "Start your journey to real-world intelligence.",
          helpHeading: "Looking for help?",
          cards: {
            titles: {
              team: "Talk to the team.",
              support: "Support.",
              press: "Press and events.",
              privacy: "Privacy requests.",
              vulnerability: "Vulnerability disclosure.",
            },
            support: {
              helpPrefix: "Visit our ",
              helpLink: "Help center",
              loginLink: "Login",
              loginSuffix: " to chat with support.",
              discordPrefix: "Join our ",
              discordLabel: "Discord",
              discordSuffix: " for community support.",
              cta: "Go to help center",
            },
            press: { prefix: "Email us at ", email: "press@gytev.com" },
            privacy: {
              text: "You have rights regarding your data management. Contact us via our platform.",
              cta: "Submit here",
            },
            vulnerability: {
              text: "If you have found a security vulnerability on one of our products, you can report it through our vulnerability disclosure program.",
              smallPrint: "General bugs shall be reported via our standard support channels.",
              cta: "Submit here",
            },
          },
          forms: {
            thanks: "Thank you for your submission.",
            sending: "Sending…",
            legal: "By submitting this form, you agree with our Terms of Service. We process your data to respond to your contact request in accordance with our Privacy Policy.",
            updates: "I want to receive updates about new features and products from Gytev.",
            submit: "Talk with our team",
            error: "Something went wrong while sending your message. Please try again or email us directly.",
            team: {
              firstname: { label: "First name", placeholder: "Awa" },
              lastname: { label: "Last name", placeholder: "Gytev" },
              email: { label: "Company email", placeholder: "awa@company.com" },
              role: { label: "Role", placeholder: "Engineer" },
              message: {
                label: "Tell us about your project, so we can connect you with the right team.",
                placeholder: "Please share your objectives and any specific requirements for deployment, performance or scale.",
              },
            },
            support: {
              email: { label: "Email", placeholder: "you@example.com" },
              issue: { label: "How can we help?", placeholder: "Describe the issue you are facing." },
            },
            press: {
              name: { label: "Full name", placeholder: "Awa Diallo" },
              email: { label: "Email", placeholder: "awa@journal.com" },
              outlet: { label: "Outlet", placeholder: "Publication name" },
              request: { label: "Your request", placeholder: "Interview, information, accreditation…" },
            },
            privacy: {
              email: { label: "Email", placeholder: "you@example.com" },
              typeLabel: "Request type",
              typePlaceholder: "Select",
              details: { label: "Details", placeholder: "Provide more context about your request." },
            },
            vulnerability: {
              email: { label: "Email", placeholder: "security@example.com" },
              product: { label: "Affected product", placeholder: "Rio, RedQ, Quiisa…" },
              report: { label: "Vulnerability description", placeholder: "Steps to reproduce, impact, proof of concept." },
            },
          },
        },
        internships: {
          kicker: "Grow with us",
          title: "Internships",
          heroTitle: "Start your career in deeptech.",
          body: "Internships at Gytev are hands-on. You will ship real code, deploy real hardware, or solve real operational problems, not fetch coffee.",
          departments: [
            {
              name: "Engineering & AI",
              openings: [
                { title: "ML Engineer Intern", location: "Cotonou / Remote", type: "6 months", description: "Work on time-series models for agricultural prediction. You will train, evaluate, and deploy models that run in production." },
                { title: "Embedded Systems Intern", location: "Cotonou", type: "6 months", description: "Contribute to the firmware of our IoT boxes. C/Rust, low-power computing, sensor integration." },
              ],
            },
            {
              name: "Operations & Product",
              openings: [
                { title: "Product Design Intern", location: "Cotonou", type: "4 months", description: "Help design the interfaces that farmers and hospital staff use every day. Research, prototyping, user testing." },
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
            { title: "Flexible work", description: "Remote-first with offices in Cotonou. Work where you are most effective." },
            { title: "Learning budget", description: "Annual budget for conferences, courses, and books. We invest in your growth." },
            { title: "Equity", description: "All team members receive equity. When Gytev grows, everyone grows." },
            { title: "Health coverage", description: "Comprehensive health insurance for you and your family." },
            { title: "Relocation support", description: "We help you move to Cotonou with a relocation package." },
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
                { label: "Security & Privacy", href: "/company/about" },
                { label: "Trust & Transparency", href: "/company/about" },
              ],
            },
          ],
        },
        {
          columns: [
            {
              title: "Teams",
              links: [
                { label: "Finance", href: "/solutions/teams/finance" },
                { label: "Data Analytics", href: "/solutions/teams/data-analytics" },
                { label: "Sales", href: "/solutions/teams/sales" },
                { label: "Marketing", href: "/solutions/teams/marketing" },
                { label: "Operations", href: "/solutions/teams/operations" },
                { label: "Engineering", href: "/solutions/teams/engineering" },
                { label: "Design", href: "/solutions/teams/design" },
              ],
            },
            {
              title: "Industries",
              links: [
                { label: "Cybersecurity", href: "/solutions/industries/cybersecurity" },
                { label: "Financial Services", href: "/solutions/industries/financial-services" },
                { label: "Life Sciences", href: "/solutions/industries/life-sciences" },
                { label: "Healthcare", href: "/solutions/industries/healthcare" },
                { label: "Retail", href: "/solutions/industries/retail" },
                { label: "Government", href: "/solutions/industries/government" },
                { label: "Education", href: "/solutions/industries/education" },
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
                { label: "Terms of Use", href: "/company/about" },
                { label: "Privacy Policy", href: "/company/about" },
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
            title: "Équipes",
            links: [
              { label: "Finance", href: "/solutions/teams/finance" },
              { label: "Data Analytics", href: "/solutions/teams/data-analytics" },
              { label: "Sales", href: "/solutions/teams/sales" },
              { label: "Marketing", href: "/solutions/teams/marketing" },
              { label: "Operations", href: "/solutions/teams/operations" },
              { label: "Engineering", href: "/solutions/teams/engineering" },
              { label: "Design", href: "/solutions/teams/design" },
            ],
          },
          {
            title: "Industries",
            links: [
              { label: "Cybersecurity", href: "/solutions/industries/cybersecurity" },
              { label: "Financial Services", href: "/solutions/industries/financial-services" },
              { label: "Life Sciences", href: "/solutions/industries/life-sciences" },
              { label: "Healthcare", href: "/solutions/industries/healthcare" },
              { label: "Retail", href: "/solutions/industries/retail" },
              { label: "Government", href: "/solutions/industries/government" },
              { label: "Education", href: "/solutions/industries/education" },
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
              { label: "Postes ouverts", href: "/company/careers#roles" },
              { label: "Stages", href: "/company/careers?type=Intern#roles" },
              { label: "Avantages", href: "/company/careers#benefits" },
            ],
          },
        ],
        visual: {
          eyebrow: "Entreprise",
          title: "Notre vision",
          description: "La thèse technologique sur 20 ans.",
          href: "/company/about",
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
      title: "Gytev relève les défis mondiaux critiques qui redessinent l'économie mondiale.",
      subtitle: "",
      cta: "Lire la vision",
      nodes: [
        { first: "L'IA", second: "nourrira le monde" },
        { first: "L'IA", second: "déplacera le monde" },
        { first: "L'IA", second: "soignera le monde" },
        { first: "L'IA", second: "déplacera l'argent" },
        { first: "L'IA", second: "alimentera le monde" },
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
        "Des capteurs et des systèmes donnent une image en direct et fidèle de n'importe quel environnement physique. Fini les devinettes à partir de données dispersées.",
        "Nos modèles relient les signaux à leurs causes : les anomalies sont expliquées, pas seulement signalées.",
        "Nos moteurs de prédiction anticipent ce qui va se produire avant que cela n'arrive, du stress des cultures aux pénuries d'approvisionnement.",
        "Chaque trajectoire de décision est simulée et hiérarchisée : les opérateurs voient des scénarios, pas une seule devinette.",
        "L'intelligence se termine en action : des recommandations claires que les humains et les machines peuvent exécuter sur le terrain.",
      ],
      loopEyebrow: "La boucle d'intelligence",
      loopHeading: "Bouclez avec Gytev.",
      loopSteps: [
        { label: "Données", description: "Capteurs et systèmes captent le pouls des environnements physiques." },
        { label: "Compréhension", description: "Nos modèles transforment les signaux bruts en image vivante du réel." },
        { label: "Prédiction", description: "Le système anticipe ce qui va se produire, avant que cela n'arrive." },
        { label: "Décision", description: "L'analyse devient un choix clair, hiérarchisé pour les opérateurs." },
        { label: "Action", description: "Humains et machines agissent, et la boucle apprend du résultat." },
      ],
      keyDatesHeading: "Les dates clés de Gytev.",
      eventTypes: {
        launch: "Lancement produit",
        funding: "Levée de fonds",
        leadership: "Leadership",
        milestone: "Entreprise",
      },
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
          { name: "Coopérative de l'Alibori", sector: "Agritech" },
          { name: "Banque de Sang du Bénin", sector: "Santé" },
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
              heading: "Parcelle de maïs en floraison",
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
              heading: "Analyse du maïs",
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
              lines: ["Acheteur · Chaîne restaurants Cotonou", "Volume · 500 kg maïs", "Livraison · 3 jours", "Marge bénéficiaire · +34%"],
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
            { date: "12 janv. 2026", title: "Premières lignes de code", description: "Gytev démarre comme une petite équipe d'ingénieurs obsédée par la connexion de l'IA au monde physique.", type: "milestone" },
            { date: "3 mars 2026", title: "Lancement de Gytev", description: "L'entreprise est officiellement lancée, avec les jumeaux numériques et l'IA embarquée au coeur.", type: "milestone" },
            { date: "21 avr. 2026", title: "Rio, premier jumeau", description: "Premier déploiement du jumeau numérique agricole Rio dans les champs du Bénin.", type: "launch" },
            { date: "30 juin 2026", title: "RedQ & santé publique", description: "RedQ étend la mission à la santé publique, en gérant les dons de sang de bout en bout.", type: "launch" }
          ],
          teamHeading: "Les fondateurs de Gytev.",
          teamDescription: "Un ensemble d'esprits brillants, préparés et formés, mêlant profils business et jeunes talents techniques seniors. Nous nous appuyons sur un fort esprit de leadership au service d'une mission claire, d'une équipe R&D dédiée, de la sécurité et de la gouvernance.",
          partnersTitle: "Avec qui nous travaillons.",
          cta: {
            heading: "Prêt à construire avec nous ?",
            description: "Que vous souhaitiez rejoindre l'équipe d'ingénierie ou déployer nos solutions dans vos opérations.",
            primary: "Voir les carrières",
            secondary: "Nous contacter"
          }
        },
        careers: {
          kicker: "Carrières",
          title: "Carrières chez Gytev",
          heroTitle: "Construire l'intelligence pour le monde réel.",
          body: "Nous recrutons des ingénieurs, des chercheurs et des opérateurs qui connectent l'IA au monde réel. Nous traitons des enjeux mondiaux en agriculture, santé et infrastructures critiques qui exigent rigueur et impact.",
          ctaLabel: "Voir les postes ouverts",
          teamsHeading: "Découvrez nos équipes.",
          teamsDescription: "Nous construisons l'une des plateformes de systèmes intelligents les plus ambitieuses d'Afrique. Nous combinons capteurs, IA et expertise métier pour résoudre des problèmes réels dans l'agriculture, la santé et l'industrie.",
          teams: [
            { name: "IA & Recherche", description: "Modèles d'apprentissage automatique et jumeaux numériques qui comprennent le monde physique." },
            { name: "Ingénierie", description: "Les plateformes, le matériel et l'infrastructure qui donnent vie aux systèmes intelligents." },
            { name: "GTM", description: "Aider les clients à résoudre des défis métier réels avec nos solutions." },
            { name: "Corporate", description: "Construire les fondations opérationnelles pour le succès à long terme." },
            { name: "Opérations", description: "Déployer les capteurs, gérer la logistique et assurer l'impact réel sur le terrain." },
            { name: "Produit", description: "Concevoir les plateformes et expériences qui rendent les systèmes complexes compréhensibles." }
          ],
          stats: [
            { value: "150+", label: "collaborateurs" },
            { value: "3+", label: "pays" },
            { value: "5+", label: "secteurs" },
            { value: "50 %", label: "femmes" }
          ],
          cultureHeading: "Notre culture.",
          cultureDescription: "Chez Gytev, chaque individu a le pouvoir de modeler notre trajectoire. Nous favorisons la transparence et l'appropriation, où vos objectifs et idées sont visibles et valorisés dans toute l'entreprise. Avec des structures plates et une collaboration ouverte, vous prendrez les devants, créerez de l'impact et travaillerez pour concrétiser votre vision.",
          cultureImage: "/images/careers/culture.jpg",
          valuesHeading: "Nos valeurs.",
          values: [
            { title: "Le terrain d'abord", description: "Les modèles échouent lorsqu'ils n'ont pas rencontré la réalité. Nous construisons du matériel pour obtenir la vérité terrain, pas seulement pour scrapper internet." },
            { title: "Clarté radicale", description: "Les systèmes complexes exigent des explications simples. Nous communiquons directement, sans jargon d'entreprise." },
            { title: "Conçu pour durer", description: "Nos systèmes fonctionnent dans des environnements difficiles : fermes sans réseau électrique, banques de sang aux infrastructures défaillantes. Nous construisons pour la résilience." },
            { title: "Vitesse", description: "Nous expérimentons, itérons et livrons rapidement. Quand nous faisons des erreurs, nous nous efforçons de les détecter tôt." },
            { title: "Humilité", description: "Nous sommes collectivement responsables du succès de l'entreprise. Nous mettons la main à la pâte quand c'est nécessaire, où que ce soit dans l'organisation." }
          ],
          benefitsHeading: "Avantages.",
          benefitsDescription: "Nous soutenons le bien-être, la croissance et l'équilibre travail-vie de nos employés, avec une gamme d'avantages conçus pour répondre aux besoins divers de nos équipes.",
          benefitTabs: [
            {
              id: "health",
              label: "Santé & famille",
              items: [
                { title: "Couverture santé", description: "Plans premium à 100% pour les soins médicaux, dentaires et optiques pour vous et vos ayants droit." },
                { title: "Congé parental", description: "Congé payé pour tous les parents accouchants." },
                { title: "Soutien à la garde d'enfants", description: "Places de crèche réservées ou aide financière pour les parents actifs." }
              ]
            },
            {
              id: "financial",
              label: "Financier & carrière",
              items: [
                { title: "Plans de retraite", description: "Contributions patronales compétitives pour sécuriser votre avenir financier." },
                { title: "Soutien au déménagement", description: "Aide financière pour les frais de déménagement, parrainage de visa et services d'installation." },
                { title: "Budget formation", description: "Budget annuel pour conférences, cours et développement professionnel." }
              ]
            },
            {
              id: "daily",
              label: "Vie quotidienne & bien-être",
              items: [
                { title: "Indemnités repas", description: "Allocations mensuelles ou repas fournis au bureau." },
                { title: "Soutien transport", description: "Allocations mensuelles pour les transports en commun, parking ou mobilité durable." },
                { title: "Fitness et bien-être", description: "Subventions ou abonnements pour salles de sport, programmes bien-être ou activités fitness." }
              ]
            }
          ],
          interviewHeading: "Les étapes du processus.",
          interviewDescription: "Nous sommes intentionnels dans la façon dont nous constituons notre équipe. Nous cherchons des personnes authentiques, prêtes à retrousser leurs manches, embrasser l'inconfort et transformer les idées en résultats à grande échelle.",
          interviewTabs: [
            {
              id: "technical",
              label: "Rôles IA, Recherche & Ingénierie",
              steps: [
                { title: "Conversation introductive", description: "Une première conversation avec un recruteur ou manager pour comprendre votre expérience et vos intérêts." },
                { title: "Évaluations techniques", description: "Vous complétez une série d'exercices techniques conçus pour refléter les vrais défis sur lesquels vous travaillerez ici." },
                { title: "Conversation sur les valeurs", description: "Une dernière discussion pour explorer l'alignement avec nos valeurs et nos modes de travail." }
              ],
              image: "/images/careers/interview-technical.jpg"
            },
            {
              id: "operations",
              label: "Rôles Opérations, GTM & Corporate",
              steps: [
                { title: "Conversation introductive", description: "Vous commencez par une conversation avec un recruteur ou manager pour comprendre votre parcours et vos attentes." },
                { title: "Entretiens", description: "Vous rencontrerez le manager et des futurs coéquipiers, concentrés sur votre expertise fonctionnelle et votre approche des problèmes." },
                { title: "Étude de cas ou exercice", description: "Selon le rôle, vous pourriez compléter une étude de cas métier ou un exercice pratique aligné avec les responsabilités quotidiennes." },
                { title: "Conversation sur les valeurs", description: "Une dernière discussion pour explorer l'alignement avec nos valeurs et nos modes de travail." }
              ],
              image: "/images/careers/interview-operations.jpg"
            }
          ],
          lookForHeading: "Ce que nous recherchons.",
          lookFor: [
            { title: "Des personnes qui élèvent le niveau.", description: "Au-delà de l'expérience, nous valorisons les personnes avec un rigor intellectuel qui remettent en question la réflexion, affinent notre façon de travailler et apportent des perspectives éclairées.", image: "/images/careers/lookfor-1.jpg" },
            { title: "Des bâtisseurs, pas des exécutants.", description: "Nous voulons des personnes qui aiment se salir les mains et prendre possession du projet dès le premier jour. Confortables dans l'ambiguïté, insatisfaites tant que le problème n'est pas résolu.", image: "/images/careers/lookfor-2.jpg" },
            { title: "Directitude et authenticité.", description: "Nous cherchons des personnes qui accordent plus d'importance au fond qu'à la forme, structurées et directes dans leur communication. Nous séparons les idées des individus.", image: "/images/careers/lookfor-3.jpg" }
          ],
          rolesHeading: "Postes ouverts",
          rolesEmpty: "Aucun poste ouvert pour le moment, mais nous recherchons toujours des talents exceptionnels. Contactez-nous.",
          rolesDescription: "Nous construisons l'avenir des systèmes intelligents. Trouvez un poste où vous pouvez avoir un impact réel.",
          departments: [],
          applyForm: {
            modalTitle: "Postuler à ce poste",
            nameLabel: "Nom complet",
            namePlaceholder: "Jean Dupont",
            emailLabel: "Email",
            emailPlaceholder: "jean@exemple.com",
            phoneLabel: "Téléphone",
            phonePlaceholder: "+229 01 23 45 67",
            linkedinLabel: "Profil LinkedIn",
            linkedinPlaceholder: "https://linkedin.com/in/votre-profil",
            cvLabel: "Télécharger CV (PDF)",
            messageLabel: "Pourquoi êtes-vous intéressé?",
            messagePlaceholder: "Dites-nous pourquoi vous seriez un excellent candidat pour ce poste...",
            submitLabel: "Envoyer la candidature",
            sendingLabel: "Envoi en cours...",
            successLabel: "Candidature envoyée! Nous vous recontacterons bientôt.",
            errorLabel: "Une erreur s'est produite. Veuillez réessayer.",
            closeLabel: "Fermer"
          }
        },
        contact: {
          kicker: "Parlons-en",
          title: "Contacter Gytev",
          heroTitle: "Prendre contact",
          note: "Dites-nous ce que vous voulez observer, comprendre ou piloter.",
          officesHeading: "Notre Siège",
          offices: [
            { city: "Cotonou", address: "Ganhi, Cotonou", country: "Bénin" }
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
            { title: "Gytev lève 2M$ pour construire la couche d'intelligence de l'Afrique", source: "TechCrunch", date: "Mars 2025", excerpt: "La startup deeptech basée à Cotonou prévoit de déployer sa plateforme IoT pour l'agriculture et la santé en Afrique de l'Ouest.", tag: "Financement" },
            { title: "Rio se déploie en Afrique de l'Ouest", source: "African Business", date: "Juin 2025", excerpt: "Les jumeaux numériques pour l'agriculture arrivent chez les petits exploitants au Bénin.", tag: "Produit" },
            { title: "La banque de sang du Bénin se digitalise avec RedQ", source: "OMS Info", date: "Janvier 2026", excerpt: "Une plateforme nationale de gestion des dons de sang apporte une traçabilité complète du donneur à l'hôpital.", tag: "Impact" },
          ],
        },
                contactPage: {
          eyebrow: "Contact",
          heroTitle: "Entrer en contact avec l'équipe.",
          heroSub: "Commencez votre voyage vers l'intelligence du monde réel.",
          helpHeading: "Besoin d'aide ?",
          cards: {
            titles: {
              team: "Parler à l'équipe.",
              support: "Support.",
              press: "Presse et événements.",
              privacy: "Demandes de confidentialité.",
              vulnerability: "Divulgation de vulnérabilités.",
            },
            support: {
              helpPrefix: "Consultez notre ",
              helpLink: "centre d'aide",
              loginLink: "Connectez-vous",
              loginSuffix: " pour discuter avec le support.",
              discordPrefix: "Rejoignez notre ",
              discordLabel: "Discord",
              discordSuffix: " pour le support communautaire.",
              cta: "Aller au centre d'aide",
            },
            press: { prefix: "Écrivez-nous à ", email: "press@gytev.com" },
            privacy: {
              text: "Vous disposez de droits concernant la gestion de vos données. Contactez-nous via notre plateforme.",
              cta: "Envoyer ici",
            },
            vulnerability: {
              text: "Si vous avez découvert une faille de sécurité sur l'un de nos produits, vous pouvez la signaler via notre programme de divulgation.",
              smallPrint: "Les bugs généraux doivent être signalés via nos canaux de support standard.",
              cta: "Envoyer ici",
            },
          },
          forms: {
            thanks: "Merci pour votre envoi.",
            sending: "Envoi…",
            legal: "En envoyant ce formulaire, vous acceptez nos conditions d'utilisation. Nous traitons vos données afin de répondre à votre demande, conformément à notre politique de confidentialité.",
            updates: "Je souhaite recevoir les actualités et nouveaux produits de Gytev.",
            submit: "Parler à l'équipe",
            error: "Une erreur est survenue lors de l'envoi. Réessayez ou écrivez-nous directement.",
            team: {
              firstname: { label: "Prénom", placeholder: "Awa" },
              lastname: { label: "Nom", placeholder: "Gytev" },
              email: { label: "E-mail professionnel", placeholder: "awa@entreprise.com" },
              role: { label: "Fonction", placeholder: "Ingénieur" },
              message: {
                label: "Décrivez votre projet, pour que nous vous mettions en relation avec la bonne équipe.",
                placeholder: "Partagez vos objectifs et vos besoins de déploiement, performance ou échelle.",
              },
            },
            support: {
              email: { label: "E-mail", placeholder: "vous@exemple.com" },
              issue: { label: "Comment pouvons-nous aider ?", placeholder: "Décrivez le problème rencontré." },
            },
            press: {
              name: { label: "Nom complet", placeholder: "Awa Diallo" },
              email: { label: "E-mail", placeholder: "awa@journal.com" },
              outlet: { label: "Média", placeholder: "Nom du média" },
              request: { label: "Votre demande", placeholder: "Interview, informations, accréditation…" },
            },
            privacy: {
              email: { label: "E-mail", placeholder: "vous@exemple.com" },
              typeLabel: "Type de demande",
              typePlaceholder: "Choisir",
              details: { label: "Détails", placeholder: "Précisez votre demande." },
            },
            vulnerability: {
              email: { label: "E-mail", placeholder: "security@exemple.com" },
              product: { label: "Produit concerné", placeholder: "Rio, RedQ, Quiisa…" },
              report: { label: "Description de la vulnérabilité", placeholder: "Étapes de reproduction, impact, preuves de concept." },
            },
          },
        },
internships: {
          kicker: "Grandissez avec nous",
          title: "Stages",
          heroTitle: "Commencez votre carrière en deeptech.",
          body: "Les stages chez Gytev sont concrets. Vous livrerez du vrai code, déployerez du vrai matériel ou résoudrez de vrais problèmes opérationnels, pas du café.",
          departments: [
            {
              name: "Ingénierie & IA",
              openings: [
                { title: "Stagiaire ML Engineer", location: "Cotonou / Remote", type: "6 mois", description: "Travaillez sur des modèles de séries temporelles pour la prédiction agricole. Entraînement, évaluation et déploiement en production." },
                { title: "Stagiaire Systèmes Embarqués", location: "Cotonou", type: "6 mois", description: "Contribuez au firmware de nos boîtiers IoT. C/Rust, informatique basse consommation, intégration de capteurs." },
              ],
            },
            {
              name: "Opérations & Produit",
              openings: [
                { title: "Stagiaire Design Produit", location: "Cotonou", type: "4 mois", description: "Aidez à concevoir les interfaces que les agriculteurs et le personnel hospitalier utilisent au quotidien. Recherche, prototypage, tests utilisateurs." },
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
            { title: "Flexibilité", description: "Télétravail par défaut, bureaux à Cotonou. Travaillez là où vous êtes le plus efficace." },
            { title: "Budget formation", description: "Budget annuel pour conférences, formations et livres. Nous investissons dans votre croissance." },
            { title: "Equity", description: "Tous les membres de l'équipe reçoivent des actions. Quand Gytev grandit, tout le monde grandit." },
            { title: "Couverture santé", description: "Assurance santé complète pour vous et votre famille." },
            { title: "Aide à la relocation", description: "Nous vous aidons à vous installer à Cotonou avec un package de relocation." },
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
                { label: "Sécurité & confidentialité", href: "/company/about" },
                { label: "Confiance & transparence", href: "/company/about" },
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
              title: "Équipes",
              links: [
                { label: "Finance", href: "/solutions/teams/finance" },
                { label: "Data Analytics", href: "/solutions/teams/data-analytics" },
                { label: "Sales", href: "/solutions/teams/sales" },
                { label: "Marketing", href: "/solutions/teams/marketing" },
                { label: "Operations", href: "/solutions/teams/operations" },
                { label: "Engineering", href: "/solutions/teams/engineering" },
                { label: "Design", href: "/solutions/teams/design" },
              ],
            },
            {
              title: "Industries",
              links: [
                { label: "Cybersécurité", href: "/solutions/industries/cybersecurity" },
                { label: "Services financiers", href: "/solutions/industries/financial-services" },
                { label: "Sciences de la vie", href: "/solutions/industries/life-sciences" },
                { label: "Santé", href: "/solutions/industries/healthcare" },
                { label: "Commerce de détail", href: "/solutions/industries/retail" },
                { label: "Secteur public", href: "/solutions/industries/government" },
                { label: "Éducation", href: "/solutions/industries/education" },
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
                { label: "Conditions d'utilisation", href: "/company/about" },
                { label: "Politique de confidentialité", href: "/company/about" },
              ],
            },
          ],
        },
      ],
    },
  },
};
