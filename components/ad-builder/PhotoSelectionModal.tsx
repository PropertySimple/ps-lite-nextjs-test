'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface PhotoOption {
  id: string;
  url: string;
  alt: string;
}

interface PhotoSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: PhotoOption[];
  currentPhotoUrl: string;
  onSelectPhoto: (url: string) => void;
}

export function PhotoSelectionModal({
  open,
  onOpenChange,
  photos,
  currentPhotoUrl,
  onSelectPhoto,
}: PhotoSelectionModalProps) {
  const [selectedUrl, setSelectedUrl] = useState(currentPhotoUrl);

  // Reset selection when modal opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setSelectedUrl(currentPhotoUrl);
    }
    onOpenChange(isOpen);
  };

  const handleConfirm = () => {
    onSelectPhoto(selectedUrl);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Select Photo</DialogTitle>
          <DialogDescription>
            Choose a photo from your listing to use in your ad
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((photo) => {
              const isSelected = selectedUrl === photo.url;

              return (
                <Card
                  key={photo.id}
                  className={`aspect-square border-2 cursor-pointer transition-all relative overflow-hidden ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedUrl(photo.url)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${photo.alt}`}
                >
                  <CardContent className="p-0 h-full">
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized={photo.url.startsWith('http')}
                    />

                    {/* Selection checkmark */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                          <Check className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Select Photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
