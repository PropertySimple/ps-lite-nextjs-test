"use client";

import { Button } from "@/components/ui/button";
import { Download, Edit, Sparkles } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export const CampaignVideos = () => {
  const router = useRouter();
  const { id: campaignId } = useParams();

  const videos = [
    {
      id: "property",
      title: "Property Showcase",
      videoUrl: "/video/basic-video.mp4",
      thumbnail: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    },
    {
      id: "influencer",
      title: "AI Influencer",
      videoUrl: "/video/upgrade-video.mp4",
      thumbnail: "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    },
  ];

  const handleDownload = (videoUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = () => {
    // Navigate to ad builder in edit mode with the campaign ID
    router.push(`/ad-builder?campaign=${campaignId}`);
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

          {/* Left: Compact Video Mockups */}
          <div className="relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
            <div className="relative flex items-center justify-center gap-3 sm:gap-6">
              {/* Left video */}
              <div
                className="relative w-32 sm:w-40 md:w-48 transform -rotate-3"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-black">
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
                className="relative w-32 sm:w-40 md:w-48 transform rotate-3 translate-y-4 sm:translate-y-6"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl">
                  <div className="relative aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-black">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">AD CREATION</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                Your Videos Are Ready 🎉
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Your videos will be used in your ad campaigns automatically, but for best results,
                <span className="font-semibold text-gray-900 dark:text-white"> download them and share on your social media</span>.
                Pro tip: Tag your seller to show them how hard you're working to sell their home!
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                variant="default"
                className="gap-2 text-base font-semibold px-6 shadow-lg"
                onClick={handleEdit}
              >
                <Edit className="w-5 h-5" />
                Edit Campaign
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base font-semibold px-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                onClick={() => handleDownload(videos[0].videoUrl, "all-videos")}
              >
                <Download className="w-5 h-5" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
