"use client";

import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";
import AdCard from "@/components/dashboard/AdCard";
import PageLayout from "@/components/layout/PageLayout";
import { runningAds, pastAds } from "@/data/mockData";
import { memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CampaignHero } from "@/components/campaigns/CampaignHero";
import { SectionHeader } from "@/components/common/SectionHeader";

const Campaigns = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab") || "current";

  const handleCreateCampaign = () => {
    router.push("/listing-manager");
  };

  const headerActions = (
    <Button className="gap-2" onClick={handleCreateCampaign}>
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Create Campaign</span>
      <span className="sm:hidden">Create</span>
    </Button>
  );

  // Calculate aggregate stats for past ads
  const totalCampaigns = pastAds.length;
  const totalLeads = pastAds.reduce((sum, ad) => sum + ad.leads, 0);
  const totalSpent = pastAds.reduce((sum, ad) => sum + (ad.adSpend || 0), 0);
  const avgCostPerLead = totalLeads > 0 ? totalSpent / totalLeads : 0;

  return (
    <PageLayout headerActions={headerActions} pageContext="dashboard">
      <div className="space-y-6">
        {/* Hero Section - Always visible on both tabs */}
        <CampaignHero />

        <div className="border-t border-border my-8" />

        <Tabs value={tab} onValueChange={(value) => router.push(`/campaigns?tab=${value}`)}>
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          {/* Current Campaigns Tab */}
          <TabsContent value="current" className="space-y-4 mt-6">
            <SectionHeader
              icon="📊"
              title="Active Campaigns"
              count={runningAds.length}
              description="Campaigns currently running on Facebook and Instagram. Click any campaign to view detailed analytics and performance metrics."
            />
            {runningAds.length > 0 ? (
              <div className="space-y-4">
                {runningAds.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-12">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No campaigns yet</h3>
                    <Button size="lg" onClick={handleCreateCampaign} className="gap-2">
                      <Plus className="w-5 h-5" />
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Campaigns Tab */}
          <TabsContent value="past" className="space-y-6 mt-6">
            <SectionHeader
              icon="📈"
              title="Past Campaigns"
              count={pastAds.length}
              description="Completed campaigns and their final performance metrics. Review what worked to optimize your future campaigns."
            />
            {pastAds.length > 0 ? (
              <>
                {/* Past Ad Cards */}
                <div className="space-y-4">
                  {pastAds.map((ad) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-12">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                      <BarChart3 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No past campaigns</h3>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
});

Campaigns.displayName = "Campaigns";

export default Campaigns;
