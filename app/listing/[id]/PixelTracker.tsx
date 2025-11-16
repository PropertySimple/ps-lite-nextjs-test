'use client';

import { useEffect } from 'react';
import { initFacebookPixel, trackViewContent } from '@/lib/analytics/fbPixel';

interface PixelTrackerProps {
  listingId: string;
  price: number;
}

/**
 * Singleton component that initializes Facebook Pixel once per page
 * Place this once in the layout, not in every component
 */
export function PixelTracker({ listingId, price }: PixelTrackerProps) {
  useEffect(() => {
    initFacebookPixel()
      .then(() => {
        // Track ViewContent event for this property
        trackViewContent(listingId, price);
      })
      .catch((err) => {
        console.error('Pixel initialization failed:', err);
      });
  }, [listingId, price]);

  return null;
}
