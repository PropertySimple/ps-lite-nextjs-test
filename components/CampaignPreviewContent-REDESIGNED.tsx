'use client';

import { Button } from '@/components/ui/button';
import { Check, Users, Shield, Star } from 'lucide-react';
import { PhoneMockup } from '@/components/PhoneMockup';
import { useState, useEffect } from 'react';

interface CampaignPreviewContentProps {
  campaignId: string;
  propertyAddress: string;
}

export function CampaignPreviewContentRedesigned({ campaignId, propertyAddress }: CampaignPreviewContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Sticky CTA Bar - UNCHANGED (works perfectly) */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary shadow-2xl p-4 z-50 animate-in slide-in-from-bottom">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <p className="font-semibold text-foreground">Campaign Ready to Launch</p>
              <p className="text-sm text-muted-foreground">$149 • 7-day money-back guarantee</p>
            </div>
            <Button
              size="lg"
              className="w-full md:w-auto h-12 px-8 font-semibold"
              onClick={() => {
                setIsLoading(true);
                window.location.href = `/api/checkout?campaignId=${campaignId}`;
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Approve & Launch →'}
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section - SIMPLIFIED SPACING */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Trusted by 2,800+ agents</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground leading-tight">
            Expected to Generate<br />
            <span className="text-primary">2-6 Qualified Leads</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-2">{propertyAddress}</p>
          <p className="text-base text-muted-foreground">Reach 10,000+ local buyers in 7 days</p>
        </div>

        {/* Mobile Video - ALWAYS VISIBLE, HERO POSITION */}
        <div className="lg:hidden mb-8">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex justify-center mb-4">
              <div className="w-64 relative">
                <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 aspect-[9/16]">
                  <div className="relative h-full">
                    <div className="absolute top-4 left-0 right-0 z-10 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1.5px]">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[8px] font-bold text-gray-800">
                            PS
                          </div>
                        </div>
                        <span className="text-white text-xs font-semibold drop-shadow-lg">propertysimple</span>
                      </div>
                    </div>
                    <video
                      src="/video/upgrade-video.mp4"
                      poster="/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png"
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onLoadedData={(e) => {
                        const target = e.currentTarget as HTMLVideoElement;
                        target.style.opacity = '1';
                      }}
                      style={{ opacity: 0 }}
                    />
                    <div className="absolute top-14 right-2 bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-[9px] font-bold">
                      PREVIEW
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="bg-white rounded-lg p-2 text-center">
                        <p className="text-[10px] font-semibold text-gray-900">Schedule Tour</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground mb-2">
              5-second style preview • Your custom 60s videos ready in 24hrs
            </p>
            <p className="text-sm text-center font-medium text-foreground">
              ✏️ Edit everything before launch
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start mb-16">
          {/* Left: Desktop Video - STICKY */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <p className="font-semibold text-foreground mb-2 text-sm">Your Ad Preview</p>
                <p className="text-sm text-muted-foreground mb-3">
                  5-second style preview • Custom 60s videos ready in 24hrs
                </p>
                <p className="text-sm font-medium text-foreground">
                  ✏️ Edit everything before launch
                </p>
              </div>
              <div className="flex justify-center">
                <PhoneMockup platform="instagram">
                  <div className="relative h-full bg-black">
                    <div className="absolute top-12 left-0 right-0 z-10 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-gray-800">
                            PS
                          </div>
                        </div>
                        <span className="text-white text-sm font-semibold drop-shadow-lg">propertysimple</span>
                      </div>
                    </div>
                    <video
                      src="/video/upgrade-video.mp4"
                      poster="/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png"
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-20 right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-[10px] font-bold">
                      5s PREVIEW
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-gray-900">Schedule Tour</p>
                      </div>
                    </div>
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>

          {/* Right: Value Proposition - REDESIGNED */}
          <div className="space-y-8">
            {/* What Happens Next - TIMELINE FORMAT */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">What Happens Next</h2>

              {/* Timeline Steps */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Creates Your Videos (24hrs)</p>
                    <p className="text-sm text-muted-foreground">2 custom 60-second videos • Edit before launch</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">7-Day Ad Campaign Runs</p>
                    <p className="text-sm text-muted-foreground">10,000+ local buyers on Facebook & Instagram</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Qualified Leads Delivered</p>
                    <p className="text-sm text-muted-foreground">AI pre-screens • Only serious buyers contact you</p>
                  </div>
                </div>
              </div>

              {/* ROI Callout - MOVED UP FOR PROMINENCE */}
              <div className="bg-success/10 border-l-4 border-success p-4 mb-6 rounded-r">
                <p className="font-bold text-foreground mb-1">$37 per qualified lead</p>
                <p className="text-sm text-muted-foreground">
                  vs. Zillow leads at $300+ each
                </p>
              </div>

              {/* Simplified Features - 3 ITEMS ONLY */}
              <div className="space-y-3 mb-8">
                {[
                  { title: '2 Custom AI Videos', sub: 'Download & keep forever' },
                  { title: 'Full Editing Control', sub: 'Change script, voice, actor, visuals' },
                  { title: '7-Day Money-Back', sub: 'Keep videos even if refunded' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price - SIMPLE AND CLEAR */}
              <div className="bg-primary/10 rounded-xl p-6 mb-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Investment</p>
                <p className="text-5xl font-bold text-primary mb-2">$149</p>
                <p className="text-sm text-muted-foreground">
                  No setup fees • No ad spend fees • No recurring charges
                </p>
              </div>

              {/* Primary CTA - WITH MICRO-INTERACTION */}
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  setIsLoading(true);
                  window.location.href = `/api/checkout?campaignId=${campaignId}`;
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  'Approve & Launch Campaign →'
                )}
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secure payment • 7-day money-back guarantee</span>
              </div>
            </div>

            {/* Testimonials - STREAMLINED */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-bold text-xl mb-6 text-foreground">What Agents Say</h3>
              <div className="space-y-6">
                {[
                  {
                    quote: "This got me 4 serious showings in 3 days. Sold the house for $15K over asking.",
                    name: "Jennifer Martinez",
                    brokerage: "Coldwell Banker Sedona"
                  },
                  {
                    quote: "The AI lead qualification saved me hours - I only talked to buyers who were actually ready.",
                    name: "Marcus Chen",
                    brokerage: "RE/MAX Phoenix"
                  },
                  {
                    quote: "Listing was sitting for 6 weeks. Launched this on Monday, had 3 showings by Friday.",
                    name: "Sarah Thompson",
                    brokerage: "Keller Williams Scottsdale"
                  }
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary pl-4 py-2 hover:border-l-4 hover:pl-3 transition-all duration-200"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-2">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.brokerage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ - REDUCED TO 3 CRITICAL QUESTIONS */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "When will my videos be ready?",
                a: "AI creates your custom 60-second videos within 24 hours. You'll approve them before ads launch."
              },
              {
                q: "What if I don't get leads?",
                a: "7-day money-back guarantee. If you don't get at least 2 qualified leads, full refund. You keep the videos forever either way."
              },
              {
                q: "Is $149 the total cost?",
                a: "Yes. $149 covers everything - videos, ads, targeting, optimization. No hidden fees, no ad spend charges."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-border pb-6 last:border-0">
                <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* REMOVED: Final CTA section (redundant with sticky bar) */}
      </div>
    </div>
  );
}
