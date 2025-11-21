"use client";

import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import { Plus, Home, Package } from "lucide-react";
import { ListingCard } from "@/components/listing-manager/ListingCard";
import { AddListingModal } from "@/components/ad-builder/AddListingModal";
import { useAdBuilder } from "@/hooks/useAdBuilder";
import type { ListingData } from "@/types/adBuilder";
import { AdTypeSelectionModal } from "@/components/ad-builder/AdTypeSelectionModal";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";
import { SectionHeader } from "@/components/common/SectionHeader";

interface Listing {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  status: "active" | "off-market";
  listingType: "sale" | "rent";
}

// Mock listings for simulation purposes
const mockListings: Listing[] = [
  {
    id: "mock-1",
    address: "1425 Main St, Sarasota, FL 34223",
    price: 575000,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    status: "active",
    listingType: "sale",
  },
  {
    id: "mock-2",
    address: "892 Ocean Blvd, Sarasota, FL 34242",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    status: "active",
    listingType: "sale",
  },
  {
    id: "mock-3",
    address: "456 Bay Drive, Sarasota, FL 34236",
    price: 3200,
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    status: "active",
    listingType: "rent",
  },
  {
    id: "mock-4",
    address: "789 Palm Avenue, Sarasota, FL 34231",
    price: 425000,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "/lovable-uploads/643e1ffc-f95d-4aa9-8537-db917a31c5c3.png",
    status: "off-market",
    listingType: "sale",
  },
  {
    id: "mock-5",
    address: "321 Sunset Lane, Sarasota, FL 34229",
    price: 2850,
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    status: "off-market",
    listingType: "rent",
  },
];

