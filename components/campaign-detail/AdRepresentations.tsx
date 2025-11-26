"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import SocialMediaPost from "./SocialMediaPost";

const AdRepresentations = () => {
  const [showModal, setShowModal] = useState(false);

  const handleViewLiveAd = () => {
    setShowModal(false);
    window.open('https://www.facebook.com/', '_blank');
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Live Ad on Facebook</DialogTitle>
            <DialogDescription className="leading-relaxed space-y-2">
              <span className="block">Sign in to Facebook if needed, then click "Show Ad" to preview your live ad.</span>
              <span className="block">Most ads go live within a few minutes of placement, but can take up to 24 hours for Facebook to review and approve. You can only view your ad once it's live.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleViewLiveAd}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Continue to Facebook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Ads</CardTitle>
            <CardDescription>
              These are previews of your ads. To see the live ad on your social media account, click the button.
            </CardDescription>
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowModal(true)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            See live ad
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Instagram</h3>
              <span className="px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 rounded-full text-sm font-medium">
                Ad Preview
              </span>
            </div>
            <SocialMediaPost 
              platform="instagram"
              username="Username"
              image="/listing-images/white-house-listing.jpg"
              caption="Check out this photo I posted!"
              likes="Liked by Username and 100"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Facebook</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                Ad Preview
              </span>
            </div>
            <SocialMediaPost 
              platform="facebook"
              username="Username"
              image="/listing-images/white-house-listing.jpg"
              caption="Check out this photo I posted!"
              likes="Liked by Username and 100"
            />
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
};

export default AdRepresentations;
