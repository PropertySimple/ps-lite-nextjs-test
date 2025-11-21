"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ListingUrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ListingUrlModal({ open, onOpenChange }: ListingUrlModalProps) {
  const [listingUrl, setListingUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!listingUrl.trim()) {
      return;
    }

    setIsLoading(true);

    // Navigate to the launch/purchase page with the listing URL
    const encodedUrl = encodeURIComponent(listingUrl.trim());
    router.push(`/launch/new?listing=${encodedUrl}`);
  };

  const handleClose = () => {
    setListingUrl("");
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Your Listing URL</DialogTitle>
          <DialogDescription>
            Paste a link to your listing and we'll create your video ads automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="https://zillow.com/your-listing"
            value={listingUrl}
            onChange={(e) => setListingUrl(e.target.value)}
            disabled={isLoading}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !listingUrl.trim()}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Loading..." : "Continue"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
