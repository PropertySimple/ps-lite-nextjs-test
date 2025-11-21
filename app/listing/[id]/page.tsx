'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Home, Maximize, Bath, BedDouble, Sparkles, List, GraduationCap, Calculator, TreePine } from 'lucide-react';
import { sedonaListing } from '@/data/mockListingData';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-source-sans',
});

export default function JobsListingPage() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'details'>('summary');
  const [showMap, setShowMap] = useState(false);

  // Get listing data
  const listing = id === sedonaListing.id ? sedonaListing : sedonaListing;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <style>{`
        .font-editorial { font-family: var(--font-playfair), Georgia, serif; }
      `}</style>
      <div className={`min-h-screen bg-[#faf9f7] ${sourceSans.variable} ${playfair.variable}`} style={{ fontFamily: 'var(--font-source-sans), system-ui, sans-serif' }}>
        {/* Minimal Nav */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-xl border-b border-black/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <a href="/" className="text-xl font-editorial font-semibold tracking-tight text-[#2a1f1a]">
                PropertySimple
              </a>
              <a
                href={`tel:${listing.agent.phone}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2a1f1a] text-white rounded-full text-sm font-medium hover:bg-[#1a1210] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call Agent</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Photo Gallery */}
        <section className={`relative h-[70vh] md:h-[80vh] bg-[#1a1210] transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Main Image */}
          <div className="absolute inset-0">
            {listing.images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            ))}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {listing.images.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
            {listing.images.length > 5 && (
              <span className="text-white/60 text-xs ml-2">+{listing.images.length - 5}</span>
            )}
          </div>

          {/* View All Button */}
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-6 right-6 md:right-8 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Maximize className="w-4 h-4" />
            View All
          </button>

          {/* Price Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-white/70 text-sm uppercase tracking-widest mb-2">For Sale</p>
              <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-2 tracking-tight">
                {formatPrice(listing.price)}
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          {/* Address & Key Stats */}
          <section className={`mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c17f59] mt-1 shrink-0" />
                <div>
                  <h2 className="font-editorial text-2xl md:text-3xl font-medium text-[#2a1f1a] mb-1">
                    {listing.address.street}
                  </h2>
                  <p className="text-[#6b5b4f] text-lg">
                    {listing.address.city}, {listing.address.state} {listing.address.zip}
                  </p>
                </div>
              </div>

              {/* Mini Map Thumbnail */}
              <button
                onClick={() => setShowMap(true)}
                className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-[#e8e2db] hover:border-[#c17f59] transition-colors group relative ml-8 sm:ml-0"
                aria-label="View map"
              >
                {/* Static map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8e2db] to-[#d4c4b4]">
                  {/* Stylized map pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                    <path d="M0 50 Q25 30 50 50 T100 50" stroke="#8b7b6f" strokeWidth="1" fill="none" />
                    <path d="M0 30 Q25 10 50 30 T100 30" stroke="#8b7b6f" strokeWidth="0.5" fill="none" />
                    <path d="M0 70 Q25 50 50 70 T100 70" stroke="#8b7b6f" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="3" fill="#c17f59" />
                  </svg>
                </div>
                {/* Center pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#c17f59] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                </div>
                {/* Expand hint */}
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-white/80 rounded flex items-center justify-center">
                  <Maximize className="w-2.5 h-2.5 text-[#6b5b4f]" />
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="text-center p-4 md:p-6 bg-white rounded-2xl border border-[#e8e2db]">
                <BedDouble className="w-6 h-6 text-[#c17f59] mx-auto mb-3" />
                <p className="font-editorial text-2xl md:text-3xl font-semibold text-[#2a1f1a]">{listing.beds}</p>
                <p className="text-[#6b5b4f] text-sm mt-1">Bedrooms</p>
              </div>
              <div className="text-center p-4 md:p-6 bg-white rounded-2xl border border-[#e8e2db]">
                <Bath className="w-6 h-6 text-[#c17f59] mx-auto mb-3" />
                <p className="font-editorial text-2xl md:text-3xl font-semibold text-[#2a1f1a]">{listing.baths}</p>
                <p className="text-[#6b5b4f] text-sm mt-1">Bathrooms</p>
              </div>
              <div className="text-center p-4 md:p-6 bg-white rounded-2xl border border-[#e8e2db]">
                <Home className="w-6 h-6 text-[#c17f59] mx-auto mb-3" />
                <p className="font-editorial text-2xl md:text-3xl font-semibold text-[#2a1f1a]">{listing.sqft.toLocaleString()}</p>
                <p className="text-[#6b5b4f] text-sm mt-1">Sq Ft</p>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className={`mb-8 transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex gap-2 p-1.5 bg-[#f5f1eb] rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'summary'
                    ? 'bg-white text-[#2a1f1a] shadow-sm'
                    : 'text-[#6b5b4f] hover:text-[#2a1f1a]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Summary
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'details'
                    ? 'bg-white text-[#2a1f1a] shadow-sm'
                    : 'text-[#6b5b4f] hover:text-[#2a1f1a]'
                }`}
              >
                <List className="w-4 h-4" />
                All Details
              </button>
            </div>
          </div>

          {/* Summary Tab Content */}
          {activeTab === 'summary' && (
            <>
              {/* The Hook - 3 Sentences Max */}
              <section className="mb-16">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c17f59] to-[#d4a574] rounded-full" />
                  <blockquote className="pl-8 md:pl-12">
                    <p className="font-editorial text-xl md:text-2xl lg:text-3xl text-[#2a1f1a] leading-relaxed font-light italic">
                      "Wake up to breathtaking red rock views from your master suite. Entertain in a chef's kitchen with a heated pool steps away. The seller is motivated."
                    </p>
                  </blockquote>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-3 mt-8 pl-8 md:pl-12">
                  {['Heated Pool & Spa', 'Owned Solar', '3-Car Garage', 'Smart Home'].map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 bg-[#f5f1eb] text-[#6b5b4f] rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Details Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-8 mb-16">
              {/* Full Description */}
              <section className="bg-white rounded-2xl border border-[#e8e2db] p-6 md:p-8">
                <h3 className="font-editorial text-xl font-semibold text-[#2a1f1a] mb-4">About This Property</h3>
                <p className="text-[#6b5b4f] leading-relaxed">
                  {listing.description}
                </p>
              </section>

              {/* Property Details Grid */}
              <section className="bg-white rounded-2xl border border-[#e8e2db] p-6 md:p-8">
                <h3 className="font-editorial text-xl font-semibold text-[#2a1f1a] mb-6">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#faf9f7] rounded-xl">
                    <p className="text-[#8b7b6f] text-sm mb-1">Property Type</p>
                    <p className="font-semibold text-[#2a1f1a]">{listing.propertyType}</p>
                  </div>
                  <div className="p-4 bg-[#faf9f7] rounded-xl">
                    <p className="text-[#8b7b6f] text-sm mb-1">Year Built</p>
                    <p className="font-semibold text-[#2a1f1a]">{listing.yearBuilt}</p>
                  </div>
                  <div className="p-4 bg-[#faf9f7] rounded-xl">
                    <p className="text-[#8b7b6f] text-sm mb-1">Lot Size</p>
                    <p className="font-semibold text-[#2a1f1a]">{listing.lotSize}</p>
                  </div>
                  <div className="p-4 bg-[#faf9f7] rounded-xl">
                    <p className="text-[#8b7b6f] text-sm mb-1">HOA Fees</p>
                    <p className="font-semibold text-[#2a1f1a]">${listing.hoa}/mo</p>
                  </div>
                  <div className="p-4 bg-[#faf9f7] rounded-xl">
                    <p className="text-[#8b7b6f] text-sm mb-1">Property Tax</p>
                    <p className="font-semibold text-[#2a1f1a]">${listing.propertyTax.toLocaleString()}/yr</p>
                  </div>
                  <div className="p-4 bg-[#faf9f7] rounded-xl">
                    <p className="text-[#8b7b6f] text-sm mb-1">Days on Market</p>
                    <p className="font-semibold text-[#2a1f1a]">{listing.daysOnMarket} days</p>
                  </div>
                </div>
              </section>

              {/* Features by Category */}
              <section className="bg-white rounded-2xl border border-[#e8e2db] p-6 md:p-8">
                <h3 className="font-editorial text-xl font-semibold text-[#2a1f1a] mb-6">Features & Amenities</h3>
                <div className="space-y-6">
                  {listing.features.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-semibold text-[#2a1f1a] mb-3">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 bg-[#f5f1eb] text-[#6b5b4f] rounded-lg text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schools */}
              <section className="bg-white rounded-2xl border border-[#e8e2db] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-5 h-5 text-[#c17f59]" />
                  <h3 className="font-editorial text-xl font-semibold text-[#2a1f1a]">Nearby Schools</h3>
                </div>
                <div className="space-y-4">
                  {listing.schools.map((school) => (
                    <div key={school.name} className="flex items-center justify-between p-4 bg-[#faf9f7] rounded-xl">
                      <div>
                        <p className="font-semibold text-[#2a1f1a]">{school.name}</p>
                        <p className="text-sm text-[#8b7b6f]">{school.grades} • {school.type} • {school.distance}</p>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-[#c17f59]/10 rounded-lg">
                        <span className="font-semibold text-[#c17f59]">{school.rating}</span>
                        <span className="text-[#c17f59] text-sm">/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Neighborhood */}
              <section className="bg-white rounded-2xl border border-[#e8e2db] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <TreePine className="w-5 h-5 text-[#c17f59]" />
                  <h3 className="font-editorial text-xl font-semibold text-[#2a1f1a]">Neighborhood</h3>
                </div>
                <p className="text-[#6b5b4f] leading-relaxed">
                  Located in the prestigious {listing.address.neighborhood} community of {listing.address.city}, this property offers easy access to hiking trails, restaurants, and shopping. The area is known for its stunning natural beauty and peaceful residential atmosphere.
                </p>
              </section>

              {/* Mortgage Calculator Preview */}
              <section className="bg-white rounded-2xl border border-[#e8e2db] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-5 h-5 text-[#c17f59]" />
                  <h3 className="font-editorial text-xl font-semibold text-[#2a1f1a]">Estimated Monthly Payment</h3>
                </div>
                <div className="text-center p-6 bg-[#faf9f7] rounded-xl">
                  <p className="font-editorial text-4xl font-semibold text-[#2a1f1a] mb-2">
                    ${Math.round((listing.price * 0.8 * 0.065 / 12) + (listing.propertyTax / 12) + listing.hoa).toLocaleString()}
                  </p>
                  <p className="text-[#8b7b6f] text-sm">
                    Based on 20% down, 6.5% rate, {listing.propertyTax.toLocaleString()} tax, ${listing.hoa} HOA
                  </p>
                </div>
              </section>
            </div>
          )}

          {/* Agent Card - THE CTA */}
          <section className={`transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white rounded-3xl border border-[#e8e2db] p-8 md:p-10 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                {/* Agent Photo */}
                <div className="shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-[#f5f1eb]">
                    <Image
                      src={listing.agent.photo}
                      alt={listing.agent.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Agent Info */}
                <div className="flex-1">
                  <h3 className="font-editorial text-2xl font-semibold text-[#2a1f1a] mb-1">
                    {listing.agent.name}
                  </h3>
                  <p className="text-[#6b5b4f] mb-3">{listing.agent.title}</p>
                  <div className="flex items-center gap-4 text-sm text-[#8b7b6f]">
                    <span>{listing.agent.experience} experience</span>
                    <span className="w-1 h-1 bg-[#d4c4b4] rounded-full" />
                    <span>{listing.agent.reviewCount} reviews</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 md:w-48">
                  <a
                    href={`tel:${listing.agent.phone}`}
                    className="w-full py-4 bg-[#2a1f1a] text-white rounded-xl text-center font-semibold hover:bg-[#1a1210] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Schedule Showing
                  </a>
                  <a
                    href={`mailto:${listing.agent.email}`}
                    className="w-full py-4 bg-[#f5f1eb] text-[#2a1f1a] rounded-xl text-center font-medium hover:bg-[#ebe5dc] transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Message
                  </a>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="mt-6 pt-6 border-t border-[#e8e2db] text-center">
                <p className="text-[#8b7b6f] text-sm mb-2">Or call directly</p>
                <a
                  href={`tel:${listing.agent.phone}`}
                  className="font-editorial text-2xl md:text-3xl font-semibold text-[#2a1f1a] hover:text-[#c17f59] transition-colors"
                >
                  {listing.agent.phone}
                </a>
              </div>
            </div>
          </section>

          {/* Minimal Footer */}
          <footer className="mt-20 pt-8 border-t border-[#e8e2db] text-center">
            <p className="text-[#8b7b6f] text-sm">
              {listing.address.street}, {listing.address.city} · Listed {listing.daysOnMarket} days ago
            </p>
          </footer>
        </main>

        {/* Full Gallery Modal */}
        {showGallery && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setShowGallery(false)}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <span className="text-2xl">&times;</span>
            </button>

            <div className="relative w-full max-w-6xl mx-auto px-4" onClick={(e) => e.stopPropagation()}>
              <Image
                src={listing.images[currentImage].url}
                alt={listing.images[currentImage].alt}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-4">
                {listing.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImage(index)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      index === currentImage
                        ? 'ring-2 ring-white opacity-100'
                        : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map Modal */}
        {showMap && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowMap(false)}
          >
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close map"
            >
              <span className="text-2xl">&times;</span>
            </button>

            <div
              className="relative w-full max-w-5xl h-[70vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Map Header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-6">
                <h3 className="font-editorial text-2xl font-semibold text-white mb-1">
                  {listing.address.street}
                </h3>
                <p className="text-white/80">
                  {listing.address.city}, {listing.address.state} {listing.address.zip}
                </p>
              </div>

              {/* Map iframe */}
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${encodeURIComponent(`${listing.address.street}, ${listing.address.city}, ${listing.address.state} ${listing.address.zip}`)}&zoom=15&maptype=satellite`}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Get Directions Button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${listing.address.street}, ${listing.address.city}, ${listing.address.state} ${listing.address.zip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2a1f1a] rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
