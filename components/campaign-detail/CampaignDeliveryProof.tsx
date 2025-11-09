import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, Calendar, Target, Eye, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AdCreative {
  id: number;
  platform: "Facebook" | "Instagram";
  imageUrl: string;
  impressions: number;
  leads: number;
  adLink?: string;
}

const CampaignDeliveryProof = () => {
  // Mock data - replace with real data
  const campaignStatus = {
    delivered: true,
    startDate: "Oct 21, 2025",
    endDate: "Oct 24, 2025",
    totalImpressions: 663,
    targetImpressions: 650,
    percentOfGoal: Math.round((663 / 650) * 100),
  };

  const adCreatives: AdCreative[] = [
    {
      id: 1,
      platform: "Facebook",
      imageUrl: "/public/listing-images/white-house-listing.jpg",
      impressions: 340,
      leads: 1,
      adLink: "https://www.facebook.com/ads/library/?id=123456789", // Replace with real link
    },
    {
      id: 2,
      platform: "Instagram",
      imageUrl: "/public/listing-images/white-house-listing.jpg",
      impressions: 323,
      leads: 1,
      adLink: "https://www.facebook.com/ads/library/?id=987654321", // Replace with real link
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Campaign Delivery Confirmation</CardTitle>
            <CardDescription>Verified ad performance and delivery status</CardDescription>
          </div>
          <Image
            src="/meta-logo.svg"
            alt="Meta"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Campaign Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Campaign Period</p>
              <p className="text-sm font-semibold">{campaignStatus.startDate} - {campaignStatus.endDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Impressions</p>
              <p className="text-sm font-semibold">{campaignStatus.totalImpressions} ({campaignStatus.percentOfGoal}% of goal)</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Facebook Status</p>
              <p className="text-sm font-semibold text-green-600">Active ✓</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Instagram Status</p>
              <p className="text-sm font-semibold text-green-600">Active ✓</p>
            </div>
          </div>
        </div>

        {/* Ad Creatives Performance */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Ad Creative Performance</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {adCreatives.map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="relative h-48 bg-muted">
                  <Image
                    src={ad.imageUrl}
                    alt={`${ad.platform} ad creative`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    unoptimized={ad.imageUrl.startsWith("http")}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant="secondary"
                      className={
                        ad.platform === "Facebook"
                          ? "bg-blue-600 text-white dark:bg-blue-700"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      }
                    >
                      {ad.platform}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Impressions</p>
                      </div>
                      <p className="text-lg font-bold">{ad.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Leads Generated</p>
                      <p className="text-lg font-bold">{ad.leads}</p>
                    </div>
                  </div>
                  {ad.adLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(ad.adLink, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Live Ad
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>Note:</strong> To view live ads, you must be logged into Facebook. Ad visibility may be limited based on your account settings or if the campaign has ended. The "View Live Ad" links direct to Meta's Ad Library.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default CampaignDeliveryProof;
