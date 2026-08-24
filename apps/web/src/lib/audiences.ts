export type AudienceItem = {
  slug: string;
  en: { title: string; description: string };
  fr: { title: string; description: string };
};

export const TEAMS: AudienceItem[] = [
  {
    slug: "finance",
    en: { title: "Finance", description: "Understand cash flow, risk and forecasting with systems that read live operational data instead of stale spreadsheets." },
    fr: { title: "Finance", description: "Comprenez la trésorerie, le risque et les prévisions avec des systèmes qui lisent des données opérationnelles en temps réel plutôt que des tableurs obsolètes." },
  },
  {
    slug: "data-analytics",
    en: { title: "Data Analytics", description: "Turn raw telemetry into decisions with pipelines and models designed around your existing stack." },
    fr: { title: "Analyse de données", description: "Transformez la télémétrie brute en décisions grâce à des pipelines et des modèles conçus autour de votre stack existant." },
  },
  {
    slug: "sales",
    en: { title: "Sales", description: "Prioritize the right prospects and forecast your pipeline from grounded signals, not guesswork." },
    fr: { title: "Ventes", description: "Priorisez les bons prospects et prévoyez votre pipeline à partir de signaux fiables, pas d'approximations." },
  },
  {
    slug: "marketing",
    en: { title: "Marketing", description: "See what actually drives demand across channels and act on it while it still matters." },
    fr: { title: "Marketing", description: "Identifiez ce qui génère réellement la demande sur tous vos canaux et agissez tant que cela compte." },
  },
  {
    slug: "operations",
    en: { title: "Operations", description: "Orchestrate people, assets and logistics with a live picture of what is happening in the field." },
    fr: { title: "Opérations", description: "Orchestrez personnes, actifs et logistique avec une vision en direct de ce qui se passe sur le terrain." },
  },
  {
    slug: "engineering",
    en: { title: "Engineering", description: "Deploy edge AI and digital twins on top of your current infrastructure, without starting from zero." },
    fr: { title: "Ingénierie", description: "Déployez l'IA embarquée et les jumeaux numériques sur votre infrastructure actuelle, sans repartir de zéro." },
  },
  {
    slug: "design",
    en: { title: "Design", description: "Prototype with real-world data and ship interfaces your operators actually trust." },
    fr: { title: "Design", description: "Prototypez avec des données du monde réel et livrez des interfaces que vos opérateurs trustent vraiment." },
  },
];

export const INDUSTRIES: AudienceItem[] = [
  {
    slug: "cybersecurity",
    en: { title: "Cybersecurity", description: "Detect anomalies across physical and digital infrastructure before they become incidents." },
    fr: { title: "Cybersécurité", description: "Détectez les anomalies sur les infrastructures physiques et numériques avant qu'elles ne deviennent des incidents." },
  },
  {
    slug: "financial-services",
    en: { title: "Financial Services", description: "Credit scoring, fraud detection and operations powered by ground-truth data from the field." },
    fr: { title: "Services financiers", description: "Scoring de crédit, détection de fraude et opérations alimentées par des données terrain fiables." },
  },
  {
    slug: "life-sciences",
    en: { title: "Life Sciences", description: "Accelerate research and lab operations with reliable, reproducible intelligence." },
    fr: { title: "Sciences de la vie", description: "Accélérez la recherche et les opérations de laboratoire avec une intelligence fiable et reproductible." },
  },
  {
    slug: "healthcare",
    en: { title: "Healthcare", description: "From blood banks to hospitals, keep critical resources flowing where they are needed most." },
    fr: { title: "Santé", description: "Des banques de sang aux hôpitaux, gardez les ressources critiques là où on en a le plus besoin." },
  },
  {
    slug: "retail",
    en: { title: "Retail", description: "Match stock, supply and demand across every point of sale, in real time." },
    fr: { title: "Commerce de détail", description: "Alignez stock, approvisionnement et demande sur chaque point de vente, en temps réel." },
  },
  {
    slug: "government",
    en: { title: "Government", description: "Modernize public services with sovereign, transparent and auditable AI systems." },
    fr: { title: "Secteur public", description: "Modernisez les services publics avec des systèmes d'IA souverains, transparents et auditables." },
  },
  {
    slug: "education",
    en: { title: "Education", description: "Personalize learning paths and streamline institutions with responsible AI." },
    fr: { title: "Éducation", description: "Personnalisez les parcours d'apprentissage et rationalisez les institutions avec une IA responsable." },
  },
];

export function findAudience(
  collection: AudienceItem[],
  slug: string,
): AudienceItem | undefined {
  return collection.find((item) => item.slug === slug);
}
