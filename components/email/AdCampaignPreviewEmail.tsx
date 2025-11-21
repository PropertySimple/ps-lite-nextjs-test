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

interface AdCampaignPreviewEmailProps {
  agentName?: string;
  propertyAddress?: string;
  campaignId?: string;
  estimatedReach?: string;
}

export const AdCampaignPreviewEmail = ({
  agentName = 'Agent',
  propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336',
  campaignId = 'demo',
  estimatedReach = '10,247',
}: AdCampaignPreviewEmailProps) => {
  const previewText = `Your campaign for ${propertyAddress} is ready to launch - approve to start getting buyer inquiries`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const previewUrl = `${baseUrl}/campaign-preview/${campaignId}?utm_source=email&utm_campaign=campaign_preview`;

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

          {/* Listing Photo Hero */}
          <Section style={listingPhotoSection}>
            <Img
              src={`${baseUrl}/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png`}
              alt={propertyAddress}
              width="600"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '0',
              }}
            />
          </Section>

          {/* Hero Section */}
          <Section style={hero}>
            <Text style={eyebrow}>READY TO LAUNCH</Text>
            <Heading style={h1}>Get Buyer Inquiries This Week</Heading>
            <Text style={propertyText}>{propertyAddress}</Text>
            <Text style={subheadline}>
              Your campaign is ready. Approve to go live and start receiving buyer inquiries.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button style={button} href={previewUrl}>
              Approve & Launch →
            </Button>
            <Text style={ctaSubtext}>
              You can edit videos and targeting before going live
            </Text>
          </Section>

          {/* Simple Reminder */}
          <Section style={includedSection}>
            <Text style={includedHeading}>Your $149 campaign includes:</Text>
            <Text style={{
              color: '#6b5b4f',
              fontSize: '15px',
              margin: '0',
              textAlign: 'center' as const,
              lineHeight: '1.6',
            }}>
              2 custom videos • 7-day ad campaign • Buyer inquiries sent to you
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

export default AdCampaignPreviewEmail;

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

const hero = {
  padding: '40px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
};

const eyebrow = {
  color: '#c05c3e',
  fontSize: '12px',
  fontWeight: '700' as const,
  letterSpacing: '1.5px',
  margin: '0 0 12px',
};

const h1 = {
  color: '#2a1810',
  fontSize: '32px',
  fontWeight: '800' as const,
  lineHeight: '1.2',
  margin: '0 0 16px',
  letterSpacing: '-0.5px',
};

const propertyText = {
  color: '#c05c3e',
  fontSize: '18px',
  fontWeight: '600' as const,
  margin: '0 0 16px',
};

const subheadline = {
  color: '#6b5b4f',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0',
  maxWidth: '480px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const listingPhotoSection = {
  padding: '0',
  backgroundColor: '#ffffff',
};

const resultsSection = {
  padding: '32px 24px',
  backgroundColor: '#faf8f6',
};

const sectionHeading = {
  color: '#2a1810',
  fontSize: '20px',
  fontWeight: '700' as const,
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const resultItem = {
  paddingBottom: '20px',
  textAlign: 'center' as const,
};

const resultIcon = {
  fontSize: '32px',
  margin: '0 0 8px',
  display: 'block',
};

const resultTitle = {
  color: '#2a1810',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 4px',
  lineHeight: '1.3',
};

const resultDescription = {
  color: '#6b5b4f',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.4',
};

const ctaSection = {
  padding: '32px 24px',
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

const ctaSubtext = {
  color: '#6b5b4f',
  fontSize: '14px',
  margin: '16px 0 0',
  lineHeight: '1.5',
};

const includedSection = {
  padding: '32px 24px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #f0ebe5',
};

const includedHeading = {
  color: '#2a1810',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const includedItem = {
  paddingBottom: '12px',
};

const includedCheck = {
  color: '#16a34a',
  fontSize: '18px',
  marginRight: '8px',
  display: 'inline-block',
  verticalAlign: 'middle',
};

const includedText = {
  color: '#2a1810',
  fontSize: '15px',
  margin: '0',
  display: 'inline-block',
  verticalAlign: 'middle',
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

const footerLinks = {
  color: '#6b5b4f',
  fontSize: '12px',
  margin: '0 0 12px',
  lineHeight: '1.6',
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
