"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CampaignVideos } from "@/components/campaign-detail/CampaignVideos";
import { CampaignLeads } from "@/components/campaign-detail/CampaignLeads";
import { CampaignMetrics } from "@/components/campaign-detail/CampaignMetrics";
import PageLayout from "@/components/layout/PageLayout";
import { campaignData } from "@/data/mockData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play, Clock } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CampaignDetailPage() {
  const { campaignId } = useParams();

  const campaign = campaignData[campaignId as keyof typeof campaignData] || campaignData["1"];

  // Campaign status (would come from API in real app)
  const [campaignStatus] = useState<'running' | 'paused' | 'ended'>('running');
  const [daysLeft] = useState(3);

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

      {/* Campaign Status Banner */}
      <Alert className={`mb-6 ${
        campaignStatus === 'running' ? 'border-green-500 bg-green-50 dark:bg-green-950/20' :
        campaignStatus === 'paused' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' :
        'border-gray-500 bg-gray-50 dark:bg-gray-950/20'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {campaignStatus === 'running' ? (
              <Play className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
            ) : campaignStatus === 'paused' ? (
              <Pause className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">
                  {campaignStatus === 'running' ? 'Running' :
                   campaignStatus === 'paused' ? 'Paused' :
                   'Ended'}
                </span>
                {campaignStatus === 'running' && daysLeft && (
                  <Badge variant="secondary" className="text-xs">
                    {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                  </Badge>
                )}
              </div>
              <AlertDescription className="text-sm">
                {campaignStatus === 'running'
                  ? 'Your campaign is actively running and generating leads'
                  : campaignStatus === 'paused'
                  ? 'Campaign is paused. Resume to continue generating leads'
                  : 'This campaign has ended'}
              </AlertDescription>
            </div>
          </div>
          <div className="flex gap-2 ml-8 sm:ml-0">
            {campaignStatus === 'running' && (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <Pause className="w-4 h-4" />
                  <span className="hidden sm:inline">Pause</span>
                </Button>
                <Button variant="default" size="sm" className="gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">Extend</span>
                </Button>
              </>
            )}
            {campaignStatus === 'paused' && (
              <Button variant="default" size="sm" className="gap-2">
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Resume</span>
              </Button>
            )}
          </div>
        </div>
      </Alert>

      {/* Campaign Content */}
      <div className="space-y-6">
        {/* 1. Leads - Most Important */}
        <CampaignLeads />

        {/* 2. Videos (with edit/download) */}
        <CampaignVideos />

        {/* 3. Campaign Metrics */}
        <CampaignMetrics
          adSpend={campaign.adSpend}
          impressions={campaign.impressions}
          interactions={campaign.interactions}
        />
      </div>
    </PageLayout>
  );
}
