"use client";


import { useParams } from "next/navigation";
import Link from "next/link";
import { CampaignVideos } from "@/components/campaign-detail/CampaignVideos";
import { CampaignMetrics } from "@/components/campaign-detail/CampaignMetrics";
import { AdvancedAnalytics } from "@/components/campaign-detail/AdvancedAnalytics";
import HighPriorityLeads from "@/components/campaign-detail/HighPriorityLeads";
import PageLayout from "@/components/layout/PageLayout";
import { campaignData } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CampaignDetail = () => {
  const { campaignId } = useParams();

  const campaign = campaignData[campaignId as keyof typeof campaignData] || campaignData["1"];

  // Lead count from our high-priority interactions
  const leadCount = 2;

  return (
    <PageLayout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/campaigns">Campaigns</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{campaign.property}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 space-x-6">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Advanced Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* 1. AI-Generated Videos Hero */}
          <CampaignVideos />

          {/* 2. Compact Campaign Metrics */}
          <CampaignMetrics
            adSpend={campaign.adSpend}
            impressions={campaign.impressions}
            interactions={campaign.interactions}
            leadCount={leadCount}
          />

          {/* 3. High Priority Leads - The Money Makers */}
          <HighPriorityLeads />
        </TabsContent>

        {/* Advanced Analytics Tab Content */}
        <TabsContent value="advanced" className="space-y-6 mt-6">
          <AdvancedAnalytics />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default CampaignDetail;
