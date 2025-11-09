"use client";

import AdCard from "@/components/dashboard/AdCard";
import PageLayout from "@/components/layout/PageLayout";
import { pastAds } from "@/data/mockData";
import { memo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PastAds = memo(() => {
  const router = useRouter();

  // Calculate aggregate stats
  const totalCampaigns = pastAds.length;
  const totalLeads = pastAds.reduce((sum, ad) => sum + ad.leads, 0);
  const totalSpent = pastAds.reduce((sum, ad) => sum + (ad.adSpend || 0), 0);
  const avgCostPerLead = totalLeads > 0 ? totalSpent / totalLeads : 0;

  return (
    <PageLayout>
      <Tabs value="past" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="current" onClick={() => router.push('/dashboard')}>
            Current Ads
          </TabsTrigger>
          <TabsTrigger value="create" onClick={() => router.push('/create-new-ad')}>
            Create New Ad
          </TabsTrigger>
          <TabsTrigger value="past" onClick={() => router.push('/past-ads')}>
            Past Ads
          </TabsTrigger>
        </TabsList>

        {/* Past Ads Section */}
        <div className="space-y-6">
          <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Past Campaigns</h2>

        {pastAds.length > 0 ? (
          <>
            {/* Historical Performance Summary */}
            <Card className="border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30">
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-100">
                    Historical Performance
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Campaigns</p>
                        <p className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
                          {totalCampaigns}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Total Leads</p>
                        <p className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
                          {totalLeads}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Total Spent</p>
                        <p className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
                          ${totalSpent.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Avg CPL</p>
                        <p className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-100">
                          ${Math.round(avgCostPerLead)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past Ad Cards */}
            <div className="space-y-4">
              {pastAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} isPast={true} />
              ))}
            </div>
          </>
        ) : (
          // Empty State
          <Card className="border-dashed border-2">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-2">
                  <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold">No past campaigns yet</h3>
                  <p className="text-muted-foreground">
                    Once your campaigns complete, you'll see their performance history here. Start your first campaign to begin building your track record.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button size="lg" className="gap-2" onClick={() => router.push('/create-new-ad')}>
                    <TrendingUp className="w-4 h-4" />
                    Create Your First Campaign
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </Tabs>
    </PageLayout>
  );
});

PastAds.displayName = "PastAds";

export default PastAds;
