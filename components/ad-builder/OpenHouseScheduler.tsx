
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export interface OpenHouseEvent {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface OpenHouseSchedulerProps {
  openHouses: OpenHouseEvent[];
  onOpenHousesChange: (openHouses: OpenHouseEvent[]) => void;
}

const OpenHouseScheduler = ({ openHouses, onOpenHousesChange }: OpenHouseSchedulerProps) => {
  const addOpenHouse = () => {
    const newOpenHouse: OpenHouseEvent = {
      id: Date.now().toString(),
      date: '',
      startTime: '',
      endTime: ''
    };
    onOpenHousesChange([...openHouses, newOpenHouse]);
  };

  const removeOpenHouse = (id: string) => {
    onOpenHousesChange(openHouses.filter(oh => oh.id !== id));
  };

  const updateOpenHouse = (id: string, field: keyof Omit<OpenHouseEvent, 'id'>, value: string) => {
    onOpenHousesChange(
      openHouses.map(oh => 
        oh.id === id ? { ...oh, [field]: value } : oh
      )
    );
  };

  return (
    <div>
      <Label className="text-sm font-medium mb-2 block">
        Open House Dates (Optional)
      </Label>
      
      <div className="space-y-3">
        {openHouses.map((openHouse) => (
          <Card key={openHouse.id} className="p-3 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 min-w-0">
                <div className="sm:col-span-2 lg:col-span-1 min-w-0">
                  <Label htmlFor={`date-${openHouse.id}`} className="text-xs text-muted-foreground mb-1 block">
                    Date
                  </Label>
                  <Input
                    id={`date-${openHouse.id}`}
                    type="date"
                    value={openHouse.date}
                    onChange={(e) => updateOpenHouse(openHouse.id, 'date', e.target.value)}
                    className="text-sm w-full min-w-0 max-w-full"
                  />
                </div>
                <div className="min-w-0">
                  <Label htmlFor={`start-${openHouse.id}`} className="text-xs text-muted-foreground mb-1 block">
                    Start Time
                  </Label>
                  <Input
                    id={`start-${openHouse.id}`}
                    type="time"
                    value={openHouse.startTime}
                    onChange={(e) => updateOpenHouse(openHouse.id, 'startTime', e.target.value)}
                    className="text-sm w-full min-w-0 max-w-full"
                  />
                </div>
                <div className="min-w-0">
                  <Label htmlFor={`end-${openHouse.id}`} className="text-xs text-muted-foreground mb-1 block">
                    End Time
                  </Label>
                  <Input
                    id={`end-${openHouse.id}`}
                    type="time"
                    value={openHouse.endTime}
                    onChange={(e) => updateOpenHouse(openHouse.id, 'endTime', e.target.value)}
                    className="text-sm w-full min-w-0 max-w-full"
                  />
                </div>
                <div className="flex justify-center sm:justify-start lg:justify-center lg:items-end flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeOpenHouse(openHouse.id)}
                    className="h-10 w-10 p-0 lg:mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={addOpenHouse}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Open House Date
        </Button>
      </div>
    </div>
  );
};

export default OpenHouseScheduler;
