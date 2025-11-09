"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Headphones } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CallRecordingPlayerProps {
  transcript: string;
  duration?: number; // Duration in seconds
  onClose?: () => void;
}

export const CallRecordingPlayer = ({ 
  transcript, 
  duration = 720, // Default 12 minutes (720 seconds)
  onClose 
}: CallRecordingPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playbackRef = useRef<number | null>(null);

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle skip backward (10 seconds)
  const skipBackward = () => {
    setCurrentTime(prev => Math.max(0, prev - 10));
  };

  // Handle skip forward (10 seconds)
  const skipForward = () => {
    setCurrentTime(prev => Math.min(duration, prev + 10));
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  // Simulate playback progression
  useEffect(() => {
    if (isPlaying) {
      playbackRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
        playbackRef.current = null;
      }
    }

    return () => {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    };
  }, [isPlaying, duration]);

  return (
    <div className="space-y-4">
      {/* Audio Player Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Call Recording
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Time Display */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Progress Bar */}
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleSliderChange}
            className="cursor-pointer"
          />

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={skipBackward}
              disabled={currentTime === 0}
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">Skip backward</span>
            </Button>

            <Button
              size="icon"
              className="h-12 w-12"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause recording" : "Play recording"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={skipForward}
              disabled={currentTime >= duration}
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="h-4 w-4" />
              <span className="sr-only">Skip forward</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="text-sm whitespace-pre-line leading-relaxed">
              {transcript}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

interface CallRecordingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transcript: string;
  duration?: number;
}

export const CallRecordingDialog = ({ 
  open, 
  onOpenChange, 
  transcript, 
  duration 
}: CallRecordingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Call Recording & Transcript</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <CallRecordingPlayer 
            transcript={transcript} 
            duration={duration}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
