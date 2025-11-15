
export interface AdVideo {
  url: string;
  thumbnailUrl: string;
  type: 'listing-tour' | 'agent-intro';
}

export interface Ad {
  id: number;
  title: string;
  address: string;
  leads: number;
  listingImage: string;
  videos?: AdVideo[];
  daysLeft?: number;
  completed?: boolean;
  startDate?: string;
  endDate?: string;
  adSpend?: number;
  reach?: number;
  status?: 'running' | 'paused' | 'ended';
}

export interface Campaign {
  id: string;
  property: string;
  dateRange: string;
  adSpend: string;
  impressions: string;
  interactions: string;
  listingImage: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'lead' | 'client' | 'prospect';
  lastActivity: string;
  source: string;
}

export interface PerformanceMetric {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export interface ZipCodeData {
  id: string;
  zipCode: string;
  city: string;
  state: string;
  totalListings: number;
  listingsForSale: number;
  listingsForRent: number;
  newListingsThisMonth: number;
  priceRange: {
    min: number;
    max: number;
  };
  performance: {
    totalViews: number;
    totalLeads: number;
    viewsHistory: { date: string; value: number }[];
    leadsHistory: { date: string; value: number }[];
  };
}

export interface PropertyListing {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  status: 'active_campaign' | 'market_opportunity';
  performance?: {
    views: number;
    clicks: number;
    leads: number;
  };
  campaignId?: string;
}

export interface ZipCodeLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  leadSource: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}
