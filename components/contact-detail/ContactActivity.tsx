"use client";


import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import AISuggestedNextSteps from "./AISuggestedNextSteps";
import { Activity } from "@/types/activity";
import { 
  UserPlus, 
  Info, 
  MessageSquare, 
  Mail, 
  StickyNote,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Bot,
  Check,
  Play,
  Reply,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Plus
} from "lucide-react";

interface ContactActivityProps {
  contactId: string;
  contactName: string;
  additionalActivities?: Activity[];
  onCallClick?: () => void;
}

const ContactActivity = ({ contactId, contactName, additionalActivities = [], onCallClick }: ContactActivityProps) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Activity | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Activity | null>(null);
  const [showAISuggestion, setShowAISuggestion] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock activity data - in a real app, this would come from an API
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "lead_created",
      title: "Lead Created",
      description: "New lead added to system",
      timestamp: "5 days ago",
      contactName: "Sarah Johnson",
      metadata: {
        source: "Facebook Ad Campaign"
      }
    },
    {
      id: "2",
      type: "requested_info",
      title: "Requested More Information",
      description: "Asked for pricing and availability details",
      timestamp: "4 days ago",
      contactName: "Sarah Johnson",
      metadata: {
        requestSource: "New to Market Ad",
        property: "123 Oak Street, Seattle, WA 98101"
      }
    },
    {
      id: "3",
      type: "ai_auto_text",
      title: "We automatically texted Sarah Johnson on your behalf",
      description: "",
      timestamp: "4 days ago",
      status: "delivered",
      metadata: {
        messageBody: "Hi Sarah! Thanks for your interest in 123 Oak Street. I'd love to schedule a showing for you this week. When works best for your schedule?",
        deliveryStatus: "delivered"
      }
    },
    {
      id: "4",
      type: "ai_auto_email",
      title: "We automatically emailed Sarah Johnson on your behalf",
      description: "",
      timestamp: "3 days ago",
      status: "delivered",
      metadata: {
        subject: "Your Interest in 123 Oak Street - Let's Schedule a Showing!",
        emailBody: "Hi Sarah,\n\nThank you for expressing interest in the beautiful property at 123 Oak Street. Based on your requirements, I think this home could be perfect for you.\n\nWould you like to schedule a private showing this weekend? I'm available Saturday and Sunday afternoons.\n\nBest regards,\nMike Thompson",
        deliveryStatus: "delivered"
      }
    },
    {
      id: "5",
      type: "manual_note",
      title: "You wrote a note",
      description: "",
      timestamp: "2 days ago",
      metadata: {
        noteBody: "Sarah seems very interested in properties with good school districts. Mentioned she has two young children. Should focus on family-friendly neighborhoods in our next conversation."
      }
    },
    {
      id: "6",
      type: "incoming_call",
      title: "Sarah Johnson called you",
      description: "Incoming call forwarded to your cell phone",
      timestamp: "2 days ago",
      metadata: {
        duration: "8 minutes 32 seconds",
        callDirection: "incoming",
        hasRecording: true,
        callStatus: "completed",
        transcript: "Caller asked about school districts and neighborhood safety. Very interested in properties under $450K. Wants to schedule showing for this weekend.",
        callNotes: "Sarah is very interested in family-friendly neighborhoods. Mentioned budget of $450K max. Prioritize properties near good schools."
      }
    },
    {
      id: "7",
      type: "manual_email_sent",
      title: "You emailed Sarah Johnson",
      description: "Follow-up email with school district information",
      timestamp: "1 day ago",
      status: "delivered",
      metadata: {
        subject: "School District Information for Oak Street Properties",
        emailBody: "Hi Sarah,\n\nAs promised, I've attached the school district information for the Oak Street properties. The elementary school has excellent ratings and is just a 10-minute walk away.\n\nLet me know if you have any questions!\n\nBest regards,\nMike",
        deliveryStatus: "delivered"
      }
    },
    {
      id: "8",
      type: "outgoing_call",
      title: "You called Sarah Johnson",
      description: "Outgoing call to discuss showing times",
      timestamp: "1 day ago",
      metadata: {
        duration: "3 minutes 15 seconds",
        callDirection: "outgoing",
        hasRecording: false,
        callStatus: "completed"
      }
    }
  ]);

  // Combine mock activities with additional activities passed from parent
  const allActivities = [...additionalActivities, ...activities];

  // Auto-scroll to bottom when activities change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allActivities]);

  // Determine if activity is from the lead or the user
  const isLeadActivity = (type: Activity["type"]) => {
    return ["lead_created", "requested_info", "incoming_call"].includes(type);
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "lead_created":
        return <UserPlus className="w-4 h-4" />;
      case "requested_info":
        return <Info className="w-4 h-4" />;
      case "ai_auto_text":
        return <Bot className="w-4 h-4" />;
      case "ai_auto_email":
        return <Bot className="w-4 h-4" />;
      case "manual_note":
        return <StickyNote className="w-4 h-4" />;
      case "manual_email_sent":
        return <Mail className="w-4 h-4" />;
      case "manual_text_sent":
        return <MessageSquare className="w-4 h-4" />;
      case "incoming_call":
        return <PhoneIncoming className="w-4 h-4" />;
      case "outgoing_call":
        return <PhoneOutgoing className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-muted rounded-full" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "lead_created":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "requested_info":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "ai_auto_text":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "ai_auto_email":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "manual_note":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "manual_email_sent":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "manual_text_sent":
        return "bg-green-50 text-green-600 border-green-200";
      case "incoming_call":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "outgoing_call":
        return "bg-indigo-50 text-indigo-600 border-indigo-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const handleWriteNote = () => {
    setEditingNote(null);
    setNoteContent("");
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (activity: Activity) => {
    setEditingNote(activity);
    setNoteContent(activity.metadata?.noteBody || activity.metadata?.callNotes || "");
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = () => {
    if (!noteContent.trim()) return;

    if (editingNote) {
      // Update existing note or call notes
      setActivities(prevActivities => 
        prevActivities.map(activity => 
          activity.id === editingNote.id 
            ? { 
                ...activity, 
                metadata: { 
                  ...activity.metadata, 
                  ...(editingNote.type === "incoming_call" || editingNote.type === "outgoing_call" 
                    ? { callNotes: noteContent } 
                    : { noteBody: noteContent })
                } 
              }
            : activity
        )
      );
    } else {
      // Create new note
      const newNote: Activity = {
        id: Date.now().toString(),
        type: "manual_note",
        title: "You wrote a note",
        description: "",
        timestamp: "Just now",
        metadata: {
          noteBody: noteContent
        }
      };
      setActivities(prevActivities => [...prevActivities, newNote]);
    }

    setIsNoteModalOpen(false);
    setNoteContent("");
    setEditingNote(null);
  };

  const handleCancelNote = () => {
    setIsNoteModalOpen(false);
    setNoteContent("");
    setEditingNote(null);
  };

  const handleDeleteNote = (activity: Activity) => {
    setNoteToDelete(activity);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      setActivities(prevActivities => 
        prevActivities.filter(activity => activity.id !== noteToDelete.id)
      );
    }
    setDeleteConfirmOpen(false);
    setNoteToDelete(null);
  };

  const cancelDeleteNote = () => {
    setDeleteConfirmOpen(false);
    setNoteToDelete(null);
  };

  const handleSendAIText = (message: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: "manual_text_sent",
      title: "You texted " + contactName,
      description: message,
      timestamp: "Just now",
      status: "delivered",
      metadata: {
        messageBody: message,
        deliveryStatus: "delivered"
      }
    };
    setActivities(prev => [...prev, newActivity]);
    setShowAISuggestion(false);
  };

  const handleSendAIEmail = (subject: string, body: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: "manual_email_sent",
      title: "You emailed " + contactName,
      description: subject,
      timestamp: "Just now",
      status: "delivered",
      metadata: {
        subject: subject,
        emailBody: body,
        deliveryStatus: "delivered"
      }
    };
    setActivities(prev => [...prev, newActivity]);
    setShowAISuggestion(false);
  };

  const handleCallClick = () => {
    // This should trigger the call modal - we'll pass this to AISuggestedNextSteps
    // The actual call modal implementation is in the parent ContactDetail component
  };

  const handleSkipAISuggestion = () => {
    setShowAISuggestion(false);
  };

  const renderActivityContent = (activity: Activity) => {
    switch (activity.type) {
      case "ai_auto_text":
      case "ai_auto_email":
        return (
          <div className="bg-muted/30 p-3 rounded-md text-sm">
            {activity.metadata?.messageBody || activity.metadata?.emailBody}
          </div>
        );
      case "manual_email_sent":
        return (
          <div className="bg-muted/30 p-3 rounded-md text-sm space-y-2">
            {activity.metadata?.subject && (
              <div className="font-medium">{activity.metadata.subject}</div>
            )}
            {activity.metadata?.emailBody && (
              <div>{activity.metadata.emailBody}</div>
            )}
          </div>
        );
      case "manual_note":
        return (
          <div className="bg-muted/30 p-3 rounded-md text-sm">
            {activity.metadata?.noteBody}
          </div>
        );
      case "requested_info":
        return (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Source: <span className="font-medium">{activity.metadata?.requestSource}</span>
            </div>
            {activity.metadata?.property && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{activity.metadata.property}</span>
              </div>
            )}
          </div>
        );
      case "incoming_call":
      case "outgoing_call":
        return (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Duration: <span className="font-medium">{activity.metadata?.duration}</span>
            </div>
            {activity.metadata?.hasRecording && (
              <Button variant="outline" size="sm" className="h-8">
                <Play className="w-3 h-3 mr-1" />
                Listen to Recording
              </Button>
            )}
            {activity.metadata?.callNotes && (
              <div className="bg-muted/30 p-3 rounded-md text-sm mt-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">Call Notes:</div>
                {activity.metadata.callNotes}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-120px)] max-h-[calc(100vh-120px)]">
      <CardHeader className="flex-shrink-0 border-b px-3 py-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Conversation</CardTitle>
          <Button variant="outline" size="sm" onClick={handleWriteNote} className="h-7 px-2">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        {/* Conversation Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20"
        >
          {allActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet.</p>
            </div>
          )}
          
          {allActivities.map((activity) => {
            const isFromLead = isLeadActivity(activity.type);
            const isAiActivity = activity.type === "ai_auto_text" || activity.type === "ai_auto_email";

            return (
              <div
                key={activity.id}
                className={`flex ${isFromLead ? 'justify-start' : 'justify-end'} mb-2`}
              >
                <div
                  className={`max-w-[75%] ${
                    isFromLead
                      ? 'bg-muted text-foreground'
                      : isAiActivity
                      ? 'bg-blue-50 dark:bg-blue-950/30 text-foreground border border-blue-200 dark:border-blue-800'
                      : 'bg-background border text-foreground'
                  } rounded-2xl px-4 py-2.5`}
                >
                  {/* Message Header */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-4 h-4 ${isAiActivity ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <span className={`text-xs font-medium ${isAiActivity ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}`}>
                      {activity.title}
                    </span>
                  </div>

                  {/* Message Content */}
                  <div className="text-sm">
                    {activity.description && (
                      <p className="mb-1">{activity.description}</p>
                    )}
                    {renderActivityContent(activity)}
                  </div>

                  {/* Message Footer */}
                  <div className="flex items-center justify-between gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{activity.timestamp}</span>
                    {activity.status === "delivered" && (
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Delivered
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  {(activity.type === "manual_note" || activity.type === "manual_email_sent" || activity.type === "manual_text_sent" || activity.type === "incoming_call" || activity.type === "outgoing_call") && (
                    <div className="flex gap-1 mt-2 pt-2 border-t border-muted-foreground/10">
                      {activity.type === "manual_text_sent" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs hover:bg-muted/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      )}
                      {(activity.type === "manual_note" || activity.type === "incoming_call" || activity.type === "outgoing_call") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs hover:bg-muted/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditNote(activity);
                          }}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          {(activity.type === "incoming_call" || activity.type === "outgoing_call")
                            ? (activity.metadata?.callNotes ? "Edit" : "Add Note")
                            : "Edit"}
                        </Button>
                      )}
                      {activity.type !== "manual_email_sent" && activity.type !== "incoming_call" && activity.type !== "outgoing_call" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(activity);
                          }}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Suggested Next Steps - Fixed at Bottom */}
        {showAISuggestion && (
          <div className="flex-shrink-0 p-4 border-t bg-background">
            <AISuggestedNextSteps
              contactName={contactName}
              onSendText={handleSendAIText}
              onSendEmail={handleSendAIEmail}
              onCall={onCallClick || handleCallClick}
              onSkip={handleSkipAISuggestion}
            />
          </div>
        )}
      </CardContent>

      {/* Note Modal */}
      <Dialog open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingNote 
                ? (editingNote.type === "incoming_call" || editingNote.type === "outgoing_call" 
                  ? "Edit Call Notes" 
                  : "Edit Note")
                : "Write a Note"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder={editingNote && (editingNote.type === "incoming_call" || editingNote.type === "outgoing_call") 
                ? "Enter call notes here..." 
                : "Enter your note here..."}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelNote}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote}>
              {editingNote && (editingNote.type === "incoming_call" || editingNote.type === "outgoing_call") 
                ? "Save Call Notes" 
                : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteNote}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteNote} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ContactActivity;
