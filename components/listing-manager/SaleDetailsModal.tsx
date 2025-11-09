"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Listing } from "./ListingSelectionModal";

interface SaleDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Listing | null;
  onSave: (saleData: { salePrice: string; closingDate: Date }) => void;
  onUnsellListing: () => void;
}

export function SaleDetailsModal({
  open,
  onOpenChange,
  listing,
  onSave,
  onUnsellListing,
}: SaleDetailsModalProps) {
  const [salePrice, setSalePrice] = useState("");
  const [closingDate, setClosingDate] = useState<Date>();

  const handleSave = () => {
    if (salePrice && closingDate) {
      onSave({ salePrice, closingDate });
      setSalePrice("");
      setClosingDate(undefined);
    }
  };

  const handleUnsell = () => {
    onUnsellListing();
    setSalePrice("");
    setClosingDate(undefined);
  };

  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Your Listing Info</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Property Image */}
          <div className="rounded-lg overflow-hidden">
            <Image
              src={listing.image}
              alt={listing.address}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
              unoptimized={listing.image.startsWith("http")}
            />
          </div>

          {/* Closing Date */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Closing Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 text-base",
                    !closingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {closingDate ? format(closingDate, "MMMM dd, yyyy") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={closingDate}
                  onSelect={setClosingDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Final Sale Price */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Final Sale Price</Label>
            <Input
              type="text"
              placeholder="$0"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            <Button 
              onClick={handleSave}
              disabled={!salePrice || !closingDate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-base"
              size="lg"
            >
              Save
            </Button>
            
            <button
              onClick={handleUnsell}
              className="text-base underline hover:no-underline text-muted-foreground"
            >
              I didn't sell this listing
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}