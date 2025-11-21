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
  const previewText = `Your videos are ready for ${propertyAddress} - Preview and launch to start getting buyer inquiries`;
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

          {/* Hero Section */}
          <Section style={hero}>
            <Text style={eyebrow}>YOUR VIDEOS ARE READY</Text>
            <Heading style={h1}>Get Buyer Inquiries This Week</Heading>
            <Text style={propertyText}>{propertyAddress}</Text>
            <Text style={subheadline}>
              Your campaign is ready to launch. Preview your videos and go live to start receiving buyer inquiries.
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
            <Heading as="h2" style={sectionHeading}>What You Get</Heading>

            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td style={checklistItem}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={checkmark}>✓</td>
                      <td>
                        <Text style={checklistTitle}>2 Custom Videos</Text>
                        <Text style={checklistDescription}>You approve before they go live</Text>
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
                        <Text style={checklistTitle}>7-Day Ad Campaign</Text>
                        <Text style={checklistDescription}>Runs on Facebook & Instagram</Text>
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
                        <Text style={checklistTitle}>Buyer Inquiries Sent to You</Text>
                        <Text style={checklistDescription}>Interested buyers contact you directly</Text>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </Section>

          {/* Pricing Box */}
          <Section style={pricingBox}>
            <Text style={pricingLabel}>TOTAL COST</Text>
            <Text style={valueTeaserMain}>$149</Text>
            <Text style={pricingSavings}>Videos + 7 days of ads • No hidden fees</Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button style={button} href={reviewUrl}>
              Preview & Launch →
            </Button>
            <Text style={guarantee}>
              48-hour money-back guarantee • Keep videos forever
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Reply to this email or visit <a href="https://propertysimple.com/support" style={footerLink}>propertysimple.com/support</a>
            </Text>
            <Text style={footerLinks}>
              <a href={`https://propertysimple.com/preferences?id=${campaignId}`} style={footerLink}>Update preferences</a>
              {' • '}
              <a href={`https://propertysimple.com/unsubscribe?id=${campaignId}`} style={footerLink}>Unsubscribe</a>
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
  fontWeight: '600' as const,
  margin: '0',
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

const valueTeaserMain = {
  color: '#2a1810',
  fontSize: '28px',
  fontWeight: '700' as const,
  margin: '0 0 12px',
  lineHeight: '1.2',
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

const footerLinks = {
  color: '#6b5b4f',
  fontSize: '12px',
  margin: '0 0 12px',
  lineHeight: '1.6',
};

const footerCopyright = {
  color: '#9b8a7e',
  fontSize: '12px',
  margin: '0',
};
