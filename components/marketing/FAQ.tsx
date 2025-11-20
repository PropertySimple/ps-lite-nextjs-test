"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much does it cost?",
    answer: "$147 per listing, which includes 7 days of ad spend. That's it. We have a 48-hour money-back guarantee so you can try risk-free.",
  },
  {
    question: "How long until my ad is live?",
    answer: "Your videos are ready in about 5 minutes. After you approve them, your ad is usually live on Facebook and Instagram within 24 hours.",
  },
  {
    question: "Can I see the video before it goes live?",
    answer: "Yes. We show you a preview of every video before posting. You can request edits, change the script, swap the presenter, or adjust the music. Once you approve, we post it.",
  },
  {
    question: "Is there a contract?",
    answer: "No contracts. No commitments. Pay per listing, or cancel your subscription anytime with one click.",
  },
  {
    question: "Why video ads instead of photos?",
    answer: "Video ads get 10x more engagement on social media. They showcase properties better and build emotional connections. We create professional-quality videos that look like you hired a production crew—for a fraction of the cost.",
  },
];

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
    </>
  );
}
