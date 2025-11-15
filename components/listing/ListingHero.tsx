'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { X, ChevronLeft, ChevronRight, Maximize2, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Badge } from '@/components/ui/badge';
import type { ListingImage } from '@/data/mockListingData';

interface ListingHeroProps {
  images: ListingImage[];
  address: {
    street: string;
    city: string;
    state: string;
  };
  price: number;
  status: string;
}

export function ListingHero({ images, address, price, status }: ListingHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: false
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${address.street}, ${address.city}`,
          text: `Check out this property for ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)}`,
          url: window.location.href
        });
      } catch (_err) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    }
  };

  return (
    <>
      {/* Hero Gallery */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-muted overflow-hidden grain-texture">
        <div {...handlers} className="relative w-full h-full">
          <Image
            src={images[currentIndex]?.url || ''}
            alt={images[currentIndex]?.alt || 'Property image'}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Status Badge */}
        {status === 'active' && (
          <Badge className="absolute top-4 left-4 md:top-6 md:left-6 bg-success text-success-foreground text-sm md:text-base">
            Active
          </Badge>
        )}

        {/* Navigation Arrows - Desktop */}
        <div className="hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10 md:h-12 md:w-12"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-5 w-5 md:h-6 md:w-6 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10 md:h-12 md:w-12"
            onClick={handleShare}
            aria-label="Share property"
          >
            <Share2 className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>

        {/* Image Counter & Fullscreen Button */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-3">
          <div className="bg-black/70 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium">
            {currentIndex + 1} / {images.length}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/70 hover:bg-black/90 text-white rounded-full gap-2"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="h-4 w-4" />
            <span className="hidden md:inline">View All Photos</span>
          </Button>
        </div>

        {/* Thumbnail Strip - Desktop Only */}
        <div className="hidden md:flex absolute bottom-6 left-6 gap-2 overflow-x-auto max-w-xl">
          {images.slice(0, 6).map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                currentIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.slice(0, 10).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black">
          <VisuallyHidden>
            <DialogTitle>Property Photo Gallery</DialogTitle>
          </VisuallyHidden>
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]?.url || ''}
                alt={images[currentIndex]?.alt || 'Property image'}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Fullscreen Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-14 w-14"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-14 w-14"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Fullscreen Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-lg font-medium">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Fullscreen Thumbnails */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-4xl px-4">
              {images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                    currentIndex === idx ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
