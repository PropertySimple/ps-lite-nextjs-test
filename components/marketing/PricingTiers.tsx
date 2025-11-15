"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export function PricingTiers() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="grain-texture py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 via-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pay-Per-Ad */}
          <div
            className={`transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Card className="border-2 border-primary/30 hover:border-primary transition-all relative shadow-lg hover:shadow-xl hover:shadow-primary/10">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Pay-Per-Ad</h3>
                  <p className="text-muted-foreground">Perfect for trying us out or occasional listings</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">$147</span>
                    <span className="text-muted-foreground">per listing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">7-day campaign, ad spend included</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">AI-generated video ads (both styles)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Facebook & Instagram placement</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Ad spend included for 7 days</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">AI assistant for this campaign</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Basic CRM access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Keep your videos forever</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">48-hour money-back guarantee</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Get Started
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Extend beyond 7 days anytime
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AutoAds Subscription */}
          <div
            className={`transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Card className="border-2 border-accent hover:border-accent/70 transition-all relative shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30">
              {/* Recommended Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 fill-white" />
                  BEST VALUE
                </div>
              </div>

              <CardContent className="p-8 space-y-6 mt-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">AutoAds Subscription</h3>
                  <p className="text-muted-foreground">Never miss a lead + save 25% on every ad</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">$97</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm font-semibold text-accent">+ $110 per ad (25% off!)</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">24/7 AI Assistant for Everything</div>
                      <div className="text-sm text-muted-foreground">Use on signs, business cards, flyers, websites—unlimited calls & texts!</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">25% Off All Video Ads</div>
                      <div className="text-sm text-muted-foreground">Just $110 per listing instead of $147</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Auto-Run on New Listings</div>
                      <div className="text-sm text-muted-foreground">We automatically create & run ads when you add properties (skip any you don't want)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Pay-Per-Ad</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full CRM access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">48-hour money-back guarantee</span>
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-foreground font-bold" size="lg">
                  Start Subscription
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Cancel anytime, no questions asked
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Pay-Per-Ad</th>
                  <th className="text-center py-4 px-4 bg-accent/5">AutoAds Subscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 px-4">Video Ad Creation</td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Ad Placement (FB & IG)</td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">AI Assistant for Campaigns</td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">AI Phone Number for Everything</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">—</td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Use on Signs, Cards, Flyers</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">—</td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Unlimited AI Calls & Texts</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">—</td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Auto-Run on New Listings</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">—</td>
                  <td className="text-center py-4 px-4 bg-accent/5"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Price Per Ad</td>
                  <td className="text-center py-4 px-4 font-semibold text-primary">$147</td>
                  <td className="text-center py-4 px-4 bg-accent/5 font-semibold text-accent">$110 (25% off!)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
