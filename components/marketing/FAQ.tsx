"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need any tech skills or video editing experience?",
    answer: "Not at all! That's the whole point. You just upload your listing photos and details. Our AI handles all the video creation, ad writing, and posting. If you can upload a photo to Facebook, you can use PropertySimple.",
  },
  {
    question: "How much does it cost?",
    answer: "Plans start at $99/month for unlimited video ads on one active listing. We also offer pay-per-listing options starting at $49. Your first campaign is free so you can see results before committing. No hidden fees, no ad spend minimums.",
  },
  {
    question: "Do I have to pay for Facebook and Instagram ads separately?",
    answer: "Yes, you'll need a Facebook Ads account (which is free to create), and you control your ad budget. We recommend starting with $10-20/day per listing. The good news: our AI optimizes your ads to keep your cost per lead low—typically 50% lower than DIY ads.",
  },
  {
    question: "How does the AI assistant answer calls and texts?",
    answer: "We give you a dedicated phone number for your ads. When someone calls or texts, our AI assistant responds instantly—answering questions about the property, checking if they're pre-approved, and booking showings on your calendar. You get a text summary of every conversation with a 'hot lead' rating.",
  },
  {
    question: "What if the AI says something wrong or doesn't know an answer?",
    answer: "The AI is trained on real estate conversations and knows when to escalate to you. If someone asks something it can't answer, it says 'Let me connect you with the agent' and sends you a notification. You can also customize responses and add property-specific details.",
  },
  {
    question: "Can I see the video before it goes live?",
    answer: "Absolutely! We show you a preview of every video and ad before posting. You can request edits, change the script, swap the actor, or adjust the music. Once you approve, we post it for you.",
  },
  {
    question: "How long does it take to create a video ad?",
    answer: "Our AI creates your first draft in about 5 minutes. After your approval and any edits, it's usually live on Facebook and Instagram within 24 hours.",
  },
  {
    question: "What if I already have someone managing my ads?",
    answer: "Many agents use PropertySimple alongside their existing marketing. Our video ads tend to get higher engagement than static images, so they complement what you're already doing. Plus, the AI assistant works 24/7—something most teams can't offer.",
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer: "No contracts. Cancel anytime with one click. We only make money if we keep delivering value, so we work hard to keep you happy.",
  },
  {
    question: "What makes your video ads better than just posting photos?",
    answer: "Video ads get 10x more engagement on social media. They stop the scroll, showcase properties better, and build emotional connections. Our AI creates professional-quality videos that look like you hired a production crew—for a fraction of the cost and time.",
  },
  {
    question: "Do I need to give you access to my Facebook account?",
    answer: "We use Facebook's official integration, so you grant limited permissions through Facebook's secure process—similar to how you'd connect any app. You maintain full control and can revoke access anytime. We never post anything without your approval.",
  },
  {
    question: "Can I use this for open houses or just listings?",
    answer: "Both! You can create video ads for new listings, price reductions, open houses, or even personal branding content. The AI adapts the script and style based on what you're promoting.",
  },
];

export function FAQ() {
  return (
    <section className="grain-texture py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 via-background to-primary/5">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Questions? <span className="gradient-text">We've Got Answers</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about PropertySimple
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-2 border-border rounded-lg px-6 hover:border-primary/50 transition-colors bg-card"
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

        {/* Still have questions CTA */}
        <div className="mt-16 text-center space-y-4">
          <h3 className="text-2xl font-bold">Still have questions?</h3>
          <p className="text-muted-foreground">
            Chat with our team or schedule a quick demo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="mailto:support@propertysimple.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-colors font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors font-semibold shadow-lg shadow-primary/20"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
