"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Listing {
  id: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
  isSold?: boolean;
}

interface ListingSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listings: Listing[];
  onMarkAsSold: (listing: Listing) => void;
}

export function ListingSelectionModal({
  open,
  onOpenChange,
  listings,
  onMarkAsSold,
}: ListingSelectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Listings to Mark as Sold</DialogTitle>
          <DialogDescription>
            Review your listings below and mark any that you've recently sold to showcase them on your website.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-0">
                {/* Clean Image Display */}
                <div className="relative">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    unoptimized={listing.image.startsWith("http")}
                  />
                  {/* Simple status overlay */}
                  {listing.isSold && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        Recently Sold
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Listing Information */}
                <div className="p-4 space-y-3">
                  {/* Address Headline and Status */}
                  <div className="flex items-start justify-between">
                    <div className="text-lg font-bold text-foreground leading-tight">
                      {listing.address}
                    </div>
                    <Badge 
                      variant={listing.status === 'For Sale' ? 'destructive' : listing.status === 'For Rent' ? 'default' : 'secondary'}
                      className="text-xs ml-2 flex-shrink-0"
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  
                  {/* Price and Property Details */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="font-medium">
                      {listing.price}
                    </div>
                    <div>
                      {listing.bedrooms} Bed • {listing.bathrooms} Bath
                    </div>
                  </div>
                  
                  {/* Action Section */}
                  <div className="pt-2 border-t">
                    {listing.isSold ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">
                          ✓ Marked as sold
                        </span>
                        <Button variant="outline" size="sm">
                          Edit Details
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Did you sell this property?
                        </p>
                        <Button 
                          onClick={() => onMarkAsSold(listing)}
                          className="w-full bg-primary hover:bg-primary/90"
                          size="sm"
                        >
                          Yes, Mark as Sold
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}