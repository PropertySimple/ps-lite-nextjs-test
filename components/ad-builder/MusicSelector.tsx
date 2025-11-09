import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MusicTrack {
  id: string;
  name: string;
  genres: string[];
}

interface MusicSelectorProps {
  selectedMusicId: string | null;
  onMusicSelect: (id: string) => void;
  onContinue?: () => void; // Optional since we don't need it anymore
}

const musicTracks: MusicTrack[] = [
  { id: "1", name: "Charm", genres: ["Funk", "Laid Back"] },
  { id: "2", name: "I'm Crazy for Love", genres: ["Dance", "Euphoric"] },
  { id: "3", name: "Wildflowers", genres: ["Contemporary", "Country"] },
  { id: "4", name: "In a Minute", genres: ["Beats", "Laid Back"] },
  { id: "5", name: "Pocket Rocket", genres: ["Hip Hop", "West Coast"] },
  { id: "6", name: "Piece of Cake", genres: ["Indie Pop", "Quirky"] },
  { id: "7", name: "The Get Down", genres: ["Funk", "Beats"] },
  { id: "8", name: "Dancing on the Tables", genres: ["Pop", "2010s"] },
  { id: "9", name: "Bach Suite No. 1", genres: ["Classical", "Cello"] },
  { id: "10", name: "Vivaldi Concerto", genres: ["Classical", "Orchestral"] },
];

export default function MusicSelector({ 
  selectedMusicId, 
  onMusicSelect,
  onContinue 
}: MusicSelectorProps) {
  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground">
        Choose a music track that fits your video's mood and message.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {musicTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onMusicSelect(track.id)}
            className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors text-left ${
              selectedMusicId === track.id ? "border-primary bg-muted/50" : ""
            }`}
          >
            <div className="space-y-2">
              <h3 className="font-semibold">{track.name}</h3>
              <div className="flex gap-2">
                {track.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <Play className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center pt-4">
        Click "Save Changes" in the header when you're ready to save your campaign.
      </p>
    </div>
  );
}
