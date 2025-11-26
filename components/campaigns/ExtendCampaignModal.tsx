'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

export interface ExtendCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: string;
  campaignTitle: string;
  listingImage: string;
}

export function ExtendCampaignModal({
  open,
  onOpenChange,
  campaignId,
  campaignTitle,
  listingImage,
}: ExtendCampaignModalProps) {
  const router = useRouter();

  const handleExtend = () => {
    onOpenChange(false);
    router.push(`/checkout/extend/${campaignId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        {/* Listing Image */}
        <div className="aspect-video rounded-lg overflow-hidden -mx-2 -mt-2 mb-2">
          <Image
            src={listingImage}
            alt={campaignTitle}
            width={450}
            height={253}
            className="w-full h-full object-cover"
            unoptimized={listingImage.startsWith('http')}
          />
        </div>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Extend Your Campaign
          </DialogTitle>
          <DialogDescription className="text-base">
            Keep the momentum going! Your ad is generating results—extend for 7 more days and continue reaching potential buyers.
          </DialogDescription>
        </DialogHeader>

        {/* Price Box */}
        <div className="bg-muted/50 rounded-lg p-4 text-center my-2">
          <div className="text-3xl font-bold">$99</div>
          <div className="text-sm text-muted-foreground">for 7 more days</div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 justify-end w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleExtend}>
              Extend Campaign
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
