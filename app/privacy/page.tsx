import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export const metadata: Metadata = {
  title: "Privacy Policy - PropertySimple",
  description: "PropertySimple Privacy Policy - How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background grain-texture">
      <MarketingNav />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last Updated: February 21, 2025</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using the PropertySimple video ad services ("Service"), you consent to the collection, use, and processing of your information as described in this Privacy Policy. All data is transferred to and stored in the United States under US privacy standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Registration Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Username and password</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>IP address</li>
              <li>City and timezone information</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Social Media Integration</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Profile images</li>
              <li>Display names</li>
              <li>Usernames/IDs</li>
              <li>Access tokens for Facebook and Instagram ad posting</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Property Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Listing photos and details you upload</li>
              <li>Videos we create for your campaigns</li>
              <li>Ad campaign performance data</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automatic Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Domain from which you're visiting</li>
              <li>Server logs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Service delivery (creating videos, running ads, managing campaigns)</li>
              <li>User communication (updates, support, notifications)</li>
              <li>Account management</li>
              <li>AI assistant functionality (answering calls/texts on your behalf)</li>
              <li>CRM features (lead management and tracking)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We only share your information with trusted third parties to the extent necessary for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Hosting services</li>
              <li>Billing and payment processing</li>
              <li>Database management</li>
              <li>Facebook/Instagram ad placement</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We may also disclose information when required by law, during business transfers, or to prevent illegal activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Update your information</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, contact us at: <a href="mailto:team@propertysimple.com" className="text-primary hover:text-primary/80 font-semibold">team@propertysimple.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement administrative and electronic security measures to protect your information. In the event of a data breach, we will provide notification as expeditiously as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Age Restriction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not intended for users under 13 years of age. We do not knowingly collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
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
