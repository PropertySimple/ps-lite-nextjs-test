"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Mail, TrendingUp, CheckCircle2 } from "lucide-react";

const CampaignWelcome = () => {
  const { campaignId } = useParams();
  const router = useRouter();

  // Auto-redirect after 10 seconds if user doesn't take action
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/campaign-detail/${campaignId}`);
    }, 10000);

    return () => clearTimeout(timer);
  }, [campaignId, router]);

  // Get estimated reach based on campaign (mock data for now)
  const estimatedReach = "10,000+";
  const propertyAddress = "123 First Ave";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Hero */}
        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="text-6xl mb-2">
                🎉
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Campaign Order Received!
              </h1>

              <p className="text-lg text-muted-foreground">
                {propertyAddress}
              </p>

              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Estimated reach: <span className="font-semibold text-foreground">{estimatedReach}</span> potential buyers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card>
          <CardHeader>
            <CardTitle>What Happens Next</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">AI is building your ads and videos</h3>
                <p className="text-sm text-muted-foreground">
                  We're creating professional ad creatives and videos optimized for Facebook and Instagram. This process takes a few hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">You'll review before it goes live</h3>
                <p className="text-sm text-muted-foreground">
                  Your campaign will be ready to review in a few minutes and you have 24 hours to make any changes you like before we launch it.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">We optimize as it runs</h3>
                <p className="text-sm text-muted-foreground">
                  Once approved, your campaign runs for 7 days. Our team monitors performance daily and makes adjustments to maximize leads and minimize cost per lead.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="flex-1 h-12 sm:h-11"
            asChild
          >
            <Link href="/dashboard">
              <ArrowRight className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-12 sm:h-11"
            asChild
          >
            <Link href="/listing-manager">
              Create Another Campaign
            </Link>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Check your email in a few minutes for the campaign preview link
        </p>
      </div>
    </div>
  );
};

export default CampaignWelcome;
