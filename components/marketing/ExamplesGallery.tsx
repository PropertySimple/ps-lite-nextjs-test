"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const videos = [
  {
    id: "basic-1",
    videoUrl: "/video/basic-video.mp4",
    thumbnail: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    title: "Modern Family Home",
    type: "Property Tour",
    description: "AI-narrated walkthrough showcasing key features",
    color: "blue",
  },
  {
    id: "upgrade-1",
    videoUrl: "/video/upgrade-video.mp4",
    thumbnail: "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    title: "Luxury Listing",
    type: "AI Influencer",
    description: "Engaging influencer-style presentation",
    color: "purple",
  },
  {
    id: "basic-2",
    videoUrl: "/video/basic-video.mp4",
    thumbnail: "/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png",
    title: "Suburban Gem",
    type: "Property Tour",
    description: "Professional property showcase",
    color: "blue",
  },
  {
    id: "upgrade-2",
    videoUrl: "/video/upgrade-video.mp4",
    thumbnail: "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    title: "Downtown Condo",
    type: "AI Influencer",
    description: "High-energy social media style",
    color: "purple",
  },
];

export function ExamplesGallery() {
  const [filter, setFilter] = useState<string>("all");

  const filteredVideos = filter === "all"
    ? videos
    : videos.filter(v => v.type.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            All Videos
          </button>
          <button
            onClick={() => setFilter("property")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === "property"
                ? "bg-blue-600 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Property Tours
          </button>
          <button
            onClick={() => setFilter("influencer")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === "influencer"
                ? "bg-blue-600 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            AI Influencer
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group overflow-hidden border-2 hover:border-blue-500/50 transition-all hover:shadow-xl">
              {/* Video */}
              <div className="relative aspect-[9/16] bg-black">
                <video
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />

                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={`${
                    video.color === "blue"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-purple-500 hover:bg-purple-600"
                  } text-white`}>
                    {video.type}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Ready to Create Your Own?</h2>
          <p className="text-lg text-muted-foreground">
            Get professional video ads for your listings in minutes. No video editing skills required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:scale-105"
            >
              View Pricing
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 font-semibold transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
