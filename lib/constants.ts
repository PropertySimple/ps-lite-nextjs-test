
export const APP_CONFIG = {
  VIDEO_URL: "https://res.cloudinary.com/dllxfbgxs/video/upload/v1748968791/clips_bbz8qn.mp4",
  PRICING: {
    INDIVIDUAL_PROPERTY: 149,
    SUBSCRIPTION: 99,
    BASIC: 99,
    STARTER: 111,
    INFLUENCER: 120,
  },
  STATS: {
    ADS_SOLD: "20,000+",
    VIEWS_INCREASE: "140%",
    DELIVERY_TIME: "24-Hour",
    SATISFACTION: "98%",
  },
} as const;

export const ROUTES = {
  HOME: "/",
  AD_CREATION: "/ad-creation",
  AD_BUILDER: "/ad-builder",
  DASHBOARD: "/dashboard",
  REPORTS: "/reports",
  ZIP_CODES: "/zip-codes",
  CONTACTS: "/contacts",
  AI_ASSISTANT: "/ai-assistant",
  AI_AUTOMATION: "/ai-automation",
  SETTINGS: "/settings",
  HELP: "/help",
  EXPERIMENT_2: "/experiment2",
} as const;
