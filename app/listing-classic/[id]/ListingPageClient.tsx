'use client';

import { ListingStickyCTA } from '@/components/listing/ListingStickyCTA';
import { ListingContactForm } from '@/components/listing/ListingContactForm';
import { ListingAgent } from '@/components/listing/ListingAgent';
import type { ListingAgent as Agent } from '@/data/mockListingData';

interface ListingPageClientProps {
  // For StickyCTA
  stickyCTA?: boolean;
  price?: number;
  agentName?: string;
  agentPhone?: string;

  // For ContactForm
  contactForm?: boolean;
  address?: {
    street: string;
    city: string;
  };

  // For Agent
  agent?: Agent;
}

export function ListingPageClient({
  stickyCTA,
  price,
  agentName,
  agentPhone,
  contactForm,
  address,
  agent,
}: ListingPageClientProps) {
  // Pixel tracking moved to PixelTracker component in page.tsx
  // This prevents triple-firing from multiple component instances

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact-form');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSchedule = () => {
    const contactElement = document.getElementById('contact-form');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Render StickyCTA
  if (stickyCTA && price && agentName && agentPhone) {
    return (
      <ListingStickyCTA
        price={price}
        agentName={agentName}
        agentPhone={agentPhone}
        onContactClick={scrollToContact}
        onScheduleClick={scrollToSchedule}
      />
    );
  }

  // Render ContactForm
  if (contactForm && address && agentName) {
    return <ListingContactForm address={address} agentName={agentName} />;
  }

  // Render Agent
  if (agent) {
    return <ListingAgent agent={agent} onMessageClick={scrollToContact} />;
  }

  return null;
}
