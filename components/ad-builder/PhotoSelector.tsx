
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Star } from "lucide-react";

interface PhotoSelectorProps {
  /** Array of selected photo indices */
  selectedPhotos: number[];
  /** Index of the cover photo */
  coverPhotoIndex: number | null;
  /** Callback function when a photo is selected/deselected */
  onPhotoSelect: (index: number) => void;
  /** Callback function to set cover photo */
  onSetCoverPhoto: (index: number) => void;
}

// Property photos array
const propertyPhotos = [
  "/lovable-uploads/58aa70c5-cb44-41e8-a3a8-1c1fa1cb63b7.png",
  "/lovable-uploads/c98334a4-983c-45ab-9a40-e78380507cff.png",
  "/lovable-uploads/cb4d7b26-1267-41db-bad4-7b23e880d53a.png",
  "/lovable-uploads/e23b5d9e-0cec-4099-9192-3df8a5ad0542.png",
  "/lovable-uploads/85aec2c0-7dc8-4af7-9486-d30830b13964.png",
  "/lovable-uploads/0b32ca58-e401-4375-9431-f772164b660b.png",
  "/lovable-uploads/4c41482a-78c6-4079-a69d-d525cc8a503f.png",
  "/lovable-uploads/bfb6e323-8deb-4e39-b0dd-b90e4f963d9f.png",
  "/lovable-uploads/b7eff3bc-dc3b-4d39-9bce-628ca018769b.png",
  "/lovable-uploads/e01afebd-c94f-4baa-a9ee-630a13140137.png"
];

/**
 * PhotoSelector component for Step 1 of the Ad Builder
 * Allows users to select up to 9 photos with cover photo designation
 */
const PhotoSelector = ({
  selectedPhotos,
  coverPhotoIndex,
  onPhotoSelect,
  onSetCoverPhoto
}: PhotoSelectorProps) => {
  const isAtSelectionLimit = selectedPhotos.length >= 9;

  const handleStarClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onSetCoverPhoto(index);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Choose up to 9 photos for your ad campaign. Tap the star to set your cover photo.
        </p>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {propertyPhotos.map((photoUrl, index) => {
            const isSelected = selectedPhotos.includes(index);
            const isCover = coverPhotoIndex === index;
            const isDisabled = !isSelected && isAtSelectionLimit;

            const photoCard = (
              <Card 
                key={index}
                className={`aspect-square border-2 cursor-pointer transition-all relative overflow-hidden ${
                  isSelected 
                    ? 'border-primary bg-primary/10' 
                    : isDisabled 
                      ? 'border-muted opacity-50 cursor-not-allowed' 
                      : 'border-dashed hover:border-primary'
                }`}
                onClick={() => !isDisabled && onPhotoSelect(index)}
                role="button"
                tabIndex={0}
                aria-label={`${isSelected ? 'Deselect' : 'Select'} photo ${index + 1}`}
              >
                <CardContent className="p-0 h-full">
                  <Image
                    src={photoUrl}
                    alt={`Property photo ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    unoptimized={photoUrl.startsWith("http")}
                  />
                  
                  {/* Selection checkmark - only for selected non-cover photos */}
                  {isSelected && !isCover && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        ✓
                      </div>
                    </div>
                  )}
                  
                  {/* Cover Photo Badge - centered for cover photo */}
                  {isCover && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="default" className="text-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Cover Photo
                      </Badge>
                    </div>
                  )}
                  
                  {/* Star for cover photo designation (non-cover selected photos) */}
                  {isSelected && !isCover && (
                    <div 
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={(e) => handleStarClick(index, e)}
                      role="button"
                      tabIndex={0}
                      aria-label="Set as cover photo"
                    >
                      <Star className="w-6 h-6 fill-none text-white stroke-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            // Wrap disabled cards with tooltip
            if (isDisabled) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    {photoCard}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You can only select 9 photos</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return photoCard;
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          {selectedPhotos.length} of 9 photos selected
        </p>
      </div>
    </TooltipProvider>
  );
};

export default PhotoSelector;
