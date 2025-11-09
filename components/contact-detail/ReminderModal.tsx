"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  onCreateReminder: (reminder: { date: string; text: string }) => void;
}

export const ReminderModal = ({ open, onOpenChange, contactName, onCreateReminder }: ReminderModalProps) => {
  const [date, setDate] = useState<Date>();
  const [reminderText, setReminderText] = useState("");

  const handleCreate = () => {
    if (!date || !reminderText.trim()) {
      toast.error("Please select a date and enter reminder text");
      return;
    }

    const reminder = {
      date: format(date, "PPP"),
      text: reminderText
    };

    onCreateReminder(reminder);
    toast.success("Reminder Created", {
      description: `Reminder set for ${format(date, "PPP")}`
    });
    
    // Reset form
    setDate(undefined);
    setReminderText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Reminder for {contactName}</DialogTitle>
          <DialogDescription>
            Create a reminder that will appear in your inbox on the selected date.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reminder Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder-text">Reminder Note</Label>
            <Input
              id="reminder-text"
              placeholder="e.g., Follow up on property viewing"
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            Create Reminder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
