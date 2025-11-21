'use client';

import { Button } from '@/components/ui/button';
import { Check, Users, Shield, Star } from 'lucide-react';
import { PhoneMockup } from '@/components/PhoneMockup';
import { useState, useEffect } from 'react';

interface CampaignPreviewContentProps {
  campaignId: string;
  propertyAddress: string;
}

export function CampaignPreviewContent({ campaignId, propertyAddress }: CampaignPreviewContentProps) {
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
      {/* Sticky CTA Bar */}
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

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Outcome-First Hero */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
            <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium">Trusted by 2,800+ agents</span>
          </div>
          <p className="text-xs md:text-sm uppercase tracking-wide text-primary font-semibold mb-2 md:mb-3">
            YOUR CAMPAIGN IS READY
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-foreground max-w-4xl mx-auto leading-tight px-4">
            Expected to Generate<br />
            <span className="text-primary">2-6 Qualified Leads</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-1 md:mb-2 px-4">
            {propertyAddress}
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Reach 10,000+ local buyers in 7 days
          </p>
        </div>

        {/* Mobile Video Preview - Collapsible, appears first on mobile */}
        <div className="lg:hidden mb-6">
          <details className="bg-card rounded-2xl overflow-hidden border border-border" open>
            <summary className="p-4 cursor-pointer font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>Your Ad Preview</span>
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">5s preview</span>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-2">
                This 5-second preview shows the style. After payment, AI creates your custom 60-second videos.
              </p>
              <p className="text-sm font-medium text-foreground mb-4">
                ✏️ You can edit everything: script, voiceover, actor, visuals
              </p>
              <div className="flex justify-center">
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
                        className="w-full h-full object-cover"
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
            </div>
          </details>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start mb-16">
          {/* Left: Phone Mockup - Desktop only */}
          <div className="hidden lg:block lg:order-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <p className="font-semibold text-foreground mb-2 text-sm">
                  Your Ad Preview
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  This 5-second preview shows the style. After payment, AI creates your custom 60-second videos.
                </p>
                <p className="text-sm font-medium text-foreground">
                  ✏️ Fully editable: Change voiceover, actor, script, and visuals before launch
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

          {/* Right: Value Proposition */}
          <div className="space-y-6 lg:space-y-8 lg:order-2">
            {/* What You Get */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">What You Get</h2>

              {/* Value Breakdown */}
              <div className="bg-muted/50 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Professional Video Production (2 videos)</span>
                    <span className="line-through text-muted-foreground">$800</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">7-Day Ad Campaign Management</span>
                    <span className="line-through text-muted-foreground">$700</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">AI Lead Qualification</span>
                    <span className="line-through text-muted-foreground">$400</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total Value:</span>
                    <span className="line-through text-muted-foreground font-semibold">$1,900</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-primary/10 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                  <span className="font-bold text-foreground">Your Investment:</span>
                  <span className="text-4xl font-bold text-primary">$149</span>
                </div>
              </div>

              {/* ROI Context */}
              <div className="bg-success/10 border-l-4 border-success p-4 mb-6 rounded-r">
                <p className="text-sm font-semibold text-foreground mb-1">Average Cost Per Lead: $37</p>
                <p className="text-xs text-muted-foreground">
                  Based on 4 qualified leads per campaign vs. Zillow leads at $300+ each
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: '2 Custom AI Videos (60s each)',
                    description: 'Created within 24hrs • You approve before launch'
                  },
                  {
                    title: '10,000+ Local Buyers Reached',
                    description: '7-day Facebook & Instagram campaign'
                  },
                  {
                    title: 'AI Lead Qualification 24/7',
                    description: 'Only pre-qualified buyers forwarded to you'
                  },
                  {
                    title: 'Keep Videos Forever',
                    description: 'Download & reuse anywhere'
                  },
                  {
                    title: '7-Day Money-Back Guarantee',
                    description: 'Full refund if not satisfied'
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full h-12 md:h-14 text-base md:text-lg font-semibold"
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
                  <>
                    <span className="md:hidden">Launch Campaign - $149 →</span>
                    <span className="hidden md:inline">Approve & Launch Campaign →</span>
                  </>
                )}
              </Button>
              <div className="mt-3 md:mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-center">Secure payment • 7-day money-back guarantee</span>
              </div>
            </div>

            {/* Post-Purchase Editing Callout */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-4">
              <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span>✏️</span>
                Full Creative Control After Payment
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Edit video script and messaging</li>
                <li>• Change AI voiceover (male/female, accent, tone)</li>
                <li>• Swap AI actor/avatar</li>
                <li>• Adjust visuals and property photos</li>
                <li>• Modify ad copy and targeting</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Nothing launches until you approve the final version
              </p>
            </div>

            {/* Testimonials */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-bold text-lg mb-4 text-foreground">What Agents Are Saying</h3>
              <div className="space-y-4">
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
                  <div key={index} className="border-l-2 border-primary pl-4 py-1">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-2">"{testimonial.quote}"</p>
                    <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.brokerage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "When will my videos be ready?",
                a: "AI creates your final 60-second videos within 24 hours of payment. You'll receive preview links to approve before ads launch."
              },
              {
                q: "Can I edit the videos and ad copy?",
                a: "Absolutely! After payment, you'll receive your custom videos within 24 hours. Before launch, you can edit the script, change the AI voiceover (voice type, accent, tone), swap the AI actor, adjust visuals, and modify ad copy. Nothing goes live until you approve."
              },
              {
                q: "What if I don't get leads?",
                a: "Full 7-day money-back guarantee. If you don't get at least 2 qualified leads, we refund 100%. Plus, you keep the videos forever even if you request a refund."
              },
              {
                q: "Is $149 the total cost?",
                a: "$149 is the TOTAL cost. No setup fees, no ad spend fees, no recurring charges. You pay once, campaign runs for 7 days."
              },
              {
                q: "Who handles the ad setup?",
                a: "We handle everything - video creation, ad setup, targeting, and optimization. You just approve and receive leads."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-border pb-6 last:border-0">
                <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto bg-card rounded-2xl p-10 text-center shadow-sm border-2 border-primary">
          <h3 className="text-2xl font-bold mb-3 text-foreground">Ready to Launch Your Campaign?</h3>
          <p className="text-muted-foreground mb-6">
            Join 2,800+ agents who are getting qualified buyers with PropertySimple
          </p>
          <Button
            size="lg"
            className="h-14 px-12 text-lg font-semibold"
            onClick={() => {
              setIsLoading(true);
              window.location.href = `/api/checkout?campaignId=${campaignId}`;
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Approve Campaign - $149 →'}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            7-day money-back guarantee • Keep videos forever
          </p>
        </div>
      </div>
    </div>
  );
}
