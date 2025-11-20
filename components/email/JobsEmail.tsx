import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface JobsEmailProps {
  agentName?: string;
  propertyAddress?: string;
  propertyCity?: string;
  campaignId?: string;
  thumbnailUrl?: string;
}

export const JobsEmail = ({
  agentName = 'Sarah',
  propertyAddress = '345 Rim Shadows Dr',
  propertyCity = 'Sedona',
  campaignId = 'demo',
  thumbnailUrl,
}: JobsEmailProps) => {
  const previewText = `Your videos for ${propertyAddress} are ready`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const launchUrl = `${baseUrl}/launch/${campaignId}`;

  // Use provided thumbnail or default
  const videoThumbnail = thumbnailUrl || `${baseUrl}/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={`${baseUrl}/lovable-uploads/3ae8586b-2625-423a-8e97-0bae1a52dd43.png`}
              alt="PropertySimple"
              height="28"
              style={{ margin: '0 auto', display: 'block' }}
            />
          </Section>

          {/* The One Thing */}
          <Section style={heroSection}>
            <Text style={greeting}>Hi {agentName},</Text>
            <Text style={headline}>
              Your {propertyCity} videos are ready.
            </Text>
          </Section>

          {/* Video Preview - The Star */}
          <Section style={videoSection}>
            <a href={launchUrl} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={videoContainer}>
                <Img
                  src={videoThumbnail}
                  alt={propertyAddress}
                  width="280"
                  style={videoImage}
                />
                <div style={playButton}>
                  <Text style={playIcon}>▶</Text>
                </div>
              </div>
              <Text style={propertyLabel}>{propertyAddress}</Text>
            </a>
          </Section>

          {/* Single CTA */}
          <Section style={ctaSection}>
            <Button style={button} href={launchUrl}>
              Launch Campaign
            </Button>
            <Text style={priceText}>$149 total</Text>
          </Section>

          {/* One Line Value */}
          <Section style={valueSection}>
            <Text style={valueText}>
              7-day ad campaign • Buyer inquiries sent to you
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Just reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default JobsEmail;

// Styles - Clean, minimal, Apple-inspired
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '400px',
};

const logoSection = {
  padding: '0 0 40px',
};

const heroSection = {
  padding: '0 0 32px',
  textAlign: 'center' as const,
};

const greeting = {
  color: '#86868b',
  fontSize: '17px',
  fontWeight: '400' as const,
  margin: '0 0 8px',
};

const headline = {
  color: '#1d1d1f',
  fontSize: '28px',
  fontWeight: '600' as const,
  lineHeight: '1.2',
  margin: '0',
  letterSpacing: '-0.5px',
};

const videoSection = {
  padding: '0 0 32px',
  textAlign: 'center' as const,
};

const videoContainer = {
  position: 'relative' as const,
  display: 'inline-block',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
};

const videoImage = {
  display: 'block',
  width: '280px',
  height: 'auto',
};

const playButton = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const playIcon = {
  color: '#1d1d1f',
  fontSize: '20px',
  margin: '0',
  paddingLeft: '4px',
};

const propertyLabel = {
  color: '#86868b',
  fontSize: '15px',
  margin: '16px 0 0',
};

const ctaSection = {
  padding: '0 0 24px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#c05c3e',
  borderRadius: '980px',
  color: '#ffffff',
  fontSize: '17px',
  fontWeight: '500' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 48px',
  cursor: 'pointer',
};

const priceText = {
  color: '#86868b',
  fontSize: '15px',
  margin: '12px 0 0',
};

const valueSection = {
  padding: '0 0 40px',
  textAlign: 'center' as const,
};

const valueText = {
  color: '#86868b',
  fontSize: '13px',
  margin: '0',
  lineHeight: '1.5',
};

const footer = {
  borderTop: '1px solid #e5e5e5',
  padding: '24px 0 0',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#86868b',
  fontSize: '13px',
  margin: '0',
};
