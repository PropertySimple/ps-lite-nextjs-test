"use client";

import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Eye, MessageSquare } from "lucide-react";
import SuggestionCard from "@/components/dashboard/SuggestionCard";
import AdCard from "@/components/dashboard/AdCard";
import AssistantActivityCard from "@/components/dashboard/AssistantActivityCard";
import PageLayout from "@/components/layout/PageLayout";
import { runningAds } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { memo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { logger } from "@/lib/logger";
const Dashboard = memo(() => {
  const router = useRouter();


  const handleCreateNewAd = () => {
    router.push('/create-new-ad');
  };
  const headerActions = <Button className="gap-2" onClick={handleCreateNewAd}>
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Create New Ad</span>
      <span className="sm:hidden">New Ad</span>
    </Button>;

  return <PageLayout headerActions={headerActions} pageContext="dashboard">
      <Tabs value="current" className="space-y-6">
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

        {/* Assistant Activity Card */}
        <AssistantActivityCard
          repName="Sarah"
          rep="sarah"
          onChatClick={() => {
            // Chat is handled by PageLayout, but this is a fallback
            // In a real implementation, we'd dispatch an event or use context
            logger.log("Chat clicked from dashboard widget");
          }}
        />

        {/* Current Campaigns Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Current Campaigns</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitor your active ad performance</p>
          </div>

        {runningAds.length > 0 ? (
          <>
            <SuggestionCard />

            {/* Active Campaign Performance */}
            <Card className="border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-green-900 dark:text-green-100 mb-1">
                      Your ads are working 24/7 to find buyers
                    </h3>
                    <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">
                      We're actively optimizing your campaigns to maximize leads and minimize cost per lead.
                    </p>
                  </div>
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-green-700 dark:text-green-300">Leads</p>
                        <p className="text-base sm:text-lg font-bold text-green-900 dark:text-green-100">
                          {runningAds.reduce((sum, ad) => sum + ad.leads, 0)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-green-700 dark:text-green-300">Reach</p>
                        <p className="text-base sm:text-lg font-bold text-green-900 dark:text-green-100">
                          {runningAds.reduce((sum, ad) => sum + (ad.reach || 0), 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad Cards */}
            <div className="space-y-4">
              {runningAds.map(ad => <AdCard key={ad.id} ad={ad} />)}
            </div>
          </>
        ) : (
          // Empty State
          <Card className="border-dashed border-2">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-2">
                  <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold">Ready to find buyers for your listings?</h3>
                  <p className="text-muted-foreground">
                    Create your first campaign to reach thousands of potential buyers on Facebook and Instagram. Get started in just a few clicks.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button size="lg" className="gap-2" onClick={handleCreateNewAd}>
                    <Plus className="w-4 h-4" />
                    Create Your First Campaign
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto">
                  <div className="text-center space-y-1">
                    <p className="font-semibold">10,000+</p>
                    <p className="text-xs text-muted-foreground">Average reach per campaign</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold">$75-150</p>
                    <p className="text-xs text-muted-foreground">Average cost per lead</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold">7 Days</p>
                    <p className="text-xs text-muted-foreground">Campaign duration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </Tabs>
    </PageLayout>;
});
Dashboard.displayName = "Dashboard";
export default Dashboard;