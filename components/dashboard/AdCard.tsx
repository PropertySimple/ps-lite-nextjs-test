"use client";

import Image from "next/image";
import { logger } from "@/lib/logger";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Play, ChevronLeft, ChevronRight, Info, Loader2, AlertCircle } from "lucide-react";
import { Ad } from "@/data/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useState } from "react";

interface AdCardProps {
  ad: Ad;
  isPast?: boolean;
  newLeads?: number;
  isPending?: boolean;
}

const AdCard = ({ ad, isPast = false, newLeads = 0, isPending = false }: AdCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine campaign status
  const campaignStatus: 'pending' | 'running' | 'paused' | 'ended' = isPending ? 'pending' : (ad.status || (isPast ? 'ended' : 'running'));

  const handleCardClick = () => {
    router.push(`/campaign-detail/${ad.id}`);
  };

  const handleExtend = (e: React.MouseEvent) => {
    e.stopPropagation();
    logger.log("Extending ad:", ad.title);
  };

  const handleRunAgain = (e: React.MouseEvent) => {
    e.stopPropagation();
    logger.log("Running ad again:", ad.title);
  };

  const _formatDateRange = () => {
    if (!ad.startDate || !ad.endDate) return null;

    const start = new Date(ad.startDate);
    const end = new Date(ad.endDate);

    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  };

  // Calculate cost per lead and performance status
  const costPerLead = ad.adSpend && ad.leads > 0 ? ad.adSpend / ad.leads : 0;

  // Industry benchmarks
  const industryAverage = 180; // Industry average cost per lead
  const getBenchmarkComparison = () => {
    if (costPerLead === 0) return null;
    const difference = ((industryAverage - costPerLead) / industryAverage) * 100;
    return {
      percentage: Math.abs(Math.round(difference)),
      isBetter: difference > 0,
      badge: difference > 20 ? 'EXCELLENT' : difference > 0 ? 'GOOD' : 'NEEDS ATTENTION'
    };
  };
  const benchmark = getBenchmarkComparison();

  const renderMediaPreview = () => {
    if (!ad.videos || ad.videos.length === 0) {
      // No videos - show listing image
      return (
        <div className="w-full h-full bg-muted overflow-hidden relative">
          <Image
            src={ad.listingImage}
            alt={ad.address}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            unoptimized={ad.listingImage.startsWith("http")}
          />
        </div>
      );
    }

    if (ad.videos.length === 1) {
      // Single video
      return (
        <div className="w-full h-full bg-muted overflow-hidden relative cursor-pointer">
          <Image
            src={ad.videos[0].thumbnailUrl}
            alt={ad.videos[0].type}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            unoptimized={ad.videos[0].thumbnailUrl.startsWith("http")}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-gray-900 ml-1" />
            </div>
          </div>
        </div>
      );
    }

    // Two videos - slideshow
    const videos = ad.videos.slice(0, 2);
    const currentVideo = videos[currentImageIndex];

    const handlePrevious = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    };

    return (
      <div className="w-full h-full bg-muted overflow-hidden relative cursor-pointer">
        <Image
          src={currentVideo.thumbnailUrl}
          alt={currentVideo.type}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          unoptimized={currentVideo.thumbnailUrl.startsWith("http")}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-900 ml-1" />
          </div>
        </div>
        {/* Slideshow Controls */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-4 h-4 text-gray-900" />
          </Button>
          <div className="flex gap-1">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
            onClick={handleNext}
          >
            <ChevronRight className="w-4 h-4 text-gray-900" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group cursor-pointer p-0" onClick={handleCardClick}>
      <div className="flex flex-col sm:flex-row">
        {/* Media Preview */}
        <div className="w-full h-48 sm:w-48 sm:h-48 shrink-0 relative overflow-hidden">
          {renderMediaPreview()}
        </div>

        {/* Content - Lead First */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          {/* Top: Property info + Lead count + Status Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h3 className="font-semibold text-base sm:text-lg truncate">{ad.title}</h3>
                {/* Campaign Status Badge - Prominent */}
                <Badge
                  variant={
                    campaignStatus === 'pending' ? 'secondary' :
                    campaignStatus === 'running' ? 'default' :
                    campaignStatus === 'paused' ? 'outline' :
                    'secondary'
                  }
                  className={
                    campaignStatus === 'pending' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-400' :
                    campaignStatus === 'running' ? 'bg-green-500 hover:bg-green-600 text-white' :
                    campaignStatus === 'paused' ? 'border-yellow-500 text-yellow-700 dark:text-yellow-400' :
                    ''
                  }
                >
                  {campaignStatus === 'pending' ? (
                    <span className="flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Pending
                    </span>
                  ) : campaignStatus === 'running' ? 'Running' :
                   campaignStatus === 'paused' ? 'Paused' :
                   'Ended'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{ad.address}</p>
            </div>

            {/* Lead Count - Hero Metric (hidden for pending) */}
            {!isPending && (
              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-2">
                  <div className="text-2xl sm:text-3xl font-bold">
                    {ad.leads}
                  </div>
                  {newLeads > 0 && (
                    <Badge className="bg-primary text-white text-xs">
                      {newLeads} new
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  LEADS
                </div>
              </div>
            )}
          </div>

          {/* Key Metrics - Always Visible */}
          <div className="flex flex-col gap-2.5 mt-3">
            {!isPending && (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Cost per lead with benchmark tooltip */}
                {ad.adSpend && ad.leads > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-baseline gap-1 cursor-help">
                          <span className="text-base sm:text-lg font-semibold">${Math.round(costPerLead)}</span>
                          <span className="text-xs text-muted-foreground">per lead</span>
                          <Info className="w-3 h-3 text-muted-foreground ml-1" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-2">
                          <p className="font-semibold">Cost Per Lead Benchmark</p>
                          <div className="space-y-1 text-sm">
                            <p>Your cost: ${Math.round(costPerLead)}/lead</p>
                            <p>Industry average: ${industryAverage}/lead</p>
                            {benchmark && (
                              <p className={benchmark.isBetter ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-orange-600 dark:text-orange-400 font-semibold'}>
                                {benchmark.isBetter ? `${benchmark.percentage}% better than average` : `${benchmark.percentage}% above average`}
                              </p>
                            )}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}

            {/* Pending Campaign Message */}
            {isPending && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Your videos are being created (a few minutes)
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/campaign-detail/${ad.id}`);
                }}
                className="flex-1 sm:flex-initial"
              >
                {isPending ? 'View Details' : 'View Report'}
              </Button>
              {isPending ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    logger.log("Request refund for:", ad.title);
                  }}
                  className="flex-1 sm:flex-initial text-muted-foreground hover:text-destructive"
                >
                  Request Refund
                </Button>
              ) : isPast ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRunAgain}
                  className="flex-1 sm:flex-initial"
                >
                  Run Again
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExtend}
                  className="hidden sm:inline-flex"
                >
                  Extend
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdCard;
