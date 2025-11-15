# Listing Detail Page - Component Usage Guide

## Quick Start

Visit the Sedona listing:
```
http://localhost:3000/listing/345-rim-shadows-dr-sedona
```

Or use the redirect:
```
http://localhost:3000/listing
```

## Component Import Examples

### Using Individual Components

```typescript
import { ListingHero } from '@/components/listing/ListingHero';
import { ListingContactForm } from '@/components/listing/ListingContactForm';
import { ListingCalculator } from '@/components/listing/ListingCalculator';
```

### Using Barrel Export

```typescript
import { 
  ListingHero, 
  ListingContactForm, 
  ListingCalculator 
} from '@/components/listing';
```

## Component Props Reference

### ListingHero
```typescript
<ListingHero
  images={listing.images}           // Array of {id, url, alt, order}
  address={listing.address}         // {street, city, state}
  price={listing.price}            // number
  status={listing.status}          // 'active' | 'pending' | 'sold'
/>
```

### ListingContactForm
```typescript
<ListingContactForm
  address={{
    street: "345 Rim Shadows Dr",
    city: "Sedona"
  }}
  agentName="Jessica Martinez"
/>
```

### ListingCalculator
```typescript
<ListingCalculator
  price={1295000}
  propertyTax={9713}
  hoa={125}
/>
```

### ListingAgent
```typescript
<ListingAgent
  agent={{
    id: string,
    name: string,
    title: string,
    rating: number,
    reviewCount: number,
    experience: string,
    volume: string,
    phone: string,
    email: string,
    photo: string,
    bio: string
  }}
  onMessageClick={() => {}}  // Callback for message button
/>
```

## Instant Response Flow

The contact form automatically handles the instant response sequence:

1. **Form Submission** → Success state appears immediately
2. **2 seconds later** → Typing indicator shows
3. **12 seconds total** → SMS preview appears with message

No additional configuration needed!

## Styling & Customization

### Using Grain Texture
Add to any card for premium feel:
```typescript
<Card className="grain-texture">
  {/* content */}
</Card>
```

### Color Classes
```typescript
// Primary (Terracotta)
className="text-primary bg-primary"

// Accent (Gold)  
className="text-accent bg-accent"

// Success (Green)
className="text-success bg-success"
```

### Responsive Utilities
```typescript
// Mobile first
className="text-2xl md:text-4xl lg:text-5xl"

// Hide on mobile
className="hidden md:block"

// Show only on mobile
className="md:hidden"
```

## Facebook Pixel Tracking

Automatically tracks:
- Page views on listing load
- ViewContent event with property value

Set pixel ID in `.env.local`:
```bash
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id_here
```

## Creating New Listings

1. Add listing data to `/data/mockListingData.ts`:

```typescript
export const newListing: Listing = {
  id: 'your-listing-slug',
  address: { /* ... */ },
  price: 850000,
  // ... all other fields
};
```

2. Access at: `/listing/your-listing-slug`

## Mobile Testing

Test on different viewports:
- **Mobile**: 375px width
- **Tablet**: 768px width  
- **Desktop**: 1280px+ width

### Sticky CTA Behavior
- Appears after scrolling 600px down
- Mobile: Bottom bar with call/text buttons
- Desktop: Sidebar card with full details

## Performance Tips

### Image Optimization
All images use Next.js Image component:
```typescript
<Image
  src={url}
  alt={alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isHero}  // Only for hero image
/>
```

### Lazy Loading
Components below the fold are automatically lazy-loaded by Next.js.

## Accessibility

All components include:
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- Semantic HTML
- Alt text on images
- Touch-friendly targets (44px min)

## Common Customizations

### Change Default Open House Times
Edit `/data/mockListingData.ts`:
```typescript
openHouses: [
  {
    date: '2025-11-22',
    startTime: '2:00 PM',
    endTime: '4:00 PM'
  }
]
```

### Modify Contact Form Message
The message is pre-filled in `ListingContactForm.tsx`:
```typescript
message: `I'm interested in ${address.street}, ${address.city}. When can I schedule a showing?`
```

### Adjust Mortgage Calculator Defaults
In `ListingCalculator.tsx`:
```typescript
const [downPaymentPercent, setDownPaymentPercent] = useState(20);
const [interestRate, setInterestRate] = useState(7.0);
const [loanTerm, setLoanTerm] = useState(30);
```

### Update Schools Data
Edit schools array in listing data:
```typescript
schools: [
  {
    name: "School Name",
    grades: "K-8",
    rating: 8,
    distance: "1.2 mi",
    type: "Public"
  }
]
```

## Integration Checklist

For production deployment:

- [ ] Replace Mapbox static image with interactive map
- [ ] Integrate GreatSchools API for real ratings
- [ ] Add Walk Score API integration
- [ ] Connect contact form to CRM
- [ ] Set up Twilio for SMS responses
- [ ] Configure Facebook Pixel with real ID
- [ ] Add Google Analytics tracking
- [ ] Optimize images with CDN
- [ ] Set up lead notification emails
- [ ] Test on real devices

## Troubleshooting

### Contact form not showing SMS preview
- Check that 12 seconds have passed
- Verify state management in `ListingContactForm.tsx`

### Images not loading
- Verify image URLs are accessible
- Check Next.js Image domains in `next.config.ts`

### Sticky CTA not appearing
- Ensure scroll position > 600px
- Check z-index stacking context

### TypeScript errors
- Run `npm run build` to check all types
- Verify all imported interfaces match data structure

## Support

For questions or issues:
1. Check `LISTING_PAGE_SUMMARY.md` for detailed overview
2. Review component source code in `/components/listing/`
3. Examine data structure in `/data/mockListingData.ts`
