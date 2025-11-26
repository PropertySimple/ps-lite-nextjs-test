"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, CreditCard, Lock, ArrowLeft, TrendingUp } from "lucide-react";
import { campaignData } from "@/data/mockData";

export default function ExtendCheckoutPage() {
  const { campaignId } = useParams();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'google' | 'card' | null>(null);
  const [showCardCheckout, setShowCardCheckout] = useState(false);

  // Get campaign data
  const campaign = campaignData[campaignId as keyof typeof campaignData] || campaignData["1"];

  const handleApplePay = async () => {
    setPaymentMethod('apple');
    setIsProcessing(true);
    setTimeout(() => {
      router.push(`/campaign-detail/${campaignId}?extended=true`);
    }, 2000);
  };

  const handleGooglePay = async () => {
    setPaymentMethod('google');
    setIsProcessing(true);
    setTimeout(() => {
      router.push(`/campaign-detail/${campaignId}?extended=true`);
    }, 2000);
  };

  const handleCardPayment = async () => {
    setPaymentMethod('card');
    setShowCardCheckout(true);
  };

  const handleContinueCheckout = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push(`/campaign-detail/${campaignId}?extended=true`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-4 border-b border-gray-100">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/campaigns" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <Image
            src="/lovable-uploads/3ae8586b-2625-423a-8e97-0bae1a52dd43.png"
            alt="PropertySimple"
            width={120}
            height={24}
          />
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Extend Your Campaign
            </h1>
          </div>
          <p className="text-gray-500">
            Keep the momentum going with 7 more days
          </p>
        </div>

        {/* Campaign Preview */}
        <div className="mb-8">
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg mb-4">
            <Image
              src={campaign.listingImage || "/listing-images/white-house-listing.jpg"}
              alt={campaign.property}
              width={450}
              height={253}
              className="w-full h-full object-cover"
              unoptimized={(campaign.listingImage || "").startsWith("http")}
            />
          </div>
          <p className="text-center text-gray-600 font-medium">
            {campaign.property}
          </p>
        </div>

        {/* What's Included */}
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>7 additional days of ad delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Continue reaching potential buyers</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Same high-performing ad creative</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <Card className="p-6 mb-6">
          {/* Price */}
          <div className="text-center mb-6">
            <p className="text-4xl font-semibold text-gray-900">$99</p>
            <p className="text-sm text-gray-500 mt-1">One-time payment • 7 more days</p>
          </div>

          {/* Express Checkout */}
          <div className="space-y-3 mb-4">
            {/* Apple Pay */}
            <Button
              className="w-full h-12 bg-black hover:bg-gray-900 text-white rounded-lg font-medium"
              onClick={handleApplePay}
              disabled={isProcessing}
            >
              {isProcessing && paymentMethod === 'apple' ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-5 mr-1" viewBox="0 0 170 200" fill="white">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z"/>
                  </svg>
                  <span className="text-lg font-medium">Pay</span>
                </span>
              )}
            </Button>

            {/* Google Pay */}
            <Button
              className="w-full h-12 bg-black hover:bg-gray-900 text-white rounded-lg font-medium"
              onClick={handleGooglePay}
              disabled={isProcessing}
            >
              {isProcessing && paymentMethod === 'google' ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-lg font-medium">Pay</span>
                </span>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or pay with card</span>
            </div>
          </div>

          {/* Card Payment */}
          <Button
            variant="outline"
            className="w-full h-12 rounded-lg font-medium"
            onClick={handleCardPayment}
            disabled={isProcessing}
          >
            {isProcessing && paymentMethod === 'card' ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pay with Card
              </span>
            )}
          </Button>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Secure checkout powered by Stripe</span>
          </div>
        </div>
      </main>

      {/* Stripe Checkout Modal */}
      <Dialog open={showCardCheckout} onOpenChange={setShowCardCheckout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Stripe Checkout</DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete your purchase securely
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">Stripe checkout will show here</p>
              <p className="text-sm text-gray-500">
                In production, this will display the Stripe payment form
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowCardCheckout(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleContinueCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                'Pay $99'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
