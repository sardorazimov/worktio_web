export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    description: "Başlamak için ideal",
    color: "text-zinc-400",
    badge: "bg-zinc-800 text-zinc-400",
    limits: {
      executions: 1000,
      flows: 5,
      chatHistory: 30,
      webhook: false,
      prioritySupport: false,
    },
    features: [
      "1.000 yürütme / ay",
      "5 flow limiti",
      "30 gün sohbet geçmişi",
      "Temel node'lar",
    ],
    notIncluded: [
      "Webhook trigger",
      "Öncelikli destek",
      "Sınırsız flow",
    ],
  },
  pro: {
    name: "Pro",
    price: 29,
    description: "Profesyoneller için",
    color: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-400",
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID,
    limits: {
      executions: 50000,
      flows: 50,
      chatHistory: 365,
      webhook: true,
      prioritySupport: false,
    },
    features: [
      "50.000 yürütme / ay",
      "50 flow",
      "365 gün sohbet geçmişi",
      "Webhook trigger",
      "Tüm node'lar",
      "Flow şablonları",
    ],
    notIncluded: [
      "Öncelikli destek",
      "Özel entegrasyonlar",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    description: "Büyük ekipler için",
    color: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400",
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_ENTERPRISE_PRICE_ID,
    limits: {
      executions: -1, // sınırsız
      flows: -1,
      chatHistory: -1,
      webhook: true,
      prioritySupport: true,
    },
    features: [
      "Sınırsız yürütme",
      "Sınırsız flow",
      "Sınırsız geçmiş",
      "Webhook trigger",
      "Öncelikli destek",
      "Özel entegrasyonlar",
      "SLA garantisi",
    ],
    notIncluded: [],
  },
} as const;

export type PlanKey = keyof typeof PLANS;