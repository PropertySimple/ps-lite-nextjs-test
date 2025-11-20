import * as React from 'react';

export default function CampaignPreviewEmailPreview() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336';
  const campaignId = 'demo';
  const estimatedReach = '10,247';
  const reviewUrl = `${baseUrl}/campaign-preview/${campaignId}?utm_source=email&utm_campaign=campaign_preview`;

  return (
    <div style={main}>
      <div style={container}>
        {/* Header with Logo */}
        <div style={header}>
          <img
            src={`${baseUrl}/lovable-uploads/3ae8586b-2625-423a-8e97-0bae1a52dd43.png`}
            alt="PropertySimple"
            style={{
              height: '32px',
              width: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Listing Photo Hero */}
        <div style={listingPhotoSection}>
          <img
            src={`${baseUrl}/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png`}
            alt={propertyAddress}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Hero Section */}
        <div style={hero}>
          <p style={eyebrow}>YOUR MARKETING CAMPAIGN IS READY</p>
          <h1 style={h1}>Approve Your Campaign</h1>
          <p style={propertyText}>{propertyAddress}</p>
          <p style={subheadline}>
            Your campaign is ready to launch. Review your ads, targeting, and approve to start reaching buyers.
          </p>
        </div>

        {/* Expected Results */}
        <div style={resultsSection}>
          <h2 style={sectionHeading}>Expected Results</h2>

          <div style={resultItem}>
            <p style={resultIcon}>🎯</p>
            <p style={resultTitle}>2-6 Qualified Leads</p>
            <p style={resultDescription}>Based on similar properties in your area</p>
          </div>

          <div style={resultItem}>
            <p style={resultIcon}>👥</p>
            <p style={resultTitle}>10,000+ Buyers Reached</p>
            <p style={resultDescription}>Active homebuyers on Facebook & Instagram</p>
          </div>

          <div style={resultItem}>
            <p style={resultIcon}>🤖</p>
            <p style={resultTitle}>24/7 AI Lead Screening</p>
            <p style={resultDescription}>Every inquiry pre-qualified before reaching you</p>
          </div>
        </div>

        {/* CTA */}
        <div style={ctaSection}>
          <a style={button} href={reviewUrl}>
            Review & Approve Campaign →
          </a>
          <p style={ctaSubtext}>
            Preview your ads and make any edits before launch
          </p>
        </div>

        {/* What's Included */}
        <div style={includedSection}>
          <p style={includedHeading}>What's Included:</p>

          <div style={includedItem}>
            <span style={includedCheck}>✓</span>
            <span style={includedText}>2 professional videos (property tour + AI presenter)</span>
          </div>

          <div style={includedItem}>
            <span style={includedCheck}>✓</span>
            <span style={includedText}>7 days of Facebook & Instagram advertising</span>
          </div>

          <div style={includedItem}>
            <span style={includedCheck}>✓</span>
            <span style={includedText}>Editable ad copy and targeting</span>
          </div>

          <div style={includedItem}>
            <span style={includedCheck}>✓</span>
            <span style={includedText}>Lead capture forms to get buyer info</span>
          </div>
        </div>

        {/* Footer */}
        <div style={footer}>
          <p style={footerText}>
            Questions? Reply to this email or visit <a href="https://propertysimple.com/support" style={footerLink}>propertysimple.com/support</a>
          </p>
          <p style={footerLinks}>
            <a href={`https://propertysimple.com/preferences?id=${campaignId}`} style={footerLink}>Update preferences</a>
            {' • '}
            <a href={`https://propertysimple.com/unsubscribe?id=${campaignId}`} style={footerLink}>Unsubscribe</a>
          </p>
          <p style={footerCopyright}>
            © 2024 PropertySimple. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

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
  fontWeight: '700',
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 12px',
};

const h1 = {
  color: '#2a1810',
  fontSize: '32px',
  fontWeight: '800',
  lineHeight: '1.2',
  margin: '0 0 16px',
  letterSpacing: '-0.5px',
};

const propertyText = {
  color: '#c05c3e',
  fontSize: '18px',
  fontWeight: '600',
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
  fontWeight: '700',
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
  fontWeight: '600',
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
  fontWeight: '700',
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
  fontWeight: '600',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const includedItem = {
  paddingBottom: '12px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
};

const includedCheck = {
  color: '#16a34a',
  fontSize: '18px',
  flexShrink: 0,
};

const includedText = {
  color: '#2a1810',
  fontSize: '15px',
  margin: '0',
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
