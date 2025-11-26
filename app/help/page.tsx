"use client";

import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "How do I create a new ad campaign?",
    answer: "To create a new campaign, go to the Campaigns page and click 'New Campaign'. You'll be guided through selecting a listing, customizing your ad creative, setting your budget, and choosing your target audience. Once you review and confirm, your campaign will be submitted for approval."
  },
  {
    question: "How do I add or manage my property listings?",
    answer: "Navigate to the Listings page from the sidebar. Here you can add new listings manually, import from your MLS, or sync with your existing property database. Each listing can be used to create multiple ad campaigns."
  },
  {
    question: "How do I track my campaign performance?",
    answer: "Visit the Campaigns page to see an overview of all your active campaigns. Click on any campaign to view detailed analytics including impressions, clicks, leads generated, and cost per lead. Performance data is updated in real-time."
  },
  {
    question: "Can I edit my profile information?",
    answer: "Yes! Go to the Profile page from the sidebar. Click on any field to edit it directly. Your profile information appears on your ads and communications with leads, so keep it up to date. Changes are saved automatically."
  },
  {
    question: "How do I pause or stop a campaign?",
    answer: "From the Campaigns page, find the campaign you want to pause and click on it to open the details. You'll find options to pause, resume, or end the campaign. Paused campaigns can be restarted at any time without losing your settings."
  },
  {
    question: "How do I receive leads from my campaigns?",
    answer: "Leads are captured automatically when potential clients interact with your ads. You'll receive notifications for new leads, and you can view all your leads in the campaign details. Lead information includes contact details and their inquiry."
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, we offer a full refund within 48 hours of your purchase. To request a refund, go to the Campaigns tab, select the campaign you'd like refunded, and click 'Request Refund'. Your refund will be processed immediately. Please note that after the 48-hour window, purchases are non-refundable."
  }
];

export default function HelpPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Help Center"
        description="Find answers to common questions and learn how to get the most out of your advertising campaigns."
      />

      <div className="space-y-8 mt-6">
        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to help you get started and make the most of your campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you with any questions or issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="gap-2" asChild>
              <a href="mailto:customercare@propertysimple.com">
                <Mail className="w-4 h-4" />
                Email Support
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
