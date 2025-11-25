"use client";

import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export const CampaignVideosPending = () => {
  const router = useRouter();
  const { id: campaignId } = useParams();

  const handleEditAdCopy = () => {
    router.push(`/ad-builder/${campaignId}/ad-copy`);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-100 via-purple-200 to-purple-300 dark:from-orange-950/30 dark:via-pink-950/30 dark:via-purple-900/40 dark:to-purple-800/50" />

      {/* Blur effect for depth */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      {/* Content Container */}
      <div className="relative px-4 py-10 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">

          {/* Left: Video Mockups with Loading State */}
          <div className="relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
            <div className="relative flex items-center justify-center gap-3 sm:gap-6">
              {/* Left video placeholder - Basic Video */}
              <div
                className="relative w-32 sm:w-40 md:w-48 transform -rotate-3"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 animate-spin mb-3" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Basic Video</span>
                    {/* Progress bar */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full animate-pulse"
                          style={{ width: '60%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right video placeholder - AI Video */}
              <div
                className="relative w-32 sm:w-40 md:w-48 transform rotate-3 translate-y-4 sm:translate-y-6"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 animate-spin mb-3" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">AI Video</span>
                    {/* Progress bar */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full animate-pulse"
                          style={{ width: '45%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-semibold uppercase tracking-wide">CREATING YOUR ADS</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                Your Videos Are Being Created
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We're creating your property showcase and AI influencer videos. They'll be ready in just a few minutes.
                <span className="font-semibold text-gray-900 dark:text-white"> While you wait, review your ad copy</span> to make sure everything looks perfect.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Edit Ad Copy button */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="lg"
                  variant="default"
                  className="gap-2 shadow-lg text-base font-semibold px-6"
                  onClick={handleEditAdCopy}
                >
                  <Edit className="w-5 h-5" />
                  View & Edit Ad Copy
                </Button>
              </div>

              {/* Estimated time */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Estimated time: a few minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
