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
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ListingDetailsForm } from "./ListingDetailsForm";
import { ListingData } from "@/types/adBuilder";
import { Database, Link2, ArrowLeft, Search } from "lucide-react";

interface AddListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveListing: (listing: ListingData) => void;
  editingListing?: ListingData | null;
  onDeleteListing?: (listingId: string) => void;
}

type ViewStep = "method-selection" | "mls-input" | "mls-confirmation" | "url-input" | "form";

interface MLSResult {
  mlsNumber: string;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

export const AddListingModal = ({ open, onOpenChange, onSaveListing, editingListing, onDeleteListing }: AddListingModalProps) => {
  const [viewStep, setViewStep] = useState<ViewStep>("method-selection");
  const [listingUrl, setListingUrl] = useState("");
  const [mlsNumber, setMlsNumber] = useState("");
  const [mlsResults, setMlsResults] = useState<MLSResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<Partial<ListingData> | null>(null);
  const initializedRef = useRef(false);

  // When editing a listing, setup initial state
  useEffect(() => {
    if (editingListing && open && !initializedRef.current) {
      initializedRef.current = true;
      setTimeout(() => {
        setViewStep("form");
        setScrapedData(editingListing);
      }, 0);
    } else if (!open) {
      initializedRef.current = false;
    }
  }, [editingListing, open]);

  // Mock MLS lookup function
  const handleMLSLookup = async () => {
    if (!mlsNumber.trim()) {
      toast({
        title: "MLS Number Required",
        description: "Please enter an MLS number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock MLS results - in real implementation, this would query your database
      const mockResults: MLSResult[] = [
        {
          mlsNumber: mlsNumber.trim(),
          address: "1600 Amphitheatre Parkway",
          city: "Mountain View",
          state: "CA",
          price: 1500000,
          bedrooms: 4,
          bathrooms: 3,
        },
      ];

      setMlsResults(mockResults);
      setIsLoading(false);

      if (mockResults.length > 0) {
        // Show confirmation screen for all results (single or multiple)
        setViewStep("mls-confirmation");
        // Auto-select if only one result
        if (mockResults.length === 1) {
          setSelectedResult(mockResults[0].mlsNumber);
        }
      } else {
        // No results found
        toast({
          title: "No Listings Found",
          description: "No listings found with that MLS number",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleMLSConfirmation = (result: MLSResult) => {
    // Convert MLS result to listing data format
    const mockScrapedData: Partial<ListingData> = {
      isManuallyCreated: true,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      primaryImageIndex: 0,
      address: {
        street: result.address,
        city: result.city,
        state: result.state,
        zip: "94043"
      },
      price: result.price,
      propertyType: "Single Family",
      mlsNumber: result.mlsNumber,
      bedrooms: result.bedrooms,
      bathrooms: result.bathrooms,
      squareFeet: 2500,
      lotSize: 7500,
      lotSizeUnit: "sqft",
      yearBuilt: 2015,
      stories: 2,
      garageSpaces: 2,
      description: "Imported from MLS feed. Review and edit the details below.",
    };

    setScrapedData(mockScrapedData);
    setViewStep("form");

    toast({
      title: "Listing Synced",
      description: "Listing imported from MLS. Review and edit the details below.",
    });
  };

  const handleURLSubmit = async () => {
    if (!listingUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a listing URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate scraping delay
    setTimeout(() => {
      const mockScrapedData: Partial<ListingData> = {
        isManuallyCreated: true,
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
      setViewStep("form");

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
      handleClose();
    } else {
      // Navigate back through the flow
      switch (viewStep) {
        case "mls-input":
          setViewStep("method-selection");
          setMlsNumber("");
          break;
        case "mls-confirmation":
          setViewStep("mls-input");
          setMlsResults([]);
          setSelectedResult("");
          break;
        case "url-input":
          setViewStep("method-selection");
          setListingUrl("");
          break;
        case "form":
          if (scrapedData?.mlsNumber && mlsResults.length > 0) {
            setViewStep("mls-confirmation");
          } else if (scrapedData?.mlsNumber) {
            setViewStep("mls-input");
          } else {
            setViewStep("url-input");
          }
          setScrapedData(null);
          break;
        default:
          setViewStep("method-selection");
      }
    }
  };

  const handleClose = () => {
    setViewStep("method-selection");
    setListingUrl("");
    setMlsNumber("");
    setMlsResults([]);
    setSelectedResult("");
    setScrapedData(null);
    onOpenChange(false);
  };

  const renderContent = () => {
    switch (viewStep) {
      case "method-selection":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Add Your Listing</DialogTitle>
              <DialogDescription>
                Choose how you'd like to add your listing
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Card
                className="p-6 cursor-pointer hover:border-primary transition-colors"
                onClick={() => setViewStep("mls-input")}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Sync from MLS Feed</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your MLS number to automatically import listing details from our database
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className="p-6 cursor-pointer hover:border-primary transition-colors"
                onClick={() => setViewStep("url-input")}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Link2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Paste Listing Link</h3>
                    <p className="text-sm text-muted-foreground">
                      Provide a link to your listing page and we'll scrape the details
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </>
        );

      case "mls-input":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Sync from MLS</DialogTitle>
              <DialogDescription>
                Enter the MLS number of one of your active listings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mls-number">MLS Number</Label>
                <Input
                  id="mls-number"
                  placeholder="e.g., ML81234567"
                  value={mlsNumber}
                  onChange={(e) => setMlsNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleMLSLookup} disabled={isLoading}>
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </>
        );

      case "mls-confirmation":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Listing</DialogTitle>
              <DialogDescription>
                {mlsResults.length === 1
                  ? "Please confirm this is your listing."
                  : "Multiple listings found. Please select yours."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <RadioGroup value={selectedResult} onValueChange={setSelectedResult}>
                {mlsResults.map((result, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={result.mlsNumber} id={result.mlsNumber} />
                      <Label htmlFor={result.mlsNumber} className="flex-1 cursor-pointer">
                        <div className="font-semibold">{result.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.city}, {result.state} • MLS# {result.mlsNumber}
                        </div>
                        <div className="text-sm font-medium mt-1">
                          ${result.price.toLocaleString()} • {result.bedrooms} bed • {result.bathrooms} bath
                        </div>
                      </Label>
                    </div>
                  </Card>
                ))}
              </RadioGroup>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => {
                    const selected = mlsResults.find(r => r.mlsNumber === selectedResult);
                    if (selected) {
                      handleMLSConfirmation(selected);
                    }
                  }}
                  disabled={!selectedResult}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </>
        );

      case "url-input":
        return (
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
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleURLSubmit} disabled={isLoading}>
                  {isLoading ? "Importing..." : "Import Listing"}
                </Button>
              </div>
            </div>
          </>
        );

      case "form":
        return (
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
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={viewStep === "form" ? "max-w-4xl h-[95vh] sm:max-h-[90vh] p-0 flex flex-col" : "sm:max-w-md"}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