export default function ListingManagerPage() {
  const router = useRouter();
  const { state, actions } = useAdBuilder();
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<ListingData | null>(null);
  const [adTypeModalOpen, setAdTypeModalOpen] = useState(false);
  const [selectedListingForCampaign, setSelectedListingForCampaign] = useState<Listing | null>(null);

  const handleEditListing = (listing: ListingData) => {
    setEditingListing(listing);
    setAddListingModalOpen(true);
  };

  const handleAddNewListing = () => {
    setEditingListing(null);
    setAddListingModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setAddListingModalOpen(open);
    if (!open) {
      setEditingListing(null);
    }
  };

  const handleDeleteListing = (listingId: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      actions.deleteListing(listingId);
    }
  };

  const handleStartCampaign = (listing: Listing | ListingData) => {
    // Convert ListingData to Listing format for the modal
    if ('isManuallyCreated' in listing) {
      const listingData = listing as ListingData;
      const mockListing: Listing = {
        id: listingData.id,
        address: `${listingData.address.street}, ${listingData.address.city}, ${listingData.address.state}`,
        price: listingData.price,
        bedrooms: listingData.bedrooms,
        bathrooms: listingData.bathrooms,
        imageUrl: listingData.images[0] || '/placeholder.svg',
        status: listingData.status === "Active" ? "active" : "off-market",
        listingType: listingData.listingType === "For Sale" ? "sale" : "rent"
      };
      setSelectedListingForCampaign(mockListing);
    } else {
      setSelectedListingForCampaign(listing as Listing);
    }
    setAdTypeModalOpen(true);
  };

  const handleAdTypeSelect = (adTypeId: string) => {
    logger.log("Selected ad type:", adTypeId, "for listing:", selectedListingForCampaign);
    setAdTypeModalOpen(false);
    // Navigate to welcome page after campaign creation
    const mockCampaignId = "1";
    router.push(`/campaign-welcome/${mockCampaignId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Use listings from useAdBuilder state + mock listings for simulation
  const allListings = [...state.listings, ...mockListings];

  const activeListings = allListings.filter((l) => {
    return ('status' in l && l.status === "Active") ||
           ('status' in l && l.status === "active");
  });

  const inactiveListings = allListings.filter((l) => {
    return ('status' in l && (l.status === "Pending" || l.status === "Sold" || l.status === "off-market"));
  });

  return (
    <PageLayout
      headerActions={
        <Button onClick={handleAddNewListing} className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Listing</span>
          <span className="sm:hidden">Add</span>
        </Button>
      }
    >
      <PageHeader
        title="Start a Campaign"
        description="Choose a listing to create AI-powered video ads. Don't see your listing? Click 'Add New Listing' to import it."
      />

      <div className="border-t border-border my-8" />

      {/* Active Listings */}
      <div className="space-y-4">
        <SectionHeader
          IconComponent={Home}
          title="Active Listings"
          count={activeListings.length}
          description="Your current for-sale properties. Click 'Start New Campaign' to create video ads that drive buyer interest."
        />
        <div className="space-y-4">
          {activeListings.map((listing) => {
            const isListingData = 'isManuallyCreated' in listing;

            if (isListingData) {
              const listingData = listing as ListingData;
              const primaryImage = listingData.images[listingData.primaryImageIndex] || listingData.images[0];

              return (
                <ListingCard
                  key={listingData.id}
                  price={formatPrice(listingData.price)}
                  address={`${listingData.address.street}, ${listingData.address.city}`}
                  bedrooms={listingData.bedrooms}
                  bathrooms={listingData.bathrooms}
                  imageUrl={primaryImage}
                  status="active"
                  listingId="345-rim-shadows-dr-sedona"
                  primaryActionLabel="Start New Campaign"
                  onPrimaryAction={() => handleStartCampaign(listingData)}
                  showEditDelete={listingData.isManuallyCreated}
                  onEdit={() => handleEditListing(listingData)}
                  onDelete={() => handleDeleteListing(listingData.id)}
                />
              );
            }

            const mockListing = listing as Listing;

            return (
              <ListingCard
                key={mockListing.id}
                price={formatPrice(mockListing.price)}
                address={mockListing.address}
                bedrooms={mockListing.bedrooms}
                bathrooms={mockListing.bathrooms}
                imageUrl={mockListing.imageUrl}
                status="active"
                listingId="345-rim-shadows-dr-sedona"
                primaryActionLabel="Start New Campaign"
                onPrimaryAction={() => handleStartCampaign(mockListing)}
              />
            );
          })}
        </div>
      </div>

      {/* Off-Market Listings */}
      {inactiveListings.length > 0 && (
        <div className="space-y-4 mt-8">
          <SectionHeader
            IconComponent={Package}
            title="Off-Market"
            count={inactiveListings.length}
            description="Listings no longer active on market."
          />
          <div className="space-y-4">
            {inactiveListings.map((listing) => {
              const isListingData = 'isManuallyCreated' in listing;

              if (isListingData) {
                const listingData = listing as ListingData;
                const primaryImage = listingData.images[listingData.primaryImageIndex] || listingData.images[0];

                return (
                  <ListingCard
                    key={listingData.id}
                    price={formatPrice(listingData.price)}
                    address={`${listingData.address.street}, ${listingData.address.city}`}
                    bedrooms={listingData.bedrooms}
                    bathrooms={listingData.bathrooms}
                    imageUrl={primaryImage}
                    status="inactive"
                    listingId="345-rim-shadows-dr-sedona"
                  />
                );
              }

              const mockListing = listing as Listing;
              return (
                <ListingCard
                  key={mockListing.id}
                  price={formatPrice(mockListing.price)}
                  address={mockListing.address}
                  bedrooms={mockListing.bedrooms}
                  bathrooms={mockListing.bathrooms}
                  imageUrl={mockListing.imageUrl}
                  status="inactive"
                  listingId="345-rim-shadows-dr-sedona"
                />
              );
            })}
          </div>
        </div>
      )}

      <AddListingModal
        open={addListingModalOpen}
        onOpenChange={handleModalClose}
        onSaveListing={actions.saveListing}
        editingListing={editingListing}
        onDeleteListing={handleDeleteListing}
      />

      <AdTypeSelectionModal
        open={adTypeModalOpen}
        onOpenChange={setAdTypeModalOpen}
        onSelectAdType={handleAdTypeSelect}
        listingStatus={selectedListingForCampaign?.status}
      />
    </PageLayout>
  );
}
