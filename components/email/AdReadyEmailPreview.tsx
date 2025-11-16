import * as React from 'react';

interface AdReadyEmailPreviewProps {
  agentName?: string;
  propertyAddress?: string;
  campaignId?: string;
  expiresInHours?: number;
}

export const AdReadyEmailPreview = ({
  agentName = 'Agent',
  propertyAddress = '345 Rim Shadows Dr, Sedona, AZ 86336',
  campaignId = 'demo',
  expiresInHours = 24,
}: AdReadyEmailPreviewProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const reviewUrl = `${baseUrl}/ad-preview/${campaignId}?utm_source=email&utm_campaign=ad_ready`;

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

        {/* Urgency Bar - Moved to top for immediate impact */}
        <div style={urgencyBarTop}>
          <p style={urgencyTextTop}>
            ⏰ Launch Pricing Expires in {expiresInHours} Hours
          </p>
        </div>

        {/* Hero Section */}
        <div style={hero}>
          <p style={eyebrow}>YOUR CAMPAIGN IS READY</p>
          <h1 style={h1}>Reach 10,000+ Local Buyers</h1>
          <p style={propertyText}>{propertyAddress}</p>
          <p style={subheadline}>
            Your professional ad campaign is ready to launch. Preview your videos and approve to start reaching buyers today.
          </p>
        </div>

        {/* Video Preview - Actual Thumbnails */}
        <div style={videoSection}>
          <a href={reviewUrl} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center' as const,
              cursor: 'pointer',
            }}>
              <p style={{
                color: '#2a1810',
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 16px',
              }}>
                👇 Click to Preview Your Campaign Videos
              </p>
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* Property Tour Thumbnail */}
                <div style={{
                  width: '140px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  position: 'relative' as const,
                }}>
                  <img
                    src={`${baseUrl}/lovable-uploads/8de08966-0714-4ca1-b64b-8098de65220a.png`}
                    alt="Property Tour Video"
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute' as const,
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#c05c3e',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    Property Tour
                  </div>
                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'absolute' as const,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}>
                    <div style={{
                      width: '0',
                      height: '0',
                      borderLeft: '14px solid #c05c3e',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      marginLeft: '3px',
                    }} />
                  </div>
                </div>

                {/* AI Influencer Thumbnail */}
                <div style={{
                  width: '140px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  position: 'relative' as const,
                }}>
                  <img
                    src={`${baseUrl}/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png`}
                    alt="AI Influencer Video"
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute' as const,
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#d4a574',
                    color: '#2a1810',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    AI Influencer
                  </div>
                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'absolute' as const,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  }}>
                    <div style={{
                      width: '0',
                      height: '0',
                      borderLeft: '14px solid #c05c3e',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      marginLeft: '3px',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Value Proposition */}
        <div style={valueSection}>
          <h2 style={sectionHeading}>What's Included in Your Campaign</h2>
          <div style={checklistItem}>
            <span style={checkmark}>✓</span>
            <div>
              <p style={checklistTitle}>Property Tour Video</p>
              <p style={checklistDescription}>Professional photo slideshow with music</p>
            </div>
          </div>
          <div style={checklistItem}>
            <span style={checkmark}>✓</span>
            <div>
              <p style={checklistTitle}>AI Influencer Video</p>
              <p style={checklistDescription}>Engaging presenter-style walkthrough</p>
            </div>
          </div>
          <div style={checklistItem}>
            <span style={checkmark}>✓</span>
            <div>
              <p style={checklistTitle}>7 Days of Facebook & Instagram Ads</p>
              <p style={checklistDescription}>$110+ in ad spend included</p>
            </div>
          </div>
          <div style={checklistItem}>
            <span style={checkmark}>✓</span>
            <div>
              <p style={checklistTitle}>24/7 AI Lead Qualification</p>
              <p style={checklistDescription}>Automated follow-up with every inquiry</p>
            </div>
          </div>
        </div>

        {/* Pricing Highlight */}
        <div style={pricingBox}>
          <p style={pricingLabel}>LAUNCH PRICING</p>
          <p style={pricingStrike}>$149</p>
          <p style={pricingMain}>$117</p>
          <p style={pricingSavings}>Save $32 • Approve within {expiresInHours} hours</p>
        </div>

        {/* CTA Button */}
        <div style={ctaSection}>
          <a style={button} href={reviewUrl}>
            Preview My Videos & Approve →
          </a>
          <p style={guarantee}>
            ✓ 48-hour money-back guarantee • Keep videos forever • No contracts
          </p>
        </div>

        {/* Social Proof */}
        <div style={statsSection}>
          <p style={statsHeading}>Trusted by 30,000+ Real Estate Agents</p>
          <div style={statsGrid}>
            <div style={statItem}>
              <p style={statNumber}>67%</p>
              <p style={statLabel}>Email Open Rate</p>
            </div>
            <div style={statItem}>
              <p style={statNumber}>10-15K</p>
              <p style={statLabel}>Buyers Reached</p>
            </div>
            <div style={statItem}>
              <p style={statNumber}>8-12</p>
              <p style={statLabel}>Qualified Leads</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={footer}>
          <p style={footerText}>
            Questions? Reply to this email or visit <a href="https://propertysimple.com/support" style={footerLink}>propertysimple.com/support</a>
          </p>
          <p style={footerCopyright}>
            © 2024 PropertySimple. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdReadyEmailPreview;

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
  fontWeight: '700',
  margin: '0',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
};

const hero = {
  padding: '48px 24px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
};

const eyebrow = {
  color: '#c05c3e',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 16px',
};

const h1 = {
  color: '#2a1810',
  fontSize: '36px',
  fontWeight: '800',
  lineHeight: '1.1',
  margin: '0 0 16px',
  letterSpacing: '-0.5px',
};

const propertyText = {
  color: '#c05c3e',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 12px',
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
  fontWeight: '700',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const checklistItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  marginBottom: '20px',
};

const checkmark = {
  color: '#16a34a',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1',
  flexShrink: 0,
};

const checklistTitle = {
  color: '#2a1810',
  fontSize: '16px',
  fontWeight: '600',
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
  fontWeight: '700',
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
};

const pricingStrike = {
  color: '#6b5b4f',
  fontSize: '20px',
  fontWeight: '600',
  textDecoration: 'line-through',
  margin: '0 0 4px',
  opacity: 0.6,
};

const pricingMain = {
  color: '#c05c3e',
  fontSize: '56px',
  fontWeight: '900',
  margin: '0 0 8px',
  lineHeight: '1',
  letterSpacing: '-1px',
};

const pricingSavings = {
  color: '#2a1810',
  fontSize: '14px',
  fontWeight: '600',
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
  fontWeight: '700',
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
  fontWeight: '700',
  margin: '0 0 32px',
  textAlign: 'center' as const,
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '16px',
};

const statItem = {
  textAlign: 'center' as const,
};

const statNumber = {
  color: '#c05c3e',
  fontSize: '32px',
  fontWeight: '800',
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
