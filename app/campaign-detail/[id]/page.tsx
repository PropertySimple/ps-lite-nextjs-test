"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CampaignVideos } from "@/components/campaign-detail/CampaignVideos";
import { CampaignVideosPending } from "@/components/campaign-detail/CampaignVideosPending";
import { CampaignLeads } from "@/components/campaign-detail/CampaignLeads";
import { CampaignMetrics } from "@/components/campaign-detail/CampaignMetrics";
import PageLayout from "@/components/layout/PageLayout";
import { campaignData } from "@/data/mockData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pause, Play, Clock, Loader2, AlertCircle, Rocket } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CampaignDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const campaign = campaignData[id as keyof typeof campaignData] || campaignData["1"];

  // Check if this is the pending campaign (ID 1 - 123 Main St)
  const isPendingCampaign = id === "1";

  // Campaign status (would come from API in real app)
  const [campaignStatus] = useState<'running' | 'paused' | 'ended'>('running');
  const [daysLeft] = useState(3);

  // Pending campaign state
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours() + 24);
    return time;
  });

  // Handler for go live
  const handleGoLive = () => {
    setIsLaunching(true);
    // In real app: API call to launch campaign
  };

  // Handler for auto-launch on countdown expire
  const handleAutoLaunch = () => {
    handleGoLive();
  };

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
            <BreadcrumbPage>
              {isPendingCampaign ? "123 Main St, Anytown, USA" : campaign.property}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Campaign Status Banner */}
      {isPendingCampaign ? (
        <>
          {/* Pending Campaign Status */}
          <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 animate-spin mt-0.5" />
              <div className="flex-1 space-y-3">
                {/* Header row */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Pending</span>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      Videos Being Created
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm">
                    Your campaign has been purchased. Videos will be ready in a few minutes.
                  </AlertDescription>
                </div>

                {/* Actions row - all on one line */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Button
                    size="sm"
                    className="gap-2"
                    onClick={handleGoLive}
                    disabled={isLaunching}
                  >
                    <Rocket className="w-4 h-4" />
                    {isLaunching ? 'Launching...' : 'Go Live Now'}
                  </Button>

                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Auto-launches in</span>
                    <CountdownTimer expiresAt={launchTime} onExpire={handleAutoLaunch} />
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Request Refund
                  </Button>
                </div>
              </div>
            </div>
          </Alert>

          {/* Pending Campaign Content */}
          <div className="space-y-6">
            {/* Videos Being Created */}
            <CampaignVideosPending />

            {/* No Leads Yet */}
            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
                <CardDescription>Lead tracking will begin when your campaign goes live</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">No leads yet</p>
                  <p className="text-sm text-gray-500">
                    Your campaign will start generating leads once the videos are ready and the campaign goes live.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          {/* Regular Campaign Status */}
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

          {/* Regular Campaign Content */}
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
        </>
      )}
    </PageLayout>
  );
}
