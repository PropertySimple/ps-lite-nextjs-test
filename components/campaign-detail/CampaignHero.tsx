import Image from "next/image";
import { Card } from "@/components/ui/card";

interface CampaignHeroProps {
  property: string;
  dateRange: string;
  listingImage: string;
  adSpend: string;
  impressions: string;
  interactions: string;
  leadCount?: number;
}

const CampaignHero = ({
  property,
  dateRange,
  listingImage,
  adSpend,
  impressions,
  interactions,
  leadCount = 2
}: CampaignHeroProps) => {
  // Calculate cost per lead
  const spendAmount = parseFloat(adSpend.replace('$', '').replace(',', ''));
  const costPerLead = leadCount > 0 ? spendAmount / leadCount : 0;

  return (
    <Card className="overflow-hidden">
      {/* Mobile Layout */}
      <div className="p-4 md:hidden">
        <div className="flex flex-col gap-4">
          {/* Property image on mobile */}
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={listingImage}
              alt={property}
              width={400}
              height={300}
              className="object-cover w-full h-full"
              unoptimized={listingImage.startsWith("http")}
            />
          </div>

          {/* Property title and date */}
          <div>
            <h2 className="text-lg font-bold mb-1">{property}</h2>
            <p className="text-xs text-muted-foreground">{dateRange}</p>
          </div>

          {/* Lead count */}
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold">{leadCount}</span>
              <span className="text-base text-muted-foreground">lead{leadCount !== 1 ? 's' : ''}</span>
            </div>

            {leadCount > 0 && (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">${costPerLead.toFixed(0)}</span>
                <span className="text-sm text-muted-foreground">per lead</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Center-aligned with subtle property image */}
      <div className="hidden md:block relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]">
          <Image
            src={listingImage}
            alt=""
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            unoptimized={listingImage.startsWith("http")}
          />
        </div>

        <div className="relative p-8 lg:p-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Date range - minimal at top */}
            <div>
              <p className="text-sm text-muted-foreground">{dateRange}</p>
            </div>

            {/* MASSIVE lead count - the hero */}
            <div className="py-6">
              <div className="flex items-baseline justify-center gap-4 mb-3">
                <span className="text-7xl lg:text-8xl font-bold leading-none tracking-tight">{leadCount}</span>
                <span className="text-xl lg:text-2xl text-muted-foreground">lead{leadCount !== 1 ? 's' : ''}</span>
              </div>

              {leadCount > 0 && (
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl lg:text-4xl font-semibold">${costPerLead.toFixed(0)}</span>
                  <span className="text-base lg:text-lg text-muted-foreground">per lead</span>
                </div>
              )}
            </div>

            {/* Secondary metrics - clean grid at bottom */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t max-w-2xl mx-auto">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Ad Spend</p>
                <p className="text-xl lg:text-2xl font-bold">{adSpend}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Reach</p>
                <p className="text-xl lg:text-2xl font-bold">{impressions}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Interactions</p>
                <p className="text-xl lg:text-2xl font-bold">{interactions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampaignHero;
