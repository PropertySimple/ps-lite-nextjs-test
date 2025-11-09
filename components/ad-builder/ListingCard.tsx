import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Lock } from "lucide-react";
import type { ListingData } from "@/types/adBuilder";

interface ListingCardProps {
  listing: ListingData;
  onEdit: (listing: ListingData) => void;
  onDelete: (listingId: string) => void;
}

export const ListingCard = ({ listing, onEdit, onDelete }: ListingCardProps) => {
  const primaryImage = listing.images[listing.primaryImageIndex] || listing.images[0];
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={listing.address.street}
              width={600}
              height={400}
              className="w-full h-full object-cover"
              unoptimized={primaryImage.startsWith("http")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <div className="absolute top-2 left-2 flex gap-2">
          {listing.isDraft && (
            <Badge variant="secondary" className="bg-yellow-500/90 text-white hover:bg-yellow-500">
              Draft
            </Badge>
          )}
          <Badge variant="secondary" className="bg-background/90">
            {listing.status}
          </Badge>
          <Badge variant="outline" className="bg-background/90">
            {listing.listingType}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg truncate">{formattedPrice}</p>
              <p className="text-sm text-muted-foreground truncate">
                {listing.address.street}
              </p>
              <p className="text-sm text-muted-foreground">
                {listing.address.city}, {listing.address.state} {listing.address.zip}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {listing.bedrooms} bd • {listing.bathrooms} ba • {listing.squareFeet.toLocaleString()} sqft
          </div>
          <div className="flex gap-2 pt-2">
            {listing.isManuallyCreated ? (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onEdit(listing)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1.5 rounded cursor-help" title="Updates automatically, edit in the MLS">
                <Lock className="w-3.5 h-3.5" />
                <span>Synced</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
