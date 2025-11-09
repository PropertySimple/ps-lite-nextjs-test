"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ListingDetailsForm } from "./ListingDetailsForm";
import { ListingData } from "@/types/adBuilder";

interface AddListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveListing: (listing: ListingData) => void;
  editingListing?: ListingData | null;
  onDeleteListing?: (listingId: string) => void;
}

export const AddListingModal = ({ open, onOpenChange, onSaveListing, editingListing, onDeleteListing }: AddListingModalProps) => {
  const [listingUrl, setListingUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [scrapedData, setScrapedData] = useState<Partial<ListingData> | null>(null);
  const initializedRef = useRef(false);

  // When editing a listing, setup initial state
  useEffect(() => {
    if (editingListing && open && !initializedRef.current) {
      initializedRef.current = true;
      setTimeout(() => {
        setShowForm(true);
        setScrapedData(editingListing);
      }, 0);
    } else if (!open) {
      initializedRef.current = false;
    }
  }, [editingListing, open]);

  const handleSubmit = async () => {
    if (!listingUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a listing URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Implement actual listing import logic
    // Simulate scraping delay
    setTimeout(() => {
      // Mock scraped data - in real implementation, this would come from the scraping service
      const mockScrapedData: Partial<ListingData> = {
        isManuallyCreated: true, // Listings added through this flow are manually created
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        primaryImageIndex: 0,
        address: {
          street: "1600 Amphitheatre Parkway",
          city: "Mountain View",
          state: "CA",
          zip: "94043"
        },
        price: 1500000,
        propertyType: "Single Family",
        mlsNumber: "ML81234567",
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        lotSize: 7500,
        lotSizeUnit: "sqft",
        yearBuilt: 2015,
        stories: 2,
        garageSpaces: 2,
        description: "Beautiful single family home with modern amenities and great location.",
      };
      
      setScrapedData(mockScrapedData);
      setIsLoading(false);
      setShowForm(true);
      
      toast({
        title: "Listing Imported",
        description: "Review and edit the details below.",
      });
    }, 2000);
  };

  const handleFormSubmit = (data: ListingData) => {
    onSaveListing(data);
    handleClose();
  };

  const handleBack = () => {
    if (editingListing) {
      // If editing, close the modal instead of going back to URL input
      handleClose();
    } else {
      // If adding new, go back to URL input
      setShowForm(false);
      setScrapedData(null);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setListingUrl("");
    setScrapedData(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={showForm ? "max-w-4xl h-[95vh] sm:max-h-[90vh] p-0 flex flex-col" : "sm:max-w-md"}>
        {!showForm ? (
          <>
            <DialogHeader>
              <DialogTitle>Add Your Listing</DialogTitle>
              <DialogDescription className="space-y-2">
                <p>
                  Please paste a link to your listing, must be a public page so the crawlers can scrape it.
                </p>
                <p className="text-sm">
                  The AI will import your listing and you can edit it if needed before running your ad.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="https://example.com/listing/123"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Importing..." : "Import Listing"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ListingDetailsForm
            initialData={scrapedData || undefined}
            onSubmit={handleFormSubmit}
            onBack={handleBack}
            onDelete={editingListing && onDeleteListing ? () => {
              if (confirm("Are you sure you want to delete this listing?")) {
                onDeleteListing(editingListing.id);
                handleClose();
              }
            } : undefined}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
