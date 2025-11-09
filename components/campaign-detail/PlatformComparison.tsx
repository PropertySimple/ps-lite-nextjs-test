import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MousePointerClick, Users } from "lucide-react";

const PlatformComparison = () => {
  // Real platform data from the stats you showed
  const facebookData = {
    views: 353, // 54% of 654
    clicks: 27, // From "Clicks by Platform"
    leads: 1,
    clickRate: 7.6, // (27/353)*100
    demographic: "55-64 age group (65% Female)",
  };

  const instagramData = {
    views: 203, // 31% of 654
    clicks: 24, // From "Clicks by Platform"
    leads: 1,
    clickRate: 11.8, // (24/203)*100
    demographic: "45-54 age group (70% Female)",
  };

  return (
    <Card className="hidden sm:block">
      <CardHeader>
        <CardTitle>Platform Performance Breakdown</CardTitle>
        <CardDescription>How your ads performed across Facebook and Instagram</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Facebook Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-bold text-lg">Facebook</h3>
                    <p className="text-sm text-muted-foreground">54% of impressions</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="text-xl font-bold">{facebookData.views}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MousePointerClick className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-xl font-bold">{facebookData.clicks}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">Click Rate</span>
                    <span className="text-2xl font-bold">{facebookData.clickRate}%</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Leads</span>
                    <span className="text-xl font-bold">{facebookData.leads}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-3 border-t">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {facebookData.demographic}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instagram Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-bold text-lg">Instagram</h3>
                    <p className="text-sm text-muted-foreground">31% of impressions</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Views</p>
                      <p className="text-xl font-bold">{instagramData.views}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MousePointerClick className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-xl font-bold">{instagramData.clicks}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">Click Rate</span>
                    <span className="text-2xl font-bold">{instagramData.clickRate}%</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Leads</span>
                    <span className="text-xl font-bold">{instagramData.leads}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-3 border-t">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {instagramData.demographic}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </CardContent>
    </Card>
  );
};

export default PlatformComparison;
