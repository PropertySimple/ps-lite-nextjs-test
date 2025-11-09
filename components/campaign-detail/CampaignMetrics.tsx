import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, MousePointerClick, DollarSign, Users } from "lucide-react";

interface CampaignMetricsProps {
  adSpend: string;
  impressions: string;
  interactions: string;
  leadCount: number;
}

export const CampaignMetrics = ({
  adSpend,
  impressions,
  interactions,
  leadCount,
}: CampaignMetricsProps) => {
  // Parse numbers
  const spendAmount = parseFloat(adSpend.replace('$', '').replace(',', ''));
  const impressionCount = parseFloat(impressions.replace(',', ''));
  const interactionCount = parseInt(interactions);

  // Calculate metrics
  const costPerLead = leadCount > 0 ? spendAmount / leadCount : 0;
  const clickRate = impressionCount > 0 ? (interactionCount / impressionCount) * 100 : 0;

  return (
    <Card className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10" />

      <div className="relative p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Campaign Performance</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Meta Ads
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Google Ads
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

          {/* Leads - Most Important */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Leads</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl lg:text-5xl font-bold tracking-tight">{leadCount}</span>
              <span className="text-lg text-muted-foreground">total</span>
            </div>
          </div>

          {/* Cost Per Lead */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Cost/Lead</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">
                {leadCount > 0 ? `$${costPerLead.toFixed(0)}` : '—'}
              </span>
            </div>
          </div>

          {/* Ad Spend */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Ad Spend</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{adSpend}</span>
            </div>
          </div>

          {/* Impressions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Impressions</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{impressions}</span>
            </div>
          </div>

          {/* Interactions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <MousePointerClick className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-sm text-muted-foreground">Clicks</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{interactions}</span>
            </div>
          </div>

          {/* Click Rate */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-pink-500" />
              </div>
              <span className="text-sm text-muted-foreground">Click Rate</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{clickRate.toFixed(1)}%</span>
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
};
