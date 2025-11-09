
import { Ad, Campaign, PerformanceMetric, ZipCodeData, PropertyListing, ZipCodeLead } from './types';

export const runningAds: Ad[] = [
  {
    id: 1,
    title: "Open House Event",
    address: "123 Main St, Anytown, USA",
    leads: 12,
    adSpend: 149,
    reach: 1247,
    listingImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    daysLeft: 5,
    startDate: "2025-10-03",
    endDate: "2025-10-13",
  },
  {
    id: 2,
    title: "Luxury Home Tour",
    address: "456 Elm St, Anytown, USA",
    leads: 8,
    adSpend: 299,
    reach: 2134,
    listingImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    videos: [
      {
        url: "https://res.cloudinary.com/dllxfbgxs/video/upload/v1733952453/Instagram_Ad_yt6rh6.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
        type: "listing-tour"
      }
    ],
    daysLeft: 3,
    startDate: "2025-10-05",
    endDate: "2025-10-11",
  },
  {
    id: 3,
    title: "New Listing Showcase",
    address: "789 Oak Ave, Anytown, USA",
    leads: 15,
    adSpend: 199,
    reach: 1876,
    listingImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    videos: [
      {
        url: "https://res.cloudinary.com/dllxfbgxs/video/upload/v1733952453/Instagram_Ad_yt6rh6.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
        type: "listing-tour"
      },
      {
        url: "https://res.cloudinary.com/daj3aasjc/video/upload/v1734048421/Instagram_Ad_5_xgodey.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
        type: "agent-intro"
      }
    ],
    daysLeft: 7,
    startDate: "2025-10-01",
    endDate: "2025-10-15",
  },
];

export const pastAds: Ad[] = [
  {
    id: 4,
    title: "Open House Event",
    address: "570 Galer St, Seattle, WA 98109",
    leads: 18,
    adSpend: 249,
    reach: 2456,
    listingImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    completed: true,
    startDate: "2025-09-15",
    endDate: "2025-09-30",
  },
];

export const campaignData: Record<string, Campaign> = {
  "1": {
    id: "1",
    property: "123 First Ave",
    dateRange: "Oct. 21 2025 - Oct. 24 2025",
    adSpend: "$149",
    impressions: "563",
    interactions: "14",
    listingImage: "/public/listing-images/white-house-listing.jpg",
  },
  "2": {
    id: "2",
    property: "2974 Mariposa Dr.",
    dateRange: "Oct. 21 2025 - Oct. 24 2025", 
    adSpend: "$75",
    impressions: "650",
    interactions: "8",
    listingImage: "/lovable-uploads/gray-wooden-house.jpg",
  },
  "3": {
    id: "3",
    property: "456 Oak Street",
    dateRange: "Oct. 21 2025 - Oct. 24 2025",
    adSpend: "$120",
    impressions: "920",
    interactions: "15",
    listingImage: "/lovable-uploads/gray-wooden-house.jpg",
  },
  "4": {
    id: "4",
    property: "789 Pine Avenue",
    dateRange: "Oct. 21 2025 - Oct. 24 2025",
    adSpend: "$200",
    impressions: "1100",
    interactions: "22",
    listingImage: "/lovable-uploads/gray-wooden-house.jpg",
  },
};

export const performanceMetrics: PerformanceMetric[] = [
  {
    title: "Total Ad Spend",
    value: "$499",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Total Impressions", 
    value: "12,087",
    trend: "+8%",
    trendUp: true,
  },
  {
    title: "Total Interactions",
    value: "198",
    trend: "+15%",
    trendUp: true,
  },
];

// Helper function to generate realistic 30-day historical data that sums to the total
const generateHistoricalData = (totalValue: number, days: number = 30, variance: number = 0.3) => {
  const data = [];
  const today = new Date();
  const baseValue = totalValue / days;
  
  // Generate daily values with variance
  const dailyValues = [];
  let currentSum = 0;
  
  for (let i = 0; i < days; i++) {
    const isWeekend = (i % 7 === 0 || i % 7 === 6); // Simulate weekend pattern
    let multiplier = Math.random() * variance + (1 - variance/2);
    
    // Reduce weekend activity
    if (isWeekend) {
      multiplier *= 0.7;
    }
    
    const value = Math.round(baseValue * multiplier);
    dailyValues.push(Math.max(0, value));
    currentSum += Math.max(0, value);
  }
  
  // Adjust the values to match the exact total
  const adjustment = totalValue - currentSum;
  if (adjustment !== 0 && dailyValues.length > 0) {
    // Distribute the adjustment across non-zero days
    const nonZeroDays = dailyValues.filter(v => v > 0);
    if (nonZeroDays.length > 0) {
      const adjustmentPerDay = Math.round(adjustment / nonZeroDays.length);
      for (let i = 0; i < dailyValues.length && adjustment !== 0; i++) {
        if (dailyValues[i] > 0) {
          const oldValue = dailyValues[i];
          dailyValues[i] = Math.max(0, dailyValues[i] + adjustmentPerDay);
          const actualAdjustment = dailyValues[i] - oldValue;
          currentSum += actualAdjustment;
        }
      }
    }
  }
  
  // Create the final data structure with dates
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - 1 - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: dailyValues[i]
    });
  }
  
  return data;
};

