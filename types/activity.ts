export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  contactName?: string;
  status?: "delivered" | "failed" | "pending";
  metadata?: ActivityMetadata;
}

export type ActivityType =
  | "lead_created"
  | "requested_info"
  | "ai_auto_text"
  | "ai_auto_email"
  | "manual_note"
  | "manual_email_sent"
  | "manual_text_sent"
  | "incoming_call"
  | "outgoing_call"
  | "reminder";

export interface ActivityMetadata {
  // Source and property info
  source?: string;
  requestSource?: string;
  property?: string;

  // Message content
  messageBody?: string;
  emailBody?: string;
  subject?: string;
  deliveryStatus?: string;

  // Note content
  noteBody?: string;

  // Call info
  duration?: string;
  callDirection?: "incoming" | "outgoing";
  hasRecording?: boolean;
  callStatus?: string;
  transcript?: string;
  callNotes?: string;
}
