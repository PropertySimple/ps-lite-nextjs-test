"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingFaqs = [
  {
    question: "What's included in the $147 per listing price?",
    answer: "Everything! AI video creation (both property tour and influencer styles), Facebook & Instagram ad placement, 7 days of ad spend, lead capture forms, and you keep the videos forever.",
  },
  {
    question: "Why should I choose the AutoAds Subscription?",
    answer: "If you list more than 2 properties per month, the subscription pays for itself. Plus, the auto-run feature means you'll never forget to advertise a new listing. Every property gets premium video ads automatically.",
  },
  {
    question: "How does the 'auto-run on new listings' work?",
    answer: "When you're a subscriber and add a new property to your account, we automatically create the video ads and prepare the campaign. You'll get a notification to review before we charge you the discounted $110. If you don't want to run ads for that listing, just click 'skip' and you won't be charged.",
  },
  {
    question: "Can I download and use my videos elsewhere?",
    answer: "Absolutely! That's one of the biggest benefits. Download your videos and use them on social media, your website, email campaigns—anywhere you want. They're yours to keep forever.",
  },
  {
    question: "What happens after the 7-day campaign ends?",
    answer: "You can extend your campaign for as long as you'd like at a daily rate, or let it end. Your videos are yours to keep forever—download them and share on social media, send to your sellers, or reuse however you want.",
  },
  {
    question: "How does the 48-hour money-back guarantee work?",
    answer: "Simple: if you change your mind for any reason within 48 hours of purchase, just let us know and we'll refund you completely. No questions asked, no hassle.",
  },
  {
    question: "Is there a setup fee or long-term contract?",
    answer: "Nope! No setup fees, no hidden costs. For Pay-Per-Ad, it's just $147 per listing. For AutoAds Subscription, it's $97/month and you can cancel anytime.",
  },
  {
    question: "Do I need to pay for Facebook/Instagram ads separately?",
    answer: "No! The ad spend is included in the $147 (or $110 with subscription) for the 7-day campaign. We handle everything—you don't need to set up payment with Facebook or manage ad budgets.",
  },
];

export function PricingFAQ() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Pricing Questions?
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our pricing
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {pricingFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-2 rounded-lg px-6 hover:border-blue-500/50 transition-colors bg-background"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
