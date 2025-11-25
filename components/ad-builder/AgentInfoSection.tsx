"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AgentInfoSectionProps {
  phoneNumber: string;
  headshotUrl: string;
  onPhoneNumberChange: (phone: string) => void;
  onHeadshotUrlChange: (url: string) => void;
}

export default function AgentInfoSection({
  phoneNumber,
  headshotUrl,
  onPhoneNumberChange,
}: AgentInfoSectionProps) {
  const handleUploadHeadshot = () => {
    toast({
      title: "Upload Headshot",
      description: "Headshot upload coming soon...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Your Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Phone Number */}
        <div>
          <label htmlFor="agent-phone" className="text-sm font-semibold mb-2 block">
            Cell Phone Number
          </label>
          <Input
            id="agent-phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder="(555) 123-4567"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This number will be shown in your video
          </p>
        </div>

        {/* Headshot */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            Your Headshot
          </label>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-full overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity border-2 border-border"
              onClick={handleUploadHeadshot}
            >
              {headshotUrl ? (
                <Image
                  src={headshotUrl}
                  alt="Headshot"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUploadHeadshot}
              className="gap-2"
            >
              <Camera className="w-4 h-4" />
              Upload Photo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your photo will appear in the video
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
