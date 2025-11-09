import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PerformanceSnapshotProps {
  adSpend: string;
  impressions: string;
  interactions: string;
  leadCount: number;
}

const PerformanceSnapshot = ({ adSpend, impressions, interactions, leadCount }: PerformanceSnapshotProps) => {
  const spendAmount = parseFloat(adSpend.replace('$', '').replace(',', ''));
  const impressionCount = parseInt(impressions.replace(',', ''));
  const interactionCount = parseInt(interactions.replace(',', ''));

  // Calculate metrics
  const costPerLead = leadCount > 0 ? spendAmount / leadCount : 0;
  const engagementRate = impressionCount > 0 ? (interactionCount / impressionCount) * 100 : 0;

  // Benchmarks (industry averages from market leaders: Zillow $150-400, Realtor.com $25-45, FB/IG $5-40)
  const avgCostPerLeadMin = 150;
  const avgCostPerLeadMax = 400;
  const avgEngagementRate = 1.5;

  // Determine status for each metric
  const getCostPerLeadStatus = () => {
    if (leadCount === 0) return { status: 'Poor', icon: TrendingDown, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-950/30' };
    if (costPerLead < avgCostPerLeadMin) return { status: 'Excellent', icon: TrendingUp, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-950/30' };
    if (costPerLead < avgCostPerLeadMax) return { status: 'Good', icon: Minus, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30' };
    return { status: 'Needs Work', icon: TrendingDown, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-950/30' };
  };

  const getReachStatus = () => {
    if (impressionCount > 800) return { status: 'Above Average', icon: TrendingUp, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-950/30' };
    if (impressionCount > 500) return { status: 'Good', icon: Minus, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30' };
    return { status: 'Below Average', icon: TrendingDown, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-950/30' };
  };

  const getEngagementStatus = () => {
    if (engagementRate > avgEngagementRate * 1.2) return { status: 'Excellent', icon: TrendingUp, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-950/30' };
    if (engagementRate > avgEngagementRate * 0.8) return { status: 'Good', icon: Minus, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30' };
    return { status: 'Could Improve', icon: TrendingDown, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-950/30' };
  };

  const costStatus = getCostPerLeadStatus();
  const reachStatus = getReachStatus();
  const engagementStatus = getEngagementStatus();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Cost Per Lead Card */}
      <Card className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Cost Per Lead</p>
            <p className="text-3xl font-bold">
              {leadCount > 0 ? `$${costPerLead.toFixed(0)}` : 'N/A'}
            </p>
          </div>
          <costStatus.icon className={`h-5 w-5 ${costStatus.color}`} />
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${costStatus.bgColor} ${costStatus.color}`}>
          {costStatus.status}
        </div>
        {leadCount > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Market avg: ${avgCostPerLeadMin}-${avgCostPerLeadMax}
          </p>
        )}
      </Card>

      {/* Reach Card - Show on tablet and desktop */}
      <Card className="p-4 hidden sm:block">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Reach</p>
            <p className="text-3xl font-bold">{impressions}</p>
          </div>
          <reachStatus.icon className={`h-5 w-5 ${reachStatus.color}`} />
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${reachStatus.bgColor} ${reachStatus.color}`}>
          {reachStatus.status}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          People who saw your ad
        </p>
      </Card>

      {/* Engagement Rate Card - Show on tablet and desktop, full width on tablet */}
      <Card className="p-4 hidden sm:block sm:col-span-2 md:col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Engagement</p>
            <p className="text-3xl font-bold">{engagementRate.toFixed(1)}%</p>
          </div>
          <engagementStatus.icon className={`h-5 w-5 ${engagementStatus.color}`} />
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${engagementStatus.bgColor} ${engagementStatus.color}`}>
          {engagementStatus.status}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Avg: {avgEngagementRate}% engagement rate
        </p>
      </Card>
    </div>
  );
};

export default PerformanceSnapshot;
