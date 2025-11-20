"use client";

import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export const CampaignHero = () => {
  const router = useRouter();

  const videos = [
    {
      videoUrl: "/video/basic-video.mp4",
      thumbnail: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    },
    {
      videoUrl: "/video/upgrade-video.mp4",
      thumbnail: "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    },
  ];

  const handleCreateCampaign = () => {
    router.push("/listing-manager");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-100 via-purple-200 to-purple-300 dark:from-blue-950/30 dark:via-cyan-950/30 dark:via-purple-900/40 dark:to-purple-800/50" />

      {/* Blur effect for depth */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      {/* Content Container */}
      <div className="relative px-6 py-8 lg:px-12 lg:py-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">

          {/* Left: Compact Video Mockups */}
          <div className="relative w-full max-w-xs lg:max-w-sm">
            <div className="relative flex items-center justify-center gap-4">
              {/* Left video */}
              <div
                className="relative w-32 lg:w-40 transform -rotate-3"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                    <video
                      src={videos[0].videoUrl}
                      poster={videos[0].thumbnail}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right video */}
              <div
                className="relative w-32 lg:w-40 transform rotate-3 translate-y-4"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                    <video
                      src={videos[1].videoUrl}
                      poster={videos[1].thumbnail}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 max-w-xl">
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                Ready to Create Your Next Ad
              </h1>
              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Pick a listing and we'll create professional video ads for Facebook and Instagram.
                <span className="font-semibold text-gray-900 dark:text-white"> Your ad is live by tomorrow.</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                variant="default"
                className="gap-2 text-base font-semibold px-6 shadow-lg"
                onClick={handleCreateCampaign}
              >
                <Plus className="w-5 h-5" />
                Create Campaign
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base font-semibold px-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                onClick={() => {
                  // Scroll to campaigns list or show demo
                  const element = document.querySelector('[role="tabpanel"]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <TrendingUp className="w-5 h-5" />
                View Stats
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
