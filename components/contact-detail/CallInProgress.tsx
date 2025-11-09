"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResponsiveCommunicationDrawer } from "@/components/ui/responsive-communication-drawer";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Circle,
  FileText
} from "lucide-react";

interface CallInProgressProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  contactPhone: string;
  isRecording: boolean;
  aiSummary?: string;
  suggestedAction?: string;
}

export function CallInProgress({
  open,
  onOpenChange,
  contactName,
  contactPhone,
  isRecording,
  aiSummary,
  suggestedAction,
}: CallInProgressProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);

  // Format duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [open]);

  const handleEndCall = () => {
    onOpenChange(false);
    setCallDuration(0);
  };

  // Generate AI call transcript based on context
  const generateTranscript = () => {
    const action = suggestedAction || "discuss their interest";
    
    return `You: "Hi ${contactName}, this is [Your Name]. Do you have a moment?"

${contactName}: "Yes, thanks for calling back!"

You: "Great! I understand ${aiSummary?.includes('pre-approved') ? 'you are pre-approved - that is fantastic!' : 'your interest. Let me help you with that.'}"

${contactName}: "${aiSummary?.includes('weekend') ? 'Yes, we would love to see it this weekend.' : 'That sounds good.'}"

You: "${suggestedAction?.includes('Schedule') ? 'Perfect! I have Saturday at 2pm or Sunday at 11am. Which works better?' : 'I will send you the details shortly.'}"

${contactName}: "${aiSummary?.includes('weekend') ? 'Saturday at 2pm works!' : 'That would be great, thanks!'}"

You: "Wonderful! I will ${suggestedAction?.includes('Schedule') ? 'get that scheduled now' : 'follow up with the information'}. Any other questions?"

${contactName}: "No, that covers it. Thank you!"

You: "You are welcome, ${contactName}. Talk soon!"`;
  };

  const aiTranscript = generateTranscript();

  return (
    <ResponsiveCommunicationDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Call in Progress"
    >
      <div className="space-y-6">
        {/* Call Status */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              {isRecording && (
                <div className="absolute -top-1 -right-1">
                  <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full px-2 py-1">
                    <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">REC</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold">{contactName}</h3>
            <p className="text-sm text-muted-foreground">{contactPhone}</p>
            <p className="text-lg font-mono">{formatDuration(callDuration)}</p>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="gap-2"
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>

          <Button
            variant={speakerOn ? "default" : "outline"}
            size="sm"
            onClick={() => setSpeakerOn(!speakerOn)}
            className="gap-2"
          >
            {speakerOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            Speaker
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndCall}
            className="gap-2"
          >
            <PhoneOff className="w-4 h-4" />
            End Call
          </Button>
        </div>

        <Separator />

        {/* Suggested Script */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Suggested Script
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[200px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">
                {aiTranscript}
              </pre>
            </div>
          </CardContent>
        </Card>

        {isRecording && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Circle className="w-3 h-3 fill-red-500 text-red-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Call is being recorded - Transcript will be available after the call
            </span>
          </div>
        )}
      </div>
    </ResponsiveCommunicationDrawer>
  );
}