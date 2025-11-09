"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock leads data
const mockLeads = [
  { id: 1, name: "Sarah Johnson", phone: "(555) 123-4567", email: "sarah.j@email.com" },
  { id: 2, name: "Michael Chen", phone: "(555) 234-5678", email: "michael.c@email.com" },
  { id: 3, name: "Jennifer Martinez", phone: "(555) 789-0123", email: "jennifer.m@email.com" },
  { id: 4, name: "Emma Wilson", phone: "(555) 345-6789", email: "emma.w@email.com" },
];

interface TaskEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: {
    id: number;
    taskTitle: string;
    taskDescription: string;
    dueDate: string;
    leadId?: number;
  };
  onSave: (task: { id?: number; taskTitle: string; taskDescription: string; dueDate: string; leadId: number }) => void;
  mode?: "create" | "edit";
}

export function TaskEditModal({ open, onOpenChange, task, onSave, mode = "edit" }: TaskEditModalProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [leadSearch, setLeadSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);

  useEffect(() => {
    if (task && mode === "edit") {
      setTaskTitle(task.taskTitle);
      setTaskDescription(task.taskDescription);
      setDueDate(new Date());
      setSelectedLead(task.leadId || null);
      if (task.leadId) {
        const lead = mockLeads.find(l => l.id === task.leadId);
        if (lead) setLeadSearch(lead.name);
      }
    } else {
      setTaskTitle("");
      setTaskDescription("");
      setDueDate(undefined);
      setLeadSearch("");
      setSelectedLead(null);
    }
  }, [task, mode, open]);

  const filteredLeads = mockLeads.filter(lead => 
    leadSearch.length > 0 && (
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      lead.email.toLowerCase().includes(leadSearch.toLowerCase())
    )
  );

  const handleLeadSelect = (lead: typeof mockLeads[0]) => {
    setSelectedLead(lead.id);
    setLeadSearch(lead.name);
    setShowLeadDropdown(false);
  };

  const handleSave = () => {
    if (!taskTitle.trim() || !taskDescription.trim() || !dueDate || !selectedLead) {
      return;
    }

    onSave({
      ...(mode === "edit" && task ? { id: task.id } : {}),
      taskTitle: taskTitle.trim(),
      taskDescription: taskDescription.trim(),
      dueDate: format(dueDate, "PPP"),
      leadId: selectedLead,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Task" : "Edit Task"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lead-search">Associated Lead</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="lead-search"
                placeholder="Search by name, phone, or email..."
                value={leadSearch}
                onChange={(e) => {
                  setLeadSearch(e.target.value);
                  setShowLeadDropdown(true);
                }}
                onFocus={() => setShowLeadDropdown(true)}
                className="pl-9"
              />
              {showLeadDropdown && filteredLeads.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-48 overflow-auto">
                  {filteredLeads.map((lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => handleLeadSelect(lead)}
                      className="w-full px-3 py-2 text-left hover:bg-accent text-sm"
                    >
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {lead.phone} • {lead.email}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-title">Reminder Title</Label>
            <Input
              id="task-title"
              placeholder="e.g., Follow up on property viewing"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="Add details about this reminder..."
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!taskTitle.trim() || !taskDescription.trim() || !dueDate || !selectedLead}
          >
            {mode === "create" ? "Create Reminder" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
