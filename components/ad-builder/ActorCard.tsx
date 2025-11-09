
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ActorCardProps {
  /** Actor index */
  index: number;
  /** Actor photo URL */
  photo: string;
  /** Whether this actor is selected */
  isSelected: boolean;
  /** Callback when actor is selected */
  onSelect: (index: number) => void;
  /** Callback when preview is requested */
  onPreview: (index: number) => void;
}

/**
 * Individual actor card component with selection and preview functionality
 */
const ActorCard = ({ index, photo, isSelected, onSelect, onPreview }: ActorCardProps) => {
  return (
    <Card 
      className={`aspect-square border-2 cursor-pointer hover:border-primary transition-colors relative ${
        isSelected ? 'border-primary bg-primary/10' : ''
      }`} 
      onClick={() => onSelect(index)} 
      role="button" 
      tabIndex={0} 
      aria-label={`Select actor ${index + 1}`}
    >
      <CardContent className="flex items-center justify-center h-full p-2 relative">
        <Image
          src={photo}
          alt={`Actor ${index + 1}`}
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-md"
          unoptimized={photo.startsWith("http")}
        />
        
        {/* Checkmark for selected actor */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
        
        {/* Preview button */}
        <div className="absolute bottom-2 left-2 right-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(index);
            }}
            className="w-full text-xs bg-black/70 hover:bg-black/80 text-white border-0"
          >
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActorCard;
