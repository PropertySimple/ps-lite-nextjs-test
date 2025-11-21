import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, PlayCircle, Edit, Trash2, Plus, EyeOff, CheckCircle } from "lucide-react";

interface ListingCardProps {
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  imageUrl?: string;
  status?: "active" | "sold" | "inactive";
  listingType?: "sale" | "rent";
  listingId?: string;
  onPrimaryAction?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onHide?: () => void;
  onMarkAsSold?: () => void;
  primaryActionLabel?: string;
  primaryActionVariant?: "default" | "orange";
  showEditDelete?: boolean;
  showHide?: boolean;
  showMarkAsSold?: boolean;
}

export const ListingCard = ({
  price,
  address,
  bedrooms,
  bathrooms,
  imageUrl,
  status = "active",
  listingType,
  listingId,
  onPrimaryAction,
  onEdit,
  onDelete,
  onHide,
  onMarkAsSold,
  primaryActionLabel,
  primaryActionVariant = "default",
  showEditDelete = false,
  showHide = false,
  showMarkAsSold = false,
}: ListingCardProps) => {
  const getStatusBadge = () => {
    if (status === "sold") {
      return <Badge className="bg-orange-600 hover:bg-orange-700">SOLD</Badge>;
    }
    if (status === "inactive") {
      return <Badge variant="secondary">INACTIVE</Badge>;
    }
    return null;
  };

  const handleCardClick = () => {
    if (listingId) {
      window.open(`/listing/${listingId}`, '_blank');
    }
  };

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg group ${status === "inactive" ? "opacity-75" : ""} ${listingId ? "cursor-pointer" : ""}`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="w-full h-48 sm:w-48 sm:h-48 shrink-0 relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={address}
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              unoptimized={imageUrl.startsWith("http")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
              No Image
            </div>
          )}
          {getStatusBadge() && (
            <div className="absolute top-2 left-2">
              {getStatusBadge()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="font-bold text-xl">
                {price}{listingType === "rent" ? "/month" : ""}
              </div>
              {listingType && (
                <Badge variant={listingType === "rent" ? "outline" : "secondary"} className="text-xs">
                  {listingType === "rent" ? "For Rent" : "For Sale"}
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {address}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" />
                <span>{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4" />
                <span>{bathrooms} bath{bathrooms !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {showEditDelete ? (
              <>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrimaryAction?.();
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Start New Campaign</span>
                  <span className="sm:hidden">New</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                  }}
                  className="shrink-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            ) : showMarkAsSold ? (
              <>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrimaryAction?.();
                  }}
                >
                  <Plus className="w-4 h-4" />
                  {primaryActionLabel}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsSold?.();
                  }}
                  className="gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Sold
                </Button>
              </>
            ) : showHide ? (
              <>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrimaryAction?.();
                  }}
                >
                  <Plus className="w-4 h-4" />
                  {primaryActionLabel}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onHide?.();
                  }}
                  className="gap-2"
                >
                  <EyeOff className="w-4 h-4" />
                  Hide
                </Button>
              </>
            ) : primaryActionLabel ? (
              <Button
                size="sm"
                className={`gap-2 ${primaryActionVariant === "orange" ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPrimaryAction?.();
                }}
                variant={primaryActionVariant === "orange" ? "default" : "default"}
              >
                {primaryActionVariant === "orange" ? <PlayCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {primaryActionLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};
