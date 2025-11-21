import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/countdown-timer';
import { Check, Clock } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdPreviewPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Demo data
  const propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336';
  const campaignId = params.id;

  // Set expiration to 24 hours from now for demo
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Urgency Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
            Launch Pricing Expires In
          </p>
          <div className="text-2xl md:text-3xl font-black tabular-nums text-primary">
            <CountdownTimer expiresAt={expiresAt} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Campaign to Reach 10,000+ Local Buyers is Ready
          </h1>
          <p className="text-xl text-primary font-semibold">
            {propertyAddress}
          </p>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We just created a $259 marketing campaign for your listing. Approve your campaign to start reaching buyers today.
          </p>
        </div>

        {/* Video Player Section - Tilted Phone Mockups */}
        <div className="relative overflow-hidden rounded-3xl mb-16 max-w-5xl mx-auto shadow-2xl shadow-primary/10">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20" />

          {/* Blur effect for depth */}
          <div className="absolute inset-0 backdrop-blur-[100px]" />

          {/* Content Container */}
          <div className="relative px-6 py-12 lg:px-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
                <div className="relative flex items-center justify-center gap-6">
                  {/* Left video - Property Tour */}
                  <div
                    className="relative w-48 lg:w-56 transform -rotate-3"
                    style={{ transformOrigin: 'center center' }}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-2xl">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
                        <video
                          src="/video/basic-video.mp4"
                          poster="/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png"
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
                          src="/video/upgrade-video.mp4"
                          poster="/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png"
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
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 mb-12 border-2 border-primary/20 grain-texture">
          <div className="text-center mb-8">
            <div className="inline-block relative">
              {/* Campaign Value Badge */}
              <div className="absolute -top-10 -right-8 bg-success text-white px-4 py-2 rounded-full rotate-12 font-bold shadow-lg text-sm animate-pulse">
                SAVE $32
              </div>

              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Campaign Value: $259
              </p>
              <p className="text-muted-foreground text-xl line-through mb-2 opacity-60">
                $149
              </p>
              <p className="text-7xl md:text-8xl font-black text-primary mb-2 tabular-nums">
                $117
              </p>
              <div className="h-1 w-full bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
              <p className="text-lg font-semibold text-foreground">
                Launch Pricing - Join Next Batch
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Approve within 24 hours for early batch access
              </p>
            </div>
          </div>

          {/* What You Get */}
          <div className="bg-card rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">What you get:</h3>
            <div className="space-y-3">
              {[
                'These 2 professional videos (property tour + AI influencer)',
                '7 days of Facebook & Instagram ads ($110+ in ad spend)',
                'Lead capture forms on your ads',
                'Reach 10,000+ local buyers',
                'Campaign performance dashboard',
                'Keep videos forever',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link href={`/api/checkout?campaignId=${campaignId}`}>
            <Button size="lg" className="w-full text-lg h-14 font-bold active:scale-95 transition-transform">
              Lock In $117 Launch Pricing →
            </Button>
          </Link>

          <p className="text-center text-sm text-muted-foreground mt-4">
            ✅ 48-hour money-back guarantee • Keep videos forever • No contracts
          </p>
        </div>

        {/* Why Launch Pricing Section */}
        <div className="bg-card rounded-xl p-8 mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-4">Why Launch Pricing Exists</h2>
          <p className="text-muted-foreground mb-4">
            We run campaigns in scheduled batches to maximize your ad performance and reduce costs.
            When you approve within the launch window, you join the next batch and we pass the efficiency
            savings directly to you. After 24 hours, you can still launch for our standard $149 price -
            we just can't batch your campaign for the same cost savings.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold mb-1">Standard Launch:</p>
              <p className="text-muted-foreground">$149 - Available anytime</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <p className="font-semibold mb-1 text-primary">Batch Launch (24hrs):</p>
              <p className="text-primary">$117 - Early access savings ✅</p>
            </div>
          </div>
        </div>

        {/* How Future Campaigns Work */}
        <div className="bg-card rounded-xl p-8 mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-4">How future campaigns work:</h2>
          <p className="text-muted-foreground mb-6">
            Every time you add a listing, here's what happens:
          </p>
          <div className="space-y-4">
            {[
              { num: '1', text: 'We ask if you want to create ads' },
              { num: '2', text: 'We generate your videos (few hours)' },
              { num: '3', text: 'You approve within 24hrs → $117' },
              { num: '4', text: 'You approve after 24hrs → $149' },
              { num: '5', text: 'You\'re always in control' },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  {step.num}
                </div>
                <p className="pt-1">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 font-semibold">
            Simple. Fair. Transparent.
          </p>
        </div>

        {/* Results Stats */}
        <div className="bg-card rounded-xl p-8 mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Average Campaign Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10-15K</div>
              <div className="text-sm text-muted-foreground">Local Buyers Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8-12</div>
              <div className="text-sm text-muted-foreground">Qualified Leads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Faster Time-to-Offer</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">67%</div>
              <div className="text-sm text-muted-foreground">Email Open Rate</div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6 italic">
            Based on 30,000+ campaigns and 840,000+ emails sent
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <p className="text-3xl font-bold mb-2">
              Real Results from Real Agents
            </p>
            <div className="flex items-center justify-center gap-1 text-2xl mb-2">
              {'⭐'.repeat(5)}
            </div>
            <p className="text-muted-foreground">5,000+ five-star reviews</p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Sarah Martinez",
                location: "Phoenix, AZ",
                avatar: "SM",
                review: "Got 8 qualified leads in the first 3 days. The videos looked so professional that buyers thought I hired a production company. This paid for itself with one buyer.",
                result: "8 leads in 3 days"
              },
              {
                name: "Michael Chen",
                location: "Austin, TX",
                avatar: "MC",
                review: "I was skeptical about AI-generated videos, but these look professional. Won 2 new listings because sellers saw my marketing.",
                result: "2 listings won"
              },
              {
                name: "Jennifer Lopez",
                location: "Denver, CO",
                avatar: "JL",
                review: "The video quality is a game-changer. I got a buyer inquiry from someone who saw my ad and it turned into a $450K sale. Worth every penny.",
                result: "$450K sale"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  "{testimonial.review}"
                </p>
                <div className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">
                  {testimonial.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8 md:p-12 text-center grain-texture">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Launch?
          </h2>
          <div className="mb-6">
            <CountdownTimer expiresAt={expiresAt} />
          </div>
          <Link href={`/api/checkout?campaignId=${campaignId}`}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg h-14 font-bold mb-4 active:scale-95 transition-transform"
            >
              Lock In $117 Pricing →
            </Button>
          </Link>
          <p className="text-white/90 text-sm">
            Launch pricing expires in 24 hours • 48-hour guarantee • Keep videos forever
          </p>
        </div>
      </div>
    </div>
  );
}
