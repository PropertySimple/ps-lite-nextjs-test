"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Martinez",
    role: "Top Producer, Miami",
    avatar: "JM",
    rating: 5,
    quote: "I went from spending $500/month on ads that didn't work to getting 15-20 leads per listing. The videos look incredible and I never have to touch Facebook Ads Manager.",
    metric: "15-20 leads/listing",
  },
  {
    name: "David Chen",
    role: "Realtor, San Diego",
    avatar: "DC",
    rating: 5,
    quote: "I'm not tech-savvy at all. This was literally plug and play. Upload photos, and boom—professional videos and ads running the next day. Worth every penny.",
    metric: "Setup in 1 day",
  },
  {
    name: "Amanda Williams",
    role: "Broker Associate, Austin",
    avatar: "AW",
    rating: 5,
    quote: "The video ads get WAY more engagement than static posts. My listings are getting seen by thousands more people. My sellers love seeing their homes promoted like this.",
    metric: "10x more reach",
  },
  {
    name: "Sarah Thompson",
    role: "Luxury Agent, Los Angeles",
    avatar: "ST",
    rating: 5,
    quote: "High-end buyers expect high-end marketing. These videos look like I hired a production company for every listing. My sellers are blown away.",
    metric: "Luxury quality",
  },
];

export function SocialProof() {
  return (
    <section className="grain-texture py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Agents Are Getting <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what top performers are saying about PropertySimple
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span className="text-muted-foreground">from 500+ agents</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </p>

                {/* Metric Badge */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-xs font-semibold text-success">
                      {testimonial.metric}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">30K+</div>
            <div className="text-sm text-muted-foreground">Agents Served</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">100K+</div>
            <div className="text-sm text-muted-foreground">Videos Created</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">10+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
