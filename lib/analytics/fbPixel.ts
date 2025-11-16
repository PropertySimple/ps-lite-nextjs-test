// Singleton Facebook Pixel manager
// Ensures FB Pixel initializes exactly once per page, not per component instance

import type { default as ReactPixelType } from 'react-facebook-pixel';
import { logger } from '@/lib/logger';

let isInitialized = false;
let ReactPixel: typeof ReactPixelType | null = null;

// EventData type from react-facebook-pixel
interface EventData {
  content_type?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

export async function initFacebookPixel() {
  if (isInitialized) {
    return ReactPixel;
  }

  try {
    const pixelModule = await import('react-facebook-pixel');
    ReactPixel = pixelModule.default;

    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || 'PLACEHOLDER_PIXEL_ID';
    ReactPixel.init(pixelId);
    ReactPixel.pageView();

    isInitialized = true;
    return ReactPixel;
  } catch (err) {
    logger.error('Failed to load Facebook Pixel:', err);
    throw err;
  }
}

export function trackViewContent(contentId: string, price: number) {
  if (!ReactPixel) {
    logger.warn('Facebook Pixel not initialized');
    return;
  }

  ReactPixel.track('ViewContent', {
    content_type: 'property',
    content_ids: [contentId],
    value: price,
    currency: 'USD',
  });
}

export function trackEvent(eventName: string, data?: EventData) {
  if (!ReactPixel) {
    logger.warn('Facebook Pixel not initialized');
    return;
  }

  ReactPixel.track(eventName, data);
}

// Reset for testing purposes only
export function resetPixel() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'test') {
    isInitialized = false;
    ReactPixel = null;
  }
}
