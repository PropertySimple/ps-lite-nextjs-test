import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "Terms of Service - PropertySimple",
  description: "PropertySimple Terms of Service - Terms and conditions for using our video ad services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last Updated: February 21, 2025</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using PropertySimple's video advertising services ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Account Access & Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You must be at least 13 years old to use the Service</li>
              <li>PropertySimple may change, suspend, or discontinue the Service at any time without notice</li>
              <li>You are responsible for maintaining compatible equipment and internet access</li>
              <li>You must keep your password confidential and secure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">User Restrictions & Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Use automated tools ("bots," "scrapers," "spiders") to access the Service</li>
              <li>Attempt unauthorized access to our systems or other users' accounts</li>
              <li>Perform security testing without written permission</li>
              <li>Interfere with the Service's operations or other users' access</li>
              <li>Upload or distribute pornographic content or illegal materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Fees & Payment Terms</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Pay-Per-Ad Pricing</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>$147 per listing for a 7-day campaign (includes ad spend)</li>
              <li>One-time payment charged at purchase</li>
              <li>48-hour money-back guarantee</li>
              <li>You own the videos created and can use them freely</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">AutoAds Subscription</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>$97/month subscription fee</li>
              <li>$110 per video ad (25% discount from standard pricing)</li>
              <li>Charged automatically when you approve ads for new listings</li>
              <li>Can cancel subscription anytime without penalty</li>
              <li>48-hour money-back guarantee on subscription and individual ads</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">General Payment Terms</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All prices include ad spend for the initial 7-day campaign</li>
              <li>Campaign extensions available at daily rates</li>
              <li>All fees are non-refundable after the 48-hour guarantee period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">48-Hour Money-Back Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you're not satisfied for any reason within 48 hours of purchase, contact us for a full refund. No questions asked. After 48 hours, all sales are final.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Content & Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>PropertySimple retains all ownership rights to the Service, platform, and software</li>
              <li>You own the listing photos and information you upload</li>
              <li>You own the video ads we create for you and can use them freely</li>
              <li>You cannot create derivative works of the Service without written authorization</li>
              <li>The entire Service compilation is protected by copyright</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Facebook & Instagram Integration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use Facebook's official integration to post ads on your behalf. You grant limited permissions through Facebook's secure process. You maintain full control and can revoke access anytime. We never post anything without your approval.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">AI Assistant & Recording Consent</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you use the AI assistant feature for calls:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You must obtain proper consent before recording conversations where required by law</li>
              <li>Consent laws vary by state—you bear sole responsibility for compliance</li>
              <li>PropertySimple is not responsible for your failure to obtain required consents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">SMS Communications</h2>
            <p className="text-muted-foreground leading-relaxed">
              By providing your phone number, you opt in to receive text notifications about your account and campaigns. You can opt out anytime by texting "STOP."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Warranties & Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We promise to use commercially reasonable efforts consistent with prevailing industry standards to deliver the Service. However, the Service is provided "AS IS" without warranties of any kind, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Guaranteed results or lead generation</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Liability Limitations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our liability is capped at the fees you paid in the prior 12 months. We are not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Special, incidental, or consequential damages</li>
              <li>Data loss</li>
              <li>Lost profits or business opportunities</li>
              <li>Service interruptions beyond our reasonable control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Termination Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>PropertySimple may terminate your access at any time</li>
              <li>For paid accounts, we provide a 30-day cure period for material breaches</li>
              <li>You can cancel your AutoAds subscription anytime</li>
              <li>All obligations and liabilities incurred prior to termination survive</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms of Service from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              <a href="mailto:team@propertysimple.com" className="text-primary hover:text-primary/80 font-semibold">team@propertysimple.com</a>
            </p>
          </section>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
