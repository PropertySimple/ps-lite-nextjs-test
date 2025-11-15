import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdType {
  id: string;
  title: string;
  description: string;
  isNew?: boolean;
}

interface AdTypeSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAdType: (adTypeId: string) => void;
  listingStatus?: "active" | "off-market";
}

const adTypes: AdType[] = [
  {
    id: "new-to-market",
    title: "New to Market",
    description: "Attract buyers",
  },
  {
    id: "open-house",
    title: "Open House",
    description: "Promote Your Event",
  },
  {
    id: "price-reduction",
    title: "Price Reduction",
    description: "Drive New Offers",
  },
  {
    id: "boost",
    title: "Boost",
    description: "More Exposure",
    isNew: true,
  },
  {
    id: "just-sold",
    title: "Just Sold",
    description: "Win New Listings",
  },
];

export function AdTypeSelectionModal({
  open,
  onOpenChange,
  onSelectAdType,
  listingStatus = "active",
}: AdTypeSelectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Ad Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 md:grid-cols-2">
          {adTypes.map((adType) => {
            const isOffMarket = listingStatus === "off-market";
            const isDisabled = isOffMarket && adType.id !== "just-sold";
            
            return (
              <Card
                key={adType.id}
                className={`p-4 transition-colors ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:border-primary"
                }`}
                onClick={() => !isDisabled && onSelectAdType(adType.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{adType.title}</h3>
                  {adType.isNew && (
                    <Badge variant="default" className="text-xs">
                      New!
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{adType.description}</p>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
