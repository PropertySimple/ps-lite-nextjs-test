import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AdReadyEmailProps {
  agentName?: string;
  propertyAddress?: string;
  campaignId?: string;
  expiresInHours?: number;
}

export const AdReadyEmail = ({
  agentName = 'Agent',
  propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336',
  campaignId = 'demo',
  expiresInHours = 24,
}: AdReadyEmailProps) => {
  const previewText = `Your campaign to reach 10,000+ buyers is ready - Preview & approve to lock in $117 launch pricing`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const reviewUrl = `${baseUrl}/ad-preview/${campaignId}?utm_source=email&utm_campaign=ad_ready`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/lovable-uploads/3ae8586b-2625-423a-8e97-0bae1a52dd43.png`}
              alt="PropertySimple"
              height="32"
              style={{
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Section>

          {/* Urgency Bar */}
          <Section style={urgencyBarTop}>
            <Text style={urgencyTextTop}>
              ⏰ LAUNCH PRICING EXPIRES IN {expiresInHours} HOURS
            </Text>
          </Section>

          {/* Hero Section */}
          <Section style={hero}>
            <Text style={eyebrow}>YOUR CAMPAIGN IS READY</Text>
            <Heading style={h1}>Reach 10,000+ Local Buyers</Heading>
            <Text style={propertyText}>{propertyAddress}</Text>
            <Text style={subheadline}>
              Your professional ad campaign is ready to launch. Preview your videos and approve to start reaching buyers today.
            </Text>
          </Section>

          {/* Video Preview */}
          <Section style={videoSection}>
            <a href={reviewUrl} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center' as const,
              }}>
                <Text style={{
                  color: '#2a1810',
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0 0 16px',
                }}>
                  👇 Click to Preview Your Campaign Videos
                </Text>
                <table width="100%" cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
                  <tr>
                    <td align="center">
                      <table cellPadding="0" cellSpacing="0" style={{ display: 'inline-block' }}>
                        <tr>
                          <td style={{ padding: '0 6px' }}>
                            {/* Property Tour */}
                            <div style={{
                              width: '140px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              position: 'relative' as const,
                            }}>
                              <Img
                                src={`${baseUrl}/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png`}
                                alt="Property Tour Video"
                                width="140"
                                height="250"
                                style={{
                                  width: '100%',
                                  height: '250px',
                                  display: 'block',
                                }}
                              />
                            </div>
                          </td>
                          <td style={{ padding: '0 6px' }}>
                            {/* AI Influencer */}
                            <div style={{
                              width: '140px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              position: 'relative' as const,
                            }}>
                              <Img
                                src={`${baseUrl}/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png`}
                                alt="AI Influencer Video"
                                width="140"
                                height="250"
                                style={{
                                  width: '100%',
                                  height: '250px',
                                  display: 'block',
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </a>
          </Section>

          {/* Value Section */}
          <Section style={valueSection}>
            <Heading as="h2" style={sectionHeading}>What's Included in Your Campaign</Heading>

            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td style={checklistItem}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={checkmark}>✓</td>
                      <td>
                        <Text style={checklistTitle}>Property Tour Video</Text>
                        <Text style={checklistDescription}>Professional photo slideshow with music</Text>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={checklistItem}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={checkmark}>✓</td>
                      <td>
                        <Text style={checklistTitle}>AI Influencer Video</Text>
                        <Text style={checklistDescription}>Engaging presenter-style walkthrough</Text>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={checklistItem}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={checkmark}>✓</td>
                      <td>
                        <Text style={checklistTitle}>7 Days of Facebook & Instagram Ads</Text>
                        <Text style={checklistDescription}>$110+ in ad spend included</Text>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={checklistItem}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={checkmark}>✓</td>
                      <td>
                        <Text style={checklistTitle}>24/7 AI Lead Qualification</Text>
                        <Text style={checklistDescription}>Automated follow-up with every inquiry</Text>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </Section>

          {/* Pricing Box */}
          <Section style={pricingBox}>
            <Text style={pricingLabel}>LAUNCH PRICING</Text>
            <Text style={pricingStrike}>$149</Text>
            <Text style={pricingMain}>$117</Text>
            <Text style={pricingSavings}>Save $32 • Approve within {expiresInHours} hours</Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button style={button} href={reviewUrl}>
              Preview My Videos & Approve →
            </Button>
            <Text style={guarantee}>
              ✓ 48-hour money-back guarantee • Keep videos forever • No contracts
            </Text>
          </Section>

          {/* Stats Section */}
          <Section style={statsSection}>
            <Text style={statsHeading}>Trusted by 30,000+ Real Estate Agents</Text>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td style={statItem}>
                  <Text style={statNumber}>67%</Text>
                  <Text style={statLabel}>Email Open Rate</Text>
                </td>
                <td style={statItem}>
                  <Text style={statNumber}>10-15K</Text>
                  <Text style={statLabel}>Buyers Reached</Text>
                </td>
                <td style={statItem}>
                  <Text style={statNumber}>8-12</Text>
                  <Text style={statLabel}>Qualified Leads</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Reply to this email or visit <a href="https://propertysimple.com/support" style={footerLink}>propertysimple.com/support</a>
            </Text>
            <Text style={footerCopyright}>
              © 2024 PropertySimple. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdReadyEmail;

// Styles
const main = {
  backgroundColor: '#faf8f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '0',
  margin: '0',
};

const container = {
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const header = {
  padding: '32px 24px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #f0ebe5',
};

const urgencyBarTop = {
  backgroundColor: '#fff4ed',
  borderTop: '2px solid #c05c3e',
  borderBottom: '2px solid #c05c3e',
  padding: '12px 24px',
  textAlign: 'center' as const,
};

const urgencyTextTop = {
  color: '#c05c3e',
  fontSize: '14px',
  fontWeight: '700' as const,
  margin: '0',
  letterSpacing: '0.5px',
};

const hero = {
  padding: '48px 24px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
};

const eyebrow = {
  color: '#c05c3e',
  fontSize: '12px',
  fontWeight: '700' as const,
  letterSpacing: '1.5px',
  margin: '0 0 16px',
};

const h1 = {
  color: '#2a1810',
  fontSize: '36px',
  fontWeight: '800' as const,
  lineHeight: '1.1',
  margin: '0 0 16px',
  letterSpacing: '-0.5px',
};

const propertyText = {
  color: '#c05c3e',
  fontSize: '18px',
  fontWeight: '600' as const,
  margin: '0 0 12px',
};

const subheadline = {
  color: '#6b5b4f',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0',
};

const videoSection = {
  padding: '0 24px 40px',
  backgroundColor: '#ffffff',
};

const valueSection = {
  padding: '40px 24px',
  backgroundColor: '#faf8f6',
};

const sectionHeading = {
  color: '#2a1810',
  fontSize: '22px',
  fontWeight: '700' as const,
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const checklistItem = {
  paddingBottom: '20px',
};

const checkmark = {
  color: '#16a34a',
  fontSize: '24px',
  fontWeight: '700' as const,
  lineHeight: '1',
  paddingRight: '12px',
  verticalAlign: 'top',
};

const checklistTitle = {
  color: '#2a1810',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 4px',
  lineHeight: '1.3',
};

const checklistDescription = {
  color: '#6b5b4f',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.4',
};

const pricingBox = {
  backgroundColor: '#fff4ed',
  border: '2px solid #c05c3e',
  borderRadius: '12px',
  padding: '32px 24px',
  margin: '0 24px 32px',
  textAlign: 'center' as const,
};

const pricingLabel = {
  color: '#c05c3e',
  fontSize: '12px',
  fontWeight: '700' as const,
  letterSpacing: '1.5px',
  margin: '0 0 8px',
};

const pricingStrike = {
  color: '#6b5b4f',
  fontSize: '20px',
  fontWeight: '600' as const,
  textDecoration: 'line-through',
  margin: '0 0 4px',
  opacity: 0.6,
};

const pricingMain = {
  color: '#c05c3e',
  fontSize: '56px',
  fontWeight: '900' as const,
  margin: '0 0 8px',
  lineHeight: '1',
  letterSpacing: '-1px',
};

const pricingSavings = {
  color: '#2a1810',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0',
};

const ctaSection = {
  padding: '0 24px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
};

const button = {
  backgroundColor: '#c05c3e',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: '700' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '18px 40px',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(192, 92, 62, 0.25)',
};

const guarantee = {
  color: '#6b5b4f',
  fontSize: '13px',
  margin: '16px 0 0',
  lineHeight: '1.5',
};

const statsSection = {
  backgroundColor: '#faf8f6',
  padding: '40px 24px',
  borderTop: '1px solid #e5ddd5',
};

const statsHeading = {
  color: '#2a1810',
  fontSize: '18px',
  fontWeight: '700' as const,
  margin: '0 0 32px',
  textAlign: 'center' as const,
};

const statItem = {
  textAlign: 'center' as const,
  padding: '0 8px',
};

const statNumber = {
  color: '#c05c3e',
  fontSize: '32px',
  fontWeight: '800' as const,
  margin: '0 0 4px',
  lineHeight: '1',
};

const statLabel = {
  color: '#6b5b4f',
  fontSize: '12px',
  margin: '0',
  lineHeight: '1.3',
};

const footer = {
  padding: '32px 24px 40px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e5ddd5',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b5b4f',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const footerLink = {
  color: '#c05c3e',
  textDecoration: 'none',
};

const footerCopyright = {
  color: '#9b8a7e',
  fontSize: '12px',
  margin: '0',
};
