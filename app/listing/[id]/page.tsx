import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sedonaListing, similarListings } from '@/data/mockListingData';
import { ListingNav } from '@/components/listing/ListingNav';
import { ListingHero } from '@/components/listing/ListingHero';
import { ListingOverview } from '@/components/listing/ListingOverview';
import { ListingDescription } from '@/components/listing/ListingDescription';
import { ListingDetails } from '@/components/listing/ListingDetails';
import { ListingMap } from '@/components/listing/ListingMap';
import { ListingSchools } from '@/components/listing/ListingSchools';
import { ListingCalculator } from '@/components/listing/ListingCalculator';
import { ListingNeighborhood } from '@/components/listing/ListingNeighborhood';
import { ListingSimilar } from '@/components/listing/ListingSimilar';
import { ListingOpenHouse } from '@/components/listing/ListingOpenHouse';
import { ListingPageClient } from './ListingPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  // In production, fetch listing data here
  const listing = id === sedonaListing.id ? sedonaListing : null;

  if (!listing) {
    return {
      title: 'Property Not Found',
    };
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(listing.price);

  const title = `${listing.address.street} - ${listing.beds} Bed ${listing.propertyType} in ${listing.address.city} | ${formattedPrice}`;
  const description = `${listing.description.slice(0, 155)}... Get instant answers 24/7 - schedule a showing today!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: listing.images[0]?.url || '',
          width: 1200,
          height: 630,
          alt: `${listing.address.street}, ${listing.address.city}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [listing.images[0]?.url || ''],
    },
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params;

  // In production, fetch listing data from API/database
  const listing = id === sedonaListing.id ? sedonaListing : null;

  if (!listing) {
    notFound();
  }

  // JSON-LD Schema for rich snippets
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: `${listing.address.street}, ${listing.address.city}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address.street,
      addressLocality: listing.address.city,
      addressRegion: listing.address.state,
      postalCode: listing.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coordinates.lat,
      longitude: listing.coordinates.lng,
    },
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.sqft,
      unitText: 'sqft',
    },
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    description: listing.description,
    image: listing.images.map((img) => img.url),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <ListingNav agentPhone={listing.agent.phone} />

        {/* Hero Gallery */}
        <ListingHero
          images={listing.images}
          address={listing.address}
          price={listing.price}
          status={listing.status}
        />

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <ListingOverview
                price={listing.price}
                address={listing.address}
                beds={listing.beds}
                baths={listing.baths}
                sqft={listing.sqft}
                lotSize={listing.lotSize}
                yearBuilt={listing.yearBuilt}
                propertyType={listing.propertyType}
                daysOnMarket={listing.daysOnMarket}
                status={listing.status}
                highlights={listing.highlights}
              />

              {/* Description */}
              <ListingDescription
                description={listing.description}
                highlights={listing.highlights}
              />

              {/* Property Details */}
              <ListingDetails
                features={listing.features}
                beds={listing.beds}
                baths={listing.baths}
                sqft={listing.sqft}
                lotSize={listing.lotSize}
                yearBuilt={listing.yearBuilt}
                propertyType={listing.propertyType}
                hoa={listing.hoa}
                propertyTax={listing.propertyTax}
              />

              {/* Map */}
              <ListingMap
                address={listing.address}
                coordinates={listing.coordinates}
              />

              {/* Schools */}
              <ListingSchools schools={listing.schools} />

              {/* Neighborhood */}
              <ListingNeighborhood
                neighborhood={listing.address.neighborhood}
                city={listing.address.city}
              />

              {/* Calculator */}
              <ListingCalculator
                price={listing.price}
                propertyTax={listing.propertyTax}
                hoa={listing.hoa}
              />

              {/* Agent */}
              <div id="agent-section">
                <ListingPageClient agent={listing.agent} />
              </div>

              {/* Open House */}
              <ListingOpenHouse
                openHouses={listing.openHouses}
                address={listing.address}
              />

              {/* Similar Properties */}
              <ListingSimilar listings={similarListings} />
            </div>

            {/* Right Column - Sticky Sidebar (Desktop) */}
            <div className="lg:col-span-1">
              <div id="contact-form">
                <ListingPageClient
                  contactForm
                  address={listing.address}
                  agentName={listing.agent.name}
                />
              </div>

              {/* Sticky CTA Card */}
              <div className="mt-8">
                <ListingPageClient
                  stickyCTA
                  price={listing.price}
                  agentName={listing.agent.name}
                  agentPhone={listing.agent.phone}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
