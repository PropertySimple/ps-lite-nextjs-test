
import ActorCard from "./ActorCard";

interface ActorGridProps {
  /** Array of selected actor indices */
  selectedActors: number[];
  /** Callback when an actor is selected */
  onActorSelect: (index: number) => void;
  /** Callback when actor preview is requested */
  onActorPreview: (index: number) => void;
}

/**
 * Grid component for displaying actor selection cards
 */
const ActorGrid = ({ selectedActors, onActorSelect, onActorPreview }: ActorGridProps) => {
  // Actor photos array
  const actorPhotos = [
    "/lovable-uploads/98bc0d51-e685-4bc3-9c61-b667ad2f1e82.png",
    "/lovable-uploads/b235c0ae-7bae-4b9c-8125-2c300c681fa1.png",
    "/lovable-uploads/263dbc78-040e-40ba-880a-bfd68263a6f3.png",
    "/lovable-uploads/d1799e53-c883-4a46-833e-8d33a17afff8.png",
    "/lovable-uploads/a2a92ebc-c65c-43b7-b1e6-289034791fa7.png",
    "/lovable-uploads/643e1ffc-f95d-4aa9-8537-db917a31c5c3.png"
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Actor</h3>
      <div className="grid grid-cols-3 gap-4">
        {actorPhotos.map((photo, i) => (
          <ActorCard
            key={i}
            index={i}
            photo={photo}
            isSelected={selectedActors.includes(i)}
            onSelect={onActorSelect}
            onPreview={onActorPreview}
          />
        ))}
      </div>
    </div>
  );
};

export default ActorGrid;
