export interface AdBuilderState {
  selectedPhotos: number[];
  coverPhotoIndex: number | null;
  adCopy: string;
  callToAction: string;
  openHouses: OpenHouseEvent[];
  selectedActors: number[];
  script: string;
  scriptReviewed: boolean;
  selectedMusicId: string;
  openStep: string;
  listings: ListingData[];
}

export interface OpenHouseEvent {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ListingData {
  id: string;
  isDraft: boolean;
  status: string;
  listingType: string;
  isManuallyCreated: boolean;
  images: string[];
  primaryImageIndex: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  price: number;
  propertyType: string;
  mlsNumber: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  lotSizeUnit: string;
  yearBuilt: number;
  stories: number;
  garageSpaces: number;
  features: {
    pool: boolean;
    spa: boolean;
    fireplace: boolean;
    centralAC: boolean;
    hardwoodFloors: boolean;
    updatedKitchen: boolean;
    updatedBathrooms: boolean;
    smartHome: boolean;
    hasHOA: boolean;
    gatedCommunity: boolean;
    waterfront: boolean;
  };
  description: string;
  schools: School[];
  hoaFees?: number;
  propertyTax?: number;
  daysOnMarket?: number;
  heating?: string;
  cooling?: string;
  parking?: string;
}

export interface School {
  id: string;
  name: string;
  type: "Elementary" | "Middle" | "High";
  distance: string;
  rating?: number;
}

export type AdFormat = "image" | "video" | "carousel";

export interface CallToActionOption {
  value: string;
  label: string;
  description?: string;
}
