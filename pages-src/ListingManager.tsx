"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import { Bed, Bath, Plus, Edit, Trash2, CheckCircle, PlayCircle, PartyPopper, Home, Package } from "lucide-react";
import { ListingCard } from "@/components/listing-manager/ListingCard";
import { AddListingModal } from "@/components/ad-builder/AddListingModal";
import { useAdBuilder } from "@/hooks/useAdBuilder";
import type { ListingData } from "@/types/adBuilder";
import { ListingSelectionModal, type Listing as WebsiteListing } from "@/components/listing-manager/ListingSelectionModal";
import { SaleDetailsModal } from "@/components/listing-manager/SaleDetailsModal";
import { AdTypeSelectionModal } from "@/components/ad-builder/AdTypeSelectionModal";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";
import { PageHelper } from "@/components/common/PageHelper";
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

const ListingManager = () => {
  const router = useRouter();
  const { state, actions } = useAdBuilder();
  const { toast } = useToast();
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<ListingData | null>(null);
  const [isListingSelectionModalOpen, setIsListingSelectionModalOpen] = useState(false);
  const [isSaleDetailsModalOpen, setIsSaleDetailsModalOpen] = useState(false);
  const [selectedListingForSale, setSelectedListingForSale] = useState<WebsiteListing | null>(null);
  const [soldListings, setSoldListings] = useState<Set<string>>(new Set());
  const [adTypeModalOpen, setAdTypeModalOpen] = useState(false);
  const [selectedListingForCampaign, setSelectedListingForCampaign] = useState<Listing | null>(null);
  const [hiddenListings, setHiddenListings] = useState<Set<string>>(new Set());

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

  const handleMarkAsSold = (listing: WebsiteListing) => {
    setSelectedListingForSale(listing);
    setIsListingSelectionModalOpen(false);
    setIsSaleDetailsModalOpen(true);
  };

  const handleSaveSaleDetails = (saleData: { salePrice: string; closingDate: Date }) => {
    if (selectedListingForSale) {
      setSoldListings(prev => new Set([...prev, selectedListingForSale.id]));
      toast({
        title: "Listing Marked as Sold",
        description: "The property has been marked as sold."
      });
    }
    setIsSaleDetailsModalOpen(false);
    setSelectedListingForSale(null);
  };

  const handleUnsellListing = () => {
    if (selectedListingForSale) {
      setSoldListings(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedListingForSale.id);
        return newSet;
      });
      toast({
        title: "Listing Unmarked",
        description: "The listing has been unmarked as sold."
      });
    }
    setIsSaleDetailsModalOpen(false);
    setSelectedListingForSale(null);
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

  const handleJustSoldAdClick = (listing: Listing | ListingData) => {
    logger.log("Creating Just Sold ad for listing:", listing);
    // TODO: Navigate to Just Sold ad creation flow
  };

  const handleHideListing = (listingId: string) => {
    setHiddenListings(prev => new Set([...prev, listingId]));
    toast({
      title: "Listing Hidden",
      description: "This listing has been hidden from view.",
    });
  };

  // Convert listing to WebsiteListing format for the modal
  const convertToWebsiteListing = (listing: Listing | ListingData): WebsiteListing => {
    if ('isManuallyCreated' in listing) {
      const l = listing as ListingData;
      return {
        id: l.id,
        address: `${l.address.street}, ${l.address.city}, ${l.address.state}`,
        price: formatPrice(l.price),
        bedrooms: l.bedrooms,
        bathrooms: l.bathrooms,
        image: l.images[l.primaryImageIndex] || l.images[0] || '/placeholder.svg',
        status: soldListings.has(l.id) ? "Sold" : (l.status === "Active" ? "For Sale" : "For Rent"),
        isSold: soldListings.has(l.id)
      };
    } else {
      const l = listing as Listing;
      return {
        id: l.id,
        address: l.address,
        price: formatPrice(l.price),
        bedrooms: l.bedrooms,
        bathrooms: l.bathrooms,
        image: l.imageUrl,
        status: soldListings.has(l.id) ? "Sold" : (l.status === "active" ? "For Sale" : "For Rent"),
        isSold: soldListings.has(l.id)
      };
    }
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
    const isSold = soldListings.has(l.id);
    const isHidden = hiddenListings.has(l.id);
    if (isSold || isHidden) return false;
    return ('status' in l && l.status === "Active") ||
           ('status' in l && l.status === "active");
  });

  const inactiveListings = allListings.filter((l) => {
    const isSold = soldListings.has(l.id);
    const isHidden = hiddenListings.has(l.id);
    if (isSold || isHidden) return false;
    return ('status' in l && (l.status === "Pending" || l.status === "Sold" || l.status === "off-market"));
  });

  const soldListingsData = allListings.filter((l) => {
    const isHidden = hiddenListings.has(l.id);
    return soldListings.has(l.id) && !isHidden;
  });

  // Get unsold active listings for the modal
  const unsoldActiveListings = activeListings.map(convertToWebsiteListing).filter(l => !l.isSold);

  return (
    <PageLayout
      headerActions={
        <Button onClick={handleAddNewListing} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Listing
        </Button>
      }
    >
      <PageHeader
        title="Manage Your Listings & Start Campaigns"
        description="Import any property to create AI-powered video campaigns. Don't see your listing? Click 'Add New Listing' to import it."
      />

      <div className="border-t border-border my-8" />

      {/* Sold Listings Section */}
      {soldListingsData.length > 0 && (
        <div className="space-y-4">
          <SectionHeader
            IconComponent={PartyPopper}
            title="Sold"
            count={soldListingsData.length}
            description="Properties you've successfully sold. Create 'Just Sold' ads to attract new seller leads in the neighborhood."
          />
          <div className="space-y-4">
            {soldListingsData.map((listing) => {
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
                    status="sold"
                    primaryActionLabel="Create Just Sold Ad"
                    primaryActionVariant="orange"
                    onPrimaryAction={() => handleJustSoldAdClick(listingData)}
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
                  status="sold"
                  primaryActionLabel="Create Just Sold Ad"
                  primaryActionVariant="orange"
                  onPrimaryAction={() => handleJustSoldAdClick(mockListing)}
                />
              );
            })}
          </div>
        </div>
      )}

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
              const websiteListing = convertToWebsiteListing(listingData);

              return (
                <ListingCard
                  key={listingData.id}
                  price={formatPrice(listingData.price)}
                  address={`${listingData.address.street}, ${listingData.address.city}`}
                  bedrooms={listingData.bedrooms}
                  bathrooms={listingData.bathrooms}
                  imageUrl={primaryImage}
                  status="active"
                  primaryActionLabel="Start New Campaign"
                  onPrimaryAction={() => handleStartCampaign(listingData)}
                  showEditDelete={listingData.isManuallyCreated}
                  onEdit={() => handleEditListing(listingData)}
                  onDelete={() => handleDeleteListing(listingData.id)}
                />
              );
            }

            const mockListing = listing as Listing;
            const websiteListing = convertToWebsiteListing(mockListing);

            return (
              <ListingCard
                key={mockListing.id}
                price={formatPrice(mockListing.price)}
                address={mockListing.address}
                bedrooms={mockListing.bedrooms}
                bathrooms={mockListing.bathrooms}
                imageUrl={mockListing.imageUrl}
                status="active"
                primaryActionLabel="Start New Campaign"
                onPrimaryAction={() => handleStartCampaign(mockListing)}
                showMarkAsSold={true}
                onMarkAsSold={() => handleMarkAsSold(websiteListing)}
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
            description="Listings no longer active. Create 'Just Sold' ads or hide listings you don't want to see anymore."
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
                    primaryActionLabel="Create Just Sold Ad"
                    onPrimaryAction={() => handleJustSoldAdClick(listingData)}
                    showHide={true}
                    onHide={() => handleHideListing(listingData.id)}
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
                  primaryActionLabel="Create Just Sold Ad"
                  onPrimaryAction={() => handleJustSoldAdClick(mockListing)}
                  showHide={true}
                  onHide={() => handleHideListing(mockListing.id)}
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

      <ListingSelectionModal
        open={isListingSelectionModalOpen}
        onOpenChange={setIsListingSelectionModalOpen}
        listings={unsoldActiveListings}
        onMarkAsSold={handleMarkAsSold}
      />

      <SaleDetailsModal
        open={isSaleDetailsModalOpen}
        onOpenChange={setIsSaleDetailsModalOpen}
        listing={selectedListingForSale}
        onSave={handleSaveSaleDetails}
        onUnsellListing={handleUnsellListing}
      />

      <AdTypeSelectionModal
        open={adTypeModalOpen}
        onOpenChange={setAdTypeModalOpen}
        onSelectAdType={handleAdTypeSelect}
        listingStatus={selectedListingForCampaign?.status}
      />
    </PageLayout>
  );
};

export default ListingManager;
