"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

export function PriceComparison() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Headline */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            The <span className="gradient-text">No-Brainer</span> Investment
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare what you're spending now vs. what you get with PropertySimple
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Traditional Way - Expensive */}
          <Card className="p-8 border-2 border-destructive/30 relative">
            <div className="absolute top-6 right-6 px-3 py-1 bg-destructive/10 text-destructive text-sm font-semibold rounded-full">
              The Old Way
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Doing It Yourself</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign amount="$300-500" label="Videographer" />
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign amount="$500-1500" label="Facebook/Instagram ad spend" />
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign amount="$200-400" label="Ad management software" />
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign amount="10-20 hrs" label="Your time learning & managing" />
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="text-muted-foreground">Trial & error (expensive mistakes)</div>
                </div>
              </div>

              <div className="pt-6 border-t border-destructive/20">
                <div className="text-sm text-muted-foreground">Total cost per listing:</div>
                <div className="text-4xl font-black text-destructive">$1,000 - $2,400</div>
                <div className="text-sm text-muted-foreground">+ 10-20 hours of your time</div>
              </div>
            </div>
          </Card>

          {/* PropertySimple Way - Value */}
          <Card className="p-8 border-4 border-primary relative shadow-2xl shadow-primary/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              BEST VALUE
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">PropertySimple</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">Professional Video Ads</div>
                    <div className="text-sm text-muted-foreground">Property tour + influencer style</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">Ad Spend Included (7 days)</div>
                    <div className="text-sm text-muted-foreground">Facebook & Instagram placement</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">Simple CRM Included</div>
                    <div className="text-sm text-muted-foreground">Manage & export leads anytime</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">Keep Videos Forever</div>
                    <div className="text-sm text-muted-foreground">Share on social, send to sellers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">48-Hour Money-Back Guarantee</div>
                    <div className="text-sm text-muted-foreground">Zero risk, keep the videos</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/20 bg-primary/5 -mx-4 px-4 pb-4">
                <div className="text-sm text-muted-foreground">Total cost per listing:</div>
                <div className="text-5xl font-black text-primary">$147</div>
                <div className="text-sm text-success font-semibold">+ 2 minutes of your time</div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-bold rounded-full shadow-xl"
              >
                Get My Videos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Math callout */}
        <div className="text-center bg-success/5 border-2 border-success/20 rounded-2xl p-8">
          <p className="text-2xl font-bold text-foreground mb-2">
            You save <span className="text-success text-3xl">$853 - $2,253</span> per listing
          </p>
          <p className="text-lg text-muted-foreground">
            If you list just 2 homes per month, that's <strong className="text-foreground">$20,000 - $54,000 saved per year</strong>.
            <br />
            <span className="text-success font-semibold">Plus you get your time back to actually sell homes.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function DollarSign({ amount, label }: { amount: string; label: string }) {
  return (
    <>
      <div className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5">$</div>
      <div>
        <div className="font-semibold text-foreground">{amount}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </>
  );
}
