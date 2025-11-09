"use client";

import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, BarChart3 } from "lucide-react";
import { memo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { runningAds, pastAds } from "@/data/mockData";
import PageLayout from "@/components/layout/PageLayout";

const CampaignsPage = memo(() => {
  const [tab, setTab] = useState("current");

  const handleCreateCampaign = () => {
    logger.log("Navigate to listing manager");
  };

  const headerActions = (
    <Button className="gap-2" onClick={handleCreateCampaign}>
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Create Campaign</span>
      <span className="sm:hidden">Create</span>
    </Button>
  );

  return (
    <PageLayout headerActions={headerActions} pageContext="dashboard">
      <div className="space-y-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          {/* Current Campaigns Tab */}
          <TabsContent value="current" className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Active Campaigns ({runningAds.length})</h2>
            {runningAds.length > 0 ? (
              <div className="space-y-4">
                {runningAds.map((ad) => (
                  <Card key={ad.id}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">Leads: {ad.leads}</p>
                    </CardContent>
                  </Card>
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
            <h2 className="text-xl font-semibold">Past Campaigns ({pastAds.length})</h2>
            {pastAds.length > 0 ? (
              <div className="space-y-4">
                {pastAds.map((ad) => (
                  <Card key={ad.id}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">Leads: {ad.leads}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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

CampaignsPage.displayName = "CampaignsPage";

export default CampaignsPage;
