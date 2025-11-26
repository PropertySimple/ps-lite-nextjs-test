"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Camera, AlertTriangle } from "lucide-react";
import OpenHouseScheduler, { OpenHouseEvent } from "./OpenHouseScheduler";
import { PhotoSelectionModal, PhotoOption } from "./PhotoSelectionModal";
import { sedonaListing } from "@/data/mockListingData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdCopyEditorProps {
  /** Current ad copy text */
  adCopy: string;
  /** Currently selected call-to-action */
  callToAction: string;
  /** Open house events */
  openHouses: OpenHouseEvent[];
  /** Ad type - determines if open house fields are shown */
  adType?: 'standard' | 'openhouse';
  /** Callback when ad copy changes */
  onAdCopyChange: (copy: string) => void;
  /** Callback when call-to-action changes */
  onCallToActionChange: (cta: string) => void;
  /** Callback when open houses change */
  onOpenHousesChange: (openHouses: OpenHouseEvent[]) => void;
  /** Callback to proceed to next step */
  onContinue: () => void;
}

/**
 * AdCopyEditor component for Step 2 of the Ad Builder
 * Allows users to review and edit ad copy with AI assistance
 */
// Convert listing images to PhotoOption format
const listingPhotos: PhotoOption[] = sedonaListing.images.map((img) => ({
  id: img.id,
  url: img.url,
  alt: img.alt,
}));

const AdCopyEditor = ({
  adCopy,
  callToAction: _callToAction,
  openHouses,
  adType = 'standard',
  onAdCopyChange,
  onCallToActionChange: _onCallToActionChange,
  onOpenHousesChange,
  onContinue
}: AdCopyEditorProps) => {
  const [phoneNumber, setPhoneNumber] = useState("(777) 777-9999");
  const [showSaveWarning, setShowSaveWarning] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(listingPhotos[0]?.url || "/listing-images/white-house-listing.jpg");

  const handleChangePhoto = () => {
    setShowPhotoModal(true);
  };

  const handlePhotoSelect = (url: string) => {
    setSelectedPhotoUrl(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left side - Ad Preview */}
      <div className="space-y-4">
        {/* Ad Preview Card */}
        <Card className="overflow-hidden border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium">PS</span>
              </div>
              <div>
                <div className="font-semibold text-sm">PropertySimple</div>
                <div className="text-xs text-muted-foreground">Sponsored</div>
              </div>
            </div>
            
            <div className="relative mb-3">
              <Image
                src={selectedPhotoUrl}
                alt="Listing"
                width={600}
                height={600}
                className="w-full aspect-square object-cover rounded-lg"
                unoptimized={selectedPhotoUrl.startsWith("http")}
              />
              <Button 
                variant="secondary"
                size="sm"
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-black"
                onClick={handleChangePhoto}
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>
            
            <div className="text-sm text-foreground mb-3 line-clamp-2">
              {adCopy || "PRICE REDUCTION!✅ Janelle Markgren just reduced the price of this property in Graham, NC to $699,000..."}
            </div>
            
            <Button 
              size="sm" 
              className="w-full bg-slate-800 hover:bg-slate-900 text-white"
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Form */}
      <div className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Our system suggested high-converting copy. Review and make any changes you need.
        </p>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="ad-copy" className="text-sm font-semibold mb-2 block">
              Your Ad Copy
            </label>
            <Textarea 
              id="ad-copy"
              value={adCopy}
              onChange={(e) => onAdCopyChange(e.target.value)}
              className="min-h-32 resize-none"
              placeholder="PRICE REDUCTION!✅ Janelle Markgren just reduced the price of this property in Graham, NC to $699,000."
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="text-sm font-semibold mb-2 block">
              Confirm Your Cell Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="(777) 777-9999"
            />
          </div>

          {/* Open House Scheduler - only shown for open house ads */}
          {adType === 'openhouse' && (
            <OpenHouseScheduler
              openHouses={openHouses}
              onOpenHousesChange={onOpenHousesChange}
            />
          )}
        </div>

        <Button
          onClick={() => setShowSaveWarning(true)}
          size="lg"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
        >
          Save Changes
        </Button>

        <AlertDialog open={showSaveWarning} onOpenChange={setShowSaveWarning}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Making frequent changes to your ad copy after it goes live can negatively
                impact your campaign's performance. Meta's algorithm works best with stable ads.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onContinue}>
                Save Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <PhotoSelectionModal
        open={showPhotoModal}
        onOpenChange={setShowPhotoModal}
        photos={listingPhotos}
        currentPhotoUrl={selectedPhotoUrl}
        onSelectPhoto={handlePhotoSelect}
      />
    </div>
  );
};

export default AdCopyEditor;
