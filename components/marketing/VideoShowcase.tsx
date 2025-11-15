"use client";

import { Sparkles } from "lucide-react";

const videos = [
  {
    videoUrl: "/video/basic-video.mp4",
    thumbnail: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    title: "Property Showcase",
  },
  {
    videoUrl: "/video/upgrade-video.mp4",
    thumbnail: "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    title: "AI Influencer",
  },
];

export function VideoShowcase() {
  return (
    <section className="grain-texture py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 via-background to-primary/5">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            See The Difference <span className="gradient-text">Video Ads</span> Make
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional, scroll-stopping videos that get buyers excited about your listings
          </p>
        </div>

        {/* Tilted Dual Video Display */}
        <div className="relative overflow-hidden rounded-3xl mb-16 max-w-5xl mx-auto shadow-2xl shadow-primary/10">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20" />

          {/* Blur effect for depth */}
          <div className="absolute inset-0 backdrop-blur-[100px]" />

          {/* Content Container */}
          <div className="relative px-6 py-12 lg:px-12 lg:py-16">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center">

              {/* Left: Compact Video Mockups */}
              <div className="relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
                <div className="relative flex items-center justify-center gap-6">
                  {/* Left video - Property Showcase */}
                  <div
                    className="relative w-48 lg:w-56 transform -rotate-3"
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
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold whitespace-nowrap shadow-lg">
                      Property Tour
                    </div>
                  </div>

                  {/* Right video - AI Influencer */}
                  <div
                    className="relative w-48 lg:w-56 transform rotate-3 translate-y-6"
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
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-accent text-foreground text-xs font-semibold whitespace-nowrap shadow-lg">
                      AI Influencer
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">AI-POWERED</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                    Two Powerful Video Styles
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Choose from professional property tours or engaging influencer-style videos.
                    Both are created by AI in minutes and optimized to stop the scroll on Facebook & Instagram.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="font-semibold">Property Tours</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Showcase features</li>
                      <li>• Build trust</li>
                      <li>• Professional feel</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold">AI Influencer</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• High engagement</li>
                      <li>• Personal touch</li>
                      <li>• Stops the scroll</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">30K+</div>
            <div className="text-sm text-muted-foreground">Customers Served</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">5000+</div>
            <div className="text-sm text-muted-foreground">5-Star Reviews</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">10+</div>
            <div className="text-sm text-muted-foreground">Years Innovation</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">AI Assistant</div>
          </div>
        </div>
      </div>
    </section>
  );
}
