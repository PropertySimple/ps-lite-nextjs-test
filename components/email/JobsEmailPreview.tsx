'use client';

import Image from 'next/image';

interface JobsEmailPreviewProps {
  agentName?: string;
  propertyAddress?: string;
  propertyCity?: string;
  campaignId?: string;
  thumbnailUrl?: string;
}

export function JobsEmailPreview({
  agentName = 'Sarah',
  propertyAddress = '345 Rim Shadows Dr',
  propertyCity = 'Sedona',
  campaignId = 'demo',
  thumbnailUrl,
}: JobsEmailPreviewProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const launchUrl = `/launch/${campaignId}`;

  // Use provided thumbnail or default
  const videoThumbnail = thumbnailUrl || '/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png';

  return (
    <div style={main}>
      <div style={container}>
        {/* Logo */}
        <div style={logoSection}>
          <Image
            src="/lovable-uploads/3ae8586b-2625-423a-8e97-0bae1a52dd43.png"
            alt="PropertySimple"
            height={28}
            width={140}
            style={{ margin: '0 auto', display: 'block' }}
          />
        </div>

        {/* The One Thing */}
        <div style={heroSection}>
          <p style={greeting}>Hi {agentName},</p>
          <p style={headline}>
            Your {propertyCity} videos are live—see them first.
          </p>
        </div>

        {/* Video Preview - The Star */}
        <div style={videoSection}>
          <a href={launchUrl} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={videoContainer}>
              <Image
                src={videoThumbnail}
                alt={propertyAddress}
                width={280}
                height={498}
                style={videoImage}
              />
              <div style={playButton}>
                <span style={playIcon}>▶</span>
              </div>
            </div>
            <p style={propertyLabel}>{propertyAddress}</p>
          </a>
        </div>

        {/* Single CTA */}
        <div style={ctaSection}>
          <a href={launchUrl} style={button}>
            See Your Videos
          </a>
          <p style={priceText}>$149 • One-time charge</p>
        </div>

        {/* One Line Value */}
        <div style={valueSection}>
          <p style={valueText}>
            7-day ad campaign • Buyer inquiries sent to you
          </p>
        </div>

        {/* Footer */}
        <div style={footer}>
          <p style={footerText}>
            Questions? Just reply to this email.
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles - Clean, minimal, Apple-inspired
const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '400px',
};

const logoSection: React.CSSProperties = {
  padding: '0 0 40px',
};

const heroSection: React.CSSProperties = {
  padding: '0 0 32px',
  textAlign: 'center',
};

const greeting: React.CSSProperties = {
  color: '#86868b',
  fontSize: '17px',
  fontWeight: 400,
  margin: '0 0 8px',
};

const headline: React.CSSProperties = {
  color: '#1d1d1f',
  fontSize: '28px',
  fontWeight: 600,
  lineHeight: 1.2,
  margin: 0,
  letterSpacing: '-0.5px',
};

const videoSection: React.CSSProperties = {
  padding: '0 0 32px',
  textAlign: 'center',
};

const videoContainer: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
};

const videoImage: React.CSSProperties = {
  display: 'block',
  width: '280px',
  height: 'auto',
};

const playButton: React.CSSProperties = {
  position: 'absolute',
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

const playIcon: React.CSSProperties = {
  color: '#1d1d1f',
  fontSize: '20px',
  margin: 0,
  paddingLeft: '4px',
};

const propertyLabel: React.CSSProperties = {
  color: '#86868b',
  fontSize: '15px',
  margin: '16px 0 0',
};

const ctaSection: React.CSSProperties = {
  padding: '0 0 24px',
  textAlign: 'center',
};

const button: React.CSSProperties = {
  backgroundColor: '#c05c3e',
  borderRadius: '980px',
  color: '#ffffff',
  fontSize: '17px',
  fontWeight: 500,
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '16px 48px',
  cursor: 'pointer',
};

const priceText: React.CSSProperties = {
  color: '#86868b',
  fontSize: '15px',
  margin: '12px 0 0',
};

const valueSection: React.CSSProperties = {
  padding: '0 0 40px',
  textAlign: 'center',
};

const valueText: React.CSSProperties = {
  color: '#86868b',
  fontSize: '13px',
  margin: 0,
  lineHeight: 1.5,
};

const footer: React.CSSProperties = {
  borderTop: '1px solid #e5e5e5',
  padding: '24px 0 0',
  textAlign: 'center',
};

const footerText: React.CSSProperties = {
  color: '#86868b',
  fontSize: '13px',
  margin: 0,
};
