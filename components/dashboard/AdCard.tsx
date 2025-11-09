"use client";

import Image from "next/image";
import { logger } from "@/lib/logger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calendar, TrendingUp, CheckCircle, Minus, AlertTriangle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Ad } from "@/data/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useState } from "react";

interface AdCardProps {
  ad: Ad;
  isPast?: boolean;
}

const AdCard = ({ ad, isPast = false }: AdCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const formatDateRange = () => {
    if (!ad.startDate || !ad.endDate) return null;

    const start = new Date(ad.startDate);
    const end = new Date(ad.endDate);

    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  };

  // Calculate cost per lead and performance status
  const costPerLead = ad.adSpend && ad.leads > 0 ? ad.adSpend / ad.leads : 0;

  const getPerformanceStatus = () => {
    if (ad.leads === 0) return {
      text: 'NO LEADS',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      icon: XCircle
    };
    if (costPerLead < 150) return {
      text: 'EXCEPTIONAL',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      icon: TrendingUp
    };
    if (costPerLead < 400) return {
      text: 'EXCELLENT',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      icon: CheckCircle
    };
    if (costPerLead < 600) return {
      text: 'GOOD',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      icon: Minus
    };
    return {
      text: 'REVIEW',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      icon: AlertTriangle
    };
  };

  const performance = getPerformanceStatus();

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
    <Card className="overflow-hidden transition-all hover:shadow-lg group cursor-pointer" onClick={handleCardClick}>
      <div className="flex flex-col sm:flex-row">
        {/* Media Preview */}
        <div className="w-full sm:w-48 sm:h-48 shrink-0 relative overflow-hidden">
          {renderMediaPreview()}
        </div>

        {/* Content - Lead First */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          {/* Top: Property info + Lead count */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg mb-1 truncate">{ad.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{ad.address}</p>
              {formatDateRange() && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDateRange()}</span>
                </div>
              )}
            </div>

            {/* Lead Count - Hero Metric */}
            <div className="text-right shrink-0">
              <div className="text-2xl sm:text-3xl font-bold">{ad.leads}</div>
              <div className="text-xs text-muted-foreground">LEADS</div>
            </div>
          </div>

          {/* Bottom: Performance + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Cost per lead */}
              {ad.adSpend && ad.leads > 0 && (
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-semibold">${Math.round(costPerLead)}</span>
                  <span className="text-xs text-muted-foreground">per lead</span>
                </div>
              )}

              {/* Performance badge */}
              <div className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${performance.bgColor} ${performance.color}`}>
                <performance.icon className="w-3 h-3" />
                {performance.text}
              </div>

              {/* Days left - mobile and desktop */}
              {!isPast && ad.daysLeft && (
                <div className="flex items-baseline gap-1 text-muted-foreground">
                  <span className="text-sm font-semibold">{ad.daysLeft}</span>
                  <span className="text-xs">day{ad.daysLeft !== 1 ? 's' : ''} left</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/campaign-detail/${ad.id}`);
                }}
                className="flex-1 sm:flex-initial"
              >
                View Report
              </Button>
              {isPast ? (
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