export const zipCodeData: ZipCodeData[] = [
  {
    id: "1",
    zipCode: "34223",
    city: "Sarasota",
    state: "FL",
    totalListings: 47,
    listingsForSale: 32,
    listingsForRent: 15,
    newListingsThisMonth: 12,
    priceRange: {
      min: 285000,
      max: 1200000,
    },
    performance: {
      totalViews: 4597,
      totalLeads: 12,
      viewsHistory: generateHistoricalData(4597, 30, 0.4), // Daily views that sum to 4597
      leadsHistory: generateHistoricalData(12, 30, 0.7),    // Daily leads that sum to 12
    },
  },
  {
    id: "2",
    zipCode: "98109",
    city: "Seattle",
    state: "WA",
    totalListings: 23,
    listingsForSale: 18,
    listingsForRent: 5,
    newListingsThisMonth: 5,
    priceRange: {
      min: 450000,
      max: 2500000,
    },
    performance: {
      totalViews: 3842,
      totalLeads: 8,
      viewsHistory: generateHistoricalData(3842, 30, 0.3), // Daily views that sum to 3842
      leadsHistory: generateHistoricalData(8, 30, 0.8),   // Daily leads that sum to 8
    },
  },
  {
    id: "3",
    zipCode: "75201",
    city: "Dallas",
    state: "TX",
    totalListings: 35,
    listingsForSale: 24,
    listingsForRent: 11,
    newListingsThisMonth: 8,
    priceRange: {
      min: 320000,
      max: 1800000,
    },
    performance: {
      totalViews: 5234,
      totalLeads: 15,
      viewsHistory: generateHistoricalData(5234, 30, 0.35), // Daily views that sum to 5234
      leadsHistory: generateHistoricalData(15, 30, 0.6),     // Daily leads that sum to 15
    },
  },
];

export const propertyListings: PropertyListing[] = [
  {
    id: "1",
    address: "1425 Main St, Sarasota, FL 34223",
    price: 575000,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    status: "active_campaign",
    performance: {
      views: 2340,
      clicks: 89,
      leads: 4,
    },
    campaignId: "1",
  },
  {
    id: "2",
    address: "892 Bay Vista Dr, Sarasota, FL 34223",
    price: 425000,
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: "/lovable-uploads/3e82ffbb-de00-4042-830e-e1094d3c5921.png",
    status: "active_campaign",
    performance: {
      views: 1890,
      clicks: 67,
      leads: 3,
    },
    campaignId: "2",
  },
  {
    id: "3",
    address: "567 Palm Ave, Sarasota, FL 34223",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    status: "market_opportunity",
  },
  {
    id: "4",
    address: "234 Ocean Blvd, Sarasota, FL 34223",
    price: 1200000,
    bedrooms: 5,
    bathrooms: 4,
    imageUrl: "/lovable-uploads/3e82ffbb-de00-4042-830e-e1094d3c5921.png",
    status: "market_opportunity",
  },
];

export const zipCodeLeads: ZipCodeLead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(941) 555-0123",
    propertyAddress: "1425 Main St, Sarasota, FL 34223",
    leadSource: "Facebook Ad",
    createdAt: "2024-01-15T10:30:00Z",
    status: "new",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(941) 555-0456",
    propertyAddress: "892 Bay Vista Dr, Sarasota, FL 34223",
    leadSource: "Instagram Ad",
    createdAt: "2024-01-14T14:22:00Z",
    status: "contacted",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(941) 555-0789",
    propertyAddress: "1425 Main St, Sarasota, FL 34223",
    leadSource: "Google Ad",
    createdAt: "2024-01-13T16:45:00Z",
    status: "contacted",
  },
];
