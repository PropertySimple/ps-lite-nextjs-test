"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useListingModal } from "./ListingModalContext";

export function HeroNew() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { openModal } = useListingModal();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 0);
  }, []);

  return (
    <section className="grain-texture relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Asymmetric layout - content left, visual right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* LEFT: Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Headline - Outcome focused */}
            <div className="space-y-4">
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="gradient-text inline-block">Your Next Client</span>{' '}
                <span className="text-foreground">Is Scrolling Right Now</span>
              </h1>

              <p
                className={`text-xl sm:text-2xl text-muted-foreground leading-relaxed transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                We create the video. We run the ad. You get the calls.{' '}
                <strong className="text-foreground">That's it.</strong>
              </p>
            </div>

            {/* Simple value props */}
            <div
              className={`space-y-3 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {[
                "Your ad is live by tomorrow",
                "You never touch Facebook Ads Manager",
                "Keep your videos forever",
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500`}
                  style={{ transitionDelay: `${700 + i * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA - ONE button */}
            <div
              className={`pt-4 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: '1000ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Guarantee ABOVE the button */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>48-hour money-back guarantee • Keep the videos forever</span>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-12 py-7 text-xl font-bold rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
                onClick={openModal}
              >
                Get My Videos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {/* Price - clear and confident */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">$147</span>
                <span className="text-muted-foreground">one-time • 7 days ad spend included</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Video showcase with phones */}
          <div
            className={`relative transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative flex items-center justify-center gap-6 lg:gap-8">
              {/* Left video - Property Tour */}
              <div
                className="relative w-44 sm:w-52 lg:w-60 transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-foreground/5 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border-2 border-foreground/10">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                    <video
                      src="/video/basic-video.mp4"
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-primary text-white text-sm font-bold whitespace-nowrap shadow-lg">
                  Property Tour
                </div>
              </div>

              {/* Right video - Presenter Style */}
              <div
                className="relative w-44 sm:w-52 lg:w-60 transform rotate-6 translate-y-8 hover:rotate-0 transition-transform duration-500"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="bg-foreground/5 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border-2 border-foreground/10">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                    <video
                      src="/video/upgrade-video.mp4"
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-accent text-foreground text-sm font-bold whitespace-nowrap shadow-lg">
                  Presenter Style
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
